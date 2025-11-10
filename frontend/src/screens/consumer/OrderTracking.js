import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, MessageCircle, Phone } from 'lucide-react';
import { orders, topWorkers } from '../../data/mockData';

const OrderTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = orders.find((o) => o.id === id) || orders[0];
  const worker = topWorkers.find((w) => w.id === order.workerId) || topWorkers[0];

  const getCurrentStep = () => {
    const timeline = order.timeline;
    if (!timeline) return 0;
    return timeline.findIndex((step) => !step.completed);
  };

  const currentStep = getCurrentStep();

  return (
    <div className="mobile-container" style={styles.container} data-testid="order-tracking">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Track Order</h1>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Order Number */}
        <div style={styles.orderNumberBox}>
          <p style={styles.orderNumberLabel}>Order Number</p>
          <h2 style={styles.orderNumber} data-testid="order-number">{order.id}</h2>
        </div>

        {/* Status Timeline */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Order Status</h3>
          <div style={styles.timeline}>
            {order.timeline && order.timeline.map((step, index) => {
              const isCompleted = step.completed;
              const isCurrent = index === currentStep;
              const isPending = !isCompleted && !isCurrent;

              return (
                <div key={index} style={styles.timelineItem} data-testid={`timeline-step-${index}`}>
                  <div style={styles.timelineIconContainer}>
                    {isCompleted && (
                      <div style={styles.completedIcon}>
                        <CheckCircle size={24} color="#14ac84" />
                      </div>
                    )}
                    {isCurrent && (
                      <div style={styles.currentIcon}>
                        <Circle size={24} color="#13549d" fill="#13549d" />
                      </div>
                    )}
                    {isPending && (
                      <div style={styles.pendingIcon}>
                        <Circle size={24} color="#ccc" />
                      </div>
                    )}
                    {index < (order.timeline?.length - 1 || 0) && (
                      <div
                        style={{
                          ...styles.timelineLine,
                          background: isCompleted ? '#14ac84' : '#e0e0e0',
                        }}
                      />
                    )}
                  </div>
                  <div style={styles.timelineContent}>
                    <p
                      style={{
                        ...styles.timelineTitle,
                        color: isCompleted || isCurrent ? '#1a1a1a' : '#999',
                      }}
                    >
                      {step.status}
                    </p>
                    {step.date && (
                      <p style={styles.timelineDate}>{step.date}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expected Delivery */}
        <div style={styles.deliveryBox}>
          <p style={styles.deliveryLabel}>Expected Delivery</p>
          <p style={styles.deliveryDate} data-testid="expected-date">{order.expectedDate}</p>
        </div>

        {/* Worker Card */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Worker Details</h3>
          <div style={styles.workerCard}>
            <img
              src={worker.image}
              alt={worker.name}
              style={styles.workerImage}
            />
            <div style={styles.workerInfo}>
              <h4 style={styles.workerName}>{worker.name}</h4>
              <p style={styles.workerLocation}>{worker.location}</p>
            </div>
            <div style={styles.workerActions}>
              <button
                style={styles.iconButton}
                onClick={() => navigate(`/chat/${worker.id}`)}
                data-testid="chat-button"
              >
                <MessageCircle size={20} color="#13549d" />
              </button>
              <button
                style={styles.iconButton}
                data-testid="call-button"
              >
                <Phone size={20} color="#13549d" />
              </button>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Order Details</h3>
          <div style={styles.detailsCard}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Design</span>
              <span style={styles.detailValue}>{order.design}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Amount</span>
              <span style={styles.detailValue}>₹{order.amount.toLocaleString()}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Order Date</span>
              <span style={styles.detailValue}>{order.placedDate}</span>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        {order.updates && order.updates.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Recent Updates</h3>
            <div style={styles.updatesCard}>
              {order.updates.map((update, index) => (
                <div key={index} style={styles.updateItem}>
                  <div style={styles.updateDot} />
                  <div>
                    <p style={styles.updateMessage}>{update.message}</p>
                    <p style={styles.updateDate}>{update.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancel Order */}
        {order.status !== 'Delivered' && (
          <div style={styles.cancelSection}>
            <button
              style={styles.cancelButton}
              data-testid="cancel-order-button"
            >
              Cancel Order
            </button>
          </div>
        )}

        <div style={{ height: '40px' }} />
      </div>
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
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  orderNumberBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  orderNumberLabel: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '4px',
  },
  orderNumber: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  timeline: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  timelineItem: {
    display: 'flex',
    gap: '16px',
    position: 'relative',
  },
  timelineIconContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  completedIcon: {
    display: 'flex',
  },
  currentIcon: {
    display: 'flex',
  },
  pendingIcon: {
    display: 'flex',
  },
  timelineLine: {
    width: '2px',
    height: '40px',
    marginTop: '4px',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '20px',
  },
  timelineTitle: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  timelineDate: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
  deliveryBox: {
    background: '#e8f5f1',
    border: '1px solid #14ac84',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  deliveryLabel: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '4px',
  },
  deliveryDate: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#14ac84',
    margin: 0,
  },
  workerCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  workerImage: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  workerLocation: {
    fontSize: '13px',
    color: '#999',
    margin: 0,
  },
  workerActions: {
    display: 'flex',
    gap: '8px',
  },
  iconButton: {
    background: '#f8f9fa',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
  },
  detailsCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  detailLabel: {
    fontSize: '14px',
    color: '#666',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  updatesCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  updateItem: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  updateDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#13549d',
    marginTop: '6px',
  },
  updateMessage: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '4px',
  },
  updateDate: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
  cancelSection: {
    textAlign: 'center',
  },
  cancelButton: {
    background: 'transparent',
    border: 'none',
    color: '#e74c3c',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default OrderTracking;
