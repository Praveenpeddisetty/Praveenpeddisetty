import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, MapPin, Search, Heart, Star, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { categories, featuredDesigns, topWorkers } from '../../data/mockData';
import BottomNav from '../../components/BottomNav';

const ConsumerHome = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Mumbai');

  return (
    <div className="mobile-container" style={styles.container} data-testid="consumer-home">
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.iconButton} data-testid="menu-button">
          <Menu size={24} color="#1a1a1a" />
        </button>
        <h1 style={styles.logo} data-testid="app-logo">Golden Gehna</h1>
        <div style={styles.headerIcons}>
          <button
            style={styles.iconButton}
            onClick={() => navigate('/notifications')}
            data-testid="notification-button"
          >
            <Bell size={22} color="#1a1a1a" />
          </button>
          <button
            style={styles.iconButton}
            onClick={() => navigate('/consumer-profile')}
            data-testid="profile-button"
          >
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Profile"
              style={styles.profilePic}
            />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Search Bar */}
        <div
          style={styles.searchBar}
          onClick={() => navigate('/search')}
          data-testid="search-bar"
        >
          <Search size={20} color="#666" />
          <span style={styles.searchPlaceholder}>Search designs, workers...</span>
        </div>

        {/* Location Selector */}
        <div style={styles.locationSelector} data-testid="location-selector">
          <MapPin size={18} color="#13549d" />
          <span style={styles.locationText}>Your Location: {location}</span>
          <ChevronDown size={18} color="#666" />
        </div>

        {/* Categories */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle} data-testid="categories-title">Categories</h2>
          <div style={styles.categoriesGrid}>
            {categories.map((category) => {
              const IconComponent = Icons[category.icon];
              return (
                <div
                  key={category.id}
                  style={styles.categoryCard}
                  onClick={() => navigate('/search', { state: { category: category.name } })}
                  data-testid={`category-${category.name.toLowerCase()}`}
                >
                  <div style={styles.categoryIcon}>
                    <IconComponent size={28} color="#13549d" />
                  </div>
                  <span style={styles.categoryName}>{category.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Designs */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle} data-testid="featured-title">Featured Designs</h2>
            <button
              style={styles.seeAllButton}
              onClick={() => navigate('/search')}
              data-testid="see-all-designs"
            >
              See All
            </button>
          </div>
          <div style={styles.horizontalScroll}>
            {featuredDesigns.map((design) => (
              <div
                key={design.id}
                style={styles.designCard}
                onClick={() => navigate(`/design/${design.id}`)}
                data-testid={`design-card-${design.id}`}
              >
                <div style={styles.designImageContainer}>
                  <img
                    src={design.image}
                    alt={design.name}
                    style={styles.designImage}
                  />
                  <button style={styles.likeButton} data-testid={`like-${design.id}`}>
                    <Heart size={18} color="#fff" />
                  </button>
                </div>
                <div style={styles.designInfo}>
                  <h3 style={styles.designName}>{design.name}</h3>
                  <div style={styles.designRating}>
                    <Star size={14} fill="#FFC107" color="#FFC107" />
                    <span style={styles.ratingText}>{design.rating}</span>
                  </div>
                  <p style={styles.designPrice}>₹{(design.price / 1000).toFixed(0)}K</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Workers */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle} data-testid="workers-title">Top Rated Workers</h2>
            <button
              style={styles.seeAllButton}
              onClick={() => navigate('/search')}
              data-testid="see-all-workers"
            >
              See All
            </button>
          </div>
          {topWorkers.slice(0, 3).map((worker) => (
            <div
              key={worker.id}
              style={styles.workerCard}
              onClick={() => navigate(`/worker/${worker.id}`)}
              data-testid={`worker-card-${worker.id}`}
            >
              <img
                src={worker.image}
                alt={worker.name}
                style={styles.workerImage}
              />
              <div style={styles.workerInfo}>
                <h3 style={styles.workerName}>{worker.name}</h3>
                <div style={styles.workerRating}>
                  <Star size={14} fill="#FFC107" color="#FFC107" />
                  <span style={styles.ratingText}>{worker.rating}</span>
                </div>
                <p style={styles.workerSpecialty}>{worker.specialty}</p>
                <p style={styles.workerLocation}>
                  {worker.location} • {worker.orders} orders
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: '80px' }} />
      </div>

      <BottomNav />
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
    background: 'white',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  headerIcons: {
    display: 'flex',
    gap: '12px',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '20px',
  },
  searchBar: {
    margin: '16px 20px',
    padding: '12px 16px',
    background: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: '15px',
  },
  locationSelector: {
    margin: '0 20px 16px',
    padding: '10px 12px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  locationText: {
    flex: 1,
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  section: {
    marginBottom: '24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 12px 20px',
  },
  seeAllButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    padding: '0 20px',
  },
  categoryCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  categoryIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #13549d15 0%, #14ac8415 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: '12px',
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  horizontalScroll: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    padding: '0 20px',
    scrollbarWidth: 'none',
  },
  designCard: {
    minWidth: '160px',
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  designImageContainer: {
    position: 'relative',
    width: '100%',
    height: '160px',
  },
  designImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  likeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'rgba(0,0,0,0.3)',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  designInfo: {
    padding: '12px',
  },
  designName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },
  designRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '4px',
  },
  ratingText: {
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  },
  designPrice: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  workerCard: {
    background: 'white',
    margin: '0 20px 12px',
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    gap: '12px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  workerImage: {
    width: '64px',
    height: '64px',
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
    margin: '0 0 4px 0',
  },
  workerRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '4px',
  },
  workerSpecialty: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 4px 0',
  },
  workerLocation: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
};

export default ConsumerHome;
