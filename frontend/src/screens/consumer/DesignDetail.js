import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { featuredDesigns, topWorkers } from '../../data/mockData';
import 'swiper/css';
import 'swiper/css/pagination';

const DesignDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const design = featuredDesigns.find((d) => d.id === parseInt(id)) || featuredDesigns[0];
  const worker = topWorkers.find((w) => w.id === design.workerId) || topWorkers[0];

  const images = [design.image, design.image, design.image];
  const description = 'Exquisite handcrafted traditional gold ring featuring intricate filigree work and detailed engravings. Made with 22K gold, this timeless piece showcases the finest craftsmanship and attention to detail. Perfect for special occasions and daily wear alike.';

  return (
    <div className="mobile-container" style={styles.container} data-testid="design-detail">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.headerButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} color="#1a1a1a" />
        </button>
        <div style={styles.headerActions}>
          <button
            style={styles.headerButton}
            onClick={() => setIsWishlisted(!isWishlisted)}
            data-testid="wishlist-button"
          >
            <Heart
              size={24}
              color={isWishlisted ? '#e74c3c' : '#1a1a1a'}
              fill={isWishlisted ? '#e74c3c' : 'none'}
            />
          </button>
          <button style={styles.headerButton} data-testid="share-button">
            <Share2 size={24} color="#1a1a1a" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Image Gallery */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          style={styles.swiper}
          data-testid="image-gallery"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`${design.name} ${index + 1}`} style={styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Design Info */}
        <div style={styles.infoSection}>
          <h1 style={styles.designTitle} data-testid="design-title">{design.name}</h1>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <Star size={16} fill="#FFC107" color="#FFC107" />
              <span>{design.rating}</span>
              <span style={styles.statSecondary}>({design.reviews} reviews)</span>
            </div>
            <span style={styles.statSecondary}>{design.views} views</span>
          </div>
        </div>

        {/* Worker Card */}
        <div
          style={styles.workerCard}
          onClick={() => navigate(`/worker/${worker.id}`)}
          data-testid="worker-card"
        >
          <img src={worker.image} alt={worker.name} style={styles.workerImage} />
          <div style={styles.workerInfo}>
            <h3 style={styles.workerName}>{worker.name}</h3>
            <div style={styles.workerRating}>
              <Star size={14} fill="#FFC107" color="#FFC107" />
              <span style={styles.ratingText}>{worker.rating}</span>
              <span style={styles.orderCount}>• {worker.orders} orders</span>
            </div>
            <p style={styles.workerLocation}>
              <MapPin size={12} /> {worker.location}
            </p>
          </div>
        </div>

        {/* Price Details */}
        <div style={styles.priceBox}>
          <h3 style={styles.priceBoxTitle}>Price Details</h3>
          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Base Price</span>
            <span style={styles.priceValue}>₹{design.price.toLocaleString()}</span>
          </div>
          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Making Charges</span>
            <span style={styles.priceValue}>₹{(design.price * 0.05).toLocaleString()}</span>
          </div>
          <div style={styles.priceDivider} />
          <div style={styles.priceRow}>
            <span style={styles.totalLabel}>Estimated Total</span>
            <span style={styles.totalValue}>₹{(design.price * 1.05).toLocaleString()}</span>
          </div>
        </div>

        {/* Specifications */}
        <div style={styles.specsSection}>
          <h3 style={styles.sectionTitle}>Specifications</h3>
          <div style={styles.specGrid}>
            <div style={styles.specItem}>
              <span style={styles.specLabel}>Gold Weight</span>
              <span style={styles.specValue}>5-8 grams</span>
            </div>
            <div style={styles.specItem}>
              <span style={styles.specLabel}>Purity</span>
              <span style={styles.specValue}>22K / 18K</span>
            </div>
            <div style={styles.specItem}>
              <span style={styles.specLabel}>Delivery Time</span>
              <span style={styles.specValue}>7-10 days</span>
            </div>
            <div style={styles.specItem}>
              <span style={styles.specLabel}>Customizable</span>
              <span style={styles.specBadge}>Yes</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={styles.descSection}>
          <h3 style={styles.sectionTitle}>Description</h3>
          <p style={styles.description}>
            {showFullDescription ? description : `${description.substring(0, 120)}...`}
          </p>
          <button
            style={styles.readMoreButton}
            onClick={() => setShowFullDescription(!showFullDescription)}
            data-testid="read-more-button"
          >
            {showFullDescription ? (
              <>
                Read Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Read More <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>

        {/* Similar Designs */}
        <div style={styles.similarSection}>
          <h3 style={styles.sectionTitle}>Similar Designs</h3>
          <div style={styles.horizontalScroll}>
            {featuredDesigns.slice(0, 3).map((d) => (
              <div
                key={d.id}
                style={styles.similarCard}
                onClick={() => navigate(`/design/${d.id}`)}
                data-testid={`similar-${d.id}`}
              >
                <img src={d.image} alt={d.name} style={styles.similarImage} />
                <p style={styles.similarName}>{d.name}</p>
                <p style={styles.similarPrice}>₹{(d.price / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '100px' }} />
      </div>

      {/* CTA Button */}
      <div style={styles.ctaFooter}>
        <button
          className="btn-primary"
          style={styles.ctaButton}
          onClick={() => navigate(`/customize/${design.id}`)}
          data-testid="customize-button"
        >
          Customize & Order
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
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
  },
  headerButton: {
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
  },
  swiper: {
    width: '100%',
    height: '375px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoSection: {
    padding: '20px',
  },
  designTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  statSecondary: {
    fontSize: '14px',
    color: '#999',
    fontWeight: '400',
  },
  workerCard: {
    margin: '0 20px 20px',
    padding: '16px',
    background: '#f8f9fa',
    borderRadius: '12px',
    display: 'flex',
    gap: '12px',
    cursor: 'pointer',
  },
  workerImage: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  workerRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px',
  },
  ratingText: {
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  },
  orderCount: {
    fontSize: '13px',
    color: '#999',
  },
  workerLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
  priceBox: {
    margin: '0 20px 20px',
    padding: '16px',
    background: '#f8f9fa',
    borderRadius: '12px',
  },
  priceBoxTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  priceLabel: {
    fontSize: '14px',
    color: '#666',
  },
  priceValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  priceDivider: {
    height: '1px',
    background: '#e0e0e0',
    margin: '12px 0',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#13549d',
  },
  specsSection: {
    padding: '0 20px 20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  specGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  specLabel: {
    fontSize: '13px',
    color: '#999',
  },
  specValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  specBadge: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#14ac84',
    background: '#14ac8420',
    padding: '4px 8px',
    borderRadius: '6px',
    width: 'fit-content',
  },
  descSection: {
    padding: '0 20px 20px',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '8px',
  },
  readMoreButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  similarSection: {
    padding: '0 20px 20px',
  },
  horizontalScroll: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
  },
  similarCard: {
    minWidth: '120px',
    cursor: 'pointer',
  },
  similarImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  similarName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  similarPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#13549d',
  },
  ctaFooter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: '375px',
    margin: '0 auto',
    padding: '16px 20px',
    background: 'white',
    borderTop: '1px solid #e0e0e0',
  },
  ctaButton: {
    width: '100%',
  },
};

export default DesignDetail;
