import React from "react";

import MovieDetails from "../components/MovieDetails";
import Recommendations from "../components/Recommendations";

import { useParams } from "react-router-dom";

export default function Movie({ isMovie }) {
  const { id } = useParams();

  return (
    <div>
      <MovieDetails isMovie={isMovie} id={id} />
      <Recommendations isMovie={isMovie} id={id} />
    </div>
  );
}
