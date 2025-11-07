import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, User, Calendar } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId = 'GG-2025-12345', design = 'Traditional Gold Ring', amount = 15800 } = location.state || {};

  useEffect(() => {
    // Add animation class
    const icon = document.getElementById('success-icon');
    if (icon) {
      icon.style.animation = 'pulse 1s ease-in-out';
    }
  }, []);

  return (
    <div className="mobile-container" style={styles.container} data-testid="order-confirmation">
      <div style={styles.content}>
        {/* Success Icon */}
        <div style={styles.iconContainer} id="success-icon">
          <CheckCircle size={80} color="#14ac84" data-testid="success-icon" />
        </div>

        {/* Title */}
        <h1 style={styles.title} data-testid="success-title">Order Placed Successfully!</h1>
        <p style={styles.subtitle}>Your order has been sent to the artisan</p>

        {/* Order Number */}
        <div style={styles.orderNumberBox}>
          <p style={styles.orderNumberLabel}>Order Number</p>
          <h2 style={styles.orderNumber} data-testid="order-number"}>{orderId}</h2>
        </div>

        {/* Summary Card */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryRow}>
            <div style={styles.summaryIcon}>
              <Package size={20} color="#13549d" />
            </div>
            <div style={styles.summaryInfo}>
              <p style={styles.summaryLabel}>Design</p>
              <p style={styles.summaryValue} data-testid="design-name"}>{design}</p>
            </div>
          </div>

          <div style={styles.summaryRow}>
            <div style={styles.summaryIcon}>
              <User size={20} color="#13549d" />
            </div>
            <div style={styles.summaryInfo}>
              <p style={styles.summaryLabel}>Worker</p>
              <p style={styles.summaryValue}>Rajesh Kumar</p>
            </div>
          </div>

          <div style={styles.summaryRow}>
            <div style={styles.summaryIcon}>
              <Package size={20} color="#13549d" />
            </div>
            <div style={styles.summaryInfo}>
              <p style={styles.summaryLabel}>Amount Paid</p>
              <p style={styles.summaryValue} data-testid="amount"}>₹{amount.toLocaleString()}</p>
            </div>
          </div>

          <div style={styles.summaryRow}>
            <div style={styles.summaryIcon}>
              <Calendar size={20} color="#13549d" />
            </div>
            <div style={styles.summaryInfo}>
              <p style={styles.summaryLabel}>Expected Delivery</p>
              <p style={styles.summaryValue}>Jan 25, 2025</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div style={styles.messageBox}>
          <p style={styles.message}>
            Your order has been sent to the worker for confirmation. You will receive updates on your order status.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <button
            className="btn-primary"
            style={styles.primaryButton}
            onClick={() => navigate(`/order-tracking/${orderId}`)}
            data-testid="view-order-button"
          >
            View Order Details
          </button>
          <button
            className="btn-secondary"
            style={styles.secondaryButton}
            onClick={() => navigate('/consumer-home')}
            data-testid="back-home-button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  content: {
    width: '100%',
    maxWidth: '320px',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#666',
    marginBottom: '32px',
  },
  orderNumberBox: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
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
  summaryCard: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
  },
  summaryRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    textAlign: 'left',
  },
  summaryIcon: {
    width: '40px',
    height: '40px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryInfo: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '4px',
  },
  summaryValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  messageBox: {
    background: '#e8f5f1',
    border: '1px solid #14ac84',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '32px',
  },
  message: {
    fontSize: '13px',
    color: '#333',
    lineHeight: '1.5',
    margin: 0,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
};

export default OrderConfirmation;
