import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCartOpen } from '../store/cartSlice';
import { X } from 'lucide-react';
import './CartPage.css';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((s) => s.cart);
  const { isLoggedIn } = useSelector((s) => s.auth);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleCheckout = () => {
    dispatch(setCartOpen(false));
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 className="cart-page__title">Your Cart</h2>
          <span className="cart-page__count">{cartItems.length} items</span>
        </div>
        <button className="cart-page__close" onClick={() => dispatch(setCartOpen(false))}>
          <X size={18} />
        </button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-page__items">
            {cartItems.map((item, index) => (
              <div className="cart-page__item" key={item._id || index}>
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100'}
                  alt={item.title}
                  className="cart-page__item-image"
                />
                <div className="cart-page__item-info">
                  <p className="cart-page__item-name">{item.title}</p>
                  <p className="cart-page__item-price">₹{item.price} × {item.quantity || 1}</p>
                  <p className="cart-page__item-seller">by {item.owner?.fullName || 'Farmer'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <div className="cart-page__summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="cart-page__summary-row">
              <span>Delivery</span>
              <span style={{ color: 'var(--primary-dark)' }}>Free</span>
            </div>
            <div className="cart-page__summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button className="cart-page__checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      ) : (
        <div className="cart-page__empty">
          <div className="cart-page__empty-icon">🛒</div>
          <p className="cart-page__empty-text">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}

export default CartPage;
