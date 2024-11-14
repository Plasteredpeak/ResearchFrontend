import React, { useEffect, useState } from "react";
import { TMDB_IMAGE_URL } from "../utils/constants";
import { useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";

import {
  getMovies,
  getPopularSeries,
  getTopRatedMovies,
  getTopRatedSeries,
  searchMovies,
  searchSeries,
} from "../services/tmdb.services";

import { useNavigate } from "react-router-dom";
import { FaCalendar, FaCheck, FaPlay, FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { addToUserList } from "../services/list.services";
import { toast } from "react-toastify";

const MoviesView = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const title = type.replace(/-/g, " ").toUpperCase();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  const [hovered, setHovered] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    let data;
    switch (type) {
      case "popular-anime-movies":
        data = await getMovies(page);
        break;
      case "top-rated-anime-movies":
        data = await getTopRatedMovies(page);
        break;
      case "popular-anime-series":
        data = await getPopularSeries(page);
        break;
      case "top-rated-anime-series":
        data = await getTopRatedSeries(page);
        break;
      default:
        data = [];
    }
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setSearchParams((params) => ({
      ...params,
      page: page.toString(),
    }));
    setLoading(false);
  };

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

    setListLoading(true);

    const { success, data } = await addToUserList(token, listData);
    if (success) {
      toast.success("Added to list");
    } else {
      if (data.errors) {
        Object.keys(data.errors).forEach((key) => {
          toast.error(data.errors[key][0]);
        });
      } else toast.error(data);
    }

    setListLoading(false);
  };

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      if (searchQuery === "") {
        fetchData();
        return;
      }
      let results;
      if (type.includes("movie")) {
        results = await searchMovies(searchQuery, page);
      } else {
        results = await searchSeries(searchQuery, page);
      }

      setMovies(results.results);
      setTotalPages(results.total_pages);
      setSearchParams((params) => ({
        ...params,
        page: page.toString(),
      }));
      setLoading(false);
    };
    const timeoutId = setTimeout(search, 2000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setSearchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams((params) => ({
      ...params,
      page: newPage.toString(),
    }));
  };

  return (
    <div className="container mx-auto mb-5 min-h-[90vh] px-20">
      <div className="flex justify-between">
        <h1 className="mt-8 text-2xl font-bold">{title}</h1>
      </div>
      {type !== "trending" && (
        <div className="mb-4 flex justify-center">
          <label className="input input-secondary my-4 flex w-1/2 items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="cursor-pointer text-xl" />
          </label>
        </div>
      )}
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-2xl font-bold">No results found</h1>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="mt-2 flex transform flex-col transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
                  >
                    <div className="group relative max-h-96 overflow-hidden">
                      <img
                        src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="h-full w-full rounded-md"
                        onClick={() => {
                          movie.title
                            ? navigate(`/movie/${movie.id}`)
                            : navigate(`/tv/${movie.id}`);
                        }}
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
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesView;
