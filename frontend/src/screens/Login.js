import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      // Get user type from location state (from user type selection)
      const userType = location.state?.userType || 'consumer';
      // Navigate to OTP verification with phone number and user type
      navigate('/otp-verify', { state: { phone, userType } });
    }
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="login-screen">
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.titleSection}>
          <h1 style={styles.title} data-testid="login-title">Welcome to Golden Gehna</h1>
          <p style={styles.subtitle} data-testid="login-subtitle">Login with your mobile number</p>
        </div>

        <form onSubmit={handleSendOTP} style={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="phone">Phone Number</label>
            <div style={styles.phoneInputWrapper}>
              <span style={styles.phonePrefix}>+91</span>
              <input
                id="phone"
                type="tel"
                className="input-field"
                style={styles.phoneInput}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                data-testid="phone-input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={styles.loginButton}
            data-testid="send-otp-button"
            disabled={phone.length < 10}
          >
            Send OTP
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerText}>or</span>
          </div>

          <button
            type="button"
            className="btn-secondary"
            style={styles.googleButton}
            data-testid="google-login-button"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={styles.googleIcon}
            />
            Continue with Google
          </button>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              By continuing, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </div>
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
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  loginButton: {
    width: '100%',
    marginBottom: '20px',
    marginTop: '8px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  },
  dividerText: {
    flex: 1,
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
    position: 'relative',
  },
  googleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
  infoBox: {
    background: '#f8f9fa',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '12px',
  },
  infoText: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default Login;
