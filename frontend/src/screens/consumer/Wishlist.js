import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Star } from 'lucide-react';
import { wishlistItems } from '../../data/mockData';
import BottomNav from '../../components/BottomNav';

const Wishlist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="wishlist-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>My Wishlist</h1>
        <span style={styles.count} data-testid="wishlist-count"}>{items.length}</span>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Your wishlist is empty</p>
            <button
              className="btn-primary"
              style={styles.browseButton}
              onClick={() => navigate('/search')}
              data-testid="browse-button"
            >
              Browse Designs
            </button>
          </div>
        ) : (
          <div style={styles.itemsList}>
            {items.map((item) => (
              <div
                key={item.id}
                style={styles.itemCard}
                data-testid={`wishlist-item-${item.id}`}
              >
                <div
                  style={styles.imageContainer}
                  onClick={() => navigate(`/design/${item.design.id}`)}
                >
                  <img
                    src={item.design.image}
                    alt={item.design.name}
                    style={styles.itemImage}
                  />
                  <button
                    style={styles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    data-testid={`remove-${item.id}`}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.design.name}</h3>
                  <p style={styles.workerName}>by {item.design.worker}</p>
                  <div style={styles.itemFooter}>
                    <div style={styles.rating}>
                      <Star size={14} fill="#FFC107" color="#FFC107" />
                      <span style={styles.ratingText}>{item.design.rating}</span>
                    </div>
                    <p style={styles.price}>₹{(item.design.price / 1000).toFixed(0)}K</p>
                  </div>
                  <button
                    className="btn-primary"
                    style={styles.orderButton}
                    onClick={() => navigate(`/customize/${item.design.id}`)}
                    data-testid={`order-${item.id}`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#13549d',
    display: 'flex',
  },
  title: {
    flex: 1,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  count: {
    background: '#13549d',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  emptyText: {
    fontSize: '16px',
    color: '#999',
    marginBottom: '20px',
  },
  browseButton: {
    padding: '12px 32px',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  itemCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    cursor: 'pointer',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  itemInfo: {
    padding: '16px',
  },
  itemName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  workerName: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '12px',
  },
  itemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  ratingText: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  price: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  orderButton: {
    width: '100%',
  },
};

export default Wishlist;
