import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { workerProfile } from '../../data/workerMockData';

const EditWorkerProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: workerProfile.username || '',
    firstName: workerProfile.name.split(' ')[0],
    lastName: workerProfile.name.split(' ')[1],
    email: workerProfile.email,
    phone: workerProfile.phone,
    businessName: workerProfile.businessName,
    specialty: workerProfile.specialty,
    experience: workerProfile.experience,
    bio: workerProfile.bio,
  });
  const [usernameError, setUsernameError] = useState('');

  const handleUsernameChange = (e) => {
    let value = e.target.value;
    // Only allow letters, convert to lowercase, and limit to 6 characters
    value = value.replace(/[^a-zA-Z]/g, '').toLowerCase().slice(0, 6);
    setFormData({ ...formData, username: value });
    
    // Validate username
    if (value.length > 0 && value.length < 3) {
      setUsernameError('Username must be at least 3 letters');
    } else {
      setUsernameError('');
    }
  };

  const handleSave = () => {
    // Save logic
    navigate('/worker/profile');
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="edit-worker-profile">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Edit Profile</h1>
        <div style={{ width: '32px' }} />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Profile Picture */}
        <div style={styles.profileSection}>
          <div style={styles.profileImageContainer}>
            <img
              src={workerProfile.image}
              alt="Profile"
              style={styles.profileImage}
            />
            <button style={styles.cameraButton} data-testid="change-photo">
              <Camera size={20} />
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          
          <div className="input-group">
            <label className="input-label">Username (3-6 letters only)</label>
            <input
              type="text"
              className="input-field"
              value={formData.username}
              onChange={handleUsernameChange}
              placeholder="e.g. rajesh"
              maxLength={6}
              data-testid="username-input"
              style={{
                ...styles.usernameInput,
                borderColor: usernameError ? '#e74c3c' : '#e0e0e0',
              }}
            />
            <div style={styles.usernameHelper}>
              <span style={styles.charCount}>
                {formData.username.length}/6 characters
              </span>
              {formData.username && (
                <span style={styles.usernamePreview}>
                  @{formData.username}
                </span>
              )}
            </div>
            {usernameError && (
              <p style={styles.errorText}>{usernameError}</p>
            )}
            <p style={styles.hintText}>
              Your unique username for your shop profile. Only lowercase letters allowed.
            </p>
          </div>

          <div className="input-group">
            <label className="input-label">First Name</label>
            <input
              type="text"
              className="input-field"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              data-testid="first-name-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Last Name</label>
            <input
              type="text"
              className="input-field"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              data-testid="last-name-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              data-testid="email-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone</label>
            <input
              type="tel"
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              data-testid="phone-input"
            />
          </div>
        </div>

        {/* Professional Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Professional Details</h3>
          
          <div className="input-group">
            <label className="input-label">Business Name</label>
            <input
              type="text"
              className="input-field"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              data-testid="business-name-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Specialization</label>
            <select
              className="input-field"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              data-testid="specialty-select"
            >
              <option>Traditional Rings & Bracelets</option>
              <option>Designer Necklaces</option>
              <option>Earrings & Pendants</option>
              <option>Bridal Collections</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Years of Experience</label>
            <input
              type="number"
              className="input-field"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              data-testid="experience-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Bio</label>
            <textarea
              className="input-field"
              style={styles.textarea}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              data-testid="bio-textarea"
            />
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
  profileSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  cameraButton: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    background: '#13549d',
    border: 'none',
    borderRadius: '50%',
    padding: '12px',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    boxShadow: '0 4px 12px rgba(19,84,157,0.3)',
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
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
  usernameInput: {
    fontFamily: 'monospace',
    fontSize: '16px',
    fontWeight: '500',
  },
  usernameHelper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  charCount: {
    fontSize: '12px',
    color: '#999',
  },
  usernamePreview: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#13549d',
    fontFamily: 'monospace',
  },
  errorText: {
    fontSize: '12px',
    color: '#e74c3c',
    marginTop: '4px',
  },
  hintText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px',
    lineHeight: '1.4',
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

export default EditWorkerProfile;
