import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Gem, Search, Package } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const Onboarding = () => {
  const navigate = useNavigate();
  const [swiperRef, setSwiperRef] = useState(null);

  const slides = [
    {
      icon: <Gem size={80} />,
      title: 'Welcome to Golden Gehna',
      description: 'Discover exquisite handcrafted gold jewelry from skilled artisans across the country',
    },
    {
      icon: <Search size={80} />,
      title: 'Browse Designs',
      description: 'Explore thousands of unique jewelry designs crafted with precision and care',
    },
    {
      icon: <Package size={80} />,
      title: 'Track Your Orders',
      description: 'Stay updated with real-time tracking from creation to delivery',
    },
  ];

  return (
    <div className="mobile-container" style={styles.container} data-testid="onboarding-screen">
      <button
        style={styles.skipButton}
        onClick={() => navigate('/user-type')}
        data-testid="skip-button"
      >
        Skip
      </button>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onSwiper={setSwiperRef}
        style={styles.swiper}
        data-testid="onboarding-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={styles.slide}>
              <div style={styles.iconContainer} data-testid={`slide-icon-${index}`}>{slide.icon}</div>
              <h2 style={styles.slideTitle} data-testid={`slide-title-${index}`}>{slide.title}</h2>
              <p style={styles.slideDescription} data-testid={`slide-description-${index}`}>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={styles.buttonContainer}>
        <button
          className="btn-primary"
          style={styles.ctaButton}
          onClick={() => navigate('/user-type')}
          data-testid="get-started-button"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  skipButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    zIndex: 10,
  },
  swiper: {
    flex: 1,
    width: '100%',
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    height: '100%',
    textAlign: 'center',
  },
  iconContainer: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #13549d20 0%, #14ac8420 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#13549d',
    marginBottom: '32px',
  },
  slideTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  slideDescription: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    maxWidth: '300px',
  },
  buttonContainer: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  ctaButton: {
    width: '100%',
    maxWidth: '300px',
  },
};

export default Onboarding;
