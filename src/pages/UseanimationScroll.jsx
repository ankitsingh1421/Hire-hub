import { useEffect, useState } from "react";

const useAnimationOnScroll = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    const elements = document.querySelectorAll(".animate-fade-up");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [threshold]);

  return isVisible;
};

export default useAnimationOnScroll;
