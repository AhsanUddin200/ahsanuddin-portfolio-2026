import { motion } from "framer-motion";

import CountUp from "../components/CountUp";
import HeroPortrait from "../components/HeroPortrait";

import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

import {
  personalInfo,
  statistics,
} from "../data/portfolioData";

function Hero() {
  const containerAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="hero-section"
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="hero-grid-background" />

      <motion.div
        className="hero-glow hero-glow-left"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-glow hero-glow-right"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================
          HERO CONTENT
      ====================================== */}

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {/* =================================
              AVAILABILITY
          ================================== */}

          <motion.div
            className="availability-row"
            variants={itemAnimation}
          >
            <div className="availability-badge">
              <span className="availability-dot" />

              {personalInfo.availability}
            </div>

            <div className="hero-location">
              <MapPin size={14} />

              {personalInfo.location}
            </div>
          </motion.div>

          {/* =================================
              MAIN HERO
          ================================== */}

          <div className="hero-main-layout">
            {/* ===============================
                LEFT CONTENT
            ================================ */}

            <div className="hero-left-content">
              <motion.p
                className="hero-eyebrow"
                variants={itemAnimation}
              >
                Software Engineer

                <span>/</span>

                Full Stack Developer

                <span>/</span>

                ERP Specialist
              </motion.p>

              <motion.h1
                className="hero-heading"
                variants={itemAnimation}
              >
                <span className="hero-heading-line">
                  I build
                </span>

                <span className="hero-heading-line hero-outline-text">
                  digital systems
                </span>

                <span className="hero-heading-line">
                  that create
                </span>

                <span className="hero-heading-line hero-serif-line">
                  real impact.
                </span>
              </motion.h1>

              <motion.div
                className="hero-bottom-content"
                variants={itemAnimation}
              >
                <p className="hero-description">
                  I build web applications and ERP systems
                  that simplify business operations.
                </p>

                <div className="hero-buttons">
                  <a
                    href="#projects"
                    className="hero-primary-button"
                  >
                    View Selected Work

                    <ArrowDownRight size={19} />
                  </a>

                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hero-secondary-button"
                  >
                    Start a Project

                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* ===============================
                PORTRAIT + TECH STRIP
            ================================ */}

            <motion.div
              className="hero-portrait-stack"
              initial={{
                opacity: 0,
                x: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HeroPortrait />

              {/* TECH STRIP */}

              <motion.div
                className="hero-tech-strip"
                initial={{
                  opacity: 0,
                  y: 14,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.65,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.span
                  whileHover={{
                    y: -3,
                    color: "#c8ff45",
                  }}
                >
                  React
                </motion.span>

                <i />

                <motion.span
                  whileHover={{
                    y: -3,
                    color: "#c8ff45",
                  }}
                >
                  Python
                </motion.span>

                <i />

                <motion.span
                  whileHover={{
                    y: -3,
                    color: "#c8ff45",
                  }}
                >
                  Odoo
                </motion.span>

                <i />

                <motion.span
                  whileHover={{
                    y: -3,
                    color: "#c8ff45",
                  }}
                >
                  Docker
                </motion.span>
              </motion.div>
            </motion.div>

            {/* ===============================
                CODE CARD
            ================================ */}

            <motion.div
              className="hero-visual"
              initial={{
                opacity: 0,
                scale: 0.9,
                rotate: 4,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* TOP BAR */}

              <div className="visual-top-bar">
                <div className="visual-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="visual-file-name">
                  ahsan.profile.jsx
                </span>

                <span className="visual-status">
                  LIVE
                </span>
              </div>

              {/* CODE */}

              <div className="visual-code-area">
                <div className="code-line">
                  <span className="code-number">
                    01
                  </span>

                  <span>
                    <strong>const</strong>{" "}
                    <em>developer</em> = {"{"}
                  </span>
                </div>

                <div className="code-line">
                  <span className="code-number">
                    02
                  </span>

                  <span className="code-indent">
                    name:{" "}
                    <b>
                      &quot;
                      {personalInfo.name}
                      &quot;
                    </b>
                    ,
                  </span>
                </div>

                <div className="code-line">
                  <span className="code-number">
                    03
                  </span>

                  <span className="code-indent">
                    focus:{" "}
                    <b>
                      &quot;Business Solutions&quot;
                    </b>
                    ,
                  </span>
                </div>

                <div className="code-line">
                  <span className="code-number">
                    04
                  </span>

                  <span className="code-indent">
                    stack: [
                    <b>&quot;React&quot;</b>,{" "}
                    <b>&quot;Node&quot;</b>,{" "}
                    <b>&quot;Odoo&quot;</b>],
                  </span>
                </div>

                <div className="code-line">
                  <span className="code-number">
                    05
                  </span>

                  <span className="code-indent">
                    available:{" "}
                    <strong>true</strong>,
                  </span>
                </div>

                <div className="code-line">
                  <span className="code-number">
                    06
                  </span>

                  <span>
                    {"}"}
                  </span>
                </div>
              </div>

              {/* ===============================
                  STATUS FOOTER
              ================================ */}

              <div className="visual-footer">
                <span>
                  SYSTEM STATUS
                </span>

                <strong>
                  <i />

                  READY TO BUILD
                </strong>
              </div>
            </motion.div>
          </div>

          {/* =================================
              STATISTICS + SOCIALS
          ================================== */}

          <motion.div
            className="hero-information-bar"
            variants={itemAnimation}
          >
            <div className="hero-statistics">
              {statistics.map((stat) => (
                <div
                  className="hero-stat-item"
                  key={stat.id}
                >
                  <CountUp
                    end={parseInt(stat.value, 10)}
                    suffix={
                      stat.value.includes("+")
                        ? "+"
                        : ""
                    }
                    duration={
                      1600 + stat.id * 150
                    }
                    className="hero-counter"
                  />

                  <span>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="hero-social-links">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <Code2 size={18} />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <BriefcaseBusiness size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================
          SCROLL INDICATOR
      ====================================== */}

      <motion.a
        href="#about"
        className="hero-scroll-indicator"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span>
          Scroll to explore
        </span>

        <ArrowDownRight size={17} />
      </motion.a>
    </section>
  );
}

export default Hero;