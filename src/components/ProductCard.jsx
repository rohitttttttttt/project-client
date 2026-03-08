import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { userContext } from '../context/userContext';
import StarRating from './StarRating';
import './ProductCard.css';

function ProductCard({ Product }) {
  const { setViewProduct, addCartItem } = useContext(userContext);
  const navigate = useNavigate();

  const productNavigate = () => {
    setViewProduct(Product);
    navigate(`/productPage?id=${Product._id}`);
  };

  const handleAddCartItem = (e) => {
    e.stopPropagation();
    addCartItem(Product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    setViewProduct(Product);
    navigate('/productPage');
  };

  return (
    <div className="product-card" onClick={productNavigate}>
      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={Product.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'}
          alt={Product.title}
          className="product-card__image"
        />
        <button
          className="product-card__wishlist"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <p className="product-card__title">{Product.title}</p>

        <div className="product-card__rating-row">
          <StarRating rating={Product.averageRating || 4.5} size={10} />
        </div>

        <p className="product-card__price">
          ₹{Product.price} / {Product.unit || 'kg'}
        </p>

        <p className="product-card__desc">
          {Product.description || 'Fresh farm produce delivered directly from local farmers to your doorstep.'}
        </p>
      </div>

      {/* Actions */}
      <div className="product-card__actions">
        <button className="product-card__buy-btn" onClick={handleBuyNow}>
          Buy now
        </button>
        <button className="product-card__cart-btn" onClick={handleAddCartItem}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
