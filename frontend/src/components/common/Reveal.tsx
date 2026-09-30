import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  /** Seconds to wait before the animation starts once scrolled into view */
  delay?: number;
  /** Distance in pixels the element travels up into place */
  distance?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

/**
 * Fades and lifts its children into view the first time they are scrolled to.
 * Falls back to plain CSS transitions when GSAP is unavailable.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  distance = 28,
  duration = 0.8,
  className = '',
  as = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 88%',
            once: true,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, [delay, distance, duration]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0, willChange: 'transform, opacity' }}>
      {children}
    </Tag>
  );
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child animation */
  stagger?: number;
  distance?: number;
  as?: 'div' | 'ul' | 'section';
}

/**
 * Reveals direct children one after another as the group scrolls into view.
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = '',
  stagger = 0.09,
  distance = 30,
  as = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const items = Array.from(node.children) as HTMLElement[];
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, [stagger, distance]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;