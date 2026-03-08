import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../store/uiSlice';
import productService from '../services/productService';
import { io } from 'socket.io-client';
import { ChevronRight } from 'lucide-react';
import './Home.css';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
  autoConnect: false
});

// Icon + image mapping for known category names
const CATEGORY_META = {
  'Fresh Produce': { icon: '🌿', image: '/cat-fresh-produce.png', desc: 'Vegetables, Fruits, Leafy Greens & Herbs' },
  'Grains & Staples': { icon: '🌾', image: '/cat-grains-staples.png', desc: 'Whole Grains, Pulses, Rice, Millets' },
  'Dry Fruits & Nuts': { icon: '🥜', image: '/cat-dry-fruits.png', desc: 'Almonds, Cashews, Raisins & More' },
  'Dairy & Animal Products': { icon: '🧀', image: '/cat-dairy.png', desc: 'Milk, Cheese, Butter, Eggs & Honey' },
  'Spices & Masale': { icon: '🌶️', image: '/cat-spices.png', desc: 'Whole, Ground Spices, Blends' },
  'Seeds & Farming Inputs': { icon: '🌱', image: '/cat-seeds-farming.png', desc: 'Seeds, Fertilizers, Pesticides, Tools' },
  'Organic': { icon: '🌿', image: '/cat-organic.png', desc: 'Farm Fresh, Chemical-Free', badge: 'Organic' },
  'Beverages & Oils': { icon: '🫗', image: '/cat-dairy.png', desc: 'Cold-Pressed Oils, Juices & Teas' },
};
const DEFAULT_META = { icon: '📦', image: '/cat-fresh-produce.png', desc: 'Browse products' };

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth);

  const [nearYou, setNearYou] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [newListings, setNewListings] = useState([]);
  const [organicProducts, setOrganicProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      if (!socket.connected) {
        socket.auth = { token: localStorage.getItem('accessToken') };
        socket.connect();
      }
      socket.on('newOrder', (customer, product, price, quantity, address) => {
        dispatch(addNotification({ customer, product, price, quantity, address }));
      });
      return () => {
        socket.off('newOrder');
      };
    }
  }, [user]);

  const [coords, setCoords] = useState(null);

  // Request geolocation on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.warn('Geolocation denied or unavailable:', err.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchFeed = async () => {
      setFeedLoading(true);
      try {
        const { data } = await productService.getHomeFeed(coords || {});
        const sections = data.sections || data;
        setNearYou(sections.nearYou || []);
        setTopProducts(sections.topRated || []);
        setNewListings(sections.freshlyAdded || []);
        setOrganicProducts(sections.organic || []);
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to fetch home feed:', err);
      } finally {
        setFeedLoading(false);
      }
    };
    fetchFeed();
  }, [coords]);

  const renderSkeletons = (count = 5) =>
    Array.from({ length: count }).map((_, i) => (
      <div key={`skel-${i}`} className="product-card--skeleton" />
    ));

  return (
    <>
      <section className="hero">
        <div className="hero__left">
          <h1 className="hero__heading">
            <span className="green">Connecting</span><br />
            Farmers<br />
            Directly To <span className="green">You</span>
          </h1>
          <p className="hero__subtext">
            We are connecting you to the roots of Indian farming. Get fresh
            produce from verified local farmers — no middlemen, no markup,
            just pure farm-to-fork freshness.
          </p>
          <div className="hero__cta-group">
            <button className="hero__cta-primary" onClick={() => navigate('/browse?section=latest')}>Shop Now</button>
            <button className="hero__cta-secondary" onClick={() => navigate('/register')}>Become a Seller</button>
          </div>
          <div className="hero__social-proof">
            <div className="hero__avatars">
              <img className="hero__avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <img className="hero__avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
              <img className="hero__avatar" src="https://randomuser.me/api/portraits/men/67.jpg" alt="User" />
            </div>
            <p className="hero__social-text">
              Join with <strong>4600+</strong> happy customers and<br />get fresh produce right now
            </p>
          </div>
        </div>
        <div className="hero__right">
          <img className="hero__image" src="/hero-produce-v2.png" alt="Fresh farm produce" />
        </div>
      </section>

      <section className="categories">
        <h2 className="categories__title">
          Explore <span className="highlight">Products</span> from different <span className="highlight">Categories</span>
        </h2>
        <div className="categories__grid">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat.Category] || DEFAULT_META;
            return (
              <div key={cat._id} className="category-card" onClick={() => navigate(`/browse?category=${cat._id}&name=${encodeURIComponent(cat.Category)}`)}>
                <div className="category-card__text">
                  <p className="category-card__name"><span className="category-card__name-icon">{meta.icon}</span>{cat.Category}</p>
                  <p className="category-card__desc">{meta.desc}</p>
                </div>
                <div className="category-card__image-wrap">
                  <img src={meta.image} alt={cat.Category} className="category-card__image" />
                  {meta.badge && <span className="category-card__badge">{meta.badge}</span>}
                  <div className="category-card__arrow"><ChevronRight size={16} /></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="home__section-gap" />
      <section className="product-section product-section--green">
        <div className="product-section__header">
          <h2 className="product-section__title">See what farmers are Selling Near you</h2>
          <span className="product-section__see-all" onClick={() => navigate('/browse?section=near-me')}>See All</span>
        </div>
        <div className="product-section__scroll">
          {feedLoading ? renderSkeletons() : nearYou.length > 0
            ? nearYou.slice(0, 5).map((item) => <ProductCard key={item._id} Product={item} />)
            : <p style={{ padding: '20px', color: 'var(--text-muted)' }}>Allow location access to see products near you</p>}
        </div>
      </section>

      <div className="home__section-gap" />
      <section className="product-section product-section--muted-green">
        <div className="product-section__header">
          <h2 className="product-section__title">Top Products loved by the buyers</h2>
          <span className="product-section__see-all" onClick={() => navigate('/browse?section=top-rated')}>See All</span>
        </div>
        <div className="product-section__scroll">
          {feedLoading ? renderSkeletons() : topProducts.length > 0
            ? topProducts.slice(0, 5).map((item) => <ProductCard key={item._id} Product={item} />)
            : renderSkeletons()}
        </div>
      </section>

      <div className="home__section-gap" />
      <section className="product-section product-section--light-green">
        <div className="product-section__header">
          <h2 className="product-section__title">Newly listed fresh products for you</h2>
          <span className="product-section__see-all" onClick={() => navigate('/browse?section=latest')}>See All</span>
        </div>
        <div className="product-section__scroll">
          {feedLoading ? renderSkeletons() : newListings.length > 0
            ? newListings.slice(0, 5).map((item) => <ProductCard key={item._id} Product={item} />)
            : renderSkeletons()}
        </div>
      </section>

      <div className="home__section-gap" />
      <section className="product-section product-section--light-green">
        <div className="product-section__header">
          <h2 className="product-section__title">Organic Products for You</h2>
          <span className="product-section__see-all" onClick={() => navigate('/browse?section=organic')}>See All</span>
        </div>
        <div className="product-section__scroll">
          {feedLoading ? renderSkeletons() : organicProducts.length > 0
            ? organicProducts.slice(0, 5).map((item) => <ProductCard key={item._id} Product={item} />)
            : <p style={{ padding: '20px', color: 'var(--text-muted)' }}>No organic products found</p>}
        </div>
      </section>

      <div className="home__section-gap" />
    </>
  );
}

export { socket };
export default Home;
