import React from "react";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./components/Router";
import Header from "./components/Header";
import Footer from "./components/footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        draggable
        theme="light"
      />
    </BrowserRouter>
  );
}
