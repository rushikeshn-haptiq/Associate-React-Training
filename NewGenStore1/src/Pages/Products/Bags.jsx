import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import ReviewList from '../../Features/reviewList';
import { useSelector } from 'react-redux';

const Bags = () => {
  const [bags, setBags] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchTerm = useSelector((state) => state.search.searchTerm?.toLowerCase() || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category/womens-bags');
        const data = await res.json();
        setBags(data.products);
        setFilteredProducts(data.products);

        // Flatten reviews and add product title
        const allReviews = data.products.flatMap(product =>
          (product.reviews || []).map(review => ({
            ...review,
            productTitle: product.title,
          }))
        );
        setReviews(allReviews.slice(0, 5));
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = bags.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(bags);
    }
  }, [searchTerm, bags]);

  return (
    <div className='min-h-screen py-4 px-2 mx-auto'>
      <h2 className='text-4xl capitalize font-bold my-6'>Bags</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className='text-xl col-span-full text-center'>No matching products found.</p>
        )}
      </div>

      <div className='py-20 px-2'>
        <h2 className='text-4xl font-semibold mb-10'>What Our Customers Say</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default Bags;