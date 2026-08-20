import { motion } from "framer-motion";

import {
  Code2,
  Database,
  Layers3,
  Settings,
  CheckCircle2,
  MonitorSmartphone,
  PlugZap,
  ShieldCheck,
  Puzzle,
  FileText,
  Globe2,
  Workflow,
  BrainCircuit,
  Palette,
} from "lucide-react";

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiBootstrap,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiOdoo,
  SiGithub,
  SiVercel,
  SiPostman,
  SiFigma,
} from "react-icons/si";

import SectionTitle from "../components/SectionTitle";

/* =========================================================
   SKILL GROUPS
========================================================= */

const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    icon: Code2,
    description:
      "Modern, responsive and interactive user interfaces.",
    skills: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Responsive Design",
    ],
  },

  {
    number: "02",
    title: "Backend Development",
    icon: Database,
    description:
      "Secure APIs, databases and server-side applications.",
    skills: [
      "Python",
      "Django",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Authentication",
    ],
  },

  {
    number: "03",
    title: "Odoo ERP",
    icon: Layers3,
    description:
      "Business automation with customized Odoo solutions.",
    skills: [
      "Odoo Development",
      "Custom Modules",
      "QWeb Reports",
      "Odoo Website",
      "ERP Implementation",
      "Business Workflows",
    ],
  },

  {
    number: "04",
    title: "Tools & Workflow",
    icon: Settings,
    description:
      "Professional tools used to build and deliver projects.",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Vercel",
      "Postman",
      "Figma",
      "Problem Solving",
    ],
  },
];

/* =========================================================
   SKILL DETAILS
========================================================= */

