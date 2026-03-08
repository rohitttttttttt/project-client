import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import productService from '../services/productService';
import StarRating from '../components/StarRating';
import './ProductPage.css';

function ProductPage() {
  const { product: contextProduct, addCartItem, addChatUser } = useContext(userContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(contextProduct || {});
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch full product by ID if available, otherwise use context product
  useEffect(() => {
    const fetchProduct = async () => {
      const id = productId || contextProduct?._id;
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await productService.getById(id);
        const fullProduct = data.product || data;
        setProduct(fullProduct);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        // Fall back to context product
        if (contextProduct?._id) setProduct(contextProduct);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, contextProduct?._id]);

  const productImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80'];

  useEffect(() => {
    setMainImage(productImages[0]);
  }, [product]);

  // Get farmer name from populated userId
  const farmerName = product.userId?.fullName || '';

  const minQty = product.minOrderQuantity || 1;
  const maxQty = product.stock || 99;

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(minQty);
  }, [product._id]);

  // Buy Now = add to server cart + go to checkout
  const handleBuyNow = () => {
    addCartItem(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="product-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>Loading product...</p>
      </div>
    );
  }

  if (!product?._id && !loading) {
    return (
      <div className="product-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>Product not found</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-page__layout">
        {/* Gallery */}
        <div className="product-page__gallery">
          <img
            src={mainImage || productImages[0]}
            alt={product.title}
            className="product-page__main-image"
          />
          <div className="product-page__thumbs">
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`product-page__thumb ${mainImage === img ? 'product-page__thumb--active' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="product-page__details">
          <h1 className="product-page__title">{product.title}</h1>

          <div className="product-page__rating">
            <StarRating rating={product.averageRating || 0} size={14} />
            <span className="product-page__rating-text">
              ({product.numberOfReviews || 0} reviews)
            </span>
          </div>

          <p className="product-page__price">₹{product.price} / {product.unit || 'kg'}</p>

          <div className="product-page__meta">
            <div className="product-page__meta-item">
              <span className="product-page__meta-label">Farmer:</span>
              <span>{farmerName || '—'}</span>
            </div>
            <div className="product-page__meta-item">
              <span className="product-page__meta-label">Category:</span>
              <span>{product.categoryId?.Category || '—'}</span>
            </div>
            <div className="product-page__meta-item">
              <span className="product-page__meta-label">Stock:</span>
              <span>{product.stock ? `${product.stock} ${product.unit || 'kg'}` : 'In Stock'}</span>
            </div>
            <div className="product-page__meta-item">
              <span className="product-page__meta-label">Location:</span>
              <span>{product.addressId?.city && product.addressId?.state ? `${product.addressId.city}, ${product.addressId.state}` : '—'}</span>
            </div>
            {product.isOrganic && (
              <div className="product-page__meta-item">
                <span className="product-page__organic-badge">🌿 Organic</span>
              </div>
            )}
          </div>

          <p className="product-page__desc">
            {product.description || 'Fresh farm produce harvested and delivered directly to you.'}
          </p>

          <div className="product-page__quantity">
            <span className="product-page__meta-label">Quantity:</span>
            <div className="product-page__quantity-controls">
              <button
                className="product-page__qty-btn"
                onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
                disabled={quantity <= minQty}
              >−</button>
              <span className="product-page__qty-value">{quantity}</span>
              <button
                className="product-page__qty-btn"
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                disabled={quantity >= maxQty}
              >+</button>
              <span className="product-page__qty-unit">{product.unit || 'kg'}</span>
            </div>
            {minQty > 1 && <p className="product-page__qty-hint">Min order: {minQty} {product.unit || 'kg'}</p>}
          </div>

          <div className="product-page__actions">
            <button className="product-page__btn-buy" onClick={handleBuyNow}>
              Buy Now • ₹{(product.price * quantity).toFixed(0)}
            </button>
            <button className="product-page__btn-cart" onClick={() => addCartItem(product, quantity)}>
              Add to Cart
            </button>
            <button className="product-page__btn-chat" onClick={() => {
              if (product.userId) addChatUser(product.userId);
              navigate('/chat');
            }}>
              Chat with Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
