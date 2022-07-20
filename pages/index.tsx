import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";

const Home: NextPage = () => {
  return (
    <>
      <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
        <Head>
          <title>Netflix</title>
          <link rel="icon" href="/netflix.svg" />
        </Head>

        <Header />

        <main>
          <Banner />
          <section></section>
        </main>
      </div>
    </>
  );
};

export default Home;
