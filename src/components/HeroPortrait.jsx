import { motion } from "framer-motion";

import {
  Braces,
  Code2,
  Database,
  Layers3,
  Sparkles,
} from "lucide-react";

function HeroPortrait() {
  const technologies = [
    {
      name: "React",
      className: "portrait-tech-react",
      icon: Code2,
    },
    {
      name: "Python",
      className: "portrait-tech-python",
      icon: Braces,
    },
    {
      name: "Odoo ERP",
      className: "portrait-tech-odoo",
      icon: Layers3,
    },
    {
      name: "Django",
      className: "portrait-tech-django",
      icon: Database,
    },
  ];

  return (
    <motion.div
      className="hero-portrait"
      initial={{
        opacity: 0,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* BACKGROUND */}

      <div className="portrait-grid" />

      <motion.div
        className="portrait-glow"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ORBITS */}

      <motion.div
        className="portrait-orbit portrait-orbit-one"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
      </motion.div>

      <motion.div
        className="portrait-orbit portrait-orbit-two"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
      </motion.div>

      {/* TOP BAR */}

      <div className="portrait-top-bar">
        <div className="portrait-window-dots">
          <span />
          <span />
          <span />
        </div>

        <span>
          developer.profile
        </span>

        <div className="portrait-live">
          <i />
          LIVE
        </div>
      </div>

      {/* =========================
          MAIN IMAGE
      ========================= */}

      <div className="portrait-image-wrapper">
        <img
  src="/ahsan-hero.webp"
  alt="Ahsan Nasir, Software Engineer, Full Stack Developer and Odoo ERP Specialist"
  className="hero-portrait-image"
  loading="eager"
  decoding="async"
  fetchPriority="high"
  draggable="false"
/>

        <div className="portrait-image-shadow" />
      </div>

      {/* TECHNOLOGIES */}

      {technologies.map(
        (technology, index) => {
          const Icon =
            technology.icon;

          return (
            <motion.div
              key={
                technology.name
              }
              className={`portrait-tech ${technology.className}`}
              animate={{
                y: [
                  0,
                  index % 2 === 0
                    ? -4
                    : 4,
                  0,
                ],
              }}
              transition={{
                duration:
                  3.4 +
                  index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
              }}
            >
              <span>
                <Icon size={14} />
              </span>

              {technology.name}
            </motion.div>
          );
        }
      )}

      {/* EXPERIENCE */}

      <motion.div
        className="portrait-experience-card"
        animate={{
          x: [0, 4, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={16} />

        <div>
          <strong>
            2+ Years
          </strong>

          <span>
            Building digital products
          </span>
        </div>
      </motion.div>

      {/* CODE */}

      <div className="portrait-code-card">
        <span>
          <i>const</i>{" "}
          developer =
        </span>

        <strong>
          &quot;Ahsan Nasir&quot;;
        </strong>
      </div>

      {/* FOOTER */}

      <div className="portrait-footer">
        <div>
          <span className="portrait-status-dot" />

          <p>
            <strong>
              AVAILABLE
            </strong>

            <small>
              For freelance projects
            </small>
          </p>
        </div>

        <span className="portrait-footer-code">
          &lt;/&gt;
        </span>
      </div>
    </motion.div>
  );
}

export default HeroPortrait;