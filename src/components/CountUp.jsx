import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function CountUp({
  end,
  suffix = "+",
  duration = 1600,
  className = "",
}) {
  const counterRef = useRef(null);
  const animationRef = useRef(null);
  const [count, setCount] = useState(0);

  const isInView = useInView(counterRef, {
    amount: 0.7,
    margin: "0px 0px -40px 0px",
  });

  useEffect(() => {
    if (!isInView) {
      setCount(0);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      return;
    }

    let startTime = null;

    const animateCounter = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const smoothProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.floor(smoothProgress * end);

      setCount(currentNumber);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateCounter);
      }
    };

    animationRef.current = requestAnimationFrame(animateCounter);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={counterRef} className={className}>
      {count}
      {suffix}
    </span>
  );
}

export default CountUp;