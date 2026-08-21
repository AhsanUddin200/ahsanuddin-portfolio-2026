import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import AskMeAI from "./components/AskMeAI";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import ProjectChooser from "./sections/ProjectChooser";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

import { FaWhatsapp } from "react-icons/fa";

import "./App.css";

function App() {
  const openAIAssistant = (event) => {
    event.preventDefault();

    window.dispatchEvent(
      new Event("open-ai-assistant")
    );
  };

  return (
    <>
      <Navbar />

      <CommandPalette />

      <AskMeAI />

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

        {/* Ask Me AI */}

        <a
          href="#ask-me"
          className="floating-btn hire-btn ask-me-btn"
          aria-label="Open Ahsan AI assistant"
          onClick={openAIAssistant}
        >
          <span className="ask-me-avatar">
            {/* Animated rotating ring */}

            <span className="ask-me-ring" />

            {/* Ahsan profile picture */}

            <span className="ask-me-photo-frame">
              <img
                src="/ahsan-person.png"
                alt="Ahsan Nasir"
                className="ask-me-person"
              />
            </span>

            {/* Online status */}

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