import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ReviewList from '../Features/reviewList';
import { useSelector } from 'react-redux';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('');

  const searchTerm = useSelector((state) => state.search.searchTerm.toLowerCase());

  const selectedCategories = [
    "laptops", "mens-shirts", "mens-shoes", "mens-watches",
    "womens-bags", "womens-dresses", "womens-shoes", "womens-watches"
  ];

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const allProducts = [];

        for (const category of selectedCategories) {
          const res = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await res.json();
          allProducts.push(...data.products);
        }

        setProducts(allProducts);
        setFilteredProducts(allProducts);

        const allReviews = allProducts.flatMap(product =>
          (product.reviews || []).map(review => ({
            ...review,
            productTitle: product.title,
          }))
        );

        setReviews(allReviews.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products or reviews:', error);
      }
    };

    fetchProductsByCategory();
  }, []);

  // Filtering + Sorting + Search Logic
  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== 'all') {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    if (sortOption === 'price-low-high') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, sortOption, searchTerm]);

  return (
    <div className='px-4 py-6'>
      {/* Filter and Sort Controls */}
      <div className='flex flex-wrap gap-4 justify-between items-center mb-6'>
        <select
          className='border px-3 py-2 rounded'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {selectedCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className='border px-3 py-2 rounded'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Review Section */}
      {reviews.length > 0 && (
        <div className='mt-16'>
          <h2 className='text-3xl  font-bold text-center mb-6'>Customer Reviews</h2>
          <ReviewList reviews={reviews} />
        </div>
      )}
    </div>
  );
};

export default Category;
