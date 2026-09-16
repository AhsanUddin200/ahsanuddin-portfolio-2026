import { useEffect } from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Database,
  PackageCheck,
  ShoppingCart,
  Workflow,
} from "lucide-react";

function WarehouseERP() {
  useEffect(() => {
    const pageTitle =
      "Warehouse ERP Case Study | Odoo Developer Ahsan Nasir";

    const pageDescription =
      "See how Ahsan Nasir built an Odoo warehouse ERP for inventory tracking, stock movements, purchasing, sales and real-time reporting.";

    const pageUrl =
      "https://ahsannasir.runs-on.dev/projects/warehouse-erp";

    const pageImage =
      "https://ahsannasir.runs-on.dev/og-image.jpg";

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
      "Warehouse ERP Management System case study by Ahsan Nasir"
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
      "Warehouse ERP Management System case study by Ahsan Nasir"
    );

    setCanonical();

    const existingSchema =
      document.getElementById(
        "warehouse-erp-seo-schema"
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema =
      document.createElement(
        "script"
      );

    schema.id =
      "warehouse-erp-seo-schema";

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
              "Warehouse ERP Management System",
            description:
              "A centralized Odoo ERP solution for warehouse inventory, purchasing, sales, stock transfers and operational reporting.",
            url: pageUrl,
            image: pageImage,
            creator: {
              "@id":
                "https://ahsannasir.runs-on.dev/#person",
            },
            keywords:
              ["Odoo ERP", "Warehouse Management", "Inventory Management", "Python", "PostgreSQL", "Business Automation"],
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
                  "Warehouse ERP Management System",
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
      icon: Boxes,
      title: "Inventory Management",
      text: "Centralized stock tracking across warehouse operations.",
    },
    {
      icon: ShoppingCart,
      title: "Purchasing",
      text: "Structured purchase workflows connected directly with inventory.",
    },
    {
      icon: PackageCheck,
      title: "Stock Transfers",
      text: "Organized internal movements and warehouse transfers.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Reporting",
      text: "Clear operational visibility through accurate ERP reporting.",
    },
  ];

  const technologies = [
    "Odoo ERP",
    "Python",
    "PostgreSQL",
    "XML",
    "Inventory",
    "Purchase",
    "Sales",
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
            Warehouse ERP
            <span> Management System</span>
          </h1>

          <p className="warehouse-case-intro">
            A centralized Odoo ERP solution designed
            to manage warehouse inventory, purchasing,
            sales, stock transfers and operational
            reporting from one connected platform.
          </p>

          <div className="warehouse-case-actions">
            <a
              href="https://warehousedemo.aadplus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="warehouse-primary-btn"
            >
              View Live Demo
              <ArrowUpRight size={18} />
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
              <small>ROLE</small>
              <strong>
                Odoo ERP Developer
              </strong>
            </div>

            <div>
              <small>PROJECT TYPE</small>
              <strong>
                Warehouse Management
              </strong>
            </div>

            <div>
              <small>FOCUS</small>
              <strong>
                Business Automation
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
              Connecting warehouse operations
              <span> in one ERP workflow.</span>
            </h2>

            <p>
              The system was implemented to provide
              a structured environment where stock,
              purchasing, sales and warehouse
              movements could be managed without
              relying on disconnected manual
              processes.
            </p>
          </div>
        </section>

        {/* PROBLEM / SOLUTION / RESULT */}

        <section className="warehouse-story-grid">

          <article className="warehouse-story-card">
            <span>01</span>

            <h3>
              The Problem
            </h3>

            <p>
              Manual inventory records made stock
              quantities, warehouse movements and
              operational reporting difficult to
              manage accurately.
            </p>
          </article>

          <article className="warehouse-story-card">
            <span>02</span>

            <h3>
              The Solution
            </h3>

            <p>
              I implemented a centralized Odoo ERP
              workflow connecting purchasing,
              inventory, sales, stock transfers and
              warehouse reporting.
            </p>
          </article>

          <article className="warehouse-story-card">
            <span>03</span>

            <h3>
              The Result
            </h3>

            <p>
              The solution improved inventory
              visibility, organized stock operations
              and provided more accurate real-time
              warehouse information.
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
                <span> warehouse operations.</span>
              </h2>
            </div>

            <Workflow size={42} />
          </div>

          <div className="warehouse-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className="warehouse-feature-card"
                  key={feature.title}
                >
                  <div className="warehouse-feature-icon">
                    <Icon size={23} />
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* TECHNOLOGY */}

        <section className="warehouse-tech-section">
          <div>
            <Database size={24} />

            <span>
              TECHNOLOGY STACK
            </span>
          </div>

          <div className="warehouse-tech-list">
            {technologies.map((technology) => (
              <span key={technology}>
                <CheckCircle2 size={15} />
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}

        <section className="warehouse-case-cta">
          <span>
            NEED A CUSTOM ERP?
          </span>

          <h2>
            Have a warehouse workflow
            that needs automation?
          </h2>

          <p>
            I build practical Odoo ERP solutions
            around real business processes.
          </p>

          <a
            href="/#contact"
            className="warehouse-primary-btn"
          >
            Start a Project
            <ArrowUpRight size={18} />
          </a>
        </section>

      </div>
    </article>
  );
}

export default WarehouseERP;
