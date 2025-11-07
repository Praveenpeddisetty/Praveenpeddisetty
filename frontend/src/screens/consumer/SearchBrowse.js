import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, Star, Heart, Eye } from 'lucide-react';
import { featuredDesigns } from '../../data/mockData';
import BottomNav from '../../components/BottomNav';

const SearchBrowse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const filterChips = ['Price', 'Location', 'Rating', 'Category'];

  return (
    <div className="mobile-container" style={styles.container} data-testid="search-browse">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <input
          type="text"
          placeholder="Search designs, workers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          data-testid="search-input"
        />
        <button
          style={styles.filterButton}
          onClick={() => navigate('/filter')}
          data-testid="filter-button"
        >
          <SlidersHorizontal size={22} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Filter Chips */}
        <div style={styles.filterChips}>
          {filterChips.map((filter) => (
            <button
              key={filter}
              style={styles.chip}
              onClick={() => navigate('/filter')}
              data-testid={`filter-chip-${filter.toLowerCase()}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p style={styles.resultsCount} data-testid="results-count">
          Showing {featuredDesigns.length * 39} results
        </p>

        {/* Design Cards */}
        <div style={styles.designsList}>
          {featuredDesigns.map((design) => (
            <div
              key={design.id}
              style={styles.designCard}
              onClick={() => navigate(`/design/${design.id}`)}
              data-testid={`design-card-${design.id}`}
            >
              <div style={styles.imageContainer}>
                <img
                  src={design.image}
                  alt={design.name}
                  style={styles.designImage}
                />
                <button style={styles.likeButton} data-testid={`like-${design.id}`}>
                  <Heart size={18} color="#fff" />
                </button>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.designName}>{design.name}</h3>
                <p style={styles.workerName}>by {design.worker}</p>
                <div style={styles.cardFooter}>
                  <div style={styles.rating}>
                    <Star size={14} fill="#FFC107" color="#FFC107" />
                    <span style={styles.ratingText}>{design.rating}</span>
                  </div>
                  <p style={styles.price}>₹{(design.price / 1000).toFixed(0)}K</p>
                </div>
                <div style={styles.stats}>
                  <span style={styles.statItem}>
                    <Heart size={12} /> {design.likes}
                  </span>
                  <span style={styles.statItem}>
                    <Eye size={12} /> {design.views}
                  </span>
                </div>
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
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    color: '#13549d',
  },
  searchInput: {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
  },
  filterButton: {
    background: '#13549d',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
  },
  filterChips: {
    display: 'flex',
    gap: '8px',
    padding: '16px 20px',
    overflowX: 'auto',
  },
  chip: {
    padding: '8px 16px',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  resultsCount: {
    padding: '0 20px',
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px',
  },
  designsList: {
    padding: '0 20px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  designCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '140px',
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
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
  },
  cardContent: {
    padding: '12px',
  },
  designName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },
  workerName: {
    fontSize: '12px',
    color: '#999',
    margin: '0 0 8px 0',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  ratingText: {
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  },
  price: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  stats: {
    display: 'flex',
    gap: '12px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#999',
  },
};

export default SearchBrowse;
