import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../redux/CartSlice';
import { logout } from '../redux/authSlice';
import Logo from './Logo';
import Search from './Search';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  const wishlistCount = useSelector((state) => state.wishlist.length);
  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
  };

  return (
    <nav className="w-full  bg-white shadow-md ">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:opacity-90">
          <Logo />
        </Link>

        {/* Search */}
        <div className="hidden md:block w-1/3">
          <Search />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li><Link to="/about" className="hover:text-gray-600 hover:underline">About</Link></li>
          <li><Link to="/help" className="hover:text-gray-600 hover:underline">Help</Link></li>
          <li><Link to="/contact" className="hover:text-gray-600 hover:underline">Contact</Link></li>
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button onClick={() => dispatch(openCart())} className="relative text-2xl">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
           <Link to="/wishlist" className="relative text-gray-700 hover:text-orange-600 flex items-center gap-1">
          <FaHeart />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 bg-orange-700 text-white px-3 py-1 rounded-full hover:bg-orange-800"
              >
                <FaUserCircle className="text-xl" />
                <span className="hidden md:inline">{user.firstName}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded text-sm z-50">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-orange-700 text-white px-4 py-2 rounded-full hover:bg-orange-800 transition"
            >
              Login
            </Link>
          )}

          {/* Hamburger for mobile */}
          <button className="md:hidden text-xl" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden px-6 py-4 bg-white border-t text-gray-700">
          <li className="py-2"><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li className="py-2"><Link to="/help" onClick={toggleMenu}>Help</Link></li>
          <li className="py-2"><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
