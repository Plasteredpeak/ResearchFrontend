import React, { useEffect, useState } from "react";
import { TMDB_IMAGE_URL } from "../utils/constants";
import {
  getUserList,
  removeFromList,
  updateList,
} from "../services/list.services";
import { toast } from "react-toastify";

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("movie"); // Default to movies tab
  const [statusFilter, setStatusFilter] = useState("completed"); // Default to "completed"
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data } = await updateList(token, selectedMovie.id, {
      status: selectedMovie.status,
    });
    if (success) {
      toast.success("List updated successfully");
      fetchList();
    } else {
      if (data) toast.error(data.message);
      else toast.error("Could not update list");
    }

    setSelectedMovie(null);

    document.getElementById("editModal").close();
  };

  const handleReview = async (e) => {
    e.preventDefault();
    const { success, data } = await updateList(token, selectedMovie.id, {
      userRating: selectedMovie.userRating,
    });
    if (success) {
      toast.success("List updated successfully");
      fetchList();
    } else {
      if (data) toast.error(data.message);
      else toast.error("Could not update list");
    }

    setSelectedMovie(null);

    document.getElementById("reviewModal").close();
  };

  const deleteMovie = (id) => async () => {
    const { success, data } = await removeFromList(token, id);
    if (success) {
      toast.success("Movie removed from list");
      fetchList();
    } else {
      if (data) toast.error(data.message);
      else toast.error("Could not remove movie from list");
    }
  };

  const fetchList = async () => {
    setLoading(true);
    const { success, data } = await getUserList(token);
    if (success) setMovies(data);
    else {
      if (data) toast.error(data.message);
      else toast.error("Could not fetch your list");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const filteredMovies = movies.filter(
      (movie) => movie.type === activeTab && movie.status === statusFilter,
    );
    setFilteredMovies(filteredMovies);
  }, [activeTab, movies, statusFilter]);

  if (!token) {
    return (
      <div className="flex min-h-[90vh] justify-center">
        <span className="text-2xl">Please log in to see your list</span>
      </div>
    );
  }

  return (
    <div className="m-8 flex min-h-[90vh] flex-col items-center">
      {/* Tabs */}
      <div role="tablist" className="tabs-boxed tabs tabs-md mb-4 w-1/2">
        <button
          role="tab"
          className={`tab font-bold ${activeTab === "movie" ? "tab-active" : ""}`}
          onClick={() => {
            setActiveTab("movie");
            setStatusFilter("completed"); // Reset status filter when changing tabs
          }}
        >
          Movies
        </button>
        <button
          role="tab"
          className={`tab font-bold ${activeTab === "series" ? "tab-active" : ""}`}
          onClick={() => {
            setActiveTab("series");
            setStatusFilter("completed"); // Reset status filter when changing tabs
          }}
        >
          Series
        </button>
      </div>

      {/* Status Filters */}
      {activeTab === "movie" || activeTab === "series" ? (
        <div role="tablist" className="tabs tabs-bordered tabs-md my-4 w-1/2">
          <button
            role="tab"
            className={`tab ${statusFilter === "completed" ? "tab-active" : ""}`}
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
          <button
            role="tab"
            className={`tab ${statusFilter === "watching" ? "tab-active" : ""}`}
            onClick={() => setStatusFilter("watching")}
          >
            Watching
          </button>
          <button
            role="tab"
            className={`tab ${statusFilter === "planning" ? "tab-active" : ""}`}
            onClick={() => setStatusFilter("planning")}
          >
            Planning
          </button>
        </div>
      ) : null}

      {/* Table */}
      {filteredMovies.length === 0 ? (
        <div className="mt-10 text-center">
          <span className="text-lg">
            No {activeTab === "movie" ? "movies" : "series"} Found.
          </span>
        </div>
      ) : (
        <table className="mt-4 min-w-full rounded-lg border bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">ReleaseDate</th>
              <th className="border px-4 py-2">Public Rating</th>
              <th className="border px-4 py-2">Your Rating</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="border">
                <td className="flex items-center justify-center border px-4 py-2">
                  <img
                    src={`${TMDB_IMAGE_URL}${movie.image}`}
                    alt={movie.title}
                    className="h-24 w-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{movie.title}</td>
                <td className="border px-4 py-2">{movie.releaseDate}</td>
                <td className="border px-4 py-2">{movie.rating}</td>
                <td className="border px-4 py-2">
                  {movie.userRating === "0" ? "Not Rated" : movie.userRating}
                </td>
                <td className="border px-4 py-2">{movie.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="btn btn-info text-white"
                    onClick={() => {
                      setSelectedMovie(movie);
                      document.getElementById("editModal").showModal();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning mx-2 text-white"
                    onClick={() => {
                      setSelectedMovie(movie);
                      document.getElementById("reviewModal").showModal();
                    }}
                  >
                    Review
                  </button>
                  <button
                    className="btn btn-error text-white"
                    onClick={deleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <dialog id="editModal" className="modal">
        <div className="modal-box">
          <h3 className="my-2 text-lg font-bold">Edit {activeTab}</h3>
          <form
            method="dialog"
            className="form-control flex items-center justify-center"
            onSubmit={handleSubmit}
          >
            <select
              className="select select-bordered w-full"
              value={selectedMovie?.status}
              onChange={(e) => {
                setSelectedMovie({ ...selectedMovie, status: e.target.value });
              }}
            >
              <option>completed</option>
              <option>planning</option>
              <option>watching</option>
            </select>

            {/* if there is a button in form, it will close the modal */}
            <button className="btn my-2 mt-4 self-center" type="submit">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="reviewModal" className="modal">
        <div className="modal-box">
          <h3 className="my-2 text-lg font-bold">Review {activeTab}</h3>
          <form
            method="dialog"
            className="form-control flex items-center justify-center"
            onSubmit={handleReview}
          >
            {/* select a number from 1-10 */}
            <input
              type="range"
              min={0}
              max={10}
              value={selectedMovie?.userRating}
              onChange={(e) => {
                setSelectedMovie({
                  ...selectedMovie,
                  userRating: e.target.value,
                });
              }}
              className="range"
              step={1}
            />

            <span className="text-lg font-bold">
              {selectedMovie?.userRating || 0}
            </span>

            <button className="btn my-2 mt-4 self-center" type="submit">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyList;
