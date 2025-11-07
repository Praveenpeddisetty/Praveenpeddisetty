import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mobile-container" style={styles.container} data-testid="splash-screen">
      <div style={styles.content}>
        <img
          src="https://customer-assets.emergentagent.com/job_9bb0f7a7-81ef-4a62-be69-667a2ba23baf/artifacts/6eecega1_GGLogo.JPG"
          alt="Golden Gehna Logo"
          style={styles.logo}
          data-testid="logo-image"
        />
        <h1 style={styles.title} data-testid="app-title">Golden Gehna</h1>
        <p style={styles.tagline} data-testid="tagline">Connecting Artisans with Gold Lovers</p>
        <div style={styles.loaderContainer}>
          <Loader2 style={styles.loader} data-testid="loader-spinner" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    animation: 'fadeIn 0.8s ease-out',
  },
  logo: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '24px',
    borderRadius: '20px',
    background: 'white',
    padding: '10px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '12px',
    letterSpacing: '0.5px',
  },
  tagline: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '40px',
    fontWeight: '300',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  loader: {
    width: '32px',
    height: '32px',
    color: 'white',
    animation: 'spin 1s linear infinite',
  },
};

export default SplashScreen;
