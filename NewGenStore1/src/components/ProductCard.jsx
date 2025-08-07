import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleBuyNow = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-xl overflow-hidden p-4 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 relative">
      {/* Wishlist Heart Icon */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 text-xl text-red-500 hover:scale-110 transition-transform"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="w-full h-[250px] bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 flex items-center justify-center">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="text-center">
        <h2 className="text-lg font-bold truncate">{product.title}</h2>
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <p className="text-orange-600 font-bold text-lg">${product.price}</p>
      </div>

      <div className="mt-4 flex gap-3 justify-center">
        <button
          onClick={handleBuyNow}
          className="bg-orange-600 text-white text-sm px-5 py-2 rounded-full shadow hover:bg-orange-700 transition"
        >
          View
        </button>
        <button
          onClick={handleAddToCart}
          className="border border-orange-300 text-orange-600 text-sm px-5 py-2 rounded-full shadow hover:bg-orange-100 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
