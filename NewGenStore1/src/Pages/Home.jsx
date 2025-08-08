import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import ProductCard from '../components/ProductCard';
import Brands from '../components/Banner/Brands';

const Home = () => {
  const [products, setProducts] = useState([]);

  const selectedCategories = [
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-bags",
    "womens-dresses",
    "womens-shoes",
    "womens-watches"
  ];

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const fetches = selectedCategories.map(category =>
          fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => data.products[0])
        );
        const allProducts = await Promise.all(fetches);
        setProducts(allProducts.filter(Boolean)); // Remove undefined/null
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProductsByCategory();
  }, []);

  return (
    <div className='mb-10 min-h-screen'>
      <Banner />
      <div className='py-4 px-2'>
        <h2 className='text-4xl py-2 mb-4 font-bold'>Latest Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className='text-xl col-span-full text-center'>No products available.</p>
          )}
        </div>
        <div className='py-4'>
          <Brands />
        </div>
      </div>
    </div>
  );
};

export default Home;