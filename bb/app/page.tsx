import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react";
import Spline from "@splinetool/react-spline/next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    name: "Title of what we gona be doing",
    description: "We put the description of whatever we want to put",
    icon: BrainCogIcon,
  },
  {
    name: "Title of what we gona be doing",
    description: "We put the description of whatever we want to put",
    icon: EyeIcon,
  },
  {
    name: "Title of what we gona be doing",
    description: "We put the description of whatever we want to put",
    icon:  GlobeIcon,
  },
  {
    name: "Title of what we gona be doing",
    description: "We put the description of whatever we want to put",
    icon:  MonitorSmartphoneIcon,
  },
  {
    name: "Title of what we gona be doing",
    description: "We put the description of whatever we want to put",
    icon:   ServerCogIcon,
  },
  {
    name: "Title of what we gona be doing",
    description: "We put the description of whatever we want to put",
    icon:   ZapIcon,
  },
];

export default function Home() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600">
      <div className="bg-white py-24 sm:py-34 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Your study co-pilot ☺
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your PDFS into Interactive Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-indigo-600">Chat with PDF.</span>
              <br />
              <br /> Upload your document, and our co-pilot will answer your
              questions, summarize content.Its the best tool for{" "}
              <span className="text-indigo-600">YOU</span>{" "}
              <span className="font-bold">Study Co-pilot</span>
              <span className="font-regular">easily</span>, enhances
              productivity and saves your time
            </p>
            <div className="flex items-center mx-auto mt-4">
              <Spline scene="https://prod.spline.design/AOnlJlqTrnP8ot19/scene.splinecode" />
            </div>
          </div>
          <Button asChild className="mt-10 ">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
            <Image
              alt="App Screenshot"
              src="https://i.imgur.com/VciRSTI.jpeg"
              width={2432}
              height={1442}
              className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 -inset-x-32  bg-gradient-to-t from-white/95 pt-[5%]" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 ">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-9" >
                <dt className="in-line font-semibold text-gray-900">
                  <feature.icon 
                  aria-hidden="true"
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-600" 
                  />
                </dt>
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
