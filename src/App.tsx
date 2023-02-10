import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import { SearchMoviesProvider } from "./contexts/searchMoviesContext";
import Footer from "./layout/Footer";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/404";
import Home from "./pages/Home";
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

const BASE_URL = "/react-movies-app/";

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <SearchMoviesProvider>
        <NavBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
        <Layout>
          <Routes>
            <Route path={BASE_URL} element={<Home />} />
            <Route
              path={`${BASE_URL}movies/:id`}
              element={
                <Suspense fallback="Loading...">
                  <MovieDetailsPage />
                </Suspense>
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </SearchMoviesProvider>
      <Footer />
    </>
  );
}

export default App;
