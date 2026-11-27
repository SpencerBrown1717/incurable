import { useEffect, useRef, useState, type ReactNode } from "react";
import "./site-figure.css";

type SiteFigureProps = {
  label: string;
  caption: ReactNode;
  viewBox?: string;
  className?: string;
  children: ReactNode;
};

export function SiteFigure({
  label,
  caption,
  viewBox = "0 0 640 260",
  className,
  children,
}: SiteFigureProps) {
  const figureRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={figureRef}
      className={className ? `site-figure ${className}` : "site-figure"}
      data-figure-in-view={inView}
    >
      <svg
        className="site-figure-art"
        viewBox={viewBox}
        role="img"
        aria-label={label}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
      <figcaption className="site-figure-caption">{caption}</figcaption>
    </figure>
  );
}
