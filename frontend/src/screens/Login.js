import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Phone } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate to OTP verification
    navigate('/otp-verify');
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
          <h1 style={styles.title} data-testid="login-title">Welcome Back</h1>
          <p style={styles.subtitle} data-testid="login-subtitle">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
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
                onChange={(e) => setPhone(e.target.value)}
                data-testid="phone-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div style={styles.optionsRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
                data-testid="remember-me-checkbox"
              />
              <span>Remember me</span>
            </label>
            <a href="#" style={styles.forgotLink} data-testid="forgot-password-link">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={styles.loginButton}
            data-testid="login-button"
          >
            Login
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

          <p style={styles.signupText}>
            Don't have an account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
              data-testid="signup-link"
            >
              Sign Up
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
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '14px',
  },
  loginButton: {
    width: '100%',
    marginBottom: '20px',
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
  signupText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
};

export default Login;
