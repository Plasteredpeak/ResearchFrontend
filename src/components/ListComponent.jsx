import { TMDB_IMAGE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FaCalendar, FaCheck, FaPlay, FaPlus } from "react-icons/fa6";
import { addToUserList } from "../services/list.services";
import { toast } from "react-toastify";

export default function ListComponent({ title, movies }) {
  const navigate = useNavigate();
  const shownMovies = movies.slice(0, 5);
  const [hovered, setHovered] = useState(false);

  const [loading, setLoading] = useState(false);

  const addToList = async (e, movie, status) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("You need to be logged in to add to your list");
      return;
    }

    const listData = {
      status,
      mediaId: movie.id.toString(),
      type: movie.title ? "movie" : "series",
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
      if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
          toast.error(data.errors[key][0]);
        });
      } else toast.error(data);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-20">
      <div className="flex justify-between">
        <h1 className="mt-8 text-2xl font-bold">{title}</h1>
        <a
          href={`/all/${title.toLowerCase().split(" ").join("-")}/?page=1`}
          className="text-md mt-8 font-semibold text-gray-800 underline"
        >
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shownMovies.map((movie) => (
          <div
            key={movie.id}
            className="mt-2 flex transform flex-col transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
            onClick={() => {
              movie.title
                ? navigate(`/movie/${movie.id}`)
                : navigate(`/tv/${movie.id}`);
            }}
          >
            <div className="group relative max-h-96 overflow-hidden">
              <img
                src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-full w-full rounded-md"
                onMouseLeave={() => setHovered(false)}
              />
              <div id="icons">
                <div className="absolute bottom-3 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Add to completed"
                  >
                    <div
                      className="text-md btn btn-circle btn-secondary btn-sm "
                      onMouseEnter={() => setHovered(true)}
                      onClick={(e) => addToList(e, movie, "completed")}
                    >
                      {!hovered ? <FaPlus /> : <FaCheck />}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[5.25rem] right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Add to watching"
                  >
                    <div
                      className="text-md btn btn-circle btn-secondary btn-sm"
                      onClick={(e) => addToList(e, movie, "watching")}
                    >
                      <FaPlay />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Add to Planning"
                  >
                    <div
                      className="text-md btn btn-circle btn-secondary btn-sm"
                      onClick={(e) => addToList(e, movie, "planning")}
                    >
                      <FaCalendar />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-2 text-lg font-bold">
              {movie.title || movie.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
