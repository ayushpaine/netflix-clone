import React from "react";
import Head from "next/head";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { CheckIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";

const tagLines = [
  { id: 1, info: "Watch all you want. Ad-free." },
  { id: 2, info: "Recommendations just for you." },
  { id: 3, info: "Change or cancel your plan anytime" },
];

interface Props {
  products: Product;
}

const Plans = ({ products }: Props) => {
  const { logOut } = useAuth();
  return (
    <div>
      {" "}
      <Head>
        <title>Netflix - Subscriptions</title>
        <link rel="icon" href="/netflix.svg" />
      </Head>
      <header className="border-b border-white/10 bg-[#101010]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logOut}
        >
          Sign Out
        </button>
      </header>
      <main className="pt-28 px-2 max-w-5xl pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <div>
          {tagLines.map((tag) => {
            return (
              <div key={tag.id} className="flex items-center gap-x-2 text-lg">
                <CheckIcon className="h-7 w-7 text-[#E50914]" /> {tag.info}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {products.map((product: Product) => {
              return <div key={product.id}>{product.name}</div>;
            })}
          </div>
          <button>Subscribe</button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
