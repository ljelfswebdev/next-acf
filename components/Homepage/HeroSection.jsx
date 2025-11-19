// components/Homepage/HeroSection.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import '@/styles/pages/homepage.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css';
import Image from '@/helpers/Image';

export default function HeroSection({ data }) {
  const slides = Array.isArray(data?.slides) ? data.slides : [];

  // If no slides yet, show a simple placeholder
  if (!slides.length) {
    return (
      <section className="bg-black text-white">
        <div className="container py-16">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">
            Hero not configured
          </h1>
          <p className="text-sm text-white/70">
            Go to the homepage page in admin and add some slides in
            <strong> Section 1 → Hero Slides</strong>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[600px] ">
      <Swiper
        modules={[Pagination]}
        loop={slides.length > 1}
        autoplay={slides.length > 1 ? { delay: 5000 } : false}
        spaceBetween={0}
        slidesPerView={1}
        className="h-full"
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <div className="relative flex items-center h-full">
              {/* Background image */}
              {slide.backgroundImage && (
                <div className="absolute inset-0">
                  <Image
                    src={slide.backgroundImage}
                    alt={slide.title || `Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                    width={1920}       
                    height={600}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              )}

              {/* Content */}
              <div className="container">
              <div className="relative py-16 text-white space-y-4 flex flex-col items-center justify-center">
                {slide.title && (
                  <h1 className="h2 text-center">
                    {slide.title}
                  </h1>
                )}

                {slide.text && (
                  <div
                    className="prose prose-invert text-center"
                    dangerouslySetInnerHTML={{ __html: slide.text }}
                  />
                )}
              </div>
              </div>
      
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        <div className="container absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="hero-pagination flex gap-2"></div>
      </div>

    </section>
  );
}