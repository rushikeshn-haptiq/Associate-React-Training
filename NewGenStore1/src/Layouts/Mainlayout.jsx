import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Subnavbar from '../components/Subnavbar';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { closeCart } from '../redux/CartSlice';
import CartModal from '../Features/CartModal';
import { Outlet, useNavigate } from 'react-router-dom'; // ✅ FIXED

const Mainlayout = () => {
  const isOpen = useSelector((state) => state.cart.isOpen);
  const user = useSelector((state) => state.auth.user); // ✅ Replace with correct path to user
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ FIXED

  const handlerClick = () => {
    if (user) {
      navigate('/'); 
    } else {
      navigate('/login'); 
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.open?.(); // ✅ Optional chaining if `open` method exists
    } else {
      modalRef.current?.close?.(); // ✅ Optional chaining if `close` method exists
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col  min-h-screen">
      <Navbar />
      <Subnavbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      
      {/* ✅ Cart Modal */}
      <CartModal
        ref={modalRef}
        actions={
          <>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(closeCart())}
            >
              Close
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handlerClick}
            >
              Checkout
            </button>
          </>
        }
      />
    </div>
  );
};

export default Mainlayout;
