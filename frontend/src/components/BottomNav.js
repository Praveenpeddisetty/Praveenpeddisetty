import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/consumer-home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/wishlist', icon: Plus, label: 'Add' },
    { path: '/chat/1', icon: MessageCircle, label: 'Messages' },
    { path: '/consumer-profile', icon: User, label: 'Profile' },
  ];

  return (
    <div style={styles.container} data-testid="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            style={{
              ...styles.navItem,
              ...(isActive ? styles.activeItem : {}),
            }}
            onClick={() => navigate(item.path)}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <Icon
              size={24}
              style={{ color: isActive ? '#13549d' : '#999' }}
            />
            <span style={isActive ? styles.activeLabel : styles.label}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: '375px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white',
    borderTop: '1px solid #e0e0e0',
    padding: '8px 0',
    zIndex: 100,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  label: {
    fontSize: '11px',
    color: '#999',
  },
  activeLabel: {
    fontSize: '11px',
    color: '#13549d',
    fontWeight: '600',
  },
};

export default BottomNav;
