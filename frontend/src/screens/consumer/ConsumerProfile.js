import { useNavigate } from 'react-router-dom';
import { Edit2, Package, Heart, Star, MapPin, Bell, Shield, CreditCard, Globe, HelpCircle, FileText, Info, LogOut, ChevronRight } from 'lucide-react';
import BottomNav from '../../components/BottomNav';

const ConsumerProfile = () => {
  const navigate = useNavigate();

  const activityCards = [
    { icon: Package, label: 'My Orders', count: 12, path: '/my-orders', testId: 'my-orders' },
    { icon: Heart, label: 'Wishlist', count: 5, path: '/wishlist', testId: 'wishlist' },
    { icon: Star, label: 'Reviews', count: 8, path: '#', testId: 'reviews' },
    { icon: MapPin, label: 'Addresses', count: 2, path: '#', testId: 'addresses' },
  ];

  const settingsItems = [
    { icon: Bell, label: 'Notifications', path: '/notifications', testId: 'notifications' },
    { icon: Shield, label: 'Privacy & Security', path: '#', testId: 'privacy' },
    { icon: CreditCard, label: 'Payment Methods', path: '#', testId: 'payment' },
    { icon: Globe, label: 'Language', path: '#', testId: 'language' },
    { icon: HelpCircle, label: 'Help & Support', path: '#', testId: 'help' },
    { icon: FileText, label: 'Terms & Conditions', path: '#', testId: 'terms' },
    { icon: Info, label: 'About App', path: '#', testId: 'about' },
  ];

  return (
    <div className="mobile-container" style={styles.container} data-testid="consumer-profile">
      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileImageContainer}>
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Profile"
              style={styles.profileImage}
            />
            <button style={styles.editButton} data-testid="edit-profile-button">
              <Edit2 size={16} />
            </button>
          </div>
          <h2 style={styles.userName} data-testid="user-name">Rahul Sharma</h2>
          <p style={styles.userEmail} data-testid="user-email">rahul.sharma@example.com</p>
          <p style={styles.userPhone} data-testid="user-phone">+91 98765 43210</p>
        </div>

        {/* My Activity */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>My Activity</h3>
          <div style={styles.activityGrid}>
            {activityCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={styles.activityCard}
                  onClick={() => navigate(item.path)}
                  data-testid={item.testId}
                >
                  <div style={styles.activityIcon}>
                    <Icon size={24} color="#13549d" />
                  </div>
                  <p style={styles.activityCount}>{item.count}</p>
                  <p style={styles.activityLabel}>{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Settings</h3>
          <div style={styles.settingsList}>
            {settingsItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  style={styles.settingItem}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  data-testid={item.testId}
                >
                  <div style={styles.settingIcon}>
                    <Icon size={20} color="#666" />
                  </div>
                  <span style={styles.settingLabel}>{item.label}</span>
                  <ChevronRight size={20} color="#ccc" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div style={styles.section}>
          <button
            style={styles.logoutButton}
            onClick={() => navigate('/login')}
            data-testid="logout-button"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
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
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
  },
  profileHeader: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    padding: '40px 20px',
    textAlign: 'center',
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
    objectFit: 'cover',
    border: '4px solid white',
  },
  editButton: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    color: '#13549d',
  },
  userName: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '4px',
  },
  userEmail: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '4px',
  },
  userPhone: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    margin: 0,
  },
  section: {
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  activityCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  activityIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #13549d15 0%, #14ac8415 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  activityCount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#13549d',
    marginBottom: '4px',
  },
  activityLabel: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  settingsList: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  settingItem: {
    width: '100%',
    padding: '16px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  settingIcon: {
    display: 'flex',
  },
  settingLabel: {
    flex: 1,
    fontSize: '15px',
    color: '#333',
  },
  logoutButton: {
    width: '100%',
    padding: '16px',
    background: 'white',
    border: '2px solid #e74c3c',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    color: '#e74c3c',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default ConsumerProfile;
