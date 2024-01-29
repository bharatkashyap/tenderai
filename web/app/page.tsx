import { promises as fs } from "fs";
import path from "path";
import TenderDetails from "./Tender";
import { Tender } from "../types";
import { getDocuments, addOrUpdateDocument } from "../firebase/firestore";

async function getData() {
  return await getDocuments("tenders");
}

export default async function Home() {
  const tenders: Tender[] = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">Tender Digest</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://bharatk.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Bharat Kashyap
          </a>
        </div>
      </div>
      {tenders.map((tender, index) => (
        <TenderDetails key={index} data={tender} />
      ))}
    </main>
  );
}
