import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import MoviesView from "../pages/MoviesView";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import MyList from "../pages/MyList";

const routes = [
  { path: "*", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/movie/:id", element: <Movie isMovie={true} /> },
  { path: "/tv/:id", element: <Movie isMovie={false} /> },
  { path: "/all/:type", element: <MoviesView /> },
  { path: "/my-list", element: <MyList /> },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
