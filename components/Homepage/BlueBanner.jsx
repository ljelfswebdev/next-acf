// components/Homepage/BlueBanner.jsx
'use client';

import Image from '@/helpers/Image';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlueBanner({ data }) {
  if (!data) return null;

  const {
    backgroundImage,
    title,
    text,
    linkText,
    linkUrl,
    options,
  } = data;

  const optionItems = Array.isArray(options) ? options : [];

  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 1;

      // progress: -1 when section is one viewport above,
      // 0 when top is at top of viewport,
      // +1 when it's one viewport below
      const progress = rect.top / windowHeight;

      // tweak this number to change parallax intensity
      const translate = progress * -30; // move up slightly as you scroll down

      setOffset(translate);
    }

    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20"
    >
      {/* Parallax Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 -z-10 will-change-transform"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <Image
            src={backgroundImage}
            alt="Banner Background"
            width={1920}       
            height={600}
            className="object-cover object-center"
            priority
          />
          {/* Blue overlay */}
          <div className="absolute inset-0 bg-blue-900/60" />
        </div>
      )}

      {/* Content */}
      <div className="container relative">
        <div className="flex flex-col items-center text-center text-white space-y-6 max-w-[1084px] mx-auto">
          {/* OPTIONS REPEATER */}
          {optionItems.length > 0 && (
            <ul className="w-full mx-auto flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
              {optionItems.map((opt, idx) => (
                <li
                  key={idx}
                  className="flex gap-1 items-center"
                >
                  <span>✅</span>
                  {opt?.label || ''}
                </li>
              ))}
            </ul>
          )}

          {/* TITLE */}
          {title && <div className="h4">{title}</div>}

          {/* RICH TEXT */}
          {text && (
            <div
              className="prose prose-invert max-w-none text-center"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}

          {/* LINK */}
          {(linkText || linkUrl) && (
            <Link
              href={linkUrl || '#'}
              className="button button--primary"
            >
              {linkText || 'Learn more'}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}