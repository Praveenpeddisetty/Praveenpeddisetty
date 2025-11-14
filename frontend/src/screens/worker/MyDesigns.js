import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Eye, Heart, Star } from 'lucide-react';
import { workerDesigns } from '../../data/workerMockData';
import BottomNav from '../../components/BottomNav';

const MyDesigns = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const categories = ['all', 'rings', 'necklaces', 'earrings', 'bracelets', 'more'];

  return (
    <div className="mobile-container" style={styles.container} data-testid="my-designs-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>My Designs</h1>
        <div style={{ width: '32px' }} />
      </div>

      {/* Upload Button */}
      <div style={styles.uploadSection}>
        <button
          className="btn-primary"
          style={styles.uploadButton}
          onClick={() => navigate('/worker/upload-design')}
          data-testid="upload-new-design"
        >
          <Plus size={24} />
          <span>Upload New Design</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.tab,
              ...(activeTab === cat ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(cat)}
            data-testid={`tab-${cat}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Design Count */}
      <div style={styles.countSection}>
        <p style={styles.countText}>{workerDesigns.length} Designs</p>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {workerDesigns.map((design) => (
          <div
            key={design.id}
            style={styles.designCard}
            data-testid={`design-${design.id}`}
          >
            <img
              src={design.image}
              alt={design.name}
              style={styles.designImage}
              onClick={() => navigate(`/worker/edit-design/${design.id}`)}
            />
            <div style={styles.designInfo}>
              <h3 style={styles.designName}>{design.name}</h3>
              <div style={styles.statsRow}>
                <div style={styles.statItem}>
                  <Star size={14} fill="#FFC107" color="#FFC107" />
                  <span style={styles.statText}>{design.rating}</span>
                </div>
                <div style={styles.statItem}>
                  <Eye size={14} color="#666" />
                  <span style={styles.statText}>{design.views}</span>
                </div>
                <div style={styles.statItem}>
                  <Heart size={14} color="#666" />
                  <span style={styles.statText}>{design.likes}</span>
                </div>
              </div>
              <p style={styles.designPrice}>₹{design.basePrice.toLocaleString()}</p>
              <div style={styles.statusBadge}>
                {design.status}
              </div>
            </div>
            <div style={styles.designActions}>
              <button
                className="btn-secondary"
                style={styles.editButton}
                onClick={() => navigate(`/worker/edit-design/${design.id}`)}
                data-testid={`edit-${design.id}`}
              >
                Edit
              </button>
              <button
                style={styles.toggleButton}
                data-testid={`toggle-${design.id}`}
              >
                {design.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}

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
    justifyContent: 'space-between',
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
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  uploadSection: {
    padding: '16px 20px',
    background: 'white',
  },
  uploadButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
  },
  tabs: {
    display: 'flex',
    background: 'white',
    overflowX: 'auto',
    borderBottom: '1px solid #e0e0e0',
  },
  tab: {
    padding: '12px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '14px',
    fontWeight: '500',
    color: '#999',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  activeTab: {
    color: '#13549d',
    fontWeight: '600',
    borderBottom: '2px solid #13549d',
  },
  countSection: {
    padding: '12px 20px',
    background: 'white',
  },
  countText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    margin: 0,
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  designCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '12px',
    marginBottom: '12px',
    display: 'flex',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  designImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  designInfo: {
    flex: 1,
  },
  designName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '8px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  statText: {
    fontSize: '12px',
    color: '#666',
  },
  designPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#13549d',
    marginBottom: '8px',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    background: '#e8f5f1',
    color: '#14ac84',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '12px',
  },
  designActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'center',
  },
  editButton: {
    padding: '8px 16px',
    fontSize: '13px',
  },
  toggleButton: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#666',
    cursor: 'pointer',
  },
};

export default MyDesigns;
