import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";


function SiteMotion() {
  const prefersReducedMotion =
    useReducedMotion();

  const {
    scrollYProgress,
  } = useScroll();

  const progressScale =
    useSpring(
      scrollYProgress,
      {
        stiffness: 180,
        damping: 30,
        mass: 0.22,
      }
    );

  const pointerX =
    useMotionValue(-100);

  const pointerY =
    useMotionValue(-100);

  const smoothPointerX =
    useSpring(
      pointerX,
      {
        stiffness: 260,
        damping: 32,
        mass: 0.18,
      }
    );

  const smoothPointerY =
    useSpring(
      pointerY,
      {
        stiffness: 260,
        damping: 32,
        mass: 0.18,
      }
    );

  const [
    isInteractive,
    setIsInteractive,
  ] = useState(false);


  useEffect(() => {
    const html =
      document.documentElement;

    html.classList.add(
      "site-motion-enabled"
    );


    /*
     * SECTION TITLE REVEAL
     *
     * Uses clip-path only, so it does not
     * fight with existing Framer Motion
     * translate/opacity animations.
     */
    const sectionTitles =
      document.querySelectorAll(
        ".section-title"
      );

    let revealObserver;

    if (
      "IntersectionObserver" in window
    ) {
      revealObserver =
        new IntersectionObserver(
          (entries) => {
            entries.forEach(
              (entry) => {
                if (
                  entry.isIntersecting
                ) {
                  entry.target.classList.add(
                    "motion-reveal-active"
                  );

                  revealObserver.unobserve(
                    entry.target
                  );
                }
              }
            );
          },
          {
            threshold: 0.18,
            rootMargin:
              "0px 0px -8% 0px",
          }
        );

      sectionTitles.forEach(
        (title) => {
          revealObserver.observe(
            title
          );
        }
      );
    } else {
      sectionTitles.forEach(
        (title) => {
          title.classList.add(
            "motion-reveal-active"
          );
        }
      );
    }


    if (prefersReducedMotion) {
      return () => {
        html.classList.remove(
          "site-motion-enabled"
        );

        if (revealObserver) {
          revealObserver.disconnect();
        }
      };
    }


    /*
     * CURSOR HALO
     */
    const handlePointerMove =
      (event) => {
        pointerX.set(
          event.clientX
        );

        pointerY.set(
          event.clientY
        );
      };


    const handlePointerOver =
      (event) => {
        const interactive =
          event.target.closest(
            [
              "a",
              "button",
              ".case-study-card",
              ".skill-card",
              ".experience-card",
              ".contact-method",
            ].join(",")
          );

        setIsInteractive(
          Boolean(interactive)
        );
      };


    /*
     * MAGNETIC BUTTONS
     *
     * CSS individual `translate`
     * property is used instead of
     * transform, so existing Framer
     * Motion transforms stay intact.
     */
    const magneticSelector = [
      ".hero-primary-button",
      ".hero-secondary-button",
      ".case-study-toggle",
      ".case-study-bottom-link",
      ".contact-submit-button",
      ".navbar-command-btn",
    ].join(",");


    const handleMagneticMove =
      (event) => {
        const element =
          event.target.closest(
            magneticSelector
          );

        if (!element) {
          return;
        }

        const rect =
          element.getBoundingClientRect();

        const centerX =
          rect.left +
          rect.width / 2;

        const centerY =
          rect.top +
          rect.height / 2;

        const offsetX =
          (
            event.clientX -
            centerX
          ) * 0.12;

        const offsetY =
          (
            event.clientY -
            centerY
          ) * 0.12;

        element.style.translate =
          `${offsetX}px ${offsetY}px`;
      };


    const handleMagneticOut =
      (event) => {
        const element =
          event.target.closest(
            magneticSelector
          );

        if (!element) {
          return;
        }

        if (
          event.relatedTarget &&
          element.contains(
            event.relatedTarget
          )
        ) {
          return;
        }

        element.style.translate =
          "0 0";
      };


    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    document.addEventListener(
      "pointerover",
      handlePointerOver
    );

    document.addEventListener(
      "pointermove",
      handleMagneticMove,
      {
        passive: true,
      }
    );

    document.addEventListener(
      "pointerout",
      handleMagneticOut
    );


    return () => {
      html.classList.remove(
        "site-motion-enabled"
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "pointerover",
        handlePointerOver
      );

      document.removeEventListener(
        "pointermove",
        handleMagneticMove
      );

      document.removeEventListener(
        "pointerout",
        handleMagneticOut
      );

      if (revealObserver) {
        revealObserver.disconnect();
      }
    };
  }, [
    pointerX,
    pointerY,
    prefersReducedMotion,
  ]);


  return (
    <>
      {/* =================================
          SCROLL PROGRESS
      ================================== */}

      <motion.div
        className="site-scroll-progress"
        style={{
          scaleX:
            progressScale,
        }}
        aria-hidden="true"
      />


      {/* =================================
          CINEMATIC AMBIENT BACKGROUND
          Lightweight alternative to
          a heavy autoplay video.
      ================================== */}

      {!prefersReducedMotion && (
        <div
          className="site-motion-backdrop"
          aria-hidden="true"
        >
          <motion.span
            className="site-motion-orb site-motion-orb-a"
            animate={{
              x: [
                "0%",
                "28%",
                "-12%",
                "0%",
              ],
              y: [
                "0%",
                "18%",
                "34%",
                "0%",
              ],
              scale: [
                1,
                1.14,
                0.94,
                1,
              ],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className="site-motion-orb site-motion-orb-b"
            animate={{
              x: [
                "0%",
                "-26%",
                "18%",
                "0%",
              ],
              y: [
                "0%",
                "-18%",
                "22%",
                "0%",
              ],
              scale: [
                1.08,
                0.96,
                1.16,
                1.08,
              ],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="site-motion-grid" />
        </div>
      )}


      {/* =================================
          SOFT CURSOR HALO
      ================================== */}

      {!prefersReducedMotion && (
        <motion.div
          className={`site-cursor-halo ${
            isInteractive
              ? "site-cursor-halo-active"
              : ""
          }`}
          style={{
            x: smoothPointerX,
            y: smoothPointerY,
          }}
          animate={{
            scale:
              isInteractive
                ? 1.75
                : 1,
            opacity:
              isInteractive
                ? 0.78
                : 0.38,
          }}
          transition={{
            duration: 0.18,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}


export default SiteMotion;
