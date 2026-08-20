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
      initial={{ opacity: 0, scale: 0.88, rotate: 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="portrait-grid" />

      <motion.div
        className="portrait-glow"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.58, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="portrait-orbit portrait-orbit-one"
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
      </motion.div>

      <motion.div
        className="portrait-orbit portrait-orbit-two"
        animate={{ rotate: -360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span />
      </motion.div>

      <div className="portrait-top-bar">
        <div className="portrait-window-dots">
          <span />
          <span />
          <span />
        </div>

        <span>developer.profile</span>

        <div className="portrait-live">
          <i />
          LIVE
        </div>
      </div>

      <div className="portrait-image-wrapper">
        <motion.img
          src="/ahsan-profile-animated.png"
          alt="Ahsan Nasir — Software Engineer"
          className="hero-portrait-image"
          animate={{
            y: [0, -9, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="portrait-image-shadow" />
      </div>

      {technologies.map((technology, index) => {
        const Icon = technology.icon;

        return (
          <motion.div
            className={`portrait-tech ${technology.className}`}
            key={technology.name}
            animate={{
              y: [0, index % 2 === 0 ? -7 : 7, 0],
            }}
            transition={{
              duration: 3 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
            }}
          >
            <span>
              <Icon size={14} />
            </span>

            {technology.name}
          </motion.div>
        );
      })}

      <motion.div
        className="portrait-experience-card"
        animate={{
          x: [0, 6, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={16} />

        <div>
          <strong>2+ Years</strong>
          <span>Building digital products</span>
        </div>
      </motion.div>

      <div className="portrait-code-card">
        <span>
          <i>const</i> developer =
        </span>

        <strong>&quot;Ahsan Nasir&quot;;</strong>
      </div>

      <div className="portrait-footer">
        <div>
          <span className="portrait-status-dot" />

          <p>
            <strong>AVAILABLE</strong>
            <small>For freelance projects</small>
          </p>
        </div>

        <span className="portrait-footer-code">&lt;/&gt;</span>
      </div>
    </motion.div>
  );
}

export default HeroPortrait;