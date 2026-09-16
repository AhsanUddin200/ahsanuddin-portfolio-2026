import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { ArrowUpRight } from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";


/* =========================================
   FILTER OPTIONS
========================================= */

const projectFilters = [
  "All",
  "Odoo",
  "Web",
  "Mobile",
  "API",
];


/* =========================================
   FEATURED PROJECTS
========================================= */

const featuredProjects = [
  {
    title: "AADPlus Corporate Website",

    category: "Business Website Development",

    /* Used by Smart Filter */
    filters: ["Web"],

    description:
      "A complete responsive corporate website presenting ERP, IT, accounting, consultancy and digital marketing services.",

    problem:
      "The company needed one professional digital platform to clearly present multiple business services to clients in the UAE and Pakistan.",

    solution:
      "I designed and developed a structured multi-page website with service categories, responsive navigation, consultation calls-to-action and optimized mobile layouts.",

    result:
      "Created a professional online presence where potential clients can easily understand services, explore business solutions and contact the company.",

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
    ],

    liveUrl: "https://aadplus.com/",

    caseStudyUrl: "",

    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=90",

    color: "#c8ff45",
  },

  {
    title: "Warehouse ERP",

    category: "Odoo ERP System",

    filters: ["Odoo"],

    description:
      "A complete warehouse management solution for inventory tracking, stock movements, purchasing, sales and real-time reporting.",

    problem:
      "Manual inventory records made stock quantities, warehouse movements and operational reporting difficult to manage accurately.",

    solution:
      "I implemented a centralized Odoo ERP workflow covering purchasing, inventory, sales, stock transfers and warehouse reporting.",

    result:
      "Improved inventory visibility, organized stock operations and provided accurate real-time warehouse information.",

    technologies: [
      "Odoo",
      "Python",
      "PostgreSQL",
      "XML",
    ],

    liveUrl:
      "https://warehousedemo.aadplus.com",

    caseStudyUrl: "",

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=90",

    color: "#88b92f",
  },

  {
    title: "Restaurant ERP",

    category: "Restaurant Automation",

    filters: ["Odoo"],

    description:
      "An integrated restaurant system covering orders, point of sale, kitchen workflow, inventory and financial operations.",

    problem:
      "Restaurant orders, kitchen operations, stock and payments were handled through disconnected processes.",

    solution:
      "I created an integrated ERP environment connecting point of sale, kitchen orders, inventory, purchasing and accounting.",

    result:
      "Simplified daily restaurant operations and provided better visibility across orders, stock and financial activity.",

    technologies: [
      "Odoo",
      "Python",
      "POS",
      "PostgreSQL",
    ],

    liveUrl:
      "https://restaurantdemo.aadplus.com",

    caseStudyUrl: "",

    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90",

    color: "#ff7a50",
  },

  {
    title: "Laundry Management",

    category: "Custom ERP Development",

    filters: ["Odoo"],

    description:
      "A customized laundry platform with order processing, pickup and delivery, invoicing and customer tracking.",

    problem:
      "Laundry orders, garment tracking, pickup and delivery operations required one centralized management system.",

    solution:
      "I developed a custom Odoo solution for order processing, barcode tracking, invoicing, customer records and delivery workflows.",

    result:
      "Created an organized workflow from customer booking to final delivery while improving order and payment tracking.",

    technologies: [
      "Odoo",
      "JavaScript",
      "Python",
      "QWeb",
    ],

    liveUrl:
      "https://laundrydemo.aadplus.com",

    caseStudyUrl: "",

    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1400&q=90",

    color: "#7065ff",
  },

//   {
//     title: "Online Bookstore",

//     category: "Full Stack Website",

//     /*
//       One project can appear
//       inside multiple filters.
//     */
//     filters: ["Web", "API"],

//     description:
//       "A modern bookstore featuring product browsing, category filters, shopping cart, authentication and order management.",

//     problem:
//       "Customers needed a simple way to discover books, manage a shopping cart and place orders online.",

//     solution:
//       "I built a full-stack bookstore with product categories, search, authentication, cart management and REST API integration.",

//     result:
//       "Delivered a responsive shopping experience with organized product discovery and streamlined order management.",

//     technologies: [
//       "React",
//       "Django",
//       "CSS",
//       "REST API",
//     ],

//     liveUrl: "",

//     caseStudyUrl: "",

//     image:
//       "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1400&q=90",

//     color: "#ffcf56",
//   },

  {
  title: "Financial Management",

  category: "Financial & Business Management",

  filters: ["Web"],

  description:
    "A centralized financial management platform for tracking income, expenses, assets, liabilities, equity, salaries, inventory and business reports.",

  problem:
    "Financial records, salaries, stock information and business reporting were difficult to manage through disconnected manual processes.",

  solution:
    "I developed a role-based management system covering income and expenses, financial statements, assets, liabilities, equity, salary processing, attendance, inventory, ledgers and audit logs.",

  result:
    "Created one centralized dashboard where administrators can monitor financial performance, manage operational records and generate structured business reports.",

  technologies: [
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML5",
    "CSS3",
  ],

  liveUrl: "",
  caseStudyUrl: "",

  image: "/financial-1.jpg",

  gallery: [
    "/financial-1.jpg",
    "/financial-2.jpg",
    "/financial-3.jpg",
    "/financial-4.jpg",
  ],

  color: "#4f46e5",
},

