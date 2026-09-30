import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis */
  max?: number;
  /** How far the card lifts on hover, in pixels */
  lift?: number;
  /** Adds a moving specular highlight across the card */
  glare?: boolean;
}

/**
 * 3D tilt card: the panel rotates towards the cursor inside a CSS perspective
 * wrapper and lifts on hover. Pointer-driven, so it stays smooth without ScrollTrigger.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  max = 8,
  lift = 14,
  glare = true,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' });
    const glareX = glareRef.current ? gsap.quickTo(glareRef.current, 'xPercent', { duration: 0.5 }) : null;
    const glareY = glareRef.current ? gsap.quickTo(glareRef.current, 'yPercent', { duration: 0.5 }) : null;

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      rotateY((px - 0.5) * max * 2);
      rotateX(-(py - 0.5) * max * 2);
      yTo(-lift);
      glareX?.((px - 0.5) * 60);
      glareY?.((py - 0.5) * 60);
    };

    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      yTo(0);
      glareX?.(0);
      glareY?.(0);
    };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(card);
    };
  }, [max, lift]);

  return (
    <div ref={wrapRef} className="h-full [perspective:1100px]">
      <div
        ref={cardRef}
        className={`relative h-full [transform-style:preserve-3d] will-change-transform ${className}`}
      >
        {children}

        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 65%)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TiltCard;