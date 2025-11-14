import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Image as ImageIcon, X } from 'lucide-react';

const UploadDesign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    photos: [],
    title: '',
    category: '',
    subCategory: '',
    description: '',
    basePrice: '',
    makingCharges: '',
    weightMin: 5,
    weightMax: 10,
    purity: [],
    estimatedCompletion: '',
    customizable: true,
    tags: '',
    additionalInfo: '',
    confirmOriginal: false,
  });

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants'];
  const purities = ['22K', '18K', '14K'];
  const completionTimes = ['3-5 days', '5-7 days', '7-10 days', '10-14 days', '14-21 days'];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate(-1);
  };

  const handleUpload = () => {
    // Upload logic
    navigate('/worker/my-designs');
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="upload-design-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={handleBack}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Upload Design</h1>
        <div style={{ width: '32px' }} />
      </div>

      {/* Progress Indicator */}
      <div style={styles.progressSection}>
        {[1, 2, 3].map((step) => (
          <div key={step} style={styles.progressItem}>
            <div
              style={{
                ...styles.progressDot,
                ...(step <= currentStep ? styles.activeDot : {}),
              }}
            >
              {step}
            </div>
            <span style={styles.progressLabel}>
              {step === 1 ? 'Photos' : step === 2 ? 'Info' : 'Details'}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Step 1 - Photos */}
        {currentStep === 1 && (
          <div style={styles.step}>
            <h3 style={styles.stepTitle}>Upload Photos (up to 8)</h3>
            <div style={styles.photoGrid}>
              {[...Array(8)].map((_, index) => (
                <div key={index} style={styles.photoSlot} data-testid={`photo-slot-${index}`}>
                  <Camera size={24} color="#999" />
                  <p style={styles.photoText}>Add Photo</p>
                </div>
              ))}
            </div>
            <p style={styles.hintText}>Tap to add photos from camera or gallery</p>
          </div>
        )}

        {/* Step 2 - Basic Info */}
        {currentStep === 2 && (
          <div style={styles.step}>
            <div className="input-group">
              <label className="input-label">Design Title *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter design name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                data-testid="title-input"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Category *</label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                data-testid="category-select"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Sub-category</label>
              <select
                className="input-field"
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                data-testid="subcategory-select"
              >
                <option value="">Select sub-category</option>
                <option value="Traditional">Traditional</option>
                <option value="Modern">Modern</option>
                <option value="Designer">Designer</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Description *</label>
              <textarea
                className="input-field"
                style={styles.textarea}
                placeholder="Describe your design..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                data-testid="description-textarea"
              />
            </div>

            <div style={styles.priceRow}>
              <div className="input-group" style={styles.halfWidth}>
                <label className="input-label">Base Price (₹) *</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="15000"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  data-testid="base-price-input"
                />
              </div>
              <div className="input-group" style={styles.halfWidth}>
                <label className="input-label">Making Charges (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="750"
                  value={formData.makingCharges}
                  onChange={(e) => setFormData({ ...formData, makingCharges: e.target.value })}
                  data-testid="making-charges-input"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Details */}
        {currentStep === 3 && (
          <div style={styles.step}>
            <div className="input-group">
              <label className="input-label">Gold Weight Range (grams)</label>
              <div style={styles.rangeRow}>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Min"
                  value={formData.weightMin}
                  onChange={(e) => setFormData({ ...formData, weightMin: e.target.value })}
                  data-testid="weight-min"
                />
                <span style={styles.rangeSeparator}>to</span>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Max"
                  value={formData.weightMax}
                  onChange={(e) => setFormData({ ...formData, weightMax: e.target.value })}
                  data-testid="weight-max"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Gold Purity</label>
              <div style={styles.checkboxGroup}>
                {purities.map((purity) => (
                  <label key={purity} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={formData.purity.includes(purity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, purity: [...formData.purity, purity] });
                        } else {
                          setFormData({ ...formData, purity: formData.purity.filter((p) => p !== purity) });
                        }
                      }}
                      data-testid={`purity-${purity}`}
                    />
                    <span>{purity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Estimated Completion</label>
              <select
                className="input-field"
                value={formData.estimatedCompletion}
                onChange={(e) => setFormData({ ...formData, estimatedCompletion: e.target.value })}
                data-testid="completion-select"
              >
                <option value="">Select time</option>
                {completionTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <label style={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={formData.customizable}
                onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
                style={styles.checkbox}
                data-testid="customizable-toggle"
              />
              <span>Available for customization</span>
            </label>

            <div className="input-group">
              <label className="input-label">Tags (comma-separated)</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. traditional, wedding, bridal"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                data-testid="tags-input"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Additional Information</label>
              <textarea
                className="input-field"
                style={styles.textarea}
                placeholder="Any other details..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                data-testid="additional-info"
              />
            </div>

            <label style={styles.confirmLabel}>
              <input
                type="checkbox"
                checked={formData.confirmOriginal}
                onChange={(e) => setFormData({ ...formData, confirmOriginal: e.target.checked })}
                style={styles.checkbox}
                data-testid="confirm-original"
              />
              <span>I confirm this is my original design</span>
            </label>
          </div>
        )}

        <div style={{ height: '100px' }} />
      </div>

      {/* Footer Buttons */}
      <div style={styles.footer}>
        {currentStep < 3 ? (
          <button
            className="btn-primary"
            style={styles.nextButton}
            onClick={handleNext}
            data-testid="next-button"
          >
            Next
          </button>
        ) : (
          <button
            className="btn-primary"
            style={styles.uploadButtonFooter}
            onClick={handleUpload}
            disabled={!formData.confirmOriginal}
            data-testid="upload-button"
          >
            Upload Design
          </button>
        )}
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
  progressSection: {
    background: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  progressItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  progressDot: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#e0e0e0',
    color: '#999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '600',
  },
  activeDot: {
    background: '#13549d',
    color: 'white',
  },
  progressLabel: {
    fontSize: '12px',
    color: '#666',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  photoSlot: {
    aspectRatio: '1',
    background: 'white',
    border: '2px dashed #e0e0e0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  photoText: {
    fontSize: '10px',
    color: '#999',
    marginTop: '4px',
  },
  hintText: {
    fontSize: '13px',
    color: '#666',
    textAlign: 'center',
  },
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
  priceRow: {
    display: 'flex',
    gap: '12px',
  },
  halfWidth: {
    flex: 1,
  },
  rangeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  rangeSeparator: {
    fontSize: '14px',
    color: '#666',
  },
  checkboxGroup: {
    display: 'flex',
    gap: '16px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
  },
  confirmLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    background: '#fff9e6',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #f39c12',
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
  nextButton: {
    width: '100%',
  },
  uploadButtonFooter: {
    width: '100%',
  },
};

export default UploadDesign;
