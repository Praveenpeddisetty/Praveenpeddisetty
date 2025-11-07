import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to OTP verification
    navigate('/otp-verify');
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="registration-screen">
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={styles.scrollContent}>
        <div style={styles.titleSection}>
          <h1 style={styles.title} data-testid="register-title">Create Account</h1>
          <p style={styles.subtitle} data-testid="register-subtitle">Join Golden Gehna today</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.nameRow}>
            <div className="input-group" style={styles.halfWidth}>
              <label className="input-label" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="input-field"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                data-testid="first-name-input"
              />
            </div>
            <div className="input-group" style={styles.halfWidth}>
              <label className="input-label" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="input-field"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                data-testid="last-name-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              data-testid="email-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="phone">Phone Number</label>
            <div style={styles.phoneInputWrapper}>
              <span style={styles.phonePrefix}>+91</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input-field"
                style={styles.phoneInput}
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                data-testid="phone-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                style={styles.passwordInput}
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                data-testid="password-input"
              />
              <button
                type="button"
                style={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                data-testid="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="input-field"
                style={styles.passwordInput}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                data-testid="confirm-password-input"
              />
              <button
                type="button"
                style={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                data-testid="toggle-confirm-password"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              style={styles.checkbox}
              data-testid="terms-checkbox"
            />
            <span>I agree to the <a href="#" data-testid="terms-link">Terms & Conditions</a></span>
          </label>

          <button
            type="submit"
            className="btn-primary"
            style={styles.signupButton}
            data-testid="signup-button"
          >
            Sign Up
          </button>

          <p style={styles.loginText}>
            Already have an account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              data-testid="login-link"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    marginBottom: '20px',
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: '#13549d',
    display: 'flex',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
  },
  titleSection: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  halfWidth: {
    flex: 1,
    marginBottom: '0',
  },
  phoneInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  phonePrefix: {
    padding: '14px 16px',
    background: '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontWeight: '600',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: '48px',
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '14px',
    color: '#333',
    marginBottom: '24px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginTop: '2px',
  },
  signupButton: {
    width: '100%',
    marginBottom: '20px',
  },
  loginText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
  },
};

export default Registration;
