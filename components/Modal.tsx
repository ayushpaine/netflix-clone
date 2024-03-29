import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CheckIcon,
  PlusIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Element, Genre, Movie } from "../types";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { ThumbUpIcon } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [added, setAdded] = useState(false);
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  useEffect(() => {
    if (!movie) {
      return;
    }
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error));

      console.log(data);

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, movie?.id]);

  useEffect(
    () =>
      setAdded(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );

  const handleList = async () => {
    if (added) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
      );

      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
        { ...movie }
      );
      toast(
        `${movie?.title || movie?.original_name} has been added to My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          onClick={handleClose}
          className="modal-button absolute right-5 top-5 z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
            playing={playing}
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black 
              transition hover:bg-[#cacaca]"
                onClick={() => {
                  setPlaying(true);
                }}
              >
                <FaPlay className="h-5 w-5 text-black" />
                Play
              </button>
              <button className="modal-button" onClick={handleList}>
                {added ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
              <button className="modal-button">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button
              className="modal-button"
              onClick={() => {
                setMuted(!muted);
              }}
            >
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-lg bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.round(movie?.vote_average * 10)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-small">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  <span className="font-semibold">
                    {genres.map((genre) => genre.name).join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  <span className="font-semibold">
                    {movie?.original_language}
                  </span>
                </div>
                <div>
                  <span className="text-[gray]">Total Votes: </span>
                  <span className="font-semibold">{movie?.vote_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
