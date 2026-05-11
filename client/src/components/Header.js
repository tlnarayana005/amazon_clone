import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/Store';

function Header() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('amazonCloneToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const cartCount = state.cart.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-mark">
          Amazon
        </Link>
        <div className="header-actions">
          <Link to="/cart" className="header-link">
            Cart <span>{cartCount}</span>
          </Link>
          {state.user ? (
            <button className="ghost-button" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="header-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
