import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useStore } from '../context/Store';
import demoProducts from '../data/demoProducts';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        const fallbackProduct = demoProducts.find((item) => item._id === id);
        setProduct(fallbackProduct || null);
        setError(
          fallbackProduct
            ? 'Showing demo product because the API is offline.'
            : 'Unable to load product details'
        );
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, qty } });
    navigate('/cart');
  };

  return (
    <div>
      {error && <p className="status-note">{error}</p>}
      {!product ? (
        <p className="status-note">Loading...</p>
      ) : (
        <div className="product-detail">
          <img src={product.image} alt={product.name} className="detail-image" />
          <div className="detail-copy">
            <p className="eyebrow">{product.brand} / {product.category}</p>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="detail-stats">
              <span>${product.price.toFixed(2)}</span>
              <span>{product.rating.toFixed(1)} rating</span>
              <span>{product.countInStock} in stock</span>
            </div>
            {product.countInStock > 0 && (
              <div className="field-inline">
                <label>
                  Qty:
                  <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            <button
              className="primary-button"
              onClick={addToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
