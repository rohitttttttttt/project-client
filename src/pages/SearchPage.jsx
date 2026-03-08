import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import './SearchPage.css';

function SearchPage() {
  const reduxSearch = useSelector((s) => s.ui.search);
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  // Use URL query first, then Redux state
  const activeQuery = urlQuery || reduxSearch || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter state
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);
  const [minRating, setMinRating] = useState('');

  const fetchProducts = useCallback(async () => {
    if (!activeQuery) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const body = { searchQuery: activeQuery };
      if (minPrice) body.minPrice = Number(minPrice);
      if (maxPrice) body.maxPrice = Number(maxPrice);
      if (isOrganic) body.isOrganic = true;
      if (minRating) body.averageRating = Number(minRating);

      const { data } = await productService.search(body);
      setProducts([
        ...(data.products || []),
        ...(data.recommendedProducts || []),
      ]);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, [activeQuery, minPrice, maxPrice, isOrganic, minRating]);

  useEffect(() => {
    fetchProducts();
  }, [activeQuery]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setIsOrganic(false);
    setMinRating('');
    setTimeout(() => fetchProducts(), 0);
  };

  const hasActiveFilters = minPrice || maxPrice || isOrganic || minRating;

  if (!activeQuery) {
    return (
      <div className="search-page">
        <div className="search-page__empty">
          <div className="search-page__empty-icon">🔍</div>
          <p className="search-page__empty-text">Search for products</p>
          <p className="search-page__empty-hint">Use the search bar above to find fresh vegetables, fruits, grains and more</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-page__header">
        <div>
          <h1 className="search-page__title">Results for "{activeQuery}"</h1>
          <p className="search-page__subtitle">
            {loading ? 'Searching...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      {/* Filters — always visible when searching */}
      <form className="search-page__filters" onSubmit={handleApplyFilters}>
        <div className="search-page__filters-grid">
          <div className="search-page__filter-group">
            <label className="search-page__filter-label">Price Range (₹)</label>
            <div className="search-page__filter-row">
              <input
                type="number"
                className="search-page__filter-input"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
              />
              <span className="search-page__filter-dash">—</span>
              <input
                type="number"
                className="search-page__filter-input"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="search-page__filter-group">
            <label className="search-page__filter-label">Minimum Rating</label>
            <div className="search-page__rating-options">
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`search-page__rating-btn ${Number(minRating) === r ? 'search-page__rating-btn--active' : ''}`}
                  onClick={() => setMinRating(Number(minRating) === r ? '' : String(r))}
                >
                  {'★'.repeat(r)}{'☆'.repeat(5 - r)} & up
                </button>
              ))}
            </div>
          </div>

          <div className="search-page__filter-group">
            <label className="search-page__filter-check">
              <input
                type="checkbox"
                checked={isOrganic}
                onChange={(e) => setIsOrganic(e.target.checked)}
              />
              <span className="search-page__filter-check-label">🌿 Organic Only</span>
            </label>
          </div>
        </div>

        <div className="search-page__filter-actions">
          <button type="submit" className="search-page__filter-apply">Apply Filters</button>
          {hasActiveFilters && (
            <button type="button" className="search-page__filter-clear" onClick={handleClearFilters}>
              Clear All
            </button>
          )}
        </div>
      </form>

      <div className="search-page__grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="product-card--skeleton" />
          ))
        ) : products.length > 0 ? (
          products.map((item) => <ProductCard key={item._id} Product={item} />)
        ) : (
          <div className="search-page__empty">
            <div className="search-page__empty-icon">🔍</div>
            <p className="search-page__empty-text">No products found</p>
            <p className="search-page__empty-hint">Try adjusting your filters or search for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
