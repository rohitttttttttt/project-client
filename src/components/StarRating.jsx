import React from 'react';
import './StarRating.css';

function StarRating({ rating = 0, size = 12 }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(
                <span key={i} className="star-rating__star star-rating__star--filled">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </span>
            );
        } else if (i === fullStars && hasHalf) {
            stars.push(
                <span key={i} className="star-rating__star star-rating__star--half">
                    <svg viewBox="0 0 24 24" width={size} height={size}>
                        <defs>
                            <linearGradient id={`half-${i}`}>
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#626262" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill={`url(#half-${i})`}
                        />
                    </svg>
                </span>
            );
        } else {
            stars.push(
                <span key={i} className="star-rating__star star-rating__star--empty">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </span>
            );
        }
    }

    return <div className="star-rating">{stars}</div>;
}

export default StarRating;