{
  title: "OLPP Laptop Distribution & Repair Management",

  category: "Management System",

  filters: ["Web"],

  description:
    "A centralized management  laptop distribution, customer records, inventory tracking, replacements and repair issue handling.",

  problem:
    "Laptop distribution, customer records, repair tickets and inventory were difficult to manage through manual and disconnected processes.",

  solution:
    "I developed a web-based system for OLPP that manages laptop distribution, customer data, replacements, laptop summaries, reported issues, repair tracking and inventory management from one dashboard.",

  result:
    "Created a single operational platform where administrators can monitor distributed laptops, manage customers, track repairs and maintain organized inventory records.",

  technologies: [
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML5",
    "CSS3",
  ],

  liveUrl: "",

  caseStudyUrl: "",

  image: "/olpp-1.png",

  gallery: [
    "/olpp-1.png",
    "/olpp-2.png",
    "/olpp-3.png",
    
  ],

  color: "#57c84d",
},

//   {
//     title: "Parking Management",

//     category: "Management System",

//     filters: ["Web"],

//     description:
//       "A parking solution designed to manage vehicle entry, exit, available spaces, payments and operational records.",

//     problem:
//       "Manual parking records made it difficult to monitor vehicles, available spaces and customer payments.",

//     solution:
//       "I developed a management platform for vehicle entry and exit, space availability, payment records and operational reporting.",

//     result:
//       "Improved parking visibility and created an organized digital record of vehicles, availability and transactions.",

//     technologies: [
//       "Python",
//       "Django",
//       "JavaScript",
//       "MySQL",
//     ],

//     liveUrl: "",

//     caseStudyUrl: "",

//     image:
//       "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=90",

//     color: "#ff6b9d",
//   },
];


/* =========================================
   PROJECTS COMPONENT
========================================= */

function Projects() {
  const [activeFilter, setActiveFilter] =
    useState("All");


  /* =======================================
     FILTER PROJECTS
  ======================================= */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return featuredProjects;
    }

    return featuredProjects.filter((project) =>
      project.filters?.includes(activeFilter)
    );
  }, [activeFilter]);


  return (
    <section
      className="projects-section"
      id="projects"
    >
      <div className="projects-container">

        {/* ================================
            HEADING
        ================================= */}

        <div className="projects-heading">
          <SectionTitle
            number="03"
            label="Selected Case Studies"
            title="Projects built to create"
            highlight="real business results."
            description="Explore the problems, solutions and measurable value behind my selected ERP systems, websites and digital products."
          />

          <motion.a
            href="https://github.com/AhsanUddin200"
            target="_blank"
            rel="noreferrer"
            className="all-projects-link"
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
            }}
          >
            Explore GitHub

            <ArrowUpRight size={18} />
          </motion.a>
        </div>


        {/* ================================
            SMART FILTER
        ================================= */}

        <motion.div
          className="smart-project-filter"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.4,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="project-filter-label">
            <span className="filter-live-dot" />

            Filter work
          </div>

          <div className="project-filter-buttons">
            {projectFilters.map((filter) => {
              const isActive =
                activeFilter === filter;

              return (
                <button
                  type="button"
                  key={filter}
                  className={`project-smart-filter-btn ${
                    isActive
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                >
                  {isActive && (
                    <motion.span
                      className="project-filter-slider"
                      layoutId="project-filter-slider"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="project-filter-button-text">
                    {filter}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="project-filter-count">
            {String(
              filteredProjects.length
            ).padStart(2, "0")}
          </span>
        </motion.div>


        {/* ================================
            PROJECT GRID
        ================================= */}

        <motion.div
          layout
          className="modern-projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(
              (project, index) => (
                <motion.div
                  layout
                  key={project.title}
                  className="project-filter-card-wrapper"
                  initial={{
                    opacity: 0,
                    y: 28,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 18,
                    scale: 0.94,
                  }}
                  transition={{
                    layout: {
                      duration: 0.45,
                    },

                    opacity: {
                      duration: 0.3,
                    },

                    y: {
                      duration: 0.4,
                    },

                    scale: {
                      duration: 0.4,
                    },

                    delay:
                      index * 0.04,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>


        {/* ================================
            EMPTY FILTER
        ================================= */}

        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              className="project-filter-empty"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <span className="empty-filter-code">
                404
              </span>

              <div>
                <strong>
                  No {activeFilter} project
                  added yet.
                </strong>

                <p>
                  More projects will be added
                  to this category soon.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* ================================
            BOTTOM CTA
        ================================= */}

        <motion.div
          className="projects-bottom-note"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: false,
          }}
        >
          <span>
            Have a project in mind?
          </span>

          <a href="#contact">
            Let&apos;s build it together

            <ArrowUpRight size={18} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default Projects;