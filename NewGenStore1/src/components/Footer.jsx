import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex flex-col text-center items-center justify-center shadow-2xl py-4">
      <Link to="/" className="font-bold text-2xl mb-2">
        <Logo />
      </Link>
      <nav className="border-b w-[80%] flex justify-center">
        <ul className="flex gap-6 text-xl pt-4 mb-4 text-gray-400">
          <li className="hover:underline hover:text-gray-500">
            <Link to="/laptop">Laptops</Link>
          </li>
          <li className="hover:underline hover:text-gray-500">
            <Link to="/clothes">Clothes</Link>
          </li>
          <li className="hover:underline hover:text-gray-500">
            <Link to="/shoes">Shoes</Link>
          </li>
          <li className="hover:underline hover:text-gray-500">
            <Link to="/watches">Watches</Link>
          </li>
          <li className="hover:underline hover:text-gray-500">
            <Link to="/bags">Women Bags</Link>
          </li>
        </ul>
      </nav>
      <div className="flex pt-4 text-gray-400 items-center">
        <h2>&copy;2025 Rushikesh.co. All rights reserved</h2>
      </div>
    </footer>
  );
};

export default Footer;