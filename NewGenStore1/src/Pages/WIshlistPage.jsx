import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist) || [];

  return (
    <div className="p-4" aria-label="Wishlist Page">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;