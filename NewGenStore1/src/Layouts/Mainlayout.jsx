import React from 'react';
import Navbar from '../components/Navbar';
import Subnavbar from '../components/Subnavbar';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { closeCart } from '../redux/CartSlice';
import CartModal from '../Features/CartModal';
import { Outlet, useNavigate } from 'react-router-dom';

const Mainlayout = () => {
  const isOpen = useSelector((state) => state.cart.isOpen);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerClick = () => {
    if (user) {
      // If you have a checkout page, use: navigate('/checkout');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Subnavbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />

      {/* Cart Modal - controlled by Redux */}
      {isOpen && (
        <CartModal
          actions={
            <>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                aria-label="Close cart"
                onClick={() => dispatch(closeCart())}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                aria-label="Proceed to checkout"
                onClick={handlerClick}
              >
                Checkout
              </button>
            </>
          }
        />
      )}
    </div>
  );
};

export default Mainlayout;