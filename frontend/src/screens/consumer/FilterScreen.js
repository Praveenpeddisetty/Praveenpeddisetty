import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const FilterScreen = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [goldPurity, setGoldPurity] = useState('22K');
  const [rating, setRating] = useState('All');
  const [distance, setDistance] = useState('Anywhere');

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants'];
  const purities = ['22K', '18K', '14K'];
  const ratings = ['4.5+', '4.0+', '3.5+', 'All ratings'];
  const distances = ['Within 5km', '10km', '25km', 'Anywhere'];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setPriceRange([5000, 50000]);
    setSelectedCategories([]);
    setGoldPurity('22K');
    setRating('All');
    setDistance('Anywhere');
  };

  const handleApply = () => {
    navigate(-1);
  };

  return (
    <div className="mobile-container" style={styles.container} data-testid="filter-screen">
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.closeButton}
          onClick={() => navigate(-1)}
          data-testid="close-button"
        >
          <X size={24} />
        </button>
        <h1 style={styles.title}>Filters</h1>
        <button
          style={styles.resetButton}
          onClick={handleReset}
          data-testid="reset-button"
        >
          Reset
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollContent}>
        {/* Price Range */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Price Range</h3>
          <div style={styles.priceDisplay}>
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>-</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="5000"
            max="50000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={styles.rangeSlider}
            data-testid="price-slider"
          />
        </div>

        {/* Categories */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Category</h3>
          <div style={styles.checkboxGroup}>
            {categories.map((category) => (
              <label key={category} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  style={styles.checkbox}
                  data-testid={`category-${category.toLowerCase()}`}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gold Purity */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Gold Purity</h3>
          <div style={styles.radioGroup}>
            {purities.map((purity) => (
              <label key={purity} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="purity"
                  value={purity}
                  checked={goldPurity === purity}
                  onChange={(e) => setGoldPurity(e.target.value)}
                  style={styles.radio}
                  data-testid={`purity-${purity}`}
                />
                <span>{purity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Rating</h3>
          <div style={styles.radioGroup}>
            {ratings.map((r) => (
              <label key={r} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="rating"
                  value={r}
                  checked={rating === r}
                  onChange={(e) => setRating(e.target.value)}
                  style={styles.radio}
                  data-testid={`rating-${r}`}
                />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Distance</h3>
          <div style={styles.radioGroup}>
            {distances.map((d) => (
              <label key={d} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="distance"
                  value={d}
                  checked={distance === d}
                  onChange={(e) => setDistance(e.target.value)}
                  style={styles.radio}
                  data-testid={`distance-${d}`}
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div style={styles.footer}>
        <button
          className="btn-primary"
          style={styles.applyButton}
          onClick={handleApply}
          data-testid="apply-filters-button"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
  },
  closeButton: {
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
  resetButton: {
    background: 'transparent',
    border: 'none',
    color: '#13549d',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  scrollContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  section: {
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  priceDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#13549d',
  },
  rangeSlider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    background: '#e0e0e0',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
  },
  radio: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  footer: {
    padding: '16px 20px',
    borderTop: '1px solid #e0e0e0',
  },
  applyButton: {
    width: '100%',
  },
};

export default FilterScreen;
