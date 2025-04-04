"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function AnimatedHeading() {
  // Create reference to store the DOM element containing the animation
  const el = useRef<HTMLSpanElement>(null);
  // Create reference to store the Typed instance itself
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: ["Management", "Tracking", "Expenses", "Payments"],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
      });
    }

    return () => {
      // Make sure to destroy Typed instance on unmounting
      // to prevent memory leaks
      typed.current?.destroy();
    };
  }, []);

  return <span className="text-blue-600" ref={el} />;
}
