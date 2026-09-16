import { motion } from "framer-motion";

function BrandLogo({ onClick }) {
  return (
    <motion.a
      href="#home"
      className="brand-logo profile-brand-logo"
      aria-label="Ahsan Nasir — Home"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="brand-profile-wrapper">
        <motion.span
          className="brand-profile-ring"
          animate={{ rotate: 360 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.img
          src="/ahsan-profile1-animated.png"
          alt="Ahsan Nasir"
          className="brand-profile-image"
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="brand-profile-status"
          animate={{
            scale: [1, 1.25, 1],
            boxShadow: [
              "0 0 0 3px rgba(200, 255, 69, 0.12)",
              "0 0 0 7px rgba(200, 255, 69, 0)",
              "0 0 0 3px rgba(200, 255, 69, 0.12)",
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        />
      </span>

      <span className="brand-logo-content">
        <strong>Ahsan Nasir</strong>
        <small>Software Engineer</small>
      </span>
    </motion.a>
  );
}

export default BrandLogo;