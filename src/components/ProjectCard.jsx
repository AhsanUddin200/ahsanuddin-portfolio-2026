import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowUpRight,
  Eye,
  ChevronDown,
  Target,
  Lightbulb,
  TrendingUp,
  Images,
} from "lucide-react";

function ProjectCard({
  project,
  index,
}) {
  const [
    caseStudyOpen,
    setCaseStudyOpen,
  ] = useState(false);

  const [
    isImageHovered,
    setIsImageHovered,
  ] = useState(false);

  const [
    activeImageIndex,
    setActiveImageIndex,
  ] = useState(0);

  const {
    title,
    category,
    description,
    problem,
    solution,
    result,
    technologies = [],
    liveUrl,
    caseStudyUrl,
    image,
    gallery = [],
    color = "#c8ff45",
  } = project;

  const projectNumber = String(
    index + 1
  ).padStart(2, "0");

  /*
   * If gallery exists:
   * use gallery images.
   *
   * Otherwise:
   * use normal project image only.
   */

  const projectImages =
    useMemo(() => {
      if (
        Array.isArray(gallery) &&
        gallery.length > 0
      ) {
        return gallery;
      }

      return image
        ? [image]
        : [];
    }, [gallery, image]);

  /*
   * Hover image slideshow.
   *
   * First image remains visible normally.
   * On hover images start changing.
   */

  useEffect(() => {
    if (
      !isImageHovered ||
      projectImages.length <= 1
    ) {
      setActiveImageIndex(0);

      return undefined;
    }

    const imageInterval =
      setInterval(() => {
        setActiveImageIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            projectImages.length
        );
      }, 1300);

    return () => {
      clearInterval(
        imageInterval
      );
    };
  }, [
    isImageHovered,
    projectImages.length,
  ]);

  /*
   * VIEW CASE STUDY
   *
   * Always opens/closes the
   * quick case-study details.
   *
   * Full case-study page is
   * available inside the
   * expanded section.
   */

  const handleCaseStudyClick =
    () => {
      setCaseStudyOpen(
        (currentValue) =>
          !currentValue
      );
    };

  return (
    <motion.article
      className={`case-study-card ${
        caseStudyOpen
          ? "case-study-card-open"
          : ""
      }`}
      initial={{
        opacity: 0,
        y: 55,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.12,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      style={{
        "--project-accent":
          color,
      }}
    >
      {/* =====================================
          PROJECT IMAGE
      ====================================== */}

      <div
        className="case-study-image"
        onMouseEnter={() =>
          setIsImageHovered(
            true
          )
        }
        onMouseLeave={() =>
          setIsImageHovered(
            false
          )
        }
      >
        {/* IMAGE SLIDESHOW */}

        <AnimatePresence mode="wait">
          {projectImages.length >
            0 && (
            <motion.img
              key={
                projectImages[
                  activeImageIndex
                ]
              }
              src={
                projectImages[
                  activeImageIndex
                ]
              }
              alt={`${title} ${category} case study by Ahsan Nasir`}
              loading="lazy"
              decoding="async"
              className="case-study-gallery-image"
              initial={{
                opacity: 0,
                scale: 1.04,
              }}
              animate={{
                opacity: 1,
                scale:
                  caseStudyOpen
                    ? 1.06
                    : 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.025,
              }}
              transition={{
                opacity: {
                  duration: 0.38,
                },

                scale: {
                  duration: 0.6,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                },
              }}
            />
          )}
        </AnimatePresence>

        <div className="case-study-image-overlay" />

        <div className="case-study-image-grid" />

        {/* IMAGE HEADER */}

        <div className="case-study-image-header">
          <span className="case-study-number">
            {projectNumber}
          </span>

          <span className="case-study-category">
            {category}
          </span>
        </div>

        {/* =================================
            MULTI IMAGE INDICATOR
        ================================== */}

        {projectImages.length >
          1 && (
          <>
            <motion.div
              className="case-study-gallery-label"
              initial={false}
              animate={{
                opacity:
                  isImageHovered
                    ? 1
                    : 0.72,
              }}
            >
              <Images
                size={13}
              />

              <span>
                {isImageHovered
                  ? "Previewing"
                  : `${projectImages.length} Screens`}
              </span>
            </motion.div>

            <div className="case-study-gallery-dots">
              {projectImages.map(
                (
                  _,
                  imageIndex
                ) => (
                  <span
                    key={
                      imageIndex
                    }
                    className={`case-study-gallery-dot ${
                      imageIndex ===
                      activeImageIndex
                        ? "active"
                        : ""
                    }`}
                  />
                )
              )}
            </div>
          </>
        )}

        {/* LIVE PROJECT BUTTON */}

        {liveUrl && (
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="case-study-live-button"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >
            <Eye
              size={15}
            />

            Live Project
          </motion.a>
        )}

        {/* IMAGE TITLE */}

        <div className="case-study-image-title">
          <span>
            SELECTED CASE STUDY
          </span>

          <div className="case-study-image-heading">
            {title}
          </div>
        </div>
      </div>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div className="case-study-main-content">
        <div className="case-study-title-row">
          <div>
            <span className="case-study-label">
              PROJECT /{" "}
              {projectNumber}
            </span>

            <h3>
              {title}
            </h3>
          </div>

          {liveUrl ? (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="case-study-arrow"
              aria-label={`Open ${title}`}
              whileHover={{
                rotate: 45,
                scale: 1.06,
              }}
            >
              <ArrowUpRight
                size={21}
              />
            </motion.a>
          ) : (
            <span className="case-study-arrow disabled">
              <ArrowUpRight
                size={21}
              />
            </span>
          )}
        </div>

        {/* DESCRIPTION */}

        <p className="case-study-description">
          {description}
        </p>

        {/* TECHNOLOGIES */}

        <div className="case-study-technologies">
          {technologies.map(
            (
              technology
            ) => (
              <span
                key={
                  technology
                }
              >
                {technology}
              </span>
            )
          )}
        </div>

        {/* ACTIONS */}

        <div className="case-study-actions">
          <button
            type="button"
            className="case-study-toggle"
            aria-expanded={
              caseStudyOpen
            }
            onClick={
              handleCaseStudyClick
            }
          >
            <span>
              {caseStudyOpen
                ? "Close Case Study"
                : "View Case Study"}
            </span>

            <motion.span
              animate={{
                rotate:
                  caseStudyOpen
                    ? 180
                    : 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <ChevronDown
                size={18}
              />
            </motion.span>
          </button>

          <span className="case-study-status">
            <i />

            {liveUrl
              ? "LIVE PROJECT"
              : "DEVELOPMENT PROJECT"}
          </span>
        </div>

        {/* =================================
            EXPANDABLE CASE STUDY
        ================================== */}

        <AnimatePresence
          initial={false}
        >
          {caseStudyOpen && (
            <motion.div
              className="case-study-details"
              initial={{
                opacity: 0,
                height: 0,
                marginTop: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                marginTop: 24,
              }}
              exit={{
                opacity: 0,
                height: 0,
                marginTop: 0,
              }}
              transition={{
                duration: 0.5,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              {/* CHALLENGE */}

              <div className="case-study-detail-item problem">
                <div className="case-study-detail-icon">
                  <Target
                    size={19}
                  />
                </div>

                <div>
                  <span>
                    01 / CHALLENGE
                  </span>

                  <h4>
                    Client Problem
                  </h4>

                  <p>
                    {problem}
                  </p>
                </div>
              </div>

              {/* SOLUTION */}

              <div className="case-study-detail-item solution">
                <div className="case-study-detail-icon">
                  <Lightbulb
                    size={19}
                  />
                </div>

                <div>
                  <span>
                    02 / EXECUTION
                  </span>

                  <h4>
                    Solution I Built
                  </h4>

                  <p>
                    {solution}
                  </p>
                </div>
              </div>

              {/* RESULT */}

              <div className="case-study-detail-item result">
                <div className="case-study-detail-icon">
                  <TrendingUp
                    size={19}
                  />
                </div>

                <div>
                  <span>
                    03 / OUTCOME
                  </span>

                  <h4>
                    Business Result
                  </h4>

                  <p>
                    {result}
                  </p>
                </div>
              </div>

              {/* FULL CASE STUDY */}

              {caseStudyUrl && (
                <Link
                  to={
                    caseStudyUrl
                  }
                  className="case-study-bottom-link"
                >
                  View Full Case Study

                  <ArrowUpRight
                    size={18}
                  />
                </Link>
              )}

              {/* LIVE LINK */}

              {liveUrl && (
                <a
                  href={
                    liveUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="case-study-bottom-link"
                >
                  Visit Live Project

                  <ArrowUpRight
                    size={18}
                  />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default ProjectCard;