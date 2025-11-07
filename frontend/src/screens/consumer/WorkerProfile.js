import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MessageCircle, Phone, MapPin, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { topWorkers, featuredDesigns } from '../../data/mockData';

const WorkerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('designs');
  const [showFullBio, setShowFullBio] = useState(false);

  const worker = topWorkers.find((w) => w.id === parseInt(id)) || topWorkers[0];
  const workerDesigns = featuredDesigns.filter((d) => d.workerId === worker.id);

  return (
    <div className="mobile-container" style={styles.container} data-testid="worker-profile">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} color="white" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileImageContainer}>
            <img src={worker.image} alt={worker.name} style={styles.profileImage} />
            {worker.verified && (
              <div style={styles.verifiedBadge} data-testid="verified-badge">
                <CheckCircle2 size={20} color="white" />
              </div>
            )}
          </div>
          <h1 style={styles.workerName} data-testid="worker-name">{worker.name}</h1>
          <p style={styles.specialty} data-testid="specialty">{worker.specialty}</p>
          <div style={styles.rating}>
            <Star size={18} fill="#FFC107" color="#FFC107" />
            <span style={styles.ratingText}>{worker.rating}</span>
            <span style={styles.reviewCount}>({worker.orders} reviews)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button
            className="btn-primary"
            style={styles.messageButton}
            onClick={() => navigate(`/chat/${worker.id}`)}
            data-testid="message-button"
          >
            <MessageCircle size={20} />
            <span>Message</span>
          </button>
          <button
            className="btn-secondary"
            style={styles.callButton}
            data-testid="call-button"
          >
            <Phone size={20} />
            <span>Call</span>
          </button>
        </div>

        {/* About */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>About</h3>
          <p style={styles.bio}>
            {showFullBio ? worker.bio : `${worker.bio.substring(0, 100)}...`}
          </p>
          <button
            style={styles.readMoreButton}
            onClick={() => setShowFullBio(!showFullBio)}
            data-testid="read-more-bio"
          >
            {showFullBio ? 'Show Less' : 'Read More'}
          </button>
        </div>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <TrendingUp size={24} color="#13549d" />
            </div>
            <p style={styles.statValue}>{worker.orders}+</p>
            <p style={styles.statLabel}>Orders</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <Clock size={24} color="#13549d" />
            </div>
            <p style={styles.statValue}>{worker.deliveryTime}</p>
            <p style={styles.statLabel}>Avg Delivery</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <CheckCircle2 size={24} color="#13549d" />
            </div>
            <p style={styles.statValue}>{worker.onTimeDelivery}%</p>
            <p style={styles.statLabel}>On-Time</p>
          </div>
        </div>

        {/* Shop Address */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Shop Address</h3>
          <div style={styles.addressCard}>
            <MapPin size={20} color="#13549d" />
            <div style={styles.addressInfo}>
              <p style={styles.addressText}>{worker.location}</p>
              <button style={styles.viewMapButton} data-testid="view-map-button">
                View on Map
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'designs' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('designs')}
            data-testid="tab-designs"
          >
            All Designs
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'reviews' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('reviews')}
            data-testid="tab-reviews"
          >
            Reviews
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'info' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('info')}
            data-testid="tab-info"
          >
            Info
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'designs' && (
          <div style={styles.designsGrid}>
            {workerDesigns.map((design) => (
              <div
                key={design.id}
                style={styles.designCard}
                onClick={() => navigate(`/design/${design.id}`)}
                data-testid={`design-${design.id}`}
              >
                <img src={design.image} alt={design.name} style={styles.designImage} />
                <p style={styles.designName}>{design.name}</p>
                <p style={styles.designPrice}>₹{(design.price / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={styles.reviewsContent}>
            <p style={styles.emptyMessage}>Reviews coming soon...</p>
          </div>
        )}

        {activeTab === 'info' && (
          <div style={styles.infoContent}>
            <p style={styles.emptyMessage}>Additional info coming soon...</p>
          </div>
        )}

        <div style={{ height: '40px' }} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '16px 20px',
    zIndex: 10,
  },
  backButton: {
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
  },
  profileHeader: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    padding: '60px 20px 32px',
    textAlign: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '16px',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid white',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    background: '#14ac84',
    borderRadius: '50%',
    padding: '6px',
    border: '3px solid white',
  },
  workerName: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px',
  },
  specialty: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '12px',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
  },
  ratingText: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
  },
  reviewCount: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    padding: '20px',
  },
  messageButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  callButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  section: {
    padding: '0 20px 20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  bio: {
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
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    padding: '0 20px 20px',
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  statIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#999',
  },
  addressCard: {
    background: 'white',
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px',
  },
  viewMapButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tabs: {
    display: 'flex',
    background: 'white',
    margin: '0 20px',
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    padding: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    color: '#999',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  activeTab: {
    background: '#13549d',
    color: 'white',
    fontWeight: '600',
  },
  designsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    padding: '0 20px',
  },
  designCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  designImage: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
  designName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    padding: '12px 12px 4px',
    margin: 0,
  },
  designPrice: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#13549d',
    padding: '0 12px 12px',
    margin: 0,
  },
  reviewsContent: {
    padding: '40px 20px',
  },
  infoContent: {
    padding: '40px 20px',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
  },
};

export default WorkerProfile;
