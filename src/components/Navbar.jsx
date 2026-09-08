import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowUpRight,
  Menu,
  X,
  Search,
} from "lucide-react";

import {
  navigationLinks,
  personalInfo,
} from "../data/portfolioData";

import BrandLogo from "./BrandLogo";

function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* ==============================
      CURRENT PAGE CHECK
  ============================== */

  const isHomePage =
    location.pathname === "/";

  const getNavigationHref = (
    href
  ) => {
    if (isHomePage) {
      return href;
    }

    return `/${href}`;
  };

  /* ==============================
      SCROLL NAVBAR
  ============================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 40
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ==============================
      HELPERS
  ============================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openCommandPalette =
    () => {
      window.dispatchEvent(
        new Event(
          "open-command-palette"
        )
      );
    };

  return (
    <motion.header
      className={`navbar ${
        scrolled
          ? "navbar-scrolled"
          : ""
      }`}
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      <div className="navbar-container">

        {/* =====================
            LOGO
        ====================== */}

        <BrandLogo
          onClick={closeMenu}
        />

        {/* =====================
            DESKTOP NAVIGATION
        ====================== */}

        <nav
          className="desktop-navigation"
          aria-label="Primary navigation"
        >
          {navigationLinks.map(
            (link) => (
              <a
                key={link.id}
                href={getNavigationHref(
                  link.href
                )}
              >
                <span>
                  0{link.id}
                </span>

                {link.name}
              </a>
            )
          )}
        </nav>

        {/* =====================
            RIGHT SIDE
        ====================== */}

        <div className="navbar-actions">

          {/* QUICK SEARCH */}

          <button
            type="button"
            className="navbar-command-btn"
            onClick={
              openCommandPalette
            }
            aria-label="Open quick search"
          >
            <Search size={14} />

            <span className="navbar-command-text">
              Quick Search
            </span>

            <kbd>
              Ctrl K
            </kbd>
          </button>

          {/* LET'S TALK */}

          <a
            href={`mailto:${personalInfo.email}`}
            className="navbar-contact-button"
            aria-label="Contact Ahsan Nasir by email"
          >
            <span>
              Let&apos;s Talk
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={2}
            />
          </a>
        </div>

        {/* =====================
            MOBILE MENU BUTTON
        ====================== */}

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={
            menuOpen
          }
          aria-controls="mobile-navigation-menu"
          onClick={() =>
            setMenuOpen(
              (currentValue) =>
                !currentValue
            )
          }
        >
          {menuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {/* =====================
          MOBILE NAVIGATION
      ====================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation-menu"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.35,
              ease:
                "easeInOut",
            }}
          >
            <div className="mobile-navigation-inner">

              {navigationLinks.map(
                (link) => (
                  <motion.a
                    key={
                      link.id
                    }
                    href={getNavigationHref(
                      link.href
                    )}
                    onClick={
                      closeMenu
                    }
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        link.id *
                        0.05,
                    }}
                  >
                    <span>
                      0{link.id}
                    </span>

                    <strong>
                      {
                        link.name
                      }
                    </strong>

                    <ArrowUpRight
                      size={18}
                    />
                  </motion.a>
                )
              )}

              {/* =====================
                  MOBILE QUICK SEARCH
              ====================== */}

              <button
                type="button"
                className="mobile-command-button"
                aria-label="Open quick search"
                onClick={() => {
                  closeMenu();

                  openCommandPalette();
                }}
              >
                <span className="mobile-command-icon">
                  <Search
                    size={17}
                  />
                </span>

                <strong>
                  Quick Search
                </strong>

                <kbd>
                  Ctrl K
                </kbd>
              </button>

              {/* =====================
                  MOBILE CTA
              ====================== */}

              <a
                href={`mailto:${personalInfo.email}`}
                className="mobile-contact-button"
                aria-label="Start a project with Ahsan Nasir"
                onClick={
                  closeMenu
                }
              >
                Start a Project

                <ArrowUpRight
                  size={18}
                />
              </a>

            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;