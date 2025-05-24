import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ containerRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [pathname, containerRef]);

  return null;
};

export default ScrollToTop;
