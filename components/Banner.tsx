import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Movie } from "../types";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 -z-10 left-0 h-[95vh] w-screen">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-NetflixSans font-[700]">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl font-NetflixSans font-[500]">
        {" "}
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="banner-button bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-5 md:w-5" />
          Play
        </button>
        <button className="banner-button bg-[grey]/70">
          {" "}
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
