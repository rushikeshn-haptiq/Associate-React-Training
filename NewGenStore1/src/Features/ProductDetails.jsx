import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addToCart} from "../redux/CartSlice";
import { useDispatch} from "react-redux";


const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
    
  const product = location.state?.product;
 
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [ratings, setRatings] = useState({});
 const dispatch =useDispatch();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/comments?postId=${id}`);
        const data = await res.json();

        const comments = data.comments || [];

        // Assign random rating to simulate (replace with real rating if available)
        const commentsWithRatings = comments.map((c) => ({
          ...c,
          rating: Math.floor(Math.random() * 5) + 1,
        }));
  
        setReviews(commentsWithRatings);
        countRatings(commentsWithRatings);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);


  const countRatings = (comments) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach((r) => counts[r.rating]++);
    setRatings(counts);
  };

  const maxRatingCount = Math.max(...Object.values(ratings));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    // dispatch(openCart()); // optional: open modal immediately
  };


  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

  if (!product) {
    return (
      <div className="p-6 text-red-600 text-center text-xl">
        No product data available for ID: {id}
      </div>
    );
  }

  return (
    <>
      =
      <div className="  p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-50 items-start ">
      
        <div className="flex justify-center items-center bg-white rounded-3xl shadow-xl p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-xs md:max-w-sm lg:max-w-md object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-start space-y-6 text-gray-800">
          <span className="text-sm bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-full shadow w-max">
            Product Details
          </span>

          <h2 className="text-4xl font-bold">{product.title}</h2>

          <p className="text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>

          <div className="flex flex-col space-y-2">
            <span className="text-2xl font-semibold text-green-600">
            $                 {product.price}
            </span>
            <span className="text-lg text-yellow-600">
              Rating: <span className="font-medium">{product.rating} ⭐</span>
            </span>
          </div>

          <button onClick={handleAddToCart} className="mt-4 w-max px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>

     
   {/* Rating Breakdown */}

<div className="max-w-2xl mx-auto px-4 mt-10">
  <h4 className="text-2xl font-semibold mb-4 text-gray-800">Rating Breakdown {maxRatingCount} </h4>
  <div className="space-y-3">
    {[5, 4, 3, 2, 1].map((star) => {
      const count = ratings[star] || 0;
      const total = Object.values(ratings).reduce((sum, val) => sum + val, 0);
      const percentage = total ? (count / total) * 100 : 0;

      return (
        <div key={star} className="flex items-center space-x-4">
          <span className="w-10 text-sm text-gray-700">{star} ★</span>
          <div className="w-full bg-gray-200 rounded-full h-4 relative">
            <div
              className="bg-yellow-400 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="w-10 text-sm text-gray-600">{count}</span>
        </div>
      );
    })}
  </div>
</div>


      {/* Reviews */}
      <div className="max-w-7xl mx-auto mt-10 px-4 ">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h3>

        {loadingReviews ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available.</p>
        ) : (
          <>
            <div className="space-y-4 space-x-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 shadow rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {review.user?.username || "Anonymous"}
                    </span>
                    <span className="text-yellow-500 text-sm">⭐ {review.rating}</span>
                  </div>
                  <p className="text-gray-700">{review.body}</p>
                </div>
              ))}
            </div>

            {reviews.length > 5 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-6 py-2 text-sm font-medium bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
