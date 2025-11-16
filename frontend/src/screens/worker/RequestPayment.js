import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { workerOrders } from '../../data/workerMockData';

const RequestPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = workerOrders.find((o) => o.id === id) || workerOrders[2];

  const [paymentData, setPaymentData] = useState({
    goldCost: '',
    goldWeight: '',
    goldRate: 6500,
    makingCharges: '',
    gst: 3,
    additionalCharges: '',
    additionalChargesDesc: '',
    notes: '',
  });

  const calculateTotal = () => {
    const goldCost = parseFloat(paymentData.goldCost) || 0;
    const makingCharges = parseFloat(paymentData.makingCharges) || 0;
    const additionalCharges = parseFloat(paymentData.additionalCharges) || 0;
    const subtotal = goldCost + makingCharges + additionalCharges;
    const gstAmount = (subtotal * paymentData.gst) / 100;
    return subtotal + gstAmount;
  };

  const handleWeightChange = (e) => {
    const weight = parseFloat(e.target.value) || 0;
    const goldCost = weight * paymentData.goldRate;
    setPaymentData({
      ...paymentData,
      goldWeight: e.target.value,
      goldCost: goldCost.toFixed(0),
    });
  };

  const handleSendRequest = () => {
    // Send payment request logic
    alert('Payment request sent successfully!');
    navigate(`/worker/order-detail/${order.id}`);
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="request-payment-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Request Payment</h1>
        <div style={{ width: '32px' }} />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Order Info */}
        <div style={styles.orderCard}>
          <p style={styles.orderNumber}>Order #{order.id}</p>
          <div style={styles.orderInfo}>
            <img src={order.designImage} alt={order.design} style={styles.orderImage} />
            <div>
              <h3 style={styles.orderDesign}>{order.design}</h3>
              <p style={styles.customerName}>{order.customerName}</p>
            </div>
          </div>
        </div>

        {/* Payment Details Form */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Payment Breakdown</h3>

          <div className="input-group">
            <label className="input-label">Gold Weight Used (grams) *</label>
            <input
              type="number"
              step="0.1"
              className="input-field"
              placeholder="e.g. 6.5"
              value={paymentData.goldWeight}
              onChange={handleWeightChange}
              data-testid="gold-weight-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Gold Rate per gram (₹)</label>
            <input
              type="number"
              className="input-field"
              value={paymentData.goldRate}
              onChange={(e) => {
                const rate = parseFloat(e.target.value) || 0;
                const weight = parseFloat(paymentData.goldWeight) || 0;
                const goldCost = weight * rate;
                setPaymentData({
                  ...paymentData,
                  goldRate: e.target.value,
                  goldCost: goldCost.toFixed(0),
                });
              }}
              data-testid="gold-rate-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Gold Cost (₹)</label>
            <input
              type="number"
              className="input-field"
              value={paymentData.goldCost}
              onChange={(e) => setPaymentData({ ...paymentData, goldCost: e.target.value })}
              data-testid="gold-cost-input"
              style={styles.calculatedField}
              readOnly
            />
          </div>

          <div className="input-group">
            <label className="input-label">Making Charges (₹) *</label>
            <input
              type="number"
              className="input-field"
              placeholder="e.g. 1500"
              value={paymentData.makingCharges}
              onChange={(e) => setPaymentData({ ...paymentData, makingCharges: e.target.value })}
              data-testid="making-charges-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Additional Charges (Optional)</label>
            <input
              type="number"
              className="input-field"
              placeholder="e.g. 500"
              value={paymentData.additionalCharges}
              onChange={(e) => setPaymentData({ ...paymentData, additionalCharges: e.target.value })}
              data-testid="additional-charges-input"
            />
          </div>

          {paymentData.additionalCharges && (
            <div className="input-group">
              <label className="input-label">Additional Charges Description</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Stone setting charges"
                value={paymentData.additionalChargesDesc}
                onChange={(e) => setPaymentData({ ...paymentData, additionalChargesDesc: e.target.value })}
                data-testid="additional-desc-input"
              />
            </div>
          )}

          <div className="input-group">
            <label className="input-label">GST (%)</label>
            <input
              type="number"
              className="input-field"
              value={paymentData.gst}
              onChange={(e) => setPaymentData({ ...paymentData, gst: parseFloat(e.target.value) || 0 })}
              data-testid="gst-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Notes for Customer</label>
            <textarea
              className="input-field"
              style={styles.textarea}
              placeholder="Add any notes or payment instructions..."
              value={paymentData.notes}
              onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              data-testid="notes-textarea"
            />
          </div>
        </div>

        {/* Payment Summary */}
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryTitle}>Payment Summary</h3>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Gold Cost</span>
            <span style={styles.summaryValue}>₹{parseFloat(paymentData.goldCost || 0).toLocaleString()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Making Charges</span>
            <span style={styles.summaryValue}>₹{parseFloat(paymentData.makingCharges || 0).toLocaleString()}</span>
          </div>
          {paymentData.additionalCharges && (
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>
                {paymentData.additionalChargesDesc || 'Additional Charges'}
              </span>
              <span style={styles.summaryValue}>₹{parseFloat(paymentData.additionalCharges).toLocaleString()}</span>
            </div>
          )}
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>GST ({paymentData.gst}%)</span>
            <span style={styles.summaryValue}>
              ₹{(((parseFloat(paymentData.goldCost || 0) + parseFloat(paymentData.makingCharges || 0) + parseFloat(paymentData.additionalCharges || 0)) * paymentData.gst) / 100).toLocaleString()}
            </span>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryRow}>
            <span style={styles.totalLabel}>Total Amount</span>
            <span style={styles.totalValue} data-testid="total-amount"}>₹{Math.round(calculateTotal()).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ height: '100px' }} />
      </div>

      {/* Send Request Button */}
      <div style={styles.footer}>
        <button
          className="btn-primary"
          style={styles.sendButton}
          onClick={handleSendRequest}
          disabled={!paymentData.goldWeight || !paymentData.makingCharges}
          data-testid="send-request-button"
        >
          <DollarSign size={20} />
          <span>Send Payment Request</span>
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
  customerName: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  formSection: {
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
  calculatedField: {
    background: '#f8f9fa',
    color: '#666',
  },
  textarea: {
    minHeight: '80px',
    resize: 'vertical',
  },
  summaryCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#666',
  },
  summaryValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  summaryDivider: {
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
  },
  sendButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};

export default RequestPayment;
