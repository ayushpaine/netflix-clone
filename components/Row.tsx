import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import React from "react";
import Thumbnail from "./Thumbnail";
import { Movie } from "../types";

interface Props {
  title: String;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(false);

  const handleClick = (direction: string) => {
    setMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2
        className="w-56 cursor-pointer text-sm font-NetflixSans font-[500] text-[#e5e5e5] transition duration-200 hover:text-white 
      md:text-xl"
      >
        {title}
      </h2>
      <div className="group relative md:-mx-2">
        <ChevronLeftIcon
          className="absolute top-0 bottom-0 opacity-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => {
            return <Thumbnail key={movie.id} movie={movie} />;
          })}
        </div>

        <ChevronRightIcon
          className="absolute top-0 bottom-0 opacity-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
