import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutDone } from '../store/authSlice';
import authService from '../services/authService';
import productService from '../services/productService';
import orderService from '../services/orderService';
import ProductCard from '../components/ProductCard';
import './Profile.css';

function Profile() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch products (for farmers)
  useEffect(() => {
    if (activeTab !== 'products') return;
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const { data } = await productService.getMyProducts();
        setUserProducts(data.products || data.Products || []);
      } catch (err) {
        console.error('Fetch products error:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [activeTab]);

  // Fetch orders (for buyers/sellers)
  useEffect(() => {
    if (activeTab !== 'orders') return;
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        // Fetch both buyer orders and seller orders
        const [buyerRes, sellerRes] = await Promise.allSettled([
          orderService.getMyOrders(),
          orderService.getSellerOrders(),
        ]);

        const buyerOrders = buyerRes.status === 'fulfilled'
          ? (buyerRes.value.data.orders || []).map((o) => ({ ...o, orderType: 'buyer' }))
          : [];
        const sellerOrders = sellerRes.status === 'fulfilled'
          ? (sellerRes.value.data.orders || []).map((o) => ({ ...o, orderType: 'seller' }))
          : [];

        // Merge and sort by newest first
        const all = [...buyerOrders, ...sellerOrders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(all);
      } catch (err) {
        console.error('Fetch orders error:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [activeTab]);

  const handleLogout = async () => {
    try { await authService.logout(); } catch { }
    dispatch(logoutDone());
    navigate('/');
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      // Refresh orders
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error('Update status error:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      await orderService.cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: 'cancelled' } : o))
      );
    } catch (err) {
      console.error('Cancel order error:', err);
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  const initial = user?.fullName?.charAt(0)?.toUpperCase() || 'U';

  const STATUS_COLORS = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    shipped: '#8b5cf6',
    delivered: '#22c55e',
    cancelled: '#ef4444',
  };

  const getNextStatus = (current) => {
    const map = { pending: 'confirmed', confirmed: 'shipped', shipped: 'delivered' };
    return map[current] || null;
  };

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <div className="profile-page__avatar">{initial}</div>
        <div className="profile-page__info">
          <h1 className="profile-page__name">{user?.fullName || 'User'}</h1>
          <p className="profile-page__email">{user?.email || user?.phone || ''}</p>
          <p className="profile-page__location">
            Role: {user?.role === 'farmer' ? '🧑‍🌾 Farmer' : '🛒 Buyer'}
          </p>
        </div>
        <div className="profile-page__actions-header">
          <button className="profile-page__logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="profile-page__tabs">
        <button className={`profile-page__tab ${activeTab === 'orders' ? 'profile-page__tab--active' : ''}`} onClick={() => setActiveTab('orders')}>
          My Orders
        </button>
        {user?.role === 'farmer' && (
          <button className={`profile-page__tab ${activeTab === 'products' ? 'profile-page__tab--active' : ''}`} onClick={() => setActiveTab('products')}>
            My Products
          </button>
        )}
      </div>

      {/* ── Products Tab ── */}
      {activeTab === 'products' && (
        <div className="profile-page__products">
          {loadingProducts ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="product-card--skeleton" />
            ))
          ) : userProducts.length > 0 ? (
            userProducts.map((item, i) => <ProductCard key={item._id || i} Product={item} />)
          ) : (
            <div className="profile-page__empty">
              <div className="profile-page__empty-icon">📦</div>
              <p>No products listed yet</p>
            </div>
          )}
        </div>
      )}

      {/* ── Orders Tab ── */}
      {activeTab === 'orders' && (
        <div className="profile-page__orders">
          {loadingOrders ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="profile-page__order-skeleton" />
            ))
          ) : orders.length > 0 ? (
            orders.map((order) => {
              const product = order.product || {};
              const otherParty = order.orderType === 'buyer'
                ? order.seller?.fullName || 'Seller'
                : order.buyer?.fullName || 'Buyer';
              const nextStatus = getNextStatus(order.status);

              return (
                <div key={order._id} className="profile-page__order-card">
                  <div className="profile-page__order-top">
                    <img
                      className="profile-page__order-img"
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100'}
                      alt={product.title}
                    />
                    <div className="profile-page__order-info">
                      <p className="profile-page__order-title">{product.title || 'Product'}</p>
                      <p className="profile-page__order-meta">
                        Qty: {order.quantity} • ₹{order.totalAmount}
                      </p>
                      <p className="profile-page__order-meta">
                        {order.orderType === 'buyer' ? `Seller: ${otherParty}` : `Buyer: ${otherParty}`}
                      </p>
                      <p className="profile-page__order-date">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="profile-page__order-right">
                      <span
                        className="profile-page__order-status"
                        style={{ background: STATUS_COLORS[order.status] || '#888' }}
                      >
                        {order.status}
                      </span>
                      <span className="profile-page__order-type">
                        {order.orderType === 'buyer' ? '🛒 Purchased' : '📦 Received'}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="profile-page__order-actions">
                    {order.orderType === 'seller' && nextStatus && (
                      <button
                        className="profile-page__order-btn profile-page__order-btn--primary"
                        onClick={() => handleUpdateStatus(order._id, nextStatus)}
                      >
                        Mark as {nextStatus}
                      </button>
                    )}
                    {['pending', 'confirmed'].includes(order.status) && (
                      <button
                        className="profile-page__order-btn profile-page__order-btn--danger"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="profile-page__empty">
              <div className="profile-page__empty-icon">🛍️</div>
              <p>No orders yet</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your purchases and sales will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
