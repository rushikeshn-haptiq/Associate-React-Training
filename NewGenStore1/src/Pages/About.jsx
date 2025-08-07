import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">About Us</h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <img
          src="Images/About.png" 
          alt="Our Store"
          className="w-full h-auto rounded-lg shadow-md"
        />

        {/* Text Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to ShopSmart</h2>
          <p className="text-gray-600 mb-4">
            At <strong>Rushikesh.co</strong>, we believe in delivering quality products with exceptional customer service. 
            Since our inception, we’ve aimed to create a seamless shopping experience for our customers by offering a 
            wide range of products — from electronics to fashion and beyond.
          </p>
          <p className="text-gray-600 mb-4">
            We partner with top brands and trusted suppliers to ensure every item you receive meets the highest standards. 
            With fast shipping, easy returns, and 24/7 support, we’re committed to making your online shopping journey safe, 
            simple, and satisfying.
          </p>
          <p className="text-gray-600">
            Join thousands of happy customers and discover the smarter way to shop — only at <strong>Rushikesh.co</strong>.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to empower individuals with convenience, choice, and confidence in every purchase. 
          We're not just an e-commerce platform — we’re a community that values trust, innovation, and your satisfaction.
        </p>
      </div>
    </div>
  );
};

export default About;
