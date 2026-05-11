import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import demoProducts from '../data/demoProducts';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.length ? data : demoProducts);
      } catch (err) {
        setProducts(demoProducts);
        setError('Showing demo catalog because the API is offline.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Amazon clone commerce demo</p>
          <h1>Amazon</h1>
          <p>
            An Amazon clone shopping experience with product discovery, persistent cart
            state, authentication-ready checkout, and resilient demo data for portfolio review.
          </p>
        </div>
        <div className="hero-panel">
          <span>Live catalog</span>
          <strong>{products.length || demoProducts.length}</strong>
          <small>Products ready to browse</small>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">Featured products</p>
          <h2>Amazon-style tech essentials</h2>
        </div>
        {error && <p className="status-note">{error}</p>}
      </section>

      {loading && <p className="status-note">Loading products...</p>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
