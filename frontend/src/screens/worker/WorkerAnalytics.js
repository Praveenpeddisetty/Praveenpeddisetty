import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Download } from 'lucide-react';
import { workerAnalytics } from '../../data/workerMockData';
import BottomNav from '../../components/BottomNav';

const WorkerAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container" style={styles.container} data-testid="worker-analytics-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          data-testid="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={styles.title}>Analytics</h1>
        <button style={styles.downloadButton} data-testid="download-report">
          <Download size={20} />
        </button>
      </div>

      {/* Time Filter Tabs */}
      <div style={styles.tabs}>
        {['Week', 'Month', 'Year', 'All Time'].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(tab === 'Month' ? styles.activeTab : {}),
            }}
            data-testid={`tab-${tab.toLowerCase().replace(' ', '-')}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Revenue Card */}
        <div style={styles.revenueCard}>
          <div style={styles.revenueHeader}>
            <div>
              <p style={styles.revenueLabel}>Total Revenue</p>
              <h2 style={styles.revenueValue}>₹{workerAnalytics.thisMonth.revenue.toLocaleString()}</h2>
            </div>
            <div style={styles.changeIndicator}>
              <TrendingUp size={16} color="#14ac84" />
              <span style={styles.changeText}>+12.5%</span>
            </div>
          </div>
          <div style={styles.chart}>
            {/* Simple bar chart representation */}
            {workerAnalytics.revenueChart.slice().reverse().map((data, index) => (
              <div key={index} style={styles.chartBar}>
                <div
                  style={{
                    ...styles.bar,
                    height: `${(data.revenue / 60000) * 100}%`,
                  }}
                />
                <span style={styles.barLabel}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Key Metrics</h3>
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Total Orders</p>
              <p style={styles.metricValue}>{workerAnalytics.thisMonth.orders}</p>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Completed</p>
              <p style={styles.metricValue}>{workerAnalytics.thisMonth.completed}</p>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>In Progress</p>
              <p style={styles.metricValue}>{workerAnalytics.thisMonth.inProgress}</p>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Rating</p>
              <p style={styles.metricValue}>⭐ {workerAnalytics.thisMonth.rating}</p>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Completion Rate</p>
              <p style={styles.metricValue}>{workerAnalytics.thisMonth.completionRate}%</p>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Avg Delivery</p>
              <p style={styles.metricValue}>{workerAnalytics.thisMonth.avgDeliveryTime} days</p>
            </div>
          </div>
        </div>

        {/* Popular Designs */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Popular Designs</h3>
          <div style={styles.popularList}>
            {workerAnalytics.popularDesigns.map((design, index) => (
              <div key={index} style={styles.popularItem}>
                <div style={styles.rankBadge}>{index + 1}</div>
                <div style={styles.popularInfo}>
                  <p style={styles.popularName}>{design.name}</p>
                  <p style={styles.popularOrders}>{design.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Customer Insights</h3>
          <div style={styles.insightsCard}>
            <div style={styles.insightRow}>
              <span style={styles.insightLabel}>New Customers</span>
              <span style={styles.insightValue}>{workerAnalytics.customerInsights.newCustomers}</span>
            </div>
            <div style={styles.insightRow}>
              <span style={styles.insightLabel}>Repeat Customers</span>
              <span style={styles.insightValue}>{workerAnalytics.customerInsights.repeatCustomers}</span>
            </div>
            <div style={styles.insightRow}>
              <span style={styles.insightLabel}>Avg Order Value</span>
              <span style={styles.insightValue}>₹{workerAnalytics.customerInsights.avgOrderValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{ height: '80px' }} />
      </div>

      <BottomNav />
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
    flex: 1,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
    textAlign: 'center',
  },
  downloadButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#13549d',
    display: 'flex',
  },
  tabs: {
    display: 'flex',
    background: 'white',
    borderBottom: '1px solid #e0e0e0',
  },
  tab: {
    flex: 1,
    padding: '12px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '14px',
    fontWeight: '500',
    color: '#999',
    cursor: 'pointer',
  },
  activeTab: {
    color: '#13549d',
    fontWeight: '600',
    borderBottom: '2px solid #13549d',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  revenueCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  revenueHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  revenueLabel: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '4px',
  },
  revenueValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#13549d',
    margin: 0,
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: '#e8f5f1',
    padding: '6px 12px',
    borderRadius: '12px',
  },
  changeText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#14ac84',
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    height: '120px',
  },
  chartBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    width: '100%',
    background: 'linear-gradient(180deg, #13549d 0%, #14ac84 100%)',
    borderRadius: '4px 4px 0 0',
    marginBottom: '8px',
  },
  barLabel: {
    fontSize: '11px',
    color: '#999',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  metricCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  metricLabel: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '8px',
  },
  metricValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  popularList: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  popularItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  rankBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #13549d 0%, #14ac84 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
  },
  popularInfo: {
    flex: 1,
  },
  popularName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  popularOrders: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
  insightsCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  insightRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  insightLabel: {
    fontSize: '14px',
    color: '#666',
  },
  insightValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
};

export default WorkerAnalytics;
