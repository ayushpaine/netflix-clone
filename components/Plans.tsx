import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { CheckIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import Table from "./Table";
import { TailSpin } from "react-loader-spinner";
import { loadCheckout } from "../lib/stripe";

const tagLines = [
  { id: 1, info: "Watch all you want. Ad-free." },
  { id: 2, info: "Recommendations just for you." },
  { id: 3, info: "Change or cancel your plan anytime" },
];

interface Props {
  products: Product[];
}

const Plans = ({ products }: Props) => {
  const { user, logOut } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product>(products[3]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) {
      return;
    } else {
      loadCheckout(selectedPlan?.prices[0].id!);
      setIsBillingLoading(true);
    }
  };

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
      <main className="pt-28 px-2 max-w-5xl pb-12 transition-all md:px-10 mx-auto">
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
          <div className="flex w-full items-center justify-end self-end md:w-[calc((3.5/5)*100%)]">
            {products.map((product: Product) => {
              return (
                <div
                  key={product.id}
                  className={`plan-tick ${
                    selectedPlan?.id === product.id
                      ? "transition opacity-100"
                      : "transition opacity-60"
                  }`}
                  onClick={() => setSelectedPlan(product)}
                >
                  {product.name}
                </div>
              );
            })}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow transition hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <div className="flex items-center justify-center">
                <TailSpin color="white" height={30} width={30} />
              </div>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
