import gsap from "gsap";
import { useEffect, useRef } from "react";

const Customcursor = () => {
  const cursorRef = useRef(null);
  const followercursorRef = useRef(null);

  const cursorMove = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
    });

    gsap.to(followercursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.9,
    });
  };

  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: 100,
      yPercent: 100,
    });
    gsap.set(followercursorRef.current, {
      xPercent: -20,
      yPercent: -20,
    });
    window.addEventListener('mousemove', cursorMove); // Fix the typo here
  }, []);

  return (
    <div>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followercursorRef} className="follower-cursor"></div>
    </div>
  );
};

export default Customcursor;
