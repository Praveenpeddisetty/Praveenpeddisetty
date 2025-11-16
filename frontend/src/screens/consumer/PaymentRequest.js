import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock payment request data
  const paymentRequest = {
    id: 'PR-2025-001',
    orderId: 'GG-2025-12345',
    design: 'Traditional Gold Ring',
    designImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    workerName: 'Rajesh Kumar',
    workerImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    requestDate: '2025-01-20',
    breakdown: {
      goldWeight: 6.5,
      goldRate: 6500,
      goldCost: 42250,
      makingCharges: 1500,
      additionalCharges: 500,
      additionalChargesDesc: 'Stone setting charges',
      gst: 3,
      gstAmount: 1327,
      total: 45577,
    },
    notes: 'Your order is ready for delivery. Please complete the payment to proceed.',
  };

  const handlePayNow = () => {
    // Payment processing logic
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/my-orders');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="mobile-container" style={styles.container}>
        <div style={styles.successContainer}>
          <CheckCircle size={80} color="#14ac84" style={styles.successIcon} />
          <h2 style={styles.successTitle}>Payment Successful!</h2>
          <p style={styles.successText}>Your payment has been processed successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container" style={styles.container} data-testid="payment-request-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Payment Request</h1>
        <div style={{ width: '32px' }} />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Alert Banner */}
        <div style={styles.alertBanner}>
          <AlertCircle size={20} color="#f39c12" />
          <p style={styles.alertText}>Payment request received from artisan</p>
        </div>

        {/* Worker Info */}
        <div style={styles.workerCard}>
          <img src={paymentRequest.workerImage} alt={paymentRequest.workerName} style={styles.workerImage} />
          <div>
            <p style={styles.workerLabel}>Request from</p>
            <h3 style={styles.workerName}>{paymentRequest.workerName}</h3>
          </div>
        </div>

        {/* Order Info */}
        <div style={styles.orderCard}>
          <p style={styles.orderNumber}>Order #{paymentRequest.orderId}</p>
          <div style={styles.orderInfo}>
            <img src={paymentRequest.designImage} alt={paymentRequest.design} style={styles.orderImage} />
            <div>
              <h3 style={styles.orderDesign}>{paymentRequest.design}</h3>
              <p style={styles.orderDate}>Requested on {paymentRequest.requestDate}</p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div style={styles.breakdownCard}>
          <h3 style={styles.sectionTitle}>Payment Breakdown</h3>
          
          <div style={styles.breakdownRow}>
            <span style={styles.breakdownLabel}>Gold Used</span>
            <span style={styles.breakdownValue}>{paymentRequest.breakdown.goldWeight}g @ ₹{paymentRequest.breakdown.goldRate}/g</span>
          </div>
          
          <div style={styles.breakdownRow}>
            <span style={styles.breakdownLabel}>Gold Cost</span>
            <span style={styles.breakdownValue}>₹{paymentRequest.breakdown.goldCost.toLocaleString()}</span>
          </div>
          
          <div style={styles.breakdownRow}>
            <span style={styles.breakdownLabel}>Making Charges</span>
            <span style={styles.breakdownValue}>₹{paymentRequest.breakdown.makingCharges.toLocaleString()}</span>
          </div>
          
          <div style={styles.breakdownRow}>
            <span style={styles.breakdownLabel}>{paymentRequest.breakdown.additionalChargesDesc}</span>
            <span style={styles.breakdownValue}>₹{paymentRequest.breakdown.additionalCharges.toLocaleString()}</span>
          </div>
          
          <div style={styles.breakdownRow}>
            <span style={styles.breakdownLabel}>GST (3%)</span>
            <span style={styles.breakdownValue}>₹{paymentRequest.breakdown.gstAmount.toLocaleString()}</span>
          </div>
          
          <div style={styles.divider} />
          
          <div style={styles.breakdownRow}>
            <span style={styles.totalLabel}>Total Amount</span>
            <span style={styles.totalValue} data-testid="total-amount"}>₹{paymentRequest.breakdown.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Notes */}
        {paymentRequest.notes && (
          <div style={styles.notesCard}>
            <h3 style={styles.sectionTitle}>Notes from Artisan</h3>
            <p style={styles.notesText}>{paymentRequest.notes}</p>
          </div>
        )}

        <div style={{ height: '100px' }} />
      </div>

      {/* Action Buttons */}
      <div style={styles.footer}>
        <button
          className="btn-primary"
          style={styles.payButton}
          onClick={handlePayNow}
          data-testid="pay-now-button"
        >
          Pay Now - ₹{paymentRequest.breakdown.total.toLocaleString()}
        </button>
        <button
          style={styles.contactButton}
          onClick={() => navigate(`/chat/${paymentRequest.orderId}`)}
          data-testid="contact-artisan-button"
        >
          Contact Artisan
        </button>
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
    justifyContent: 'space-between',
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
    padding: '16px',
  },
  alertBanner: {
    background: '#fff9e6',
    border: '1px solid #f39c12',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  alertText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    margin: 0,
  },
  workerCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  workerImage: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  workerLabel: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '4px',
  },
  workerName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  orderCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  orderNumber: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '12px',
  },
  orderInfo: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  orderImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  orderDesign: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  orderDate: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },
  breakdownCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  breakdownLabel: {
    fontSize: '14px',
    color: '#666',
  },
  breakdownValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: '1px',
    background: '#e0e0e0',
    margin: '16px 0',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#13549d',
  },
  notesCard: {
    background: '#e8f5f1',
    border: '1px solid #14ac84',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
  },
  notesText: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.6',
    margin: 0,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: '375px',
    margin: '0 auto',
    padding: '16px 20px',
    background: 'white',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  payButton: {
    width: '100%',
  },
  contactButton: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    border: '2px solid #13549d',
    borderRadius: '25px',
    color: '#13549d',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '40px',
    textAlign: 'center',
  },
  successIcon: {
    marginBottom: '24px',
    animation: 'pulse 1s ease-in-out',
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  successText: {
    fontSize: '16px',
    color: '#666',
  },
};

export default PaymentRequest;
