import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import './PremiumSwiper.css';

/* ── Custom Arrow Buttons (inside Swiper context) ── */
function ArrowButton({ direction = 'next' }) {
  const swiper = useSwiper();

  const handleClick = () => {
    if (direction === 'prev') swiper.slidePrev();
    else swiper.slideNext();
  };

  return (
    <button
      type="button"
      className={`ps-btn ps-btn-${direction}`}
      onClick={handleClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
    >
      {direction === 'prev' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 19 8.5 12l7-7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.5 5 15.5 12l-7 7" />
        </svg>
      )}
    </button>
  );
}

/**
 * PremiumSwiper — reusable image carousel for IEEE IAS ENIS SBC.
 *
 * @param {Object[]} slides          — array of slide data
 * @param {Function} [onSlideClick]  — optional click handler (receives slide, index)
 * @param {boolean}  [showCaptions]  — render title/description below image
 */
export default function PremiumSwiper({
  slides = [],
  onSlideClick,
  showCaptions = false,
}) {
  const canLoop = slides.length >= 4;

  if (!slides.length) return null;

  return (
    <section className="ps-section">
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        className="ps-swiper"
        centeredSlides
        loop={canLoop}
        watchOverflow
        grabCursor
        speed={700}
        spaceBetween={24}
        slidesPerView="auto"
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        a11y={{ enabled: true }}
      >
        {/* Custom nav buttons rendered INSIDE <Swiper> so useSwiper() works */}
        <ArrowButton direction="prev" />
        <ArrowButton direction="next" />

        {slides.map((slide, index) => (
          <SwiperSlide className="ps-slide" key={slide.id ?? index}>
            {({ isActive }) => (
              <article
                className={`ps-card${isActive ? ' is-active' : ''}`}
                onClick={
                  onSlideClick ? () => onSlideClick(slide, index) : undefined
                }
                role={onSlideClick ? 'button' : undefined}
                tabIndex={onSlideClick ? 0 : undefined}
                onKeyDown={
                  onSlideClick
                    ? (e) => e.key === 'Enter' && onSlideClick(slide, index)
                    : undefined
                }
              >
                <div className="ps-img-wrap">
                  <img
                    src={slide.image || slide.src || slide.photo}
                    alt={slide.alt || slide.title || 'Gallery image'}
                    className="ps-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>

                {showCaptions && (slide.title || slide.description) && (
                  <div className="ps-caption">
                    {slide.title && <h3>{slide.title}</h3>}
                    {slide.description && <p>{slide.description}</p>}
                  </div>
                )}
              </article>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}