import axios from "axios";
import { TMDB_BASE_URL } from "../utils/constants";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
export const getMovies = async (page = 1) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
        with_genres: "16",
        page,
      },
    },
  );
  return data;
};

export const getPopularSeries = async (page = 1) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/discover/tv?include_adult=false&sort_by=popularity.desc'`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
        with_genres: "16",
        page,
      },
    },
  );
  return data;
};

export const getTopRatedSeries = async (page = 1) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/discover/tv?include_adult=false&sort_by=vote_average.desc&vote_count.gte=200`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
        with_genres: "16",
        page,
      },
    },
  );
  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/discover/movie?include_adult=false&include_video=false&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
        with_genres: "16",
        page,
      },
    },
  );
  return data;
};

export const getMovie = async (id) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return data;
};

export const getSeries = async (id) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  return data;
};

export const getMovieRecommendations = async (id) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/movie/${id}/recommendations`,
    {
      params: {
        api_key: API_KEY,
        with_genres: "16",
        language: "en-US",
      },
    },
  );
  return data;
};

export const getSeriesRecommendations = async (id) => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/tv/${id}/recommendations`,
    {
      params: {
        api_key: API_KEY,
        with_genres: "16",
        language: "en-US",
      },
    },
  );
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      query,
      with_genres: "16",
      page,
    },
  });
  return data;
};

export const searchSeries = async (query, page = 1) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      query,
      with_genres: "16",
      page,
    },
  });
  return data;
};
