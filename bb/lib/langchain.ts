//import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as dotenv from "dotenv";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// //intialise the OpenAI model with API key and model name
// const model = new ChatOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     modelName: 'gpt-4o'
// })

dotenv.config();
// Create the Gemini model instance
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "gemini-1.5-flash",
});

export const indexName = 'muhuan1'

export async function generateDocs(docId:string) {
    const { userId } = await auth();
    if(!userId) {
        throw new Error('User not found')
    }

    console.log('--- Fetching the download URL from firebase... ---')
    const firebaseRef = await adminDb.collection('users')
    .doc(userId)
    .collection('files')
    .doc(docId)
    .get() 

    const downloadUrl = firebaseRef.data()?.downloadUrl;
    if(!downloadUrl) {
        throw new Error('Download url not found')
    }

    console.log(`---Download url fetched successfully: ${downloadUrl} ---`)

    //Fetch the PDF from the specified URL
    const response = await fetch(downloadUrl)

    //Load the pdf into a PDF document object
    const data = await response.blob();

    //Load the pdf file from the specified path
    console.log('--- Loading PDF document... ---');
    const loader = new PDFLoader(data);
    const docs = await loader.load();

    //split the document into documents
    console.log('--- splitting the loaded document into smaller parts for easier processing ---')
    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs)
    console.log(`--- Split into ${splitDocs.length} parts ---`)

    return splitDocs;
}

async function namespaceExists(index: Index<RecordMetadata>, namespace:string) {
   if (namespace === null) throw new Error('No namespace value provided.');
   const { namespaces } = await index.describeIndexStats();
   return namespaces?.[namespace] !== undefined
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string){
    const { userId } = await auth();

    if(!userId) {
        throw new Error('User not found')
    }

    let pineconeVectorStore;
    //Generate Embeddings (numerical representations) for the split documents
    console.log('---Generating embeddings... ---');
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "embedding-001", // Use the correct model for embeddings
    });

    //console.log(embeddings);

    const index = await pineconeClient.index(indexName)
    const namespaceAlreadyExists = await namespaceExists(index, docId)

    if(namespaceAlreadyExists){
        console.log(`--- Namespace ${docId} already exists, reusing existing emebeddings...`)

        pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace:     docId,
        });
    
        return pineconeVectorStore;
    } else {
        // if the namespace does not exist , download the pdf from firestore via the stored download URL & generate the embeddings  and store them in the Pinecone Vector Store
        const splitDocs = await generateDocs(docId);

        console.log(`--- Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store... ---`)

        pineconeVectorStore = await PineconeStore.fromDocuments(
            splitDocs,
            embeddings,
            {
                pineconeIndex: index,
                namespace: docId,
            }
        );
        return pineconeVectorStore;
    };
   
}