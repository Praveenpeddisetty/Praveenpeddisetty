import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { featuredDesigns } from '../../data/mockData';

const OrderCustomization = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const design = featuredDesigns.find((d) => d.id === parseInt(id)) || featuredDesigns[0];

  const [specs, setSpecs] = useState({
    weight: '6',
    purity: '22K',
    size: '16',
  });
  const [notes, setNotes] = useState('');

  const goldRate = 6500; // per gram
  const makingChargeRate = 0.15; // 15%
  const gstRate = 0.03; // 3%

  const weight = parseInt(specs.weight);
  const goldCost = weight * goldRate;
  const makingCharges = goldCost * makingChargeRate;
  const gst = (goldCost + makingCharges) * gstRate;
  const totalAmount = goldCost + makingCharges + gst;

  const handlePlaceOrder = () => {
    navigate('/order-confirmation', { state: { orderId: 'GG-2025-12345', design: design.name, amount: totalAmount } });
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="customize-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Customize Order</h1>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Selected Design */}
        <div style={styles.designCard}>
          <img src={design.image} alt={design.name} style={styles.designImage} />
          <div style={styles.designInfo}>
            <h3 style={styles.designName} data-testid="design-name">{design.name}</h3>
            <p style={styles.basePrice}>Base Price: ₹{design.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Specifications */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Specifications</h3>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Gold Weight (grams)</label>
            <select
              value={specs.weight}
              onChange={(e) => setSpecs({ ...specs, weight: e.target.value })}
              style={styles.select}
              data-testid="weight-select"
            >
              <option value="5">5 grams</option>
              <option value="6">6 grams</option>
              <option value="7">7 grams</option>
              <option value="8">8 grams</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Gold Purity</label>
            <select
              value={specs.purity}
              onChange={(e) => setSpecs({ ...specs, purity: e.target.value })}
              style={styles.select}
              data-testid="purity-select"
            >
              <option value="22K">22K</option>
              <option value="18K">18K</option>
              <option value="14K">14K</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Ring Size</label>
            <select
              value={specs.size}
              onChange={(e) => setSpecs({ ...specs, size: e.target.value })}
              style={styles.select}
              data-testid="size-select"
            >
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
            </select>
          </div>
        </div>

        {/* Customization Notes */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Special Requirements (Optional)</h3>
          <textarea
            placeholder="Add any special instructions or customization requests..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={styles.textarea}
            data-testid="notes-textarea"
          />
        </div>

        {/* Upload Reference */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Upload Reference (Optional)</h3>
          <button style={styles.uploadButton} data-testid="upload-button">
            <Upload size={20} />
            <span>Add Photos</span>
          </button>
          <p style={styles.uploadHint}>Upload reference images to help the artisan</p>
        </div>

        {/* Price Breakdown */}
        <div style={styles.priceBox}>
          <h3 style={styles.priceBoxTitle}>Price Breakdown</h3>
          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Gold Cost ({weight}g × ₹{goldRate})</span>
            <span style={styles.priceValue}>₹{goldCost.toLocaleString()}</span>
          </div>
          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Making Charges (15%)</span>
            <span style={styles.priceValue}>₹{makingCharges.toLocaleString()}</span>
          </div>
          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>GST (3%)</span>
            <span style={styles.priceValue}>₹{Math.round(gst).toLocaleString()}</span>
          </div>
          <div style={styles.priceDivider} />
          <div style={styles.priceRow}>
            <span style={styles.totalLabel}>Total Amount</span>
            <span style={styles.totalValue} data-testid="total-amount">₹{Math.round(totalAmount).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ height: '100px' }} />
      </div>

      {/* CTA Button */}
      <div style={styles.footer}>
        <button
          className="btn-primary"
          style={styles.placeOrderButton}
          onClick={handlePlaceOrder}
          data-testid="place-order-button"
        >
          Place Order
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
  designCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  designImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  designInfo: {
    flex: 1,
  },
  designName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  basePrice: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  section: {
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
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    background: 'white',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  uploadButton: {
    width: '100%',
    padding: '16px',
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
    marginBottom: '8px',
  },
  uploadHint: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    margin: 0,
  },
  priceBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  priceBoxTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  priceLabel: {
    fontSize: '14px',
    color: '#666',
  },
  priceValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  priceDivider: {
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
  placeOrderButton: {
    width: '100%',
  },
};

export default OrderCustomization;
