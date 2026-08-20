import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(
      new Event("open-command-palette")
    );
  };

  return (
    <motion.header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="navbar-container">
        {/* =====================
            LOGO
        ====================== */}

        <BrandLogo onClick={closeMenu} />

        {/* =====================
            DESKTOP NAVIGATION
        ====================== */}

        <nav className="desktop-navigation">
          {navigationLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
            >
              <span>0{link.id}</span>

              {link.name}
            </a>
          ))}
        </nav>

        {/* =====================
            RIGHT SIDE
        ====================== */}

        <div className="navbar-actions">
          {/* Quick Search */}

          <button
            type="button"
            className="navbar-command-btn"
            onClick={openCommandPalette}
            aria-label="Open Quick Search"
          >
            <Search size={14} />

            <span className="navbar-command-text">
              Quick Search
            </span>

            <kbd>Ctrl K</kbd>
          </button>

          {/* Let's Talk */}

          <a
            href={`mailto:${personalInfo.email}`}
            className="navbar-contact-button"
          >
            <span>Let&apos;s Talk</span>

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
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
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
            className="mobile-navigation"
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
              ease: "easeInOut",
            }}
          >
            <div className="mobile-navigation-inner">
              {navigationLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
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
                      link.id * 0.05,
                  }}
                >
                  <span>
                    0{link.id}
                  </span>

                  <strong>
                    {link.name}
                  </strong>

                  <ArrowUpRight
                    size={18}
                  />
                </motion.a>
              ))}

              {/* Mobile Quick Search */}

              <button
                type="button"
                className="mobile-command-button"
                onClick={() => {
                  closeMenu();
                  openCommandPalette();
                }}
              >
                <span className="mobile-command-icon">
                  <Search size={17} />
                </span>

                <strong>
                  Quick Search
                </strong>

                <kbd>
                  Ctrl K
                </kbd>
              </button>

              {/* Mobile CTA */}

              <a
                href={`mailto:${personalInfo.email}`}
                className="mobile-contact-button"
                onClick={closeMenu}
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