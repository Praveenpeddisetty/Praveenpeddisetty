import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, MoreVertical, Paperclip, Send } from 'lucide-react';
import { messages, topWorkers } from '../../data/mockData';

const ChatScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const worker = topWorkers.find((w) => w.id === parseInt(id)) || topWorkers[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSend = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText('');
    }
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="chat-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <img
          src={worker.image}
          alt={worker.name}
          style={styles.workerImage}
        />
        <div style={styles.headerInfo}>
          <h3 style={styles.workerName} data-testid="worker-name">{worker.name}</h3>
          <p style={styles.status}>Online</p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.headerButton} data-testid="call-button">
            <Phone size={20} color="white" />
          </button>
          <button style={styles.headerButton} data-testid="menu-button">
            <MoreVertical size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.messageWrapper,
              justifyContent: msg.sender === 'consumer' ? 'flex-end' : 'flex-start',
            }}
            data-testid={`message-${msg.id}`}
          >
            <div
              style={{
                ...styles.messageBubble,
                ...(msg.sender === 'consumer'
                  ? styles.consumerBubble
                  : styles.workerBubble),
              }}
            >
              <p style={styles.messageText}>{msg.text}</p>
              <span style={styles.timestamp}>{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div style={styles.inputBar}>
        <button style={styles.attachButton} data-testid="attach-button">
          <Paperclip size={22} color="#666" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={styles.input}
          data-testid="message-input"
        />
        <button
          style={{
            ...styles.sendButton,
            opacity: messageText.trim() ? 1 : 0.5,
          }}
          onClick={handleSend}
          disabled={!messageText.trim()}
          data-testid="send-button"
        >
          <Send size={20} color="white" />
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
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
  },
  workerImage: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  headerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '2px',
  },
  status: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  headerButton: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageWrapper: {
    display: 'flex',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: '10px 14px',
    borderRadius: '16px',
    wordBreak: 'break-word',
  },
  workerBubble: {
    background: 'white',
    borderBottomLeftRadius: '4px',
  },
  consumerBubble: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    borderBottomRightRadius: '4px',
    color: 'white',
  },
  messageText: {
    fontSize: '15px',
    lineHeight: '1.4',
    marginBottom: '4px',
  },
  timestamp: {
    fontSize: '11px',
    opacity: 0.7,
  },
  inputBar: {
    background: 'white',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid #e0e0e0',
  },
  attachButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    fontSize: '15px',
    outline: 'none',
  },
  sendButton: {
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
  },
};

export default ChatScreen;
