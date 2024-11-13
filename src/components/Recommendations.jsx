import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

import {
  getMovieRecommendations,
  getSeriesRecommendations,
} from "../services/tmdb.services";

const Recommendations = ({ isMovie, id }) => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = isMovie
        ? await getMovieRecommendations(id)
        : await getSeriesRecommendations(id);

      setRecommendations(data.results);
    };

    fetchRecommendations();
  }, [id, isMovie]);

  return (
    <div className="container mx-auto px-5 py-5">
      <h1 className="mt-2 text-2xl font-bold">
        {isMovie ? "Movie" : "Series"} Recommendations
      </h1>
      <Carousel
        className="mt-2"
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 5,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 3,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
          },
        }}
        showDots={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={700}
        customTransition={"transform 700ms ease-in-out"}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="
            m-2
            flex
            flex-col
            items-center
            justify-center
            rounded-md
            p-2
            text-center
            transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer
          "
            onClick={() => {
              isMovie
                ? navigate(`/movie/${recommendation.id}`)
                : navigate(`/tv/${recommendation.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
              alt={recommendation.title || recommendation.name}
              className="rounded-md"
            />
            <h1 className="mt-2 text-lg font-bold">
              {recommendation.title || recommendation.name}
            </h1>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Recommendations;
