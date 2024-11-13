import React, { useEffect, useState } from "react";

import { getMovie, getSeries } from "../services/tmdb.services";
import { FaArrowDown, FaCalendar, FaCheck, FaPlay } from "react-icons/fa6";
import { toast } from "react-toastify";
import { addToUserList, getUserList } from "../services/list.services";

export default function MovieDetails({ isMovie, id }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  const addToList = async (status) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("You need to be logged in to add to your list");
      return;
    }

    const listData = {
      status,
      mediaId: id.toString(),
      type: isMovie ? "movie" : "series",
      image: movie.poster_path,
      title: movie.title || movie.name,
      releaseDate: movie.release_date || movie.first_air_date,
      rating: movie.vote_average.toFixed(1),
    };

    setLoading(true);

    const { success, data } = await addToUserList(token, listData);
    if (success) {
      toast.success("Added to list");
    } else {
      toast.error(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const data = isMovie ? await getMovie(id) : await getSeries(id);

      console.log(data);

      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20">
      <div className="mt-8 flex">
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            className="h-96 w-64 rounded-md"
          />
          {/* <div className="dropdown-top dropdown dropdown-hover mt-2 w-full">
            <div tabIndex={0} role="button" className="btn btn-primary w-full">
              Add to List
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
            >
   
              <li>
                <a href="#" className="flex items-center gap-2">
                  <FaCheck />
                  Completed
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2">
                  <FaCalendar />
                  Planning
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2">
                  <FaPlay />
                  Watching
                </a>
              </li>
            </ul>
          </div> */}

          <div className="mt-2 flex w-full justify-center">
            <div className="tooltip tooltip-bottom" data-tip="Add to Completed">
              <div
                className="text-md group btn btn-circle btn-outline btn-secondary mx-2"
                onClick={() => addToList("completed")}
              >
                <FaCheck className="text-lg group-hover:text-white" />
              </div>
            </div>

            <div className="tooltip tooltip-bottom" data-tip="Add to Planning">
              <div
                className="text-md group btn btn-circle btn-outline btn-secondary"
                onClick={() => addToList("planning")}
              >
                <FaCalendar className="text-lg group-hover:text-white" />
              </div>
            </div>

            <div className="tooltip tooltip-bottom" data-tip="Add to Watching">
              <div
                className="text-md group btn btn-circle btn-outline btn-secondary mx-2"
                onClick={() => addToList("watching")}
              >
                <FaPlay className="text-lg group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>
          <div className="mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="mr-2 rounded-md bg-gray-200 px-2 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-lg">{movie.overview}</p>
          <div className="mt-4">
            <span className="font-bold">Release Date:</span>{" "}
            {movie.release_date || movie.first_air_date}
          </div>
          {isMovie ? (
            <div className="mt-4">
              <span className="font-bold">Duration:</span>{" "}
              {(movie.runtime / 60).toFixed(1)} hours
            </div>
          ) : (
            <>
              <div className="mt-4">
                <span className="font-bold">Seasons:</span>{" "}
                {movie.number_of_seasons}
              </div>
              <div className="mt-4">
                <span className="font-bold">Episodes:</span>{" "}
                {movie.number_of_episodes}
              </div>
            </>
          )}

          <div className="mt-4">
            <span className="font-bold">Rating:</span>{" "}
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
