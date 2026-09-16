import { motion } from "framer-motion";


import SectionTitle from "../components/SectionTitle";
import { personalInfo } from "../data/portfolioData";

function About() {
//   const expertise = [
//     {
//       id: 1,
//       icon: Braces,
//       number: "01",
//       title: "Full Stack Engineering",
//       description:
//         "Building complete web applications from modern interfaces to secure APIs and databases.",
//     },
//     {
//       id: 2,
//       icon: Layers3,
//       number: "02",
//       title: "Odoo ERP Development",
//       description:
//         "Transforming real business workflows into customized ERP systems and automated operations.",
//     },
//     {
//       id: 3,
//       icon: BriefcaseBusiness,
//       number: "03",
//       title: "Business-Focused Solutions",
//       description:
//         "Understanding business problems first and selecting technology that delivers measurable value.",
//     },
//     {
//       id: 4,
//       icon: GraduationCap,
//       number: "04",
//       title: "Technical Mentorship",
//       description:
//         "Trained more than 60 students in MERN stack development, APIs and project delivery.",
//     },
//   ];

  return (
    <section id="about" className="about-section section-spacing">
      <div className="about-background-text" aria-hidden="true">
        ABOUT
      </div>

      <div className="container">
        <SectionTitle
          number="01"
          label="About Me"
          title="Engineering ideas into"
          highlight="useful products."
          description="I work between business strategy, interface design and software engineering."
        />

        <div className="about-layout">
          {/* Personal Introduction */}

          <motion.div
            className="about-introduction"
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.25,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
  className="about-photo-card"
  whileHover="hover"
  initial="initial"
>
  <div className="about-photo-image-wrapper">
    <motion.img
      src="/ahsan-real-profile.png"
      alt="Ahsan Nasir, Full Stack Developer and Odoo ERP Specialist based in Karachi, Pakistan"
      className="about-photo-image"
      variants={{
        initial: {
          scale: 1,
        },
        hover: {
          scale: 1.06,
        },
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    />

    <div className="about-photo-overlay" />
    <div className="about-photo-grid" />
  </div>

  <div className="about-photo-top">
    <span>DEVELOPER PROFILE</span>

    <div>
      <i />
      AVAILABLE
    </div>
  </div>

  <div className="about-photo-content">
    <span className="about-photo-number">/ 001</span>

    <h3>{personalInfo.name}</h3>

    <p>Full Stack Developer &amp; Odoo ERP Specialist</p>

    <div className="about-photo-details">
      <span>
        <small>BASED IN</small>
        {personalInfo.location}
      </span>

      <span>
        <small>WORKING</small>
        Globally &amp; Remotely
      </span>
    </div>
  </div>

  <div className="about-photo-corner">
    <span>A</span>
    <small>N</small>
  </div>
</motion.div>

            <div className="about-personal-note">
              <span className="about-note-number">
                / 001
              </span>

              <p>
                Good software does more than work.
                It simplifies decisions, improves operations
                and creates better experiences for people.
              </p>
            </div>
          </motion.div>

          {/* About Content */}

          <motion.div
            className="about-content"
            initial={{
              opacity: 0,
              y: 50,
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
              duration: 0.85,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="about-large-text">
              I&apos;m{" "}
              <span>{personalInfo.name}</span>, a software
              engineer who enjoys solving the difficult
              space between{" "}
              <em>business requirements</em> and technical
              execution.
            </p>

            <div className="about-description-grid">
              <p>
                My experience includes customer-facing web
                applications, e-commerce platforms, financial
                systems, warehouse operations and custom Odoo
                ERP solutions.
              </p>

              <p>
                I manage projects from planning and interface
                development to backend engineering, database
                design, cloud deployment and production
                support.
              </p>
            </div>

            <div className="about-principles">
              <div>
                <span>01</span>
                <strong>Clarity over complexity</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Business results over trends</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Reliable communication</strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expertise Cards */}

        {/* <div className="about-expertise-grid">
          {expertise.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <motion.article
                className="about-expertise-card"
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 40,
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
                  duration: 0.65,
                  delay: index * 0.1,
                }}
              >
                <div className="expertise-card-header">
                  <span>{item.number}</span>

                  <IconComponent
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="expertise-card-line" />
              </motion.article>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}

export default About;