import React, { useState, useEffect } from "react";
import { ArrowUp } from "phosphor-react";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 bg-[#1383eb] text-white p-3 rounded-full shadow-lg hover:bg-[#0f6bb8] transition-all z-50"
      aria-label="Back to top"
    >
      <ArrowUp size={25} weight="bold" />
    </button>
  );
};

export default BackToTopButton;
