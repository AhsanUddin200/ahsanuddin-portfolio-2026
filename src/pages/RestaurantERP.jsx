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
    const pageTitle =
      "Restaurant ERP Case Study | Odoo Developer Ahsan Nasir";

    const pageDescription =
      "Explore an Odoo restaurant ERP covering POS, kitchen workflow, inventory, purchasing, accounting and restaurant order management.";

    const pageUrl =
      "https://ahsannasir.runs-on.dev/projects/restaurant-erp";

    const pageImage =
      "https://ahsannasir.runs-on.dev/restaurant-1.jpg";

    const originalTitle =
      document.title;

    const restoreActions = [];

    const setMeta = (
      selector,
      attributeName,
      attributeValue,
      content
    ) => {
      let element =
        document.head.querySelector(
          selector
        );

      const existed =
        Boolean(element);

      const previousContent =
        element?.getAttribute(
          "content"
        );

      if (!element) {
        element =
          document.createElement(
            "meta"
          );

        element.setAttribute(
          attributeName,
          attributeValue
        );

        document.head.appendChild(
          element
        );
      }

      element.setAttribute(
        "content",
        content
      );

      restoreActions.push(() => {
        if (!existed) {
          element.remove();
          return;
        }

        if (previousContent === null) {
          element.removeAttribute(
            "content"
          );
        } else {
          element.setAttribute(
            "content",
            previousContent
          );
        }
      });
    };

    const setCanonical = () => {
      let canonical =
        document.head.querySelector(
          'link[rel="canonical"]'
        );

      const existed =
        Boolean(canonical);

      const previousHref =
        canonical?.getAttribute(
          "href"
        );

      if (!canonical) {
        canonical =
          document.createElement(
            "link"
          );

        canonical.setAttribute(
          "rel",
          "canonical"
        );

        document.head.appendChild(
          canonical
        );
      }

      canonical.setAttribute(
        "href",
        pageUrl
      );

      restoreActions.push(() => {
        if (!existed) {
          canonical.remove();
          return;
        }

        if (previousHref === null) {
          canonical.removeAttribute(
            "href"
          );
        } else {
          canonical.setAttribute(
            "href",
            previousHref
          );
        }
      });
    };

    document.title =
      pageTitle;

    setMeta(
      'meta[name="description"]',
      "name",
      "description",
      pageDescription
    );

    setMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      "article"
    );

    setMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      pageTitle
    );

    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      pageDescription
    );

    setMeta(
      'meta[property="og:url"]',
      "property",
      "og:url",
      pageUrl
    );

    setMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      pageImage
    );

    setMeta(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt",
      "Restaurant ERP Management System case study by Ahsan Nasir"
    );

    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      pageTitle
    );

    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      pageDescription
    );

    setMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      pageImage
    );

    setMeta(
      'meta[name="twitter:image:alt"]',
      "name",
      "twitter:image:alt",
      "Restaurant ERP Management System case study by Ahsan Nasir"
    );

    setCanonical();

    const existingSchema =
      document.getElementById(
        "restaurant-erp-seo-schema"
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema =
      document.createElement(
        "script"
      );

    schema.id =
      "restaurant-erp-seo-schema";

    schema.type =
      "application/ld+json";

    schema.textContent =
      JSON.stringify({
        "@context":
          "https://schema.org",

        "@graph": [
          {
            "@type": "WebPage",
            "@id":
              `${pageUrl}#webpage`,
            url: pageUrl,
            name: pageTitle,
            description:
              pageDescription,
            isPartOf: {
              "@id":
                "https://ahsannasir.runs-on.dev/#website",
            },
            author: {
              "@id":
                "https://ahsannasir.runs-on.dev/#person",
            },
            about: {
              "@id":
                `${pageUrl}#project`,
            },
          },
          {
            "@type":
              "CreativeWork",
            "@id":
              `${pageUrl}#project`,
            name:
              "Restaurant ERP Management System",
            description:
              "An integrated Odoo restaurant management system connecting point of sale, dine-in operations, kitchen workflows, menu products and inventory.",
            url: pageUrl,
            image: pageImage,
            creator: {
              "@id":
                "https://ahsannasir.runs-on.dev/#person",
            },
            keywords:
              ["Odoo ERP", "Restaurant ERP", "Odoo POS", "Restaurant Management", "Python", "PostgreSQL", "Business Automation"],
          },
          {
            "@type":
              "BreadcrumbList",
            itemListElement: [
              {
                "@type":
                  "ListItem",
                position: 1,
                name:
                  "Ahsan Nasir Portfolio",
                item:
                  "https://ahsannasir.runs-on.dev/",
              },
              {
                "@type":
                  "ListItem",
                position: 2,
                name:
                  "Projects",
                item:
                  "https://ahsannasir.runs-on.dev/#projects",
              },
              {
                "@type":
                  "ListItem",
                position: 3,
                name:
                  "Restaurant ERP Management System",
                item: pageUrl,
              },
            ],
          },
        ],
      });

    document.head.appendChild(
      schema
    );

    window.scrollTo(0, 0);

    return () => {
      document.title =
        originalTitle;

      schema.remove();

      restoreActions
        .reverse()
        .forEach(
          (restore) =>
            restore()
        );
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