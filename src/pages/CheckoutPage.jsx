import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, clearCartAsync } from '../store/cartSlice';
import addressService from '../services/addressService';
import orderService from '../services/orderService';
import './CheckoutPage.css';

function CheckoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: cartItems, total: cartTotal } = useSelector((s) => s.cart);
    const { isLoggedIn } = useSelector((s) => s.auth);

    // ── Address state ──
    const [savedAddress, setSavedAddress] = useState(null);
    const [useSaved, setUseSaved] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [addressLine, setAddressLine] = useState('');

    // ── Flow state ──
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) navigate('/register');
    }, [isLoggedIn]);

    // Fetch server cart on mount to ensure we have latest data
    useEffect(() => {
        if (isLoggedIn) dispatch(fetchCart());
    }, [isLoggedIn, dispatch]);

    // Fetch saved address
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const { data } = await addressService.getMyAddress();
                const addr = data.address || data.addresses?.[0] || data;
                if (addr && addr.fullName) {
                    setSavedAddress(addr);
                    setUseSaved(true);
                }
            } catch {
                // No saved address — that's fine
            }
        };
        fetchAddress();
    }, []);

    // Compute total from cart items (populated items from server have productId.price)
    const total = cartItems.reduce((sum, item) => {
        const price = item.productId?.price || item.price || 0;
        const qty = item.quantity || 1;
        return sum + price * qty;
    }, 0) || cartTotal;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let addressId;

            if (useSaved && savedAddress?._id) {
                addressId = savedAddress._id;
            } else {
                // Validate inputs
                if (!fullName.trim() || !phoneNo.trim() || !state.trim() || !city.trim() || !postalCode.trim() || !addressLine.trim()) {
                    setError('Please fill in all address fields');
                    setLoading(false);
                    return;
                }

                const phoneNum = Number(phoneNo);
                const postalNum = Number(postalCode);

                if (isNaN(phoneNum) || phoneNo.trim().length !== 10) {
                    setError('Please enter a valid 10-digit phone number');
                    setLoading(false);
                    return;
                }
                if (isNaN(postalNum) || postalCode.trim().length !== 6) {
                    setError('Please enter a valid 6-digit postal code');
                    setLoading(false);
                    return;
                }

                const addressPayload = {
                    fullName: fullName.trim(),
                    phoneNo: phoneNum,
                    state: state.trim(),
                    city: city.trim(),
                    postalCode: postalNum,
                    addressLine: addressLine.trim(),
                };

                try {
                    // Try adding new address
                    const { data } = await addressService.addAddress(addressPayload);
                    addressId = data.address?._id || data._id;
                    setSavedAddress(data.address || data);
                } catch (addrErr) {
                    if (addrErr.response?.status === 409) {
                        // Address already exists — update it instead
                        const { data } = await addressService.updateAddress(addressPayload);
                        addressId = data.address?._id || data._id;
                        setSavedAddress(data.address || data);
                    } else {
                        throw addrErr;
                    }
                }
            }

            // Place the order
            await orderService.placeOrder(addressId);

            dispatch(clearCartAsync());
            setSuccess(true);
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="checkout">
                <div className="checkout__success">
                    <div className="checkout__success-icon">🎉</div>
                    <h2 className="checkout__success-title">Order Placed Successfully!</h2>
                    <p className="checkout__success-text">
                        Your order has been placed. The farmer will be notified and you'll
                        receive updates in your messages.
                    </p>
                    <button className="checkout__success-btn" onClick={() => navigate('/')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    // Get display items — handle both server-populated and local cart shapes
    const displayItems = cartItems.map((item) => ({
        _id: item.productId?._id || item._id,
        title: item.productId?.title || item.title || 'Product',
        price: item.productId?.price || item.price || 0,
        unit: item.productId?.unit || item.unit || 'kg',
        images: item.productId?.images || item.images || [],
        quantity: item.quantity || 1,
    }));

    if (displayItems.length === 0 && !success) {
        return (
            <div className="checkout">
                <div className="checkout__success">
                    <div className="checkout__success-icon">🛒</div>
                    <h2 className="checkout__success-title">Your cart is empty</h2>
                    <p className="checkout__success-text">Add some products to your cart before checking out.</p>
                    <button className="checkout__success-btn" onClick={() => navigate('/')}>
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout">
            <h1 className="checkout__title">Checkout</h1>

            <div className="checkout__grid">
                {/* Left: Address */}
                <div className="checkout__address">
                    <h3 className="checkout__section-title">Delivery Address</h3>

                    {error && <div className="checkout__error">{error}</div>}

                    {savedAddress && (
                        <>
                            <div
                                className="checkout__saved-address"
                                onClick={() => setUseSaved(true)}
                                style={{ borderColor: useSaved ? 'var(--primary)' : 'var(--border)' }}
                            >
                                <p className="checkout__saved-badge">✓ Saved Address</p>
                                <p className="checkout__saved-text">
                                    {savedAddress.fullName}, {savedAddress.addressLine}<br />
                                    {savedAddress.city}, {savedAddress.state} – {savedAddress.postalCode}<br />
                                    📞 {savedAddress.phoneNo}
                                </p>
                            </div>
                            <div className="checkout__or-divider">or enter a new address</div>
                        </>
                    )}

                    <form onSubmit={handlePlaceOrder}>
                        {!useSaved && (
                            <>
                                <div className="checkout__form-row">
                                    <div className="checkout__field">
                                        <label className="checkout__label">Full Name</label>
                                        <input className="checkout__input" type="text" placeholder="Recipient name" value={fullName} onChange={(e) => { setFullName(e.target.value); setUseSaved(false); }} required={!useSaved} />
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">Phone Number</label>
                                        <input className="checkout__input" type="tel" placeholder="10-digit mobile" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value); setUseSaved(false); }} required={!useSaved} maxLength={10} />
                                    </div>
                                </div>

                                <div className="checkout__form-row">
                                    <div className="checkout__field">
                                        <label className="checkout__label">State</label>
                                        <input className="checkout__input" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required={!useSaved} />
                                    </div>
                                    <div className="checkout__field">
                                        <label className="checkout__label">City</label>
                                        <input className="checkout__input" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required={!useSaved} />
                                    </div>
                                </div>

                                <div className="checkout__field">
                                    <label className="checkout__label">Postal Code</label>
                                    <input className="checkout__input" type="text" placeholder="6-digit PIN code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required={!useSaved} maxLength={6} />
                                </div>

                                <div className="checkout__field">
                                    <label className="checkout__label">Address Line</label>
                                    <textarea className="checkout__input checkout__input--full" placeholder="House no, building, street, landmark..." value={addressLine} onChange={(e) => setAddressLine(e.target.value)} required={!useSaved} />
                                </div>
                            </>
                        )}

                        {useSaved && (
                            <p style={{ fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setUseSaved(false)}>
                                Use a different address instead
                            </p>
                        )}

                        <button type="submit" className="checkout__place-btn" disabled={loading}>
                            {loading ? 'Placing Order...' : `Place Order • ₹${total}`}
                        </button>
                    </form>
                </div>

                {/* Right: Summary */}
                <div className="checkout__summary">
                    <h3 className="checkout__section-title">Order Summary</h3>

                    <div className="checkout__items">
                        {displayItems.map((item, i) => (
                            <div className="checkout__item" key={item._id || i}>
                                <img
                                    className="checkout__item-img"
                                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100'}
                                    alt={item.title}
                                />
                                <div className="checkout__item-info">
                                    <p className="checkout__item-name">{item.title}</p>
                                    <p className="checkout__item-qty">Qty: {item.quantity} {item.unit}</p>
                                </div>
                                <p className="checkout__item-price">₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div className="checkout__totals">
                        <div className="checkout__total-row">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="checkout__total-row">
                            <span>Delivery</span>
                            <span style={{ color: 'var(--primary-dark)' }}>Free</span>
                        </div>
                        <div className="checkout__total-row checkout__total-row--final">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
