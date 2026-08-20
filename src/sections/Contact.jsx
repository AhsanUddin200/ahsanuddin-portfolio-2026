import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const service = form.get("service");
    const message = form.get("message");

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name} — ${service}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`
    );

    setSubmitted(true);

    window.location.href = `mailto:ahsanuddin160@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow contact-glow-one" />
      <div className="contact-glow contact-glow-two" />

      <div className="contact-container">
        <SectionTitle
          number="05"
          label="Start a Project"
          title="Have an idea? Let’s create"
          highlight="something valuable."
          description="Tell me about your website, ERP system or business application. I’ll help you turn the idea into a practical digital product."
        />

        <div className="contact-layout">
          <motion.div
            className="contact-information"
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="availability-status">
              <span className="availability-dot" />
              Available for freelance projects
            </div>

            <h3>Let’s discuss your next project.</h3>

            <p>
              Whether you need a modern website, custom Odoo module or complete
              business system, send me the details and I’ll get back to you.
            </p>

            <div className="contact-methods">
              <a
                href="mailto:ahsanuddin160@gmail.com"
                className="contact-method"
              >
                <span className="contact-method-icon">
                  <Mail size={20} />
                </span>

                <span>
                  <small>Email</small>
                  <strong>ahsanuddin160@gmail.com</strong>
                </span>

                <ArrowUpRight size={18} />
              </a>

              <a href="tel:+923102362190" className="contact-method">
                <span className="contact-method-icon">
                  <Phone size={20} />
                </span>

                <span>
                  <small>Phone</small>
                  <strong>+92 310 2362190</strong>
                </span>

                <ArrowUpRight size={18} />
              </a>

              <div className="contact-method">
                <span className="contact-method-icon">
                  <MapPin size={20} />
                </span>

                <span>
                  <small>Location</small>
                  <strong>Karachi, Pakistan</strong>
                </span>
              </div>
            </div>

            <div className="contact-socials">
              <span>Find me online</span>

              <div>
                <a
                  href="https://github.com/AhsanUddin200"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/in/ahsannasir"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="contact-form-header">
              <div>
                <span>NEW PROJECT</span>
                <h3>Send project details</h3>
              </div>

              <span className="form-header-code">01/05</span>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>
                  <span>Your name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </label>

                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>What do you need?</span>

                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="React Website">React Website</option>
                  <option value="Full Stack Application">
                    Full Stack Application
                  </option>
                  <option value="Odoo ERP Customization">
                    Odoo ERP Customization
                  </option>
                  <option value="Business Website">Business Website</option>
                  <option value="Other Project">Other Project</option>
                </select>
              </label>

              <label>
                <span>Project details</span>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me about your idea, requirements and expected timeline..."
                  required
                />
              </label>

              <button type="submit" className="contact-submit-button">
                <span>Send project enquiry</span>
                <Send size={18} />
              </button>

              {submitted && (
                <div className="contact-success-message">
                  <CheckCircle2 size={17} />
                  Your email application is opening. Please send the prepared
                  message from there.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;