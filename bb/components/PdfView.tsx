'use client'
import React, { useEffect, useState } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Document, Page, pdfjs } from 'react-pdf'
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from 'lucide-react';

// We need to configure CORS
// gsutil cors set cors.json gs://<app-name>.appspot.com
// gsutil cors set cors.json gs://pdfchat-9e963.appspot.com
// go here >>> https://console.cloud.google.com/
// create new file in editor calls cors.json
// run >>> // gsutil cors set cors.json gs://pdfchat-9e963.appspot.com
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

//we put a service worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfView({url}: {url:   string}) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url);
      const file = await response.blob();

      setFile(file);
    };

    fetchFile();
  }, [url]);

const onDocumentLoadSuccess = ({numPages}: {numPages: number}): void => {
  setNumPages(numPages);
}

  return (
    <div>

      {!file? (
        <Loader2Icon className='h-20 w-20 animate-spin text-indigo-600 mt-20' />
      ): (
      <Document
      loading={null}
      file={file}
      rotate={rotation}
      onLoadSuccess={onDocumentLoadSuccess}
      className='m-4 overflow-scroll'
      >
        <Page 
        className='shadow-lg'
        scale={scale}
        pageNumber={pageNumber}
        />
      </Document>
      )}
      
    </div>
  )
}

export default PdfView