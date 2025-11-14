import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { workerOrders } from '../../data/workerMockData';
import BottomNav from '../../components/BottomNav';

const WorkerOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');

  const tabs = [
    { id: 'new', label: 'New', count: workerOrders.filter((o) => o.status === 'New').length },
    { id: 'active', label: 'Active', count: workerOrders.filter((o) => o.status === 'In Progress').length },
    { id: 'completed', label: 'Completed', count: workerOrders.filter((o) => o.status === 'Completed').length },
    { id: 'all', label: 'All', count: workerOrders.length },
  ];

  const getFilteredOrders = () => {
    if (activeTab === 'all') return workerOrders;
    if (activeTab === 'new') return workerOrders.filter((o) => o.status === 'New');
    if (activeTab === 'active') return workerOrders.filter((o) => o.status === 'In Progress');
    if (activeTab === 'completed') return workerOrders.filter((o) => o.status === 'Completed');
    return workerOrders;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return { background: '#e8f5f1', color: '#14ac84' };
      case 'In Progress':
        return { background: '#e3f2fd', color: '#1976d2' };
      case 'Completed':
        return { background: '#e8f5e9', color: '#388e3c' };
      default:
        return { background: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="worker-orders">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Orders</h1>
        <button style={styles.searchButton} data-testid="search-button">
          <Search size={22} />
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
            data-testid={`tab-${tab.id}`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span style={styles.tabBadge}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {getFilteredOrders().map((order) => {
          const statusStyle = getStatusStyle(order.status);

          return (
            <div
              key={order.id}
              style={{
                ...styles.orderCard,
                ...(order.status === 'New' ? styles.newOrderCard : {}),
              }}
              data-testid={`order-${order.id}`}
            >
              <div style={styles.orderHeader}>
                <p style={styles.orderNumber}>#{order.id}</p>
                <div style={{ ...styles.statusBadge, ...statusStyle }}>
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
                  <div style={styles.customerInfo}>
                    <img
                      src={order.customerImage}
                      alt={order.customerName}
                      style={styles.customerImage}
                    />
                    <div>
                      <p style={styles.customerName}>{order.customerName}</p>
                      <p style={styles.customerLocation}>{order.customerLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {order.status === 'New' && (
                <>
                  <div style={styles.specsSection}>
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Weight:</span>
                      <span style={styles.specValue}>{order.specifications.weight}</span>
                    </div>
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Purity:</span>
                      <span style={styles.specValue}>{order.specifications.purity}</span>
                    </div>
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Budget:</span>
                      <span style={styles.specValue}>₹{order.budget.toLocaleString()}</span>
                    </div>
                    <div style={styles.specItem}>
                      <span style={styles.specLabel}>Required By:</span>
                      <span style={styles.specValue}>{order.requiredBy}</span>
                    </div>
                  </div>

                  {order.customizationNotes && (
                    <div style={styles.notesSection}>
                      <p style={styles.notesLabel}>Customization Notes:</p>
                      <p style={styles.notesText}>{order.customizationNotes}</p>
                    </div>
                  )}

                  <div style={styles.orderActions}>
                    <button
                      className="btn-primary"
                      style={styles.acceptButton}
                      onClick={() => navigate(`/worker/order-accept/${order.id}`)}
                      data-testid={`accept-${order.id}`}
                    >
                      Accept Order
                    </button>
                    <button
                      style={styles.rejectButton}
                      data-testid={`reject-${order.id}`}
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}

              {order.status === 'In Progress' && (
                <div style={styles.activeActions}>
                  <p style={styles.dueDate}>Due: {order.dueDate}</p>
                  <div style={styles.actionButtons}>
                    <button
                      className="btn-primary"
                      style={styles.updateButton}
                      onClick={() => navigate(`/worker/order-detail/${order.id}`)}
                      data-testid={`update-${order.id}`}
                    >
                      Update Status
                    </button>
                    <button
                      className="btn-secondary"
                      style={styles.contactButton}
                      onClick={() => navigate(`/chat/${order.id}`)}
                      data-testid={`contact-${order.id}`}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              )}

              {order.status === 'Completed' && (
                <div style={styles.completedSection}>
                  <div style={styles.completedInfo}>
                    <p style={styles.deliveredText}>Delivered on {order.deliveredDate}</p>
                    <div style={styles.ratingDisplay}>
                      <span style={styles.ratingIcon}>⭐</span>
                      <span style={styles.ratingValue}>{order.rating}/5</span>
                    </div>
                  </div>
                  <button
                    className="btn-secondary"
                    style={styles.viewButton}
                    onClick={() => navigate(`/worker/order-detail/${order.id}`)}
                    data-testid={`view-${order.id}`}
                  >
                    View Details
                  </button>
                </div>
              )}
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
    flex: 1,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  searchButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#666',
    display: 'flex',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  activeTab: {
    color: '#13549d',
    fontWeight: '600',
    borderBottom: '2px solid #13549d',
  },
  tabBadge: {
    background: '#e74c3c',
    color: 'white',
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '10px',
    minWidth: '18px',
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
  newOrderCard: {
    border: '2px solid #14ac84',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  orderNumber: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
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
    marginBottom: '8px',
  },
  customerInfo: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  customerImage: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  customerName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '2px',
  },
  customerLocation: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
  specsSection: {
    background: '#f8f9fa',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '12px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  specLabel: {
    fontSize: '12px',
    color: '#999',
  },
  specValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  notesSection: {
    background: '#fff9e6',
    border: '1px solid #f39c12',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '12px',
  },
  notesLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#f39c12',
    marginBottom: '4px',
  },
  notesText: {
    fontSize: '13px',
    color: '#666',
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
  activeActions: {
    borderTop: '1px solid #f0f0f0',
    paddingTop: '12px',
  },
  dueDate: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#f39c12',
    marginBottom: '8px',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  updateButton: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
  },
  contactButton: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
  },
  completedSection: {
    borderTop: '1px solid #f0f0f0',
    paddingTop: '12px',
  },
  completedInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  deliveredText: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },
  ratingDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  ratingIcon: {
    fontSize: '16px',
  },
  ratingValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  viewButton: {
    width: '100%',
    padding: '10px',
  },
};

export default WorkerOrders;
