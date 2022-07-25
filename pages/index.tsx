import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import apiRequests from "../helpers/apiRequests";
import { Movie } from "../types";
import useAuth from "../hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";

interface Props extends Movie {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = false;

  if (loading || subscription === null) {
    return null;
  }

  if (!subscription) {
    return <Plans />;
  }
  return (
    <>
      <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
        <Head>
          <title>Netflix</title>
          <link rel="icon" href="/netflix.svg" />
        </Head>

        <Header />

        <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16">
          <Banner netflixOriginals={netflixOriginals} />
          <section className="md:space-y-24">
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Horror Movies" movies={horrorMovies} />
            <Row title="Romance Movies" movies={romanceMovies} />
            <Row title="Documentaries" movies={documentaries} />
          </section>
        </main>
        {showModal && <Modal />}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(apiRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(apiRequests.fetchTrending).then((res) => res.json()),
    fetch(apiRequests.fetchTopRated).then((res) => res.json()),
    fetch(apiRequests.fetchActionMovies).then((res) => res.json()),
    fetch(apiRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(apiRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(apiRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(apiRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
