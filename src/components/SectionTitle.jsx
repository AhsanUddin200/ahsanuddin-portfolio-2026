import { motion } from "framer-motion";

function SectionTitle({
  number,
  label,
  title,
  highlight,
  description,
  alignment = "left",
}) {
  return (
    <motion.div
      className={`section-title section-title-${alignment}`}
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="section-title-label">
        <span>{number}</span>

        <p>{label}</p>
      </div>

      <h2>
        {title}

        {highlight && (
          <span className="section-title-highlight">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="section-title-description">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionTitle;