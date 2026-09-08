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
    document.title =
      "Warehouse ERP Case Study | Odoo Developer Ahsan Nasir";

    const description =
      "Explore a Warehouse ERP case study by Ahsan Nasir, covering Odoo inventory management, purchasing, sales, stock transfers and real-time warehouse reporting.";

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description
      );
    }

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (canonical) {
      canonical.setAttribute(
        "href",
        "https://ahsanuddin-portfolio-2026.vercel.app/projects/warehouse-erp"
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