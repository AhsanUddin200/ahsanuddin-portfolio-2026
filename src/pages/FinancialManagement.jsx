import { useEffect } from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Database,
  FileText,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

function FinancialManagement() {
  useEffect(() => {
    document.title =
      "Financial Management System Case Study | Ahsan Nasir";

    const description =
      "Explore a Financial Management System case study by Ahsan Nasir featuring financial reporting, salaries, inventory, ledgers, audit logs and role-based business management.";

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
        "https://ahsanuddin-portfolio-2026.vercel.app/projects/financial-management"
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
      icon: WalletCards,
      title: "Financial Operations",
      text: "Manage income, expenses, assets, liabilities and equity from one centralized system.",
    },
    {
      icon: Users,
      title: "Salary & Attendance",
      text: "Structured employee salary processing and attendance management workflows.",
    },
    {
      icon: BarChart3,
      title: "Business Reporting",
      text: "Monitor financial performance using organized reports and dashboard information.",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Access",
      text: "Separate access and permissions for administrators and system users.",
    },
  ];

  const technologies = [
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML5",
    "CSS3",
  ];

  const screenshots = [
    "/financial-1.jpg",
    "/financial-2.jpg",
    "/financial-3.jpg",
    "/financial-4.jpg",
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
            FINANCIAL SYSTEM CASE STUDY
          </div>

          <h1>
            Financial Management
            <span> System</span>
          </h1>

          <p className="warehouse-case-intro">
            A centralized business management
            platform designed to organize financial
            records, salaries, inventory, ledgers,
            reporting and administrative operations
            from one connected dashboard.
          </p>

          <div className="warehouse-case-actions">
            <a
              href="/#contact"
              className="warehouse-primary-btn"
            >
              Discuss a Similar Project
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="warehouse-case-meta">
            <div>
              <small>ROLE</small>

              <strong>
                Full Stack Developer
              </strong>
            </div>

            <div>
              <small>PROJECT TYPE</small>

              <strong>
                Financial Management
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
              Bringing financial operations
              <span> into one system.</span>
            </h2>

            <p>
              The platform was developed to replace
              disconnected financial and operational
              records with one structured management
              environment where administrators can
              monitor business activity and maintain
              accurate records.
            </p>
          </div>
        </section>

        {/* STORY */}

        <section className="warehouse-story-grid">
          <article className="warehouse-story-card">
            <span>01</span>

            <h3>
              The Problem
            </h3>

            <p>
              Financial records, salaries, stock
              information and business reporting
              were difficult to manage through
              disconnected manual processes.
            </p>
          </article>

          <article className="warehouse-story-card">
            <span>02</span>

            <h3>
              The Solution
            </h3>

            <p>
              I developed a role-based management
              platform covering income, expenses,
              financial statements, assets,
              liabilities, salaries, attendance,
              inventory, ledgers and audit logs.
            </p>
          </article>

          <article className="warehouse-story-card">
            <span>03</span>

            <h3>
              The Result
            </h3>

            <p>
              The system created one centralized
              dashboard where administrators can
              manage operational records and monitor
              financial performance more efficiently.
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
                Built for organized
                <span> financial operations.</span>
              </h2>
            </div>

            <FileText size={42} />
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

        {/* SCREENSHOTS */}

        <section className="warehouse-features-section">
          <div className="warehouse-feature-heading">
            <div>
              <p className="warehouse-section-label">
                SYSTEM PREVIEW
              </p>

              <h2>
                Inside the
                <span> application.</span>
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {screenshots.map(
              (screenshot, index) => (
                <img
                  key={screenshot}
                  src={screenshot}
                  alt={`Financial Management System dashboard screenshot ${
                    index + 1
                  } by Ahsan Nasir`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    borderRadius: "18px",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              )
            )}
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
            {technologies.map(
              (technology) => (
                <span key={technology}>
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
            NEED A BUSINESS SYSTEM?
          </span>

          <h2>
            Have financial workflows
            that need automation?
          </h2>

          <p>
            I build custom management systems
            around practical business operations
            and reporting requirements.
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

export default FinancialManagement;