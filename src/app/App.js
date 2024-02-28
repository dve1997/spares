import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import SparesHeader from "../components/sparesHeader/SparesHeader";
import SparesFooter from "../components/sparesFooter/SparesFooter";
import Spinner from "../components/spinner/Spinner";

import "./App.scss";

const SparesMainPage = lazy(() =>
  import("../pages/sparesMainPage/SparesMainPage")
);
const SparePartCreatePage = lazy(() =>
  import("../pages/sparePartCreatePage/SparePartCreatePage")
);
const SparePartInfoPage = lazy(() =>
  import("../pages/sparePartInfoPage/SparePartInfoPage")
);
const ErrorPage = lazy(() => import("../pages/errorPage/ErrorPage"));

function App() {
  return (
    <div className="spares__wrapper">
      <div className="spares__container">
        <main className="spares__main">
          <Router>
            <header className="spares__header">
              <SparesHeader />
            </header>
            <section className="spares__section">
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<SparesMainPage />} />
                  <Route
                    path="/sparePartCreate"
                    element={<SparePartCreatePage />}
                  />
                  <Route
                    path="/sparePartInfo/:sparePartId"
                    element={<SparePartInfoPage />}
                  />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </section>
            <footer className="spares__footer">
              <SparesFooter />
            </footer>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
