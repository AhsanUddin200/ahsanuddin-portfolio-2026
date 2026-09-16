import {
  lazy,
  Suspense,
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import AskMeAI from "./components/AskMeAI";

import Hero from "./sections/Hero";

import SiteMotion from "./components/SiteMotion";

import { FaWhatsapp } from "react-icons/fa";

import "./App.css";

/* =========================================================
   LAZY-LOADED HOME SECTIONS

   Hero remains eager because it is above the fold.
   Everything below Hero is split into separate JS chunks.
========================================================= */

const About = lazy(() =>
  import("./sections/About")
);

const Skills = lazy(() =>
  import("./sections/Skills")
);

const ProjectChooser = lazy(() =>
  import("./sections/ProjectChooser")
);

const Projects = lazy(() =>
  import("./sections/Projects")
);

const Testimonials = lazy(() =>
  import("./sections/Testimonials")
);

const Experience = lazy(() =>
  import("./sections/Experience")
);

const Contact = lazy(() =>
  import("./sections/Contact")
);

/* =========================================================
   LAZY-LOADED CASE STUDY ROUTES

   These pages are not needed while loading the homepage.
========================================================= */

const WarehouseERP = lazy(() =>
  import("./pages/WarehouseERP")
);

const FinancialManagement = lazy(() =>
  import("./pages/FinancialManagement")
);

const RestaurantERP = lazy(() =>
  import("./pages/RestaurantERP")
);

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {
  return (
    <>
      {/* Above-the-fold content stays immediate */}
      <Hero />

      {/* Below-the-fold sections load independently */}

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <Suspense fallback={null}>
        <Skills />
      </Suspense>

      <Suspense fallback={null}>
        <ProjectChooser />
      </Suspense>

      <Suspense fallback={null}>
        <Projects />
      </Suspense>

      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={null}>
        <Experience />
      </Suspense>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const openAIAssistant = (event) => {
    event.preventDefault();

    window.dispatchEvent(
      new Event(
        "open-ai-assistant"
      )
    );
  };

  return (
    <>
      <SiteMotion />

      <Navbar />

      <CommandPalette />

      <AskMeAI />

      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/projects/warehouse-erp"
              element={<WarehouseERP />}
            />

            <Route
              path="/projects/financial-management"
              element={
                <FinancialManagement />
              }
            />

            <Route
              path="/projects/restaurant-erp"
              element={<RestaurantERP />}
            />
          </Routes>
        </Suspense>
      </main>

      {/* ===================================================
          FLOATING ACTIONS
      ==================================================== */}

      <div className="floating-actions">
        <a
          href="https://wa.me/971586073359"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp
            className="whatsapp-icon"
          />

          <span className="floating-text">
            WhatsApp
          </span>
        </a>

        <a
          href="#ask-me"
          className="floating-btn hire-btn ask-me-btn"
          aria-label="Open Ahsan AI assistant"
          onClick={openAIAssistant}
        >
          <span className="ask-me-avatar">
            <span className="ask-me-ring" />

            <span className="ask-me-photo-frame">
              <img
                src="/ahsan-person.png"
                alt="Ahsan Nasir"
                className="ask-me-person"
                width="64"
                height="64"
                decoding="async"
              />
            </span>

            <span className="ask-me-status" />
          </span>

          <span className="floating-text">
            Ask Me
          </span>
        </a>
      </div>
    </>
  );
}

export default App;