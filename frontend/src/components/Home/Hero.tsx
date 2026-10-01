import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { gsap } from 'gsap';

const HERO_VIDEO = '/videos/hero-services.mp4';
const HERO_POSTER = '/images/hero-slides/slide-staff-transport.jpg';

interface HeroSegment {
  /** Seconds into hero-services.mp4 where this service scene appears */
  start: number;
  title: string;
  highlight: string;
  description: string;
}

// Timings follow the montage: each of the six scenes runs 4s with a 0.7s crossfade,
// so the copy switches at the midpoint of every transition.
const TEXT_HOLD_MS = 3000;
const SEGMENTS: HeroSegment[] = [
  {
    start: 0,
    title: 'Corporate &',
    highlight: 'Industrial Shuttles',
    description:
      'Fixed-route employee shuttles, campus and industrial-site transport with climate-controlled coaches and uniformed professional drivers.',
  },
  {
    start: 3.65,
    title: 'School',
    highlight: 'Transportation',
    description:
      'Certified school buses with seatbelts, CCTV, female bus attendants and live parent notifications for a safe daily school run.',
  },
  {
    start: 6.95,
    title: 'Airport Taxi &',
    highlight: 'VIP Transfers',
    description:
      'Flight-monitored meet-and-greet arrivals, luggage assistance and executive sedans and luxury vans for terminals and hotels.',
  },
  {
    start: 10.25,
    title: 'Hotel & Event',
    highlight: 'Valet Parking',
    description:
      'Uniformed, trained valet teams for hotels, restaurants and grand events with digital key tracking and full insurance cover.',
  },
  {
    start: 13.55,
    title: 'Tour &',
    highlight: 'Sightseeing',
    description:
      'City tours, desert safari charters and group excursions with multilingual guides, refreshments and flexible itineraries.',
  },
  {
    start: 16.85,
    title: '24/7 Towing &',
    highlight: 'Roadside Recovery',
    description:
      'Hydraulic flatbed towing, jump starts, tyre changes and secure vehicle recovery on every highway and street in Qatar.',
  },
];

interface HeroProps {
  onOpenQuoteModal?: (serviceType?: string) => void;
  onOpenTrackingModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onOpenTrackingModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [segment, setSegment] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => undefined);

    // Copy follows the scene playing in the video, holding each headline for 3 seconds
    let frame = 0;
    let lastSwitch = performance.now();
    let shown = 0;
    const sync = () => {
      const time = video.currentTime;
      let target = 0;
      for (let i = 0; i < SEGMENTS.length; i += 1) {
        if (time >= SEGMENTS[i].start) target = i;
      }
      if (target !== shown && performance.now() - lastSwitch >= TEXT_HOLD_MS) {
        shown = target;
        lastSwitch = performance.now();
        setSegment(target);
      }
      frame = window.requestAnimationFrame(sync);
    };
    frame = window.requestAnimationFrame(sync);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Entrance animation for the hero copy
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const targets = [kickerRef.current, headlineRef.current, descriptionRef.current, actionsRef.current];
    const buttons = actionsRef.current ? Array.from(actionsRef.current.children) : [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(
        kickerRef.current,
        { autoAlpha: 0, y: 18, letterSpacing: '0.6em' },
        { autoAlpha: 1, y: 0, letterSpacing: '0.25em', duration: 0.9, ease: 'power3.out' },
      )
        .fromTo(
          headlineRef.current,
          { autoAlpha: 0, y: 46, rotationX: -14, transformPerspective: 900 },
          { autoAlpha: 1, y: 0, rotationX: 0, duration: 1.1, ease: 'power4.out' },
          '-=0.55',
        )
        .fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.75',
        )
        .fromTo(
          buttons,
          { autoAlpha: 0, y: 22, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.12 },
          '-=0.6',
        );
    });

    return () => {
      ctx.revert();
      targets.forEach(target => target && gsap.set(target, { clearProps: 'all' }));
    };
  }, []);

  // Every time the video moves to the next service, the copy replays its entrance
  useEffect(() => {
    if (segment === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          headlineRef.current,
          { autoAlpha: 0, y: 40, rotationX: -12, transformPerspective: 900 },
          { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.95, ease: 'power4.out' },
        )
        .fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.62',
        );
    });

    return () => ctx.revert();
  }, [segment]);

  // Gentle 3D parallax: the copy leans towards the cursor
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = copyRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(node, {
      rotationY: px * 6,
      rotationX: -py * 5,
      transformPerspective: 1200,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const onPointerLeave = () => {
    const node = copyRef.current;
    if (!node) return;
    gsap.to(node, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
  };

  const current = SEGMENTS[segment];

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden min-h-[600px] sm:min-h-[680px] lg:min-h-[800px] flex items-center text-white">
      {/* ================= LOOPING VIDEO BACKGROUND ================= */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        aria-label="Two Plus Transport fleet serving staff shuttles, school transport, airport transfers, valet parking, tours and towing"
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Cinematic grade + readability overlays */}
      <div className="absolute inset-0 bg-slate-950/50 sm:bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 sm:via-slate-950/55 to-slate-950/30 sm:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
        <div
          ref={copyRef}
          className="max-w-4xl space-y-5 sm:space-y-7 [perspective:1200px] will-change-transform"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <p
            ref={kickerRef}
            className="text-[11px] sm:text-sm font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
          >
            Two Plus Transport
          </p>

          <div>
            <h1
              ref={headlineRef}
              className="text-[32px] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] [transform-style:preserve-3d]"
            >
              {current.title} <span className="text-white">{current.highlight}</span>
            </h1>

            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 text-sm sm:text-lg text-white max-w-2xl leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
            >
              {current.description}
            </p>
          </div>

          <div ref={actionsRef} className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <button
              onClick={() => onOpenQuoteModal?.()}
              className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white hover:brightness-110 px-3 sm:px-8 py-3 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-wider whitespace-nowrap shadow-2xl shadow-blue-900/40 transition-all hover:-translate-y-0.5"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenTrackingModal?.()}
              className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 border-2 border-white/60 text-white hover:bg-white hover:text-slate-900 px-3 sm:px-8 py-3 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-wider whitespace-nowrap transition-all hover:-translate-y-0.5"
            >
              <span>TRACK BOOKING</span>
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};