import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`} className="product-media-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/product/${product._id}`} className="product-name">
          {product.name}
        </Link>
        <p className="muted">{product.brand}</p>
        <div className="product-meta">
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.rating.toFixed(1)} rating</span>
        </div>
        <p className={product.countInStock > 0 ? 'stock-good' : 'stock-bad'}>
          {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
