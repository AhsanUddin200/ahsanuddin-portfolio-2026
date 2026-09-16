import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import ProjectChooser from "./sections/ProjectChooser";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Testimonials from "./sections/Testimonials";

import { FaWhatsapp } from "react-icons/fa";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <CommandPalette />

      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectChooser />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
      </main>

      {/* ==========================
          FLOATING ACTION BUTTONS
      ========================== */}

      <div className="floating-actions">
        {/* WhatsApp */}

        <a
          href="https://wa.me/971586073359"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="whatsapp-icon" />

          <span className="floating-text">
            WhatsApp
          </span>
        </a>

        {/* Ask Me */}

        <a
          href="#"
          className="floating-btn hire-btn ask-me-disabled ask-me-btn"
          aria-label="Ask Me"
          onClick={(event) =>
            event.preventDefault()
          }
        >
          <span className="ask-me-avatar">
            <span className="ask-me-ring" />

            <span className="ask-me-photo-frame">
              <img
                src="/ahsan-person.png"
                alt="Ahsan Nasir"
                className="ask-me-person"
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