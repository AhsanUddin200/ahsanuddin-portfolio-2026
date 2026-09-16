import { useEffect } from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChefHat,
  Database,
  PackageCheck,
  ReceiptText,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

function RestaurantERP() {
  useEffect(() => {
    document.title =
      "Restaurant ERP Case Study | Odoo Developer Ahsan Nasir";

    const description =
      "Explore a Restaurant ERP case study by Ahsan Nasir covering Odoo POS, restaurant floor management, kitchen workflows, inventory, purchasing and business automation.";

    const metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description
      );
    }

    const canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (canonical) {
      canonical.setAttribute(
        "href",
        "https://ahsanuddin-portfolio-2026.vercel.app/projects/restaurant-erp"
      );
    }

    window.scrollTo(0, 0);

    return () => {
      document.title =
        "Ahsan Nasir Portfolio | Software Engineer & Odoo Developer";

      if (canonical) {
        canonical.setAttribute(
          "href",
          "https://ahsanuddin-portfolio-2026.vercel.app/"
        );
      }
    };
  }, []);

  const features = [
    {
      icon: ShoppingCart,
      title: "Restaurant POS",
      text: "Restaurant ordering and payment workflows managed through an integrated Odoo Point of Sale environment.",
    },
    {
      icon: UtensilsCrossed,
      title: "Floor & Table Management",
      text: "Restaurant floors and table layouts support organized dine-in operations and table-based ordering.",
    },
    {
      icon: ChefHat,
      title: "Kitchen Workflow",
      text: "Structured order flow helps coordinate restaurant ordering with kitchen preparation.",
    },
    {
      icon: PackageCheck,
      title: "Menu & Inventory",
      text: "Food and drinks categories connect restaurant menu products with operational stock management.",
    },
  ];

  const technologies = [
    "Odoo ERP",
    "Odoo POS",
    "Python",
    "PostgreSQL",
    "Restaurant Management",
  ];

  const screenshots = [
    {
      src: "/restaurant-1.jpg",
      title: "Restaurant Floor Layout",
      alt: "Restaurant ERP floor and table layout",
    },
    {
      src: "/restaurant-2.jpg",
      title: "Food POS Category",
      alt: "Restaurant ERP food point of sale category",
    },
    {
      src: "/restaurant-3.jpg",
      title: "Drinks POS Category",
      alt: "Restaurant ERP drinks point of sale category",
    },
    {
      src: "/restaurant-4.jpg",
      title: "Restaurant Menu Product",
      alt: "Restaurant ERP menu product",
    },
  ];

  return (
    <article className="warehouse-case-study">
      <div className="warehouse-case-glow warehouse-case-glow-one" />
      <div className="warehouse-case-glow warehouse-case-glow-two" />

      <div className="warehouse-case-container">

        {/* BACK */}

        <a
          href="/#projects"
          className="warehouse-back-link"
        >
          <ArrowLeft size={17} />
          Back to Projects
        </a>

        {/* HERO */}

        <header className="warehouse-case-hero">
          <div className="warehouse-case-label">
            <span />
            ODOO ERP CASE STUDY
          </div>

          <h1>
            Restaurant ERP
            <span> Management System</span>
          </h1>

          <p className="warehouse-case-intro">
            An integrated Odoo restaurant
            management system designed to connect
            point of sale, dine-in operations,
            kitchen workflows, menu products,
            inventory and business operations
            inside one centralized environment.
          </p>

          <div className="warehouse-case-actions">
            <a
              href="https://restaurantdemo.aadplus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="warehouse-primary-btn"
            >
              View Live Demo

              <ArrowUpRight
                size={18}
              />
            </a>

            <a
              href="/#contact"
              className="warehouse-secondary-btn"
            >
              Discuss an ERP Project
            </a>
          </div>

          <div className="warehouse-case-meta">
            <div>
              <small>
                ROLE
              </small>

              <strong>
                Odoo ERP Developer
              </strong>
            </div>

            <div>
              <small>
                PROJECT TYPE
              </small>

              <strong>
                Restaurant ERP & POS
              </strong>
            </div>

            <div>
              <small>
                FOCUS
              </small>

              <strong>
                Restaurant Automation
              </strong>
            </div>
          </div>
        </header>

        {/* OVERVIEW */}

        <section className="warehouse-case-section">
          <span className="warehouse-section-number">
            01
          </span>

          <div className="warehouse-section-content">
            <p className="warehouse-section-label">
              PROJECT OVERVIEW
            </p>

            <h2>
              Connecting restaurant operations
              <span>
                {" "}
                in one ERP environment.
              </span>
            </h2>

            <p>
              The system brings restaurant
              point of sale, floors and tables,
              menu categories, products and
              operational workflows into one
              structured Odoo environment.
            </p>
          </div>
        </section>

        {/* PROBLEM / SOLUTION / RESULT */}

        <section className="warehouse-story-grid">

          <article className="warehouse-story-card">
            <span>
              01
            </span>

            <h3>
              The Problem
            </h3>

            <p>
              Restaurant orders, tables,
              kitchen preparation, menu products
              and stock can become difficult
              to manage through disconnected
              processes.
            </p>
          </article>

          <article className="warehouse-story-card">
            <span>
              02
            </span>

            <h3>
              The Solution
            </h3>

            <p>
              I implemented an integrated Odoo
              restaurant environment combining
              Point of Sale, restaurant floors,
              tables, menu categories and
              operational workflows.
            </p>
          </article>

          <article className="warehouse-story-card">
            <span>
              03
            </span>

            <h3>
              The Result
            </h3>

            <p>
              The system provides a structured
              restaurant workflow with
              centralized ordering, table
              operations, menu data and business
              information.
            </p>
          </article>

        </section>

        {/* FEATURES */}

        <section className="warehouse-features-section">

          <div className="warehouse-feature-heading">
            <div>
              <p className="warehouse-section-label">
                CORE CAPABILITIES
              </p>

              <h2>
                Built around real
                <span>
                  {" "}
                  restaurant workflows.
                </span>
              </h2>
            </div>

            <UtensilsCrossed
              size={42}
            />
          </div>

          <div className="warehouse-feature-grid">
            {features.map(
              (feature) => {
                const Icon =
                  feature.icon;

                return (
                  <article
                    key={
                      feature.title
                    }
                    className="warehouse-feature-card"
                  >
                    <div className="warehouse-feature-icon">
                      <Icon
                        size={23}
                      />
                    </div>

                    <h3>
                      {
                        feature.title
                      }
                    </h3>

                    <p>
                      {
                        feature.text
                      }
                    </p>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* SYSTEM PREVIEW */}

        <section className="warehouse-features-section">

          <div className="warehouse-feature-heading">
            <div>
              <p className="warehouse-section-label">
                SYSTEM PREVIEW
              </p>

              <h2>
                Inside the
                <span>
                  {" "}
                  Restaurant ERP.
                </span>
              </h2>
            </div>

            <ReceiptText
              size={42}
            />
          </div>

          <div className="restaurant-preview-grid">
            {screenshots.map(
              (
                screenshot,
                index
              ) => (
                <figure
                  key={
                    screenshot.src
                  }
                  className="restaurant-preview-card"
                >
                  <div className="restaurant-preview-image">
                    <img
                      src={
                        screenshot.src
                      }
                      alt={
                        screenshot.alt
                      }
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <figcaption>
                    <span>
                      0{index + 1}
                    </span>

                    {
                      screenshot.title
                    }
                  </figcaption>
                </figure>
              )
            )}
          </div>
        </section>

        {/* TECHNOLOGY */}

        <section className="warehouse-tech-section">
          <div>
            <Database
              size={24}
            />

            <span>
              TECHNOLOGY STACK
            </span>
          </div>

          <div className="warehouse-tech-list">
            {technologies.map(
              (
                technology
              ) => (
                <span
                  key={
                    technology
                  }
                >
                  <CheckCircle2
                    size={15}
                  />

                  {technology}
                </span>
              )
            )}
          </div>
        </section>

        {/* CTA */}

        <section className="warehouse-case-cta">
          <span>
            NEED A RESTAURANT ERP?
          </span>

          <h2>
            Want to connect restaurant
            operations in one system?
          </h2>

          <p>
            I build practical Odoo ERP
            and POS solutions around real
            restaurant workflows and
            business requirements.
          </p>

          <a
            href="/#contact"
            className="warehouse-primary-btn"
          >
            Start a Project

            <ArrowUpRight
              size={18}
            />
          </a>
        </section>

      </div>
    </article>
  );
}

export default RestaurantERP;