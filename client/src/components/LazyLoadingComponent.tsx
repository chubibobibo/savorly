import { useEffect, useState, useRef } from "react";

interface ChildrenType {
  children: React.ReactNode;
}

function LazyLoadingComponent({ children }: ChildrenType) {
  const [isVisible, setIsVisible] = useState(false);
  //   console.log(isVisible);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 } // Adjust threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, []);

  return <div ref={ref}>{isVisible ? children : null}</div>;
}
export default LazyLoadingComponent;
