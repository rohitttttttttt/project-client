import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import './BrowsePage.css';

const SECTION_CONFIG = {
    'top-rated': { title: 'Top Rated Products', emoji: '⭐' },
    'latest': { title: 'Newly Listed Products', emoji: '🆕' },
    'near-me': { title: 'Products Near You', emoji: '📍' },
    'organic': { title: 'Organic Products', emoji: '🌿' },
    'best-sellers': { title: 'Best Sellers', emoji: '🔥' },
};

function BrowsePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const section = searchParams.get('section');
    const categoryId = searchParams.get('category');
    const categoryName = searchParams.get('name') || 'Products';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const config = SECTION_CONFIG[section] || {};
    const pageTitle = categoryId
        ? categoryName
        : config.title || 'Browse Products';
    const pageEmoji = config.emoji || '🛒';

    const fetchProducts = async (pageNum = 1) => {
        setLoading(true);
        try {
            let res;

            if (categoryId) {
                res = await productService.getByCategory(categoryId);
                const data = res.data;
                setProducts(data.products || []);
                setHasMore(false);
            } else if (section) {
                switch (section) {
                    case 'top-rated':
                        res = await productService.getTopRated();
                        break;
                    case 'latest':
                        res = await productService.getLatest();
                        break;
                    case 'organic':
                        res = await productService.getOrganic();
                        break;
                    case 'best-sellers':
                        res = await productService.getBestSellers();
                        break;
                    case 'near-me':
                        if ('geolocation' in navigator) {
                            try {
                                const pos = await new Promise((resolve, reject) =>
                                    navigator.geolocation.getCurrentPosition(resolve, reject)
                                );
                                res = await productService.getNearMe({
                                    latitude: pos.coords.latitude,
                                    longitude: pos.coords.longitude,
                                });
                            } catch {
                                res = await productService.getLatest();
                            }
                        } else {
                            res = await productService.getLatest();
                        }
                        break;
                    default:
                        res = await productService.getLatest();
                }
                const data = res.data;
                setProducts(data.products || data || []);
                setHasMore(false);
            } else {
                // Default: show latest
                res = await productService.getLatest();
                const data = res.data;
                setProducts(data.products || data || []);
            }
        } catch (err) {
            console.error('Browse fetch failed:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchProducts(1);
    }, [section, categoryId]);

    return (
        <div className="browse-page">
            <div className="browse-page__header">
                <div>
                    <h1 className="browse-page__title">
                        <span className="browse-page__emoji">{pageEmoji}</span> {pageTitle}
                    </h1>
                    <p className="browse-page__subtitle">
                        {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
            </div>

            <div className="browse-page__grid">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="product-card--skeleton" />
                    ))
                ) : products.length > 0 ? (
                    products.map((item) => <ProductCard key={item._id} Product={item} />)
                ) : (
                    <div className="browse-page__empty">
                        <div className="browse-page__empty-icon">📦</div>
                        <p className="browse-page__empty-text">No products found</p>
                        <p className="browse-page__empty-hint">Check back later for new products</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BrowsePage;
