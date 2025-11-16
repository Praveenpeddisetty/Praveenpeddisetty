import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Star, TrendingUp, Package, DollarSign, Users } from 'lucide-react';
import { workerProfile } from '../../data/workerMockData';
import BottomNav from '../../components/BottomNav';

const WorkerProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container" style={styles.container} data-testid="worker-profile-screen">
      <div style={styles.scrollContent}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <button
            style={styles.backButton}
            onClick={() => navigate(-1)}
            data-testid="back-button"
          >
            <ArrowLeft size={24} color="white" />
          </button>
          <div style={styles.profileImageContainer}>
            <img src={workerProfile.image} alt={workerProfile.name} style={styles.profileImage} />
            <button style={styles.editPhotoButton} data-testid="edit-photo-button">
              <Edit2 size={16} />
            </button>
          </div>
          <h2 style={styles.profileName}>{workerProfile.name}</h2>
          {workerProfile.username && (
            <p style={styles.profileUsername}>@{workerProfile.username}</p>
          )}
          <p style={styles.profileSpecialty}>{workerProfile.specialty}</p>
          <p style={styles.profileEmail}>{workerProfile.email}</p>
          <p style={styles.profilePhone}>{workerProfile.phone}</p>
          <button
            className="btn-secondary"
            style={styles.editProfileButton}
            onClick={() => navigate('/worker/edit-profile')}
            data-testid="edit-profile-button"
          >
            Edit Profile
          </button>
        </div>

        {/* Business Stats */}
        <div style={styles.statsCard}>
          <h3 style={styles.statsTitle}>Business Stats</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <Star size={20} color="#FFC107" />
              <p style={styles.statValue}>{workerProfile.rating}</p>
              <p style={styles.statLabel}>Rating</p>
            </div>
            <div style={styles.statItem}>
              <Package size={20} color="#13549d" />
              <p style={styles.statValue}>{workerProfile.totalOrders}</p>
              <p style={styles.statLabel}>Total Orders</p>
            </div>
            <div style={styles.statItem}>
              <TrendingUp size={20} color="#14ac84" />
              <p style={styles.statValue}>{workerProfile.completedOrders}</p>
              <p style={styles.statLabel}>Completed</p>
            </div>
            <div style={styles.statItem}>
              <DollarSign size={20} color="#f39c12" />
              <p style={styles.statValue}>₹{(workerProfile.totalRevenue / 1000).toFixed(0)}K</p>
              <p style={styles.statLabel}>Revenue</p>
            </div>
          </div>
        </div>

        {/* My Business */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>My Business</h3>
          <div style={styles.menuList}>
            <button style={styles.menuItem} onClick={() => navigate('/worker/my-designs')} data-testid="my-designs">
              <span>My Designs</span>
              <span style={styles.menuBadge}>45</span>
            </button>
            <button style={styles.menuItem} onClick={() => navigate('/worker/orders')} data-testid="orders">
              <span>Orders</span>
              <span style={styles.menuBadge}>{workerProfile.totalOrders}</span>
            </button>
            <button style={styles.menuItem} data-testid="reviews">
              <span>Reviews</span>
              <span style={styles.menuBadge}>128</span>
            </button>
            <button style={styles.menuItem} onClick={() => navigate('/worker/analytics')} data-testid="analytics">
              <span>Analytics</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Settings</h3>
          <div style={styles.menuList}>
            <button style={styles.menuItem} data-testid="shop-details">
              <span>Shop Details</span>
            </button>
            <button style={styles.menuItem} data-testid="notifications">
              <span>Notifications</span>
            </button>
            <button style={styles.menuItem} data-testid="payment-settings">
              <span>Payment Settings</span>
            </button>
            <button style={styles.menuItem} data-testid="help">
              <span>Help & Support</span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          style={styles.logoutButton}
          onClick={() => navigate('/login')}
          data-testid="logout-button"
        >
          Logout
        </button>

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
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
  },
  profileHeader: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    padding: '40px 20px',
    textAlign: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    background: 'rgba(0,0,0,0.3)',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
  },
  profileImageContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '16px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '4px solid white',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    color: '#13549d',
    display: 'flex',
  },
  profileName: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '4px',
  },
  profileUsername: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'monospace',
    marginBottom: '8px',
  },
  profileSpecialty: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '12px',
  },
  profileEmail: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '4px',
  },
  profilePhone: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '20px',
  },
  editProfileButton: {
    padding: '10px 32px',
  },
  statsCard: {
    background: 'white',
    margin: '16px',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  statsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '8px 0 4px',
  },
  statLabel: {
    fontSize: '11px',
    color: '#999',
    margin: 0,
  },
  section: {
    margin: '0 16px 20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  menuList: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  menuItem: {
    width: '100%',
    padding: '16px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#333',
    textAlign: 'left',
  },
  menuBadge: {
    background: '#f0f0f0',
    color: '#666',
    fontSize: '13px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  logoutButton: {
    margin: '0 16px 20px',
    width: 'calc(100% - 32px)',
    padding: '16px',
    background: 'white',
    border: '2px solid #e74c3c',
    borderRadius: '12px',
    color: '#e74c3c',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default WorkerProfile;
