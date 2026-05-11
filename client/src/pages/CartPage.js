import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/Store';

function CartPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="content-panel">
      <h1>Your Cart</h1>
      {state.cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </p>
      ) : (
        <div className="cart-layout">
          <div>
          {state.cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <Link to={`/product/${item._id}`} className="product-name">
                  {item.name}
                </Link>
                <p>${item.price.toFixed(2)} x {item.qty}</p>
              </div>
              <button onClick={() => removeItem(item._id)} className="danger-button">
                Remove
              </button>
            </div>
          ))}
          </div>
          <aside className="summary-card">
            <h2>Order Summary</h2>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={checkoutHandler} className="primary-button">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
