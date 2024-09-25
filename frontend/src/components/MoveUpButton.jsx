import { useState, useEffect } from "react";

const MoveUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`move-up-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      title="move to top"
    >
      ▲
    </button>
  );
};

export default MoveUpButton;
