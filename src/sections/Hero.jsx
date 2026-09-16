import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import CountUp from "../components/CountUp";
import HeroPortrait from "../components/HeroPortrait";
import CodeCinema from "../components/CodeCinema";

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
  const prefersReducedMotion = useReducedMotion();

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const HeroBottomContent = isMobile
    ? "div"
    : motion.div;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 150,
    damping: 28,
    mass: 0.3,
  });

  const smoothPointerY = useSpring(pointerY, {
    stiffness: 150,
    damping: 28,
    mass: 0.3,
  });

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      520px circle at ${smoothPointerX}px ${smoothPointerY}px,
      rgba(200, 255, 69, 0.11),
      rgba(112, 101, 255, 0.07) 34%,
      transparent 70%
    )
  `;

  const handleHeroPointerMove = (event) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

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

  const headingAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.095,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const headingLineAnimation = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 0,
          y: "115%",
          rotate: 1.4,
        },

    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,

      transition: {
        duration: prefersReducedMotion ? 0 : 0.82,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="hero-section"
      onPointerMove={handleHeroPointerMove}
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="hero-grid-background" />

      <CodeCinema />

      <motion.div
        className="hero-cursor-spotlight"
        aria-hidden="true"
        style={{
          background: spotlightBackground,
        }}
      />

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
                Ahsan Nasir

                <span>/</span>

                Software Engineer

                <span>/</span>

                Full Stack Developer

                <span>/</span>

                Odoo ERP Specialist
              </motion.p>

              <motion.h1
                className="hero-heading"
                variants={headingAnimation}
              >
                <span className="hero-heading-mask">
                  <motion.span
                    className="hero-heading-line"
                    variants={headingLineAnimation}
                  >
                    I build
                  </motion.span>
                </span>

                <span className="hero-heading-mask">
                  <motion.span
                    className="hero-heading-line hero-outline-text"
                    variants={headingLineAnimation}
                  >
                    digital systems
                  </motion.span>
                </span>

                <span className="hero-heading-mask">
                  <motion.span
                    className="hero-heading-line"
                    variants={headingLineAnimation}
                  >
                    that create
                  </motion.span>
                </span>

                <span className="hero-heading-mask">
                  <motion.span
                    className="hero-heading-line hero-serif-line"
                    variants={headingLineAnimation}
                  >
                    real impact.
                  </motion.span>
                </span>
              </motion.h1>

              <HeroBottomContent
                className="hero-bottom-content"
                {...(
                  isMobile
                    ? {}
                    : {
                        variants:
                          itemAnimation,
                      }
                )}
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
              </HeroBottomContent>
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