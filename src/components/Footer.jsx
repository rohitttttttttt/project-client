import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__grid">
                    {/* Brand */}
                    <div>
                        <div className="footer__brand-name">
                            <span className="footer__brand-orbit">Orbit</span>
                            <span className="footer__brand-farms">Farms</span>
                        </div>
                        <p className="footer__brand-desc">
                            Connecting farmers directly to consumers. Fresh, organic produce from local farms delivered to your doorstep.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer__column-title">Quick Links</h4>
                        <ul className="footer__links">
                            <li><a onClick={() => navigate('/')}>Home</a></li>
                            <li><a onClick={() => navigate('/search')}>Products</a></li>
                            <li><a onClick={() => navigate('/cart')}>Cart</a></li>
                            <li><a onClick={() => navigate('/profile')}>Profile</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="footer__column-title">Categories</h4>
                        <ul className="footer__links">
                            <li><a href="#">Fresh Produce</a></li>
                            <li><a href="#">Grains & Staples</a></li>
                            <li><a href="#">Dairy & Animal</a></li>
                            <li><a href="#">Organic</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="footer__column-title">Support</h4>
                        <ul className="footer__links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <hr className="footer__divider" />

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 Orbit Farms. All rights reserved.
                    </p>
                    <div className="footer__socials">
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="Facebook">📘</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
