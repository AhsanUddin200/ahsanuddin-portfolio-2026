import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Quote,
  CalendarDays,
  FolderKanban,
} from "lucide-react";

const testimonials = [
  {
    id: 1,

    name: "Henra Kentry",

    role: "Haed of Finance & Accounting",

    company: "Darli X",

    project:
      "Financial Management System",

    date: "Dec 2024 — Feb 2025",

    avatar:
      "/henra-kentry.jpg",

    projectImage:
      "/financial-1.jpg",

    quote:
      "We were previously using local accounting methods and several processes were handled manually. This system made everything much easier. The interface is user-friendly, the important information is clearly visible, and I can manage the work without going through complicated steps.",
  },

  {
    id: 2,

    name: "Rehan Allah Wala",

    role: "CEO Rehan Foundation",

    company: "Rehan Foundation",

    project:
      "OLPP Laptop Management System",

    date: "November 2024 — December 2024",

    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFh6jGlihMRW5NdOHbA0k_qsS3bvHUJzSpmEMj8HiHbw&s=10",

    projectImage:
      "/olpp-1.png",

    quote:
      "The platform gave us one place to manage laptop distribution, customer information, replacements, reported issues and repair activity. It made the overall workflow much more organized and easier to monitor.",
  },

  {
    id: 3,

    name: "Daniel Morgan",

    role: "Warehouse Operations Manager",

    company: "Business Client",

    project:
      "Warehouse ERP",

    date: "February 2026",

    avatar:
      "https://i.pravatar.cc/300?img=12",

    projectImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=90",

    quote:
      "The warehouse ERP gave our team much better visibility over inventory, purchasing and stock movements. Daily operations became more structured and we can now access important information from one system.",
  },

  {
    id: 4,

    name: "Sarah Collins",

    role: "Business Development",

    company: "AADPlus",

    project:
      "AADPlus Corporate Website",

    date: "July 2026",

    avatar:
      "https://i.pravatar.cc/300?img=32",

    projectImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=90",

    quote:
      "The new website presents our services in a much clearer and more professional way. Navigation is straightforward, the mobile experience is strong, and clients can understand our solutions much faster.",
  },

  {
    id: 5,

    name: "Michael Ross",

    role: "Restaurant Operations",

    company: "Business Client",

    project:
      "Restaurant ERP",

    date: "March 2026",

    avatar:
      "https://i.pravatar.cc/300?img=11",

    projectImage:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=90",

    quote:
      "Connecting restaurant orders, inventory and operational activity in one system has made daily management much easier. The workflow is practical and our team can access what they need without unnecessary complexity.",
  },

  {
    id: 6,

    name: "Ahmed Raza",

    role: "Operations Supervisor",

    company: "Laundry Business",

    project:
      "Laundry Management System",

    date: "May 2026",

    avatar:
      "https://i.pravatar.cc/300?img=15",

    projectImage:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=900&q=90",

    quote:
      "The laundry system improved the way we handle orders, customers, payments and delivery activity. Everything feels more organized and the team has a clearer view of each order throughout the process.",
  },
];


