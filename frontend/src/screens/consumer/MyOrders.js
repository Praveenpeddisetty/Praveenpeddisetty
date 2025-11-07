import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { orders } from '../../data/mockData';
import BottomNav from '../../components/BottomNav';

const MyOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = ['all', 'pending', 'active', 'done'];

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return { background: '#e3f2fd', color: '#1976d2' };
      case 'pending':
        return { background: '#fff3e0', color: '#f57c00' };
      case 'delivered':
        return { background: '#e8f5e9', color: '#388e3c' };
      default:
        return { background: '#f5f5f5', color: '#666' };
    }
  };

  const getActionButton = (order) => {
    switch (order.status.toLowerCase()) {
      case 'in progress':
        return {
          label: 'Track Order',
          action: () => navigate(`/order-tracking/${order.id}`),
        };
      case 'pending':
        return {
          label: 'View Details',
          action: () => navigate(`/order-tracking/${order.id}`),
        };
      case 'delivered':
        return {
          label: 'Rate Order',
          action: () => navigate(`/rate-review/${order.id}`),
        };
      default:
        return {
          label: 'View',
          action: () => navigate(`/order-tracking/${order.id}`),
        };
    }
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="my-orders">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>My Orders</h1>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(tab)}
            data-testid={`tab-${tab}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {orders.map((order) => {
          const statusStyle = getStatusStyle(order.status);
          const actionButton = getActionButton(order);

          return (
            <div
              key={order.id}
              style={styles.orderCard}
              data-testid={`order-card-${order.id}`}
            >
              <div style={styles.orderHeader}>
                <div>
                  <p style={styles.orderNumber} data-testid={`order-number-${order.id}`}>Order #{order.id}</p>
                  <p style={styles.orderDate}>{order.placedDate}</p>
                </div>
                <div
                  style={{ ...styles.statusBadge, ...statusStyle }}
                  data-testid={`status-${order.id}`}
                >
                  {order.status}
                </div>
              </div>

              <div style={styles.orderContent}>
                <img
                  src={order.designImage}
                  alt={order.design}
                  style={styles.orderImage}
                />
                <div style={styles.orderInfo}>
                  <h3 style={styles.designName}>{order.design}</h3>
                  <p style={styles.workerName}>by {order.worker}</p>
                  <p style={styles.orderAmount}>₹{order.amount.toLocaleString()}</p>
                </div>
              </div>

              <div style={styles.orderFooter}>
                <p style={styles.deliveryDate}>
                  {order.status === 'Delivered'
                    ? `Delivered on ${order.deliveredDate}`
                    : `Expected: ${order.expectedDate}`}
                </p>
                <button
                  className="btn-primary"
                  style={styles.actionButton}
                  onClick={actionButton.action}
                  data-testid={`action-${order.id}`}
                >
                  {actionButton.label}
                </button>
              </div>
            </div>
          );
        })}

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
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  tabs: {
    display: 'flex',
    background: 'white',
    borderBottom: '1px solid #e0e0e0',
  },
  tab: {
    flex: 1,
    padding: '14px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '14px',
    fontWeight: '500',
    color: '#999',
    cursor: 'pointer',
  },
  activeTab: {
    color: '#13549d',
    fontWeight: '600',
    borderBottom: '2px solid #13549d',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  orderCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  orderNumber: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  orderDate: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  orderContent: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
  },
  orderImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  orderInfo: {
    flex: 1,
  },
  designName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  workerName: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '8px',
  },
  orderAmount: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #f0f0f0',
  },
  deliveryDate: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },
  actionButton: {
    padding: '8px 16px',
    fontSize: '13px',
  },
};

export default MyOrders;
