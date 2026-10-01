import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TESTIMONIALS_DATA } from '../../data/mockData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../common';

const ROTATE_MS = 5500;
const SLIDE_MS = 700;

const usePerView = () => {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const compute = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setPerView(3);
      else if (window.matchMedia('(min-width: 768px)').matches) setPerView(2);
      else setPerView(1);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return perView;
};

export const Testimonials: React.FC = () => {
  const perView = usePerView();
  const total = TESTIMONIALS_DATA.length;
  const pages = Math.max(1, Math.ceil(total / perView));

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [paused, setPaused] = useState(false);
  const jumpRef = useRef(false);

  // Keep the active slide on the first page whenever the viewport changes
  useEffect(() => {
    setIndex(0);
  }, [perView]);

  useEffect(() => {
    if (!animating) return;
    const id = window.setTimeout(() => setAnimating(false), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, animating]);

  const move = useCallback(
    (delta: number) => {
      setAnimating(true);
      setIndex(current => {
        const next = current + delta;
        if (next > pages - 1) {
          jumpRef.current = true;
          return 0;
        }
        if (next < 0) {
          jumpRef.current = true;
          return pages - 1;
        }
        return next;
      });
    },
    [pages],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => move(1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [move, paused]);

  // Clone the first `perView` cards so a partial last page can still slide fully
  const slides = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA.slice(0, perView)];

  return (
    <section
      className="py-20 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Leaders Across Qatar
          </h2>
          <div className="w-20 h-1 bg-[#0066FF] mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm font-light">
            Read what corporate event organizers, school boards, and resort directors say about our service.
          </p>
        </Reveal>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translate3d(-${(index * 100) / perView}%, 0, 0)`,
              transitionDuration: animating && !jumpRef.current ? `${SLIDE_MS}ms` : '0ms',
              gap: '2rem',
            }}
            onTransitionEnd={() => {
              jumpRef.current = false;
            }}
          >
            {slides.map((t, i) => (
              <article
                key={`${t.id}-${i}`}
                style={{ flex: `0 0 calc((100% - ${(perView - 1) * 2}rem) / ${perView})` }}
                className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between relative group hover:border-sky-300"
              >
                <Quote className="w-10 h-10 text-sky-200 absolute top-6 right-6 group-hover:text-sky-300 transition-colors" />

                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic leading-relaxed">"{t.comment}"</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0066FF]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">
                      {t.role}, <span className="text-[#0066FF] font-semibold">{t.company}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => move(-1)}
              aria-label="Previous testimonials"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF] hover:shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAnimating(true);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial slide ${i + 1}`}
                  aria-current={index === i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === i ? 'w-7 bg-[#0066FF]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => move(1)}
              aria-label="Next testimonials"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF] hover:shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
