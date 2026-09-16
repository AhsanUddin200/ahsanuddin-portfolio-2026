import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  BriefcaseBusiness,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";

const experienceData = [
  {
    id: 1,

    period: "June 2025 — Present",
    shortPeriod: "2025 — Present",

    position: "Software Engineer / Mid-Level Developer",
    company: "AADPlus IT Solution Groups",

    type: "Full Time",
    location: "Karachi / Remote",

    description:
      "Building production websites, Odoo ERP systems and cloud deployments for business clients across multiple industries.",

    responsibilities: [
      "Developed and deployed 20+ production business websites using HTML, CSS, JavaScript, animations, WordPress and Elementor.",
      "Implemented and customized Odoo ERP solutions across Odoo 13, 16, 17 and 19.",
      "Designed custom Warehouse Management Systems with stock management, inventory tracking, automated calculations, reporting and analytics.",
      "Managed Vultr cloud deployments, DNS, SSL, business email configuration and Linux server environments.",
      "Collaborated with stakeholders to gather requirements, resolve ERP issues and deliver scalable business software.",
    ],

    achievement:
      "Delivered 10+ successful ERP implementations while managing both development and production infrastructure.",

    skills: [
      "Odoo ERP",
      "Python",
      "JavaScript",
      "Docker",
      "Linux",
      "Vultr",
      "Nginx",
      "SSL",
    ],
  },

  {
    id: 2,

    period: "April 2024 — June 2025",
    shortPeriod: "2024 — 2025",

    position: "MERN Stack Instructor",
    company: "Aptech Computer Education",

    type: "Teaching",
    location: "Karachi",

    description:
      "Trained students from beginner to advanced level in full-stack web development through practical projects and modern development workflows.",

    responsibilities: [
      "Trained 60+ students in React.js, Next.js, Node.js, Express.js, MongoDB and Mongoose.",
      "Delivered practical sessions on REST APIs, JWT authentication and Firebase authentication.",
      "Taught deployment workflows and project-based software development.",
      "Mentored students in debugging, database handling, code structure and end-to-end application development.",
    ],

    achievement:
      "Trained and mentored 60+ students through real full-stack projects and practical development workflows.",

    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JWT",
      "Teaching",
    ],
  },

  {
    id: 3,

    period: "September 2024 — April 2025",
    shortPeriod: "2024 — 2025",

    position: "Junior Software Engineer",
    company: "Rehan Foundation",

    type: "Full Time",
    location: "Karachi",

    description:
      "Worked on business applications covering finance, e-commerce, inventory and operational management workflows.",

    responsibilities: [
      "Developed a role-based Financial Management System with separate Admin and User panels.",
      "Built an Online Bookstore with browsing, order management, cash payments, installment functionality and Stripe integration.",
      "Contributed to OLPP platform features including inventory management and operational workflows.",
    ],

    achievement:
      "Delivered functional modules across finance, e-commerce and inventory management systems.",

    skills: [
      "React",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Stripe",
      "REST APIs",
      "Business Systems",
    ],
  },

  {
    id: 4,

    period: "August 2024 — September 2024",
    shortPeriod: "2024",

    position: "Full Stack Developer — Contract",
    company: "Console",

    type: "US-Based Contract",
    location: "Remote",

    description:
      "Developed a scalable parking management platform focused on real-time slot availability and booking operations.",

    responsibilities: [
      "Developed Parking On Site as a scalable parking slot management platform.",
      "Implemented real-time slot availability and booking workflows.",
      "Supported engaged-slot tracking for more than 1,000 users.",
    ],

    achievement:
      "Built a parking management system designed to support 1,000+ users with real-time booking visibility.",

    skills: [
      "Full Stack",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Real-time Systems",
      "Booking",
    ],
  },

  {
    id: 5,

    period: "February 2024 — June 2024",
    shortPeriod: "2024",

    position: "Web Development Intern",
    company: "One Click Digital",

    type: "Internship",
    location: "Karachi",

    description:
      "Contributed to client-facing websites while improving responsive frontend implementation and interface quality.",

    responsibilities: [
      "Contributed to insurance and healthcare website development.",
      "Implemented responsive frontend pages and reusable interface components.",
      "Improved page layouts and cross-device usability.",
    ],

    achievement:
      "Contributed to production client websites and strengthened practical frontend development experience.",

    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Frontend Development",
    ],
  },
];

function Experience() {
  const [activeExperience, setActiveExperience] =
    useState(0);

  const currentExperience =
    experienceData[activeExperience];

  return (
    <section
      className="experience-section section-spacing"
      id="experience"
    >
      <div className="container">

        {/* ============================
            SECTION TITLE
        ============================ */}

        <SectionTitle
          number="04"
          label="Experience"
          title="A journey built through"
          highlight="real projects."
          description="Explore my professional journey, roles, responsibilities and key achievements."
        />

        {/* ============================
            HORIZONTAL TIMELINE
        ============================ */}

        <motion.div
          className="experience-timeline"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="experience-track">
            {experienceData.map(
              (experience, index) => {
                const isActive =
                  activeExperience === index;

                return (
                  <button
                    key={experience.id}
                    type="button"
                    className={`experience-node ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveExperience(index)
                    }
                  >
                    <span className="experience-node-dot" />

                    <span className="experience-node-number">
                      0{experience.id}
                    </span>

                    <strong>
                      {experience.company}
                    </strong>

                    <small>
                      {experience.shortPeriod}
                    </small>
                  </button>
                );
              }
            )}
          </div>
        </motion.div>

        {/* ============================
            ACTIVE EXPERIENCE DETAIL
        ============================ */}

        <div className="experience-detail-shell">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExperience.id}
              className="experience-detail-card"
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* ============================
                  LEFT
              ============================ */}

              <div className="experience-detail-left">

                <span className="experience-detail-label">
                  ACTIVE ROLE
                </span>

                <h3>
                  {currentExperience.position}
                </h3>

                {/* COMPANY / DATE / LOCATION */}

                <div className="experience-company-row">

                  <span>
                    <BriefcaseBusiness size={15} />
                    {currentExperience.company}
                  </span>

                  <span>
                    <CalendarDays size={15} />
                    {currentExperience.period}
                  </span>

                  <span>
                    <MapPin size={15} />
                    {currentExperience.location}
                  </span>

                </div>

                {/* DESCRIPTION */}

                <p className="experience-main-description">
                  {currentExperience.description}
                </p>

                {/* ============================
                    RESPONSIBILITIES
                ============================ */}

                <div className="experience-responsibilities">

                  <span className="experience-responsibilities-label">
                    CORE RESPONSIBILITIES
                  </span>

                  {currentExperience.responsibilities.map(
                    (item, index) => (
                      <div
                        className="experience-responsibility"
                        key={index}
                      >
                        <span>
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <p>{item}</p>
                      </div>
                    )
                  )}

                </div>

                {/* EMPLOYMENT TYPE */}

                <div className="experience-type">
                  {currentExperience.type}
                </div>

              </div>

              {/* ============================
                  RIGHT
              ============================ */}

              <div className="experience-detail-right">

                <span className="experience-detail-label">
                  KEY ACHIEVEMENT
                </span>

                <div className="experience-achievement">

                  <CheckCircle2 size={20} />

                  <p>
                    {currentExperience.achievement}
                  </p>

                </div>

                {/* SKILLS */}

                <div className="experience-skills">
                  {currentExperience.skills.map(
                    (skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    )
                  )}
                </div>

                {/* CONTACT */}

                <a
                  href="#contact"
                  className="experience-contact-link"
                >
                  Work with me

                  <ArrowUpRight size={16} />
                </a>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Experience;