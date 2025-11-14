import { useNavigate } from 'react-router-dom';
import { Menu, Bell, TrendingUp, Package, AlertCircle, Upload, BarChart3, MessageCircle, Settings } from 'lucide-react';
import { workerProfile, todayOverview, workerAnalytics, workerOrders } from '../../data/workerMockData';
import BottomNav from '../../components/BottomNav';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const newOrders = workerOrders.filter((o) => o.status === 'New');
  const activeOrders = workerOrders.filter((o) => o.status === 'In Progress');

  const quickActions = [
    { icon: Upload, label: 'Upload Design', path: '/worker/upload-design', color: '#13549d' },
    { icon: BarChart3, label: 'View Stats', path: '/worker/analytics', color: '#14ac84' },
    { icon: MessageCircle, label: 'Messages', path: '/chat/1', color: '#f39c12' },
    { icon: Settings, label: 'Settings', path: '/worker/profile', color: '#666' },
  ];

  return (
    <div className="mobile-container" style={styles.container} data-testid="worker-dashboard">
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.iconButton} data-testid="menu-button">
          <Menu size={24} color="#1a1a1a" />
        </button>
        <h1 style={styles.logo}>Golden Gehna</h1>
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
            onClick={() => navigate('/worker/profile')}
            data-testid="profile-button"
          >
            <img src={workerProfile.image} alt="Profile" style={styles.profilePic} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Welcome Section */}
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeText}>Welcome back, {workerProfile.name.split(' ')[0]}!</h2>
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>⭐</span>
              <span style={styles.statValue}>{workerProfile.rating}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Orders</span>
              <span style={styles.statValue}>{workerProfile.totalOrders}+</span>
            </div>
          </div>
        </div>

        {/* Today's Overview */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Today's Overview</h3>
          <div style={styles.overviewGrid}>
            <div style={styles.overviewCard}>
              <TrendingUp size={24} color="#13549d" />
              <p style={styles.overviewValue}>{todayOverview.newLeads}</p>
              <p style={styles.overviewLabel}>New Leads</p>
            </div>
            <div style={styles.overviewCard}>
              <Package size={24} color="#14ac84" />
              <p style={styles.overviewValue}>{todayOverview.activeOrders}</p>
              <p style={styles.overviewLabel}>Active Orders</p>
            </div>
            <div style={styles.overviewCard}>
              <AlertCircle size={24} color="#f39c12" />
              <p style={styles.overviewValue}>{todayOverview.pendingTasks}</p>
              <p style={styles.overviewLabel}>Pending Tasks</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={styles.statsCard}>
          <div style={styles.statsHeader}>
            <h3 style={styles.statsTitle}>This Month</h3>
            <button
              style={styles.viewAnalyticsButton}
              onClick={() => navigate('/worker/analytics')}
              data-testid="view-analytics"
            >
              View Analytics
            </button>
          </div>
          <div style={styles.statsGrid}>
            <div style={styles.statsItem}>
              <p style={styles.statsLabel}>Revenue</p>
              <p style={styles.statsValue}>₹{workerAnalytics.thisMonth.revenue.toLocaleString()}</p>
            </div>
            <div style={styles.statsItem}>
              <p style={styles.statsLabel}>Orders</p>
              <p style={styles.statsValue}>{workerAnalytics.thisMonth.orders}</p>
            </div>
            <div style={styles.statsItem}>
              <p style={styles.statsLabel}>Rating</p>
              <p style={styles.statsValue}>⭐ {workerAnalytics.thisMonth.rating}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Recent Orders</h3>
            <button
              style={styles.seeAllButton}
              onClick={() => navigate('/worker/orders')}
              data-testid="see-all-orders"
            >
              See All
            </button>
          </div>

          {/* New Orders */}
          {newOrders.slice(0, 1).map((order) => (
            <div
              key={order.id}
              style={{ ...styles.orderCard, ...styles.newOrderCard }}
              data-testid={`order-${order.id}`}
            >
              <div style={styles.newBadge}>NEW</div>
              <div style={styles.orderContent}>
                <img src={order.designImage} alt={order.design} style={styles.orderImage} />
                <div style={styles.orderInfo}>
                  <p style={styles.orderNumber}>#{order.id}</p>
                  <h4 style={styles.orderDesign}>{order.design}</h4>
                  <p style={styles.orderCustomer}>{order.customerName}</p>
                  <p style={styles.orderAmount}>₹{order.budget.toLocaleString()}</p>
                </div>
              </div>
              <div style={styles.orderActions}>
                <button
                  className="btn-primary"
                  style={styles.acceptButton}
                  onClick={() => navigate(`/worker/order-accept/${order.id}`)}
                  data-testid="accept-order"
                >
                  Accept Order
                </button>
                <button
                  style={styles.rejectButton}
                  data-testid="reject-order"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {/* Active Orders */}
          {activeOrders.slice(0, 1).map((order) => (
            <div
              key={order.id}
              style={styles.orderCard}
              data-testid={`order-${order.id}`}
            >
              <div style={styles.inProgressBadge}>IN PROGRESS</div>
              <div style={styles.orderContent}>
                <img src={order.designImage} alt={order.design} style={styles.orderImage} />
                <div style={styles.orderInfo}>
                  <p style={styles.orderNumber}>#{order.id}</p>
                  <h4 style={styles.orderDesign}>{order.design}</h4>
                  <p style={styles.orderCustomer}>{order.customerName}</p>
                  <p style={styles.orderDueDate}>Due: {order.dueDate}</p>
                </div>
              </div>
              <button
                className="btn-secondary"
                style={styles.viewDetailsButton}
                onClick={() => navigate(`/worker/order-detail/${order.id}`)}
                data-testid="view-details"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.label}
                  style={styles.actionCard}
                  onClick={() => navigate(action.path)}
                  data-testid={`action-${action.label.toLowerCase().replace(' ', '-')}`}
                >
                  <div style={{ ...styles.actionIcon, background: `${action.color}20` }}>
                    <Icon size={24} color={action.color} />
                  </div>
                  <p style={styles.actionLabel}>{action.label}</p>
                </div>
              );
            })}
          </div>
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
    padding: '16px',
  },
  welcomeCard: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
  },
  welcomeText: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '12px',
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statIcon: {
    fontSize: '20px',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.8)',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
  },
  statDivider: {
    width: '1px',
    height: '30px',
    background: 'rgba(255,255,255,0.3)',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  seeAllButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  overviewCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  overviewValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '8px 0 4px',
  },
  overviewLabel: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
  statsCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  statsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  statsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  viewAnalyticsButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  statsItem: {
    textAlign: 'center',
  },
  statsLabel: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '4px',
  },
  statsValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  orderCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  newOrderCard: {
    border: '2px solid #14ac84',
  },
  newBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#14ac84',
    color: 'white',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  inProgressBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#13549d',
    color: 'white',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  orderContent: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
  },
  orderImage: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '4px',
  },
  orderDesign: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  orderCustomer: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '4px',
  },
  orderAmount: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  orderDueDate: {
    fontSize: '13px',
    color: '#f39c12',
    fontWeight: '600',
    margin: 0,
  },
  orderActions: {
    display: 'flex',
    gap: '8px',
  },
  acceptButton: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
  },
  rejectButton: {
    flex: 1,
    background: 'transparent',
    border: '2px solid #e74c3c',
    borderRadius: '25px',
    padding: '10px',
    color: '#e74c3c',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  viewDetailsButton: {
    width: '100%',
    padding: '10px',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  actionCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px 8px',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  actionIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
  },
  actionLabel: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
    margin: 0,
  },
};

export default WorkerDashboard;
