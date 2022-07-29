import React from "react";
import Head from "next/head";
import Link from "next/link";
import useSubs from "../hooks/useSubs";
import useAuth from "../hooks/useAuth";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import { GetStaticProps } from "next/types";

interface Props {
  products: Product[];
}

const Account = ({ products }: Props) => {
  const { user } = useAuth();
  const subscription = useSubs(user);

  return (
    <div>
      <Head>
        <title>Account Settings</title>
        <link rel="icon" href="/netflix.svg" />
      </Head>

      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>
      <main className="pt-24">
        <div>
          <h1 className="text-3xl md:text-4xl text-semibold">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#7e7e7e]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        {/* <Membership /> */}

        <div>
          <h4>Plan Details</h4>
          <div>{}</div>
        </div>
      </main>
    </div>
  );
};

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
