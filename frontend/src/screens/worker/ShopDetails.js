import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { workerProfile } from '../../data/workerMockData';

const ShopDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: workerProfile.businessName,
    address: workerProfile.shopAddress,
    city: workerProfile.city,
    postalCode: workerProfile.postalCode,
    shopPhone: workerProfile.shopPhone,
  });

  const [shopPhotos, setShopPhotos] = useState([]);

  const handleSave = () => {
    // Save logic
    navigate('/worker/profile');
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="shop-details-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Shop Details</h1>
        <div style={{ width: '32px' }} />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        <div className="input-group">
          <label className="input-label">Shop Name</label>
          <input
            type="text"
            className="input-field"
            value={formData.shopName}
            onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
            data-testid="shop-name-input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Shop Address</label>
          <input
            type="text"
            className="input-field"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            data-testid="address-input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">City</label>
          <input
            type="text"
            className="input-field"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            data-testid="city-input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Postal Code</label>
          <input
            type="text"
            className="input-field"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            data-testid="postal-code-input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Shop Phone</label>
          <input
            type="tel"
            className="input-field"
            value={formData.shopPhone}
            onChange={(e) => setFormData({ ...formData, shopPhone: e.target.value })}
            data-testid="shop-phone-input"
          />
        </div>

        {/* Shop Photos */}
        <div style={styles.photosSection}>
          <label className="input-label">Shop Photos</label>
          <div style={styles.photoGrid}>
            {shopPhotos.map((photo, index) => (
              <div key={index} style={styles.photoItem}>
                <img src={photo} alt={`Shop ${index + 1}`} style={styles.photoImage} />
                <button style={styles.removeButton} data-testid={`remove-photo-${index}`}>
                  <X size={16} />
                </button>
              </div>
            ))}
            <button style={styles.addPhotoButton} data-testid="add-photo">
              <Plus size={32} color="#999" />
              <p style={styles.addPhotoText}>Add Photo</p>
            </button>
          </div>
        </div>

        <div style={{ height: '100px' }} />
      </div>

      {/* Save Button */}
      <div style={styles.footer}>
        <button
          className="btn-primary"
          style={styles.saveButton}
          onClick={handleSave}
          data-testid="save-button"
        >
          Save Changes
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
    padding: '20px',
  },
  photosSection: {
    marginTop: '24px',
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  photoItem: {
    position: 'relative',
    aspectRatio: '1',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  removeButton: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    background: 'rgba(0,0,0,0.6)',
    border: 'none',
    borderRadius: '50%',
    padding: '4px',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
  },
  addPhotoButton: {
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
  addPhotoText: {
    fontSize: '12px',
    color: '#999',
    marginTop: '8px',
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
  saveButton: {
    width: '100%',
  },
};

export default ShopDetails;
