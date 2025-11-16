import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Upload } from 'lucide-react';
import { workerOrders } from '../../data/workerMockData';

const WorkerOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = workerOrders.find((o) => o.id === id) || workerOrders[2];

  const statusActions = [
    { label: 'Quality Check', status: 'Quality Check' },
    { label: 'Ready for Delivery', status: 'Ready' },
    { label: 'Mark Completed', status: 'Completed' },
  ];

  return (
    <div className="mobile-container" style={styles.container} data-testid="worker-order-detail">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Order #{order.id}</h1>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Status Badge */}
        <div style={styles.statusBadge}>
          <span style={styles.statusText}>{order.status}</span>
        </div>

        {/* Customer Card */}
        <div style={styles.customerCard}>
          <img
            src={order.customerImage}
            alt={order.customerName}
            style={styles.customerImage}
          />
          <div style={styles.customerInfo}>
            <h3 style={styles.customerName}>{order.customerName}</h3>
            <p style={styles.customerPhone}>{order.customerPhone}</p>
            <p style={styles.customerLocation}>{order.customerLocation}</p>
          </div>
          <div style={styles.contactButtons}>
            <button
              style={styles.iconButton}
              onClick={() => navigate(`/chat/${order.id}`)}
              data-testid="chat-button"
            >
              <MessageCircle size={20} />
            </button>
            <button style={styles.iconButton} data-testid="call-button">
              <Phone size={20} />
            </button>
          </div>
        </div>

        {/* Order Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Order Information</h3>
          <div style={styles.infoCard}>
            <img
              src={order.designImage}
              alt={order.design}
              style={styles.designImage}
            />
            <div style={styles.infoDetails}>
              <h4 style={styles.designName}>{order.design}</h4>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Weight:</span>
                <span style={styles.infoValue}>{order.specifications.weight}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Purity:</span>
                <span style={styles.infoValue}>{order.specifications.purity}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Amount:</span>
                <span style={styles.infoValue}>₹{order.budget.toLocaleString()}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Due Date:</span>
                <span style={styles.dueDateValue}>{order.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Status */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Update Status</h3>
          <div style={styles.statusActions}>
            {statusActions.map((action) => (
              <button
                key={action.label}
                className="btn-secondary"
                style={styles.statusButton}
                data-testid={`status-${action.label.toLowerCase().replace(' ', '-')}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Request Payment */}
        <div style={styles.section}>
          <button
            className="btn-primary"
            style={styles.requestPaymentButton}
            onClick={() => navigate(`/worker/request-payment/${order.id}`)}
            data-testid="request-payment-button"
          >
            Request Payment from Customer
          </button>
        </div>

        {/* Add Update */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Add Update</h3>
          <textarea
            placeholder="Add a message for the customer..."
            style={styles.updateTextarea}
            data-testid="update-message"
          />
          <button style={styles.uploadButton} data-testid="upload-photo">
            <Upload size={20} />
            <span>Add Photos</span>
          </button>
          <button
            className="btn-primary"
            style={styles.sendUpdateButton}
            data-testid="send-update"
          >
            Send Update
          </button>
        </div>

        {/* Timeline */}
        {order.updates && order.updates.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Timeline</h3>
            <div style={styles.timeline}>
              {order.updates.map((update, index) => (
                <div key={index} style={styles.timelineItem}>
                  <div style={styles.timelineDot} />
                  <div style={styles.timelineContent}>
                    <p style={styles.timelineMessage}>{update.message}</p>
                    <p style={styles.timelineDate}>{update.date}</p>
                  </div>
                </div>
              ))}
            </div>
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
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  statusBadge: {
    background: '#13549d',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  statusText: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
  },
  customerCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  customerImage: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  customerPhone: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '2px',
  },
  customerLocation: {
    fontSize: '13px',
    color: '#999',
    margin: 0,
  },
  contactButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  iconButton: {
    background: '#f8f9fa',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    color: '#13549d',
    display: 'flex',
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
  infoCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  designImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  infoDetails: {
    flex: 1,
  },
  designName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  infoLabel: {
    fontSize: '13px',
    color: '#999',
  },
  infoValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },
  dueDateValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#f39c12',
  },
  statusActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statusButton: {
    width: '100%',
    padding: '12px',
  },
  updateTextarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    resize: 'vertical',
    fontFamily: 'inherit',
    marginBottom: '12px',
  },
  uploadButton: {
    width: '100%',
    padding: '12px',
    background: '#f8f9fa',
    border: '2px dashed #e0e0e0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#666',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  sendUpdateButton: {
    width: '100%',
  },
  timeline: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  timelineItem: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  timelineDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#13549d',
    marginTop: '6px',
  },
  timelineContent: {
    flex: 1,
  },
  timelineMessage: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '4px',
  },
  timelineDate: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
};

export default WorkerOrderDetail;
