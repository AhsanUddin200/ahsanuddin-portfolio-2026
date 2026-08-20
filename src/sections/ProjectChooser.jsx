import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "business",
    title: "Business Website",
    timeline: "2–4 weeks",
    includes: [
      "Responsive design",
      "Contact form",
      "Deployment",
    ],
    skills: ["React", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "odoo",
    title: "Odoo ERP",
    timeline: "4–10 weeks",
    includes: [
      "Odoo implementation",
      "Custom module development",
      "Workflow automation",
    ],
    skills: ["Odoo", "Python", "PostgreSQL", "XML"],
  },
  {
    id: "webapp",
    title: "Web Application",
    timeline: "6–12 weeks",
    includes: [
      "Custom application UI",
      "Backend integration",
      "Database setup",
    ],
    skills: ["React", "Node.js", "API", "Database"],
  },
  {
    id: "api",
    title: "API Integration",
    timeline: "1–3 weeks",
    includes: [
      "Third-party API integration",
      "Authentication",
      "Data synchronization",
    ],
    skills: ["REST API", "JavaScript", "Python", "JSON"],
  },
];

function ProjectChooser() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
  <motion.section
  className="project-chooser-section compact"
  id="project-type"
  initial={{ opacity: 0, y: 70 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.18 }}
  transition={{
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1],
  }}
>
    <div className="project-chooser-container">

     <motion.div
  className="compact-project-header"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.5 }}
  transition={{
    duration: 0.65,
    delay: 0.08,
    ease: [0.22, 1, 0.36, 1],
  }}
>
        <div>
          <p className="project-chooser-label">03 · START YOUR PROJECT</p>
          <h2>Choose Your Project</h2>
        </div>

        <p className="compact-question">
          What do you need?
        </p>
      </motion.div>

      <div className="compact-project-layout">

        <div className="compact-project-options">
          {projects.map((project, index) => (
  <motion.button
    key={project.id}
    className={`compact-project-btn ${
      activeProject.id === project.id ? "active" : ""
    }`}
    onClick={() => setActiveProject(project)}

    initial={{ opacity: 0, x: -25 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.4 }}

    transition={{
      duration: 0.5,
      delay: 0.12 + index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    }}

    whileHover={{
      x: 5,
      scale: 1.015,
    }}

    whileTap={{
      scale: 0.98,
    }}
  >
    <span className="compact-project-number">
      0{index + 1}
    </span>

    <span>{project.title}</span>
  </motion.button>
))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            className="compact-project-card"
             initial={{
      opacity: 0,
      x: 25,
      scale: 0.98,
    }}

    animate={{
      opacity: 1,
      x: 0,
      scale: 1,
    }}

    exit={{
      opacity: 0,
      x: -20,
      scale: 0.98,
    }}

    transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }}
          >
            <div className="compact-card-top">
              <div>
                <span className="compact-mini-label">
                  SELECTED PROJECT
                </span>

                <h3>{activeProject.title}</h3>
              </div>

              <div className="compact-timeline">
                <span>Timeline</span>
                <strong>{activeProject.timeline}</strong>
              </div>
            </div>

            <div className="compact-card-bottom">

              <div className="compact-includes">
                {activeProject.includes.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="compact-skills">
                {activeProject.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  </motion.section>
);
}

export default ProjectChooser;