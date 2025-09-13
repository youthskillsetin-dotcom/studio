
'use client';

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Check on initial mount
    checkDevice();

    // Add resize listener
    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobile;
}
