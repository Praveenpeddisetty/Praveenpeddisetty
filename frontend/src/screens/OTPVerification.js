import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '98765 43210';
  const userType = location.state?.userType || 'consumer';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Different OTPs for different user types
  const CONSUMER_OTP = '123456';
  const WORKER_OTP = '223344';

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^[0-9]+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp === CORRECT_OTP) {
      // OTP verified successfully, navigate to consumer home
      navigate('/consumer-home');
    } else {
      setError('Invalid OTP. Please try again. (Use 123456 for testing)');
    }
  };

  const handleResend = () => {
    setTimer(45);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="otp-screen">
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
          <h1 style={styles.title} data-testid="otp-title">OTP Verification</h1>
          <p style={styles.subtitle} data-testid="otp-subtitle">
            We've sent a verification code to
          </p>
          <p style={styles.phoneNumber} data-testid="phone-number">+91 {phone}</p>
        </div>

        <div style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              style={styles.otpInput}
              data-testid={`otp-input-${index}`}
            />
          ))}
        </div>

        {error && (
          <p style={styles.errorText} data-testid="error-message">{error}</p>
        )}

        <div style={styles.testInfo}>
          <p style={styles.testInfoText}>
            For testing, use OTP: <strong>123456</strong>
          </p>
        </div>

        <div style={styles.timerSection}>
          {timer > 0 ? (
            <p style={styles.timerText} data-testid="timer">
              Resend code in <strong>00:{timer.toString().padStart(2, '0')}</strong>
            </p>
          ) : (
            <button
              style={styles.resendButton}
              onClick={handleResend}
              data-testid="resend-button"
            >
              Resend Code
            </button>
          )}
        </div>

        <button
          className="btn-primary"
          style={styles.verifyButton}
          onClick={handleVerify}
          disabled={otp.some((digit) => !digit)}
          data-testid="verify-button"
        >
          Verify
        </button>

        <button
          style={styles.changePhoneButton}
          onClick={() => navigate('/login')}
          data-testid="change-phone-button"
        >
          Change Phone Number
        </button>
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
    alignItems: 'center',
  },
  titleSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#666',
    marginBottom: '8px',
  },
  phoneNumber: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13549d',
  },
  otpContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  otpInput: {
    width: '48px',
    height: '56px',
    fontSize: '24px',
    fontWeight: '600',
    textAlign: 'center',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '12px',
  },
  testInfo: {
    background: '#e8f5f1',
    border: '1px solid #14ac84',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '16px',
    marginBottom: '16px',
  },
  testInfoText: {
    fontSize: '13px',
    color: '#333',
    textAlign: 'center',
    margin: 0,
  },
  timerSection: {
    marginBottom: '32px',
  },
  timerText: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },
  resendButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  verifyButton: {
    width: '100%',
    marginBottom: '16px',
  },
  changePhoneButton: {
    background: 'transparent',
    border: 'none',
    color: '#666',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default OTPVerification;
