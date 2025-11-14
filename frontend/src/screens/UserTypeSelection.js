import { useNavigate } from 'react-router-dom';
import { User, Hammer, ArrowLeft } from 'lucide-react';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'consumer',
      title: 'Gold Consumer',
      icon: <User size={48} />,
      description: 'Browse and purchase exquisite gold jewelry',
    },
    {
      type: 'worker',
      title: 'Gold Worker/Artisan',
      icon: <Hammer size={48} />,
      description: 'Showcase and sell your handcrafted creations',
    },
  ];

  return (
    <div className="mobile-container" style={styles.container} data-testid="user-type-screen">
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={styles.headerTitle}>Choose Your Role</h2>
      </div>

      <div style={styles.content}>
        <p style={styles.subtitle} data-testid="subtitle">
          Select how you'd like to use Golden Gehna
        </p>

        <div style={styles.cardsContainer}>
          {userTypes.map((userType) => (
            <div
              key={userType.type}
              style={styles.card}
              onClick={() => navigate('/login', { state: { userType: userType.type } })}
              data-testid={`${userType.type}-card`}
            >
              <div style={styles.iconWrapper}>{userType.icon}</div>
              <h3 style={styles.cardTitle}>{userType.title}</h3>
              <p style={styles.cardDescription}>{userType.description}</p>
            </div>
          ))}
        </div>
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
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    position: 'relative',
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
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '40px',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '20px',
    padding: '32px 24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  iconWrapper: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #13549d15 0%, #14ac8415 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    color: '#13549d',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },
};

export default UserTypeSelection;
