import React, { useEffect, useState } from "react";

import {
  getMovies,
  getPopularSeries,
  getTopRatedMovies,
  getTopRatedSeries,
} from "../services/tmdb.services";
import ListComponent from "../components/ListComponent";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [series, setSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const popularMovies = await getMovies();
      const topRatedMovies = await getTopRatedMovies();
      const popularSeries = await getPopularSeries();
      const topRatedSeries = await getTopRatedSeries();

      setPopular(popularMovies.results);
      setSeries(popularSeries.results);
      setTopRated(topRatedMovies.results);
      setTopRatedSeries(topRatedSeries.results);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h[90vh] mx-auto mb-5">
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <ListComponent title="Popular Animated Movies" movies={popular} />
          <ListComponent title="Popular Animated Series" movies={series} />
          <ListComponent title="Top Rated Animated Movies" movies={topRated} />
          <ListComponent
            title="Top Rated Animated Series"
            movies={topRatedSeries}
          />
        </>
      )}
    </div>
  );
}
