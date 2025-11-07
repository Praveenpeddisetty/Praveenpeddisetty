import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Plus } from 'lucide-react';
import { orders, topWorkers } from '../../data/mockData';

const RateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = orders.find((o) => o.id === id) || orders[0];
  const worker = topWorkers.find((w) => w.id === order.workerId) || topWorkers[0];

  const [overallRating, setOverallRating] = useState(0);
  const [ratings, setRatings] = useState({
    quality: 0,
    timeliness: 0,
    communication: 0,
    value: 0,
  });
  const [reviewText, setReviewText] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const StarRating = ({ value, onChange, testId }) => {
    return (
      <div style={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            style={styles.starButton}
            onClick={() => onChange(star)}
            data-testid={`${testId}-star-${star}`}
          >
            <Star
              size={28}
              color="#FFC107"
              fill={star <= value ? '#FFC107' : 'none'}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    // Submit review logic
    navigate('/my-orders');
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="rate-review-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Rate & Review</h1>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <img
            src={order.designImage}
            alt={order.design}
            style={styles.orderImage}
          />
          <div style={styles.orderInfo}>
            <p style={styles.orderNumber}>Order #{order.id}</p>
            <h3 style={styles.designName}>{order.design}</h3>
            <p style={styles.workerName}>by {worker.name}</p>
          </div>
        </div>

        {/* Overall Rating */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Overall Rating</h3>
          <StarRating
            value={overallRating}
            onChange={setOverallRating}
            testId="overall"
          />
        </div>

        {/* Aspect Ratings */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Rate Your Experience</h3>

          <div style={styles.aspectItem}>
            <div style={styles.aspectHeader}>
              <span style={styles.aspectLabel}>Quality</span>
              <span style={styles.aspectValue}>{ratings.quality}/5</span>
            </div>
            <StarRating
              value={ratings.quality}
              onChange={(val) => setRatings({ ...ratings, quality: val })}
              testId="quality"
            />
          </div>

          <div style={styles.aspectItem}>
            <div style={styles.aspectHeader}>
              <span style={styles.aspectLabel}>Timeliness</span>
              <span style={styles.aspectValue}>{ratings.timeliness}/5</span>
            </div>
            <StarRating
              value={ratings.timeliness}
              onChange={(val) => setRatings({ ...ratings, timeliness: val })}
              testId="timeliness"
            />
          </div>

          <div style={styles.aspectItem}>
            <div style={styles.aspectHeader}>
              <span style={styles.aspectLabel}>Communication</span>
              <span style={styles.aspectValue}>{ratings.communication}/5</span>
            </div>
            <StarRating
              value={ratings.communication}
              onChange={(val) => setRatings({ ...ratings, communication: val })}
              testId="communication"
            />
          </div>

          <div style={styles.aspectItem}>
            <div style={styles.aspectHeader}>
              <span style={styles.aspectLabel}>Value for Money</span>
              <span style={styles.aspectValue}>{ratings.value}/5</span>
            </div>
            <StarRating
              value={ratings.value}
              onChange={(val) => setRatings({ ...ratings, value: val })}
              testId="value"
            />
          </div>
        </div>

        {/* Review Text */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Write a Review</h3>
          <textarea
            placeholder="Share your experience with this order..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={styles.textarea}
            data-testid="review-textarea"
          />
        </div>

        {/* Photo Upload */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Add Photos (Optional)</h3>
          <div style={styles.photoUpload}>
            <button style={styles.uploadButton} data-testid="upload-photo-button">
              <Plus size={24} />
              <span>Add Photo</span>
            </button>
          </div>
          <p style={styles.uploadHint}>Help others by adding photos of the delivered product</p>
        </div>

        {/* Anonymous Checkbox */}
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            style={styles.checkbox}
            data-testid="anonymous-checkbox"
          />
          <span>Post anonymously</span>
        </label>

        <div style={{ height: '100px' }} />
      </div>

      {/* Submit Button */}
      <div style={styles.footer}>
        <button
          className="btn-primary"
          style={styles.submitButton}
          onClick={handleSubmit}
          data-testid="submit-review-button"
        >
          Submit Review
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
  orderSummary: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
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
  orderNumber: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '4px',
  },
  designName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  workerName: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  starRating: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  starButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
  },
  aspectItem: {
    marginBottom: '20px',
  },
  aspectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  aspectLabel: {
    fontSize: '15px',
    color: '#333',
    fontWeight: '500',
  },
  aspectValue: {
    fontSize: '15px',
    color: '#13549d',
    fontWeight: '600',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  photoUpload: {
    marginBottom: '8px',
  },
  uploadButton: {
    width: '100%',
    padding: '20px',
    background: '#f8f9fa',
    border: '2px dashed #e0e0e0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: '#666',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  uploadHint: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    margin: 0,
  },
  checkboxLabel: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
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
  submitButton: {
    width: '100%',
  },
};

export default RateReview;
