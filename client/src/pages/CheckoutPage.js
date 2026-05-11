import React, { useState } from 'react';
import api from '../api/api';
import { useStore } from '../context/Store';

function CheckoutPage() {
  const { state, dispatch } = useStore();
  const [successMessage, setSuccessMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (state.cart.length === 0) return;
    try {
      const orderItems = state.cart.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
      }));

      const order = {
        orderItems,
        shippingAddress: {
          address: '123 Clone Avenue',
          city: 'Seattle',
          postalCode: '98101',
          country: 'USA',
        },
        paymentMethod: 'Credit Card',
        itemsPrice: totalPrice,
        taxPrice: totalPrice * 0.08,
        shippingPrice: 9.99,
        totalPrice: totalPrice + totalPrice * 0.08 + 9.99,
      };

      const { data } = await api.post('/orders', order);
      dispatch({ type: 'CLEAR_CART' });
      setOrderId(data._id || '');
      setSuccessMessage('Order placed successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    }
  };

  return (
    <div className="form-panel">
      <h1>Checkout</h1>
      {error && <p className="status-note">{error}</p>}
      {successMessage ? (
        <div>
          <p className="success-note">{successMessage}</p>
          {orderId && <p className="muted">Order ID: {orderId}</p>}
        </div>
      ) : (
        <div>
          <p>Order total: ${totalPrice.toFixed(2)}</p>
          <button onClick={handlePlaceOrder} className="primary-button">
            Place order
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