function Testimonials() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);


  const nextSlide = () => {
    setActiveIndex(
      (current) =>
        (current + 1) %
        testimonials.length
    );
  };


  const previousSlide = () => {
    setActiveIndex(
      (current) =>
        (current -
          1 +
          testimonials.length) %
        testimonials.length
    );
  };


  /* =========================================
     AUTO PLAY
     Stops immediately while user is hovering.
  ========================================= */

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) %
          testimonials.length
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused]);


  const testimonial =
    testimonials[activeIndex];


  return (
    <section
      className="client-testimonials-section"
      id="testimonials"
    >
      <div className="container">

        {/* =================================
            COMPACT HEADING
        ================================= */}

        <motion.div
          className="client-testimonials-heading"
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div>
            <span className="client-testimonials-label">
              05 / CLIENT STORIES
            </span>

            <h2>
              Built for businesses.
              <em> Valued by people.</em>
            </h2>
          </div>

          <p>
            Real feedback from projects
            designed around practical
            business problems.
          </p>
        </motion.div>


        {/* =================================
            MAIN SLIDER
        ================================= */}

        <motion.div
          className={`client-testimonial-shell ${
            isPaused
              ? "testimonial-paused"
              : ""
          }`}
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
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
          }}
        >

          {/* PAUSE STATUS */}

          <div className="testimonial-play-status">
            <span />

            {isPaused
              ? "PAUSED"
              : "AUTO PLAY"}
          </div>


          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={testimonial.id}
              className="client-testimonial-card"

              initial={{
                opacity: 0,
                x: 28,
                filter: "blur(5px)",
              }}

              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}

              exit={{
                opacity: 0,
                x: -28,
                filter: "blur(4px)",
              }}

              transition={{
                duration: 0.4,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              {/* ===========================
                  CLIENT
              ============================ */}

              <div className="testimonial-client">

                <div className="testimonial-client-top">

                  <div className="testimonial-avatar-ring">

                    <img
                      src={
                        testimonial.avatar
                      }
                      alt={
                        testimonial.name
                      }
                    />

                    <span className="testimonial-online-dot" />

                  </div>


                  <div className="testimonial-client-name">

                    <strong>
                      {testimonial.name}
                    </strong>

                    <span>
                      {testimonial.role}
                    </span>

                    <small>
                      {
                        testimonial.company
                      }
                    </small>

                  </div>

                </div>


                <div className="testimonial-verified">
                  <span>✓</span>

                  CLIENT FEEDBACK
                </div>

              </div>


              {/* ===========================
                  QUOTE
              ============================ */}

              <div className="testimonial-copy">

                <Quote
                  className="testimonial-big-quote"
                  size={26}
                  strokeWidth={1.5}
                />

                <p>
                  “{testimonial.quote}”
                </p>


                <div className="testimonial-meta">

                  <span>
                    <FolderKanban
                      size={13}
                    />

                    {
                      testimonial.project
                    }
                  </span>


                  <span>
                    <CalendarDays
                      size={13}
                    />

                    {testimonial.date}
                  </span>

                </div>

              </div>


              {/* ===========================
                  PROJECT PREVIEW
              ============================ */}

              <div className="testimonial-project">

                <div className="testimonial-project-image">

                  <img
                    src={
                      testimonial.projectImage
                    }
                    alt={
                      testimonial.project
                    }
                  />

                  <div className="testimonial-project-overlay" />

                  <span>
                    PROJECT
                  </span>

                </div>


                <div className="testimonial-project-name">

                  <small>
                    DELIVERED PROJECT
                  </small>

                  <strong>
                    {
                      testimonial.project
                    }
                  </strong>

                </div>

              </div>

            </motion.div>
          </AnimatePresence>


          {/* =================================
              BOTTOM BAR
          ================================= */}

          <div className="testimonial-bottom-bar">

            {/* CLIENT SELECTOR */}

            <div className="testimonial-client-selector">

              {testimonials.map(
                (item, index) => (
                  <button
                    key={item.id}
                    type="button"

                    className={`testimonial-selector-item ${
                      activeIndex ===
                      index
                        ? "active"
                        : ""
                    }`}

                    onMouseEnter={() => {
                      setIsPaused(
                        true
                      );

                      setActiveIndex(
                        index
                      );
                    }}

                    onMouseLeave={() =>
                      setIsPaused(
                        false
                      )
                    }

                    onClick={() =>
                      setActiveIndex(
                        index
                      )
                    }

                    aria-label={`View ${item.name}'s testimonial`}
                  >

                    <img
                      src={
                        item.avatar
                      }
                      alt=""
                    />

                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                  </button>
                )
              )}

            </div>


            {/* ARROWS */}

            <div className="testimonial-arrows">

              <button
                type="button"
                onClick={
                  previousSlide
                }
                aria-label="Previous testimonial"
              >
                <ArrowLeft
                  size={16}
                />
              </button>


              <span>
                {String(
                  activeIndex + 1
                ).padStart(
                  2,
                  "0"
                )}

                <i>/</i>

                {String(
                  testimonials.length
                ).padStart(
                  2,
                  "0"
                )}
              </span>


              <button
                type="button"
                onClick={
                  nextSlide
                }
                aria-label="Next testimonial"
              >
                <ArrowRight
                  size={16}
                />
              </button>

            </div>

          </div>


          {/* =================================
              AUTO PLAY PROGRESS
          ================================= */}

          {!isPaused && (
            <motion.div
              key={`progress-${activeIndex}`}
              className="testimonial-progress"

              initial={{
                scaleX: 0,
              }}

              animate={{
                scaleX: 1,
              }}

              transition={{
                duration: 5,
                ease: "linear",
              }}
            />
          )}

        </motion.div>

      </div>
    </section>
  );
}

export default Testimonials;