const skillDetails = {
  "React.js": {
    title: "React.js",
    icon: SiReact,
    use:
      "Interactive web applications, dashboards and dynamic user interfaces.",
    bestFor:
      "Projects where interfaces update frequently and reusable components are important.",
  },

  JavaScript: {
    title: "JavaScript",
    icon: SiJavascript,
    use:
      "Frontend functionality, website interactions and browser-side logic.",
    bestFor:
      "Dynamic websites, API communication and interactive user experiences.",
  },

  HTML5: {
    title: "HTML5",
    icon: SiHtml5,
    use:
      "Creating the structure and semantic foundation of websites.",
    bestFor:
      "Accessible, SEO-friendly and well-organized web interfaces.",
  },

  CSS3: {
    title: "CSS3",
    icon: Palette,
    use:
      "Responsive layouts, visual styling, transitions and animations.",
    bestFor:
      "Creating professional interfaces across desktop, tablet and mobile.",
  },

  Bootstrap: {
    title: "Bootstrap",
    icon: SiBootstrap,
    use:
      "Rapid development of responsive layouts and reusable UI components.",
    bestFor:
      "Projects where development speed and standardized responsive layouts matter.",
  },

  "Responsive Design": {
    title: "Responsive Design",
    icon: MonitorSmartphone,
    use:
      "Adapting interfaces to desktop, tablet and mobile screen sizes.",
    bestFor:
      "Websites and applications that need consistent usability across devices.",
  },

  Python: {
    title: "Python",
    icon: SiPython,
    use:
      "Backend development, automation, APIs and ERP business logic.",
    bestFor:
      "Data-driven applications, automation and scalable server-side systems.",
  },

  Django: {
    title: "Django",
    icon: SiDjango,
    use:
      "Building secure backend systems and full-stack web applications.",
    bestFor:
      "Projects requiring authentication, databases and structured backend architecture.",
  },

  "REST APIs": {
    title: "REST APIs",
    icon: PlugZap,
    use:
      "Connecting frontend applications, backend systems and third-party platforms.",
    bestFor:
      "Applications that need structured communication between multiple systems.",
  },

  PostgreSQL: {
    title: "PostgreSQL",
    icon: SiPostgresql,
    use:
      "Reliable relational database storage and transactional data management.",
    bestFor:
      "ERP systems, financial platforms and structured business applications.",
  },

  MySQL: {
    title: "MySQL",
    icon: SiMysql,
    use:
      "Relational database management for websites and business applications.",
    bestFor:
      "Applications requiring structured and reliable database storage.",
  },

  Authentication: {
    title: "Authentication",
    icon: ShieldCheck,
    use:
      "Secure user login, roles, permissions and protected application access.",
    bestFor:
      "Applications with multiple users, dashboards and restricted functionality.",
  },

  "Odoo Development": {
    title: "Odoo Development",
    icon: SiOdoo,
    use:
      "ERP implementation, customization and business process automation.",
    bestFor:
      "Companies that want sales, inventory, accounting and operations connected in one system.",
  },

  "Custom Modules": {
    title: "Custom Odoo Modules",
    icon: Puzzle,
    use:
      "Developing custom functionality that standard Odoo does not provide.",
    bestFor:
      "Businesses with unique workflows or industry-specific requirements.",
  },

  "QWeb Reports": {
    title: "QWeb Reports",
    icon: FileText,
    use:
      "Creating customized Odoo PDF reports, invoices and business documents.",
    bestFor:
      "Businesses requiring branded reports and printable documents.",
  },

  "Odoo Website": {
    title: "Odoo Website",
    icon: Globe2,
    use:
      "Building websites directly connected with Odoo business applications.",
    bestFor:
      "Companies that want website, CRM, sales and ERP in one ecosystem.",
  },

  "ERP Implementation": {
    title: "ERP Implementation",
    icon: Layers3,
    use:
      "Converting real business operations into structured ERP workflows.",
    bestFor:
      "Businesses replacing spreadsheets, manual processes or disconnected systems.",
  },

  "Business Workflows": {
    title: "Business Workflows",
    icon: Workflow,
    use:
      "Designing and automating repeatable business processes.",
    bestFor:
      "Improving operational efficiency and reducing repetitive manual work.",
  },

  "Git & GitHub": {
    title: "Git & GitHub",
    icon: SiGithub,
    use:
      "Version control, source-code management and development collaboration.",
    bestFor:
      "Tracking code changes and maintaining a reliable project history.",
  },

  "VS Code": {
    title: "VS Code",
    icon: Code2,
    use:
      "Professional source-code editing and development workflows.",
    bestFor:
      "Frontend, backend, API and full-stack application development.",
  },

  Vercel: {
    title: "Vercel",
    icon: SiVercel,
    use:
      "Deployment and hosting of modern frontend applications.",
    bestFor:
      "React and Next.js applications requiring fast continuous deployment.",
  },

  Postman: {
    title: "Postman",
    icon: SiPostman,
    use:
      "Testing, debugging and validating APIs.",
    bestFor:
      "Backend development and checking API requests, responses and authentication.",
  },

  Figma: {
    title: "Figma",
    icon: SiFigma,
    use:
      "Interface planning, prototyping and design collaboration.",
    bestFor:
      "Planning website or application layouts before development begins.",
  },

  "Problem Solving": {
    title: "Problem Solving",
    icon: BrainCircuit,
    use:
      "Understanding technical and business challenges before selecting a solution.",
    bestFor:
      "Building practical systems based on real requirements instead of technology trends.",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-background-text">
        CAPABILITIES
      </div>

      <div className="skills-container">
        <SectionTitle
          number="02"
          label="My Skills"
          title="Tools I use to turn"
          highlight="ideas into products."
          description="A practical technology stack focused on building fast websites, business systems and scalable digital experiences."
        />

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const GroupIcon = group.icon;

            return (
              <motion.article
                className="skill-card"
                key={group.title}
                initial={{
                  opacity: 0,
                  y: 45,
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
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="skill-card-top">
                  <span className="skill-number">
                    {group.number}
                  </span>

                  <div className="skill-icon">
                    <GroupIcon
                      size={25}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <h3>{group.title}</h3>

                <p>{group.description}</p>

                <div className="skill-list">
                  {group.skills.map((skill) => {
                    const details = skillDetails[skill];
                    const SkillIcon = details?.icon;

                    return (
                      <div
                        className="smart-skill-wrapper"
                        key={skill}
                      >
                        <motion.div
                          className="skill-item smart-skill-item"
                          whileHover={{
                            y: -3,
                            scale: 1.03,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                        >
                          <CheckCircle2 size={16} />

                          <span>{skill}</span>
                        </motion.div>

                        {details && (
                          <div className="skill-smart-popover">
                            <div className="skill-popover-top">
                              <span className="skill-popover-dot" />

                              <span className="skill-popover-label">
                                TECHNOLOGY
                              </span>
                            </div>

                            <div className="skill-popover-title-row">
                              {SkillIcon && (
                                <span className="skill-popover-tech-icon">
                                  <SkillIcon />
                                </span>
                              )}

                              <div>
                                <h4>{details.title}</h4>

                                <span className="skill-popover-subtitle">
                                  Development Tool
                                </span>
                              </div>
                            </div>

                            <div className="skill-popover-info">
                              <div>
                                <span>USED FOR</span>

                                <p>{details.use}</p>
                              </div>

                              <div>
                                <span>BEST WHEN</span>

                                <p>{details.bestFor}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="skill-card-line" />
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="skills-message"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <span className="skills-message-dot" />

          <p>
            I don&apos;t simply use technologies—I choose the
            right tools for every business problem.
          </p>

          <span className="skills-message-code">
            &lt;/&gt;
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;