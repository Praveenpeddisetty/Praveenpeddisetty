import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import * as Icons from 'lucide-react';
import { notifications } from '../../data/mockData';
import BottomNav from '../../components/BottomNav';

const Notifications = () => {
  const navigate = useNavigate();

  const groupedNotifications = notifications.reduce((acc, notif) => {
    if (!acc[notif.date]) {
      acc[notif.date] = [];
    }
    acc[notif.date].push(notif);
    return acc;
  }, {});

  const getIconComponent = (iconName) => {
    return Icons[iconName] || Icons.Bell;
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="notifications-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Notifications</h1>
        <button style={styles.settingsButton} data-testid="settings-button">
          <Settings size={22} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {Object.entries(groupedNotifications).map(([date, notifs]) => (
          <div key={date} style={styles.dateGroup}>
            <h3 style={styles.dateHeader} data-testid={`date-${date}`}>{date}</h3>
            {notifs.map((notif) => {
              const IconComponent = getIconComponent(notif.icon);
              return (
                <div
                  key={notif.id}
                  style={{
                    ...styles.notificationCard,
                    ...(notif.read ? {} : styles.unreadCard),
                  }}
                  data-testid={`notification-${notif.id}`}
                >
                  {!notif.read && <div style={styles.unreadDot} />}
                  <div style={styles.iconContainer}>
                    <IconComponent size={24} color="#13549d" />
                  </div>
                  <div style={styles.notifContent}>
                    <h4
                      style={{
                        ...styles.notifTitle,
                        ...(notif.read ? {} : styles.unreadTitle),
                      }}
                    >
                      {notif.title}
                    </h4>
                    <p style={styles.notifMessage}>{notif.message}</p>
                    <p style={styles.notifTime}>{notif.timestamp}</p>
                  </div>
                </div>
              );
            })}
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
  settingsButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#666',
    display: 'flex',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  dateGroup: {
    marginBottom: '24px',
  },
  dateHeader: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '12px',
    paddingLeft: '4px',
  },
  notificationCard: {
    position: 'relative',
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '8px',
    display: 'flex',
    gap: '12px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  unreadCard: {
    background: '#f0f8ff',
    borderLeft: '3px solid #13549d',
  },
  unreadDot: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#13549d',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notifMessage: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '6px',
  },
  notifTime: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
};

export default Notifications;
