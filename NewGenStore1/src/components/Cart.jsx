import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/CartSlice';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  if (items.length === 0) return <p className="p-4">Your cart is empty.</p>;

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b-2  py-2">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-22 h-22 object-cover rounded"
            onError={(e) => (e.target.style.display = 'none')}
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p>$ {item.unitPrice * item.quantity}</p>

            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => dispatch(updateQuantity({ id: item.id, type: 'decrement' }))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => dispatch(updateQuantity({ id: item.id, type: 'increment' }))}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="text-red-500 font-bold"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
           remove
          </button>
        </div>
      ))}

      
      <div className="flex justify-between items-center pt-4 font-bold text-lg">
        <span>Total:</span>
        <span>$ {Math.round(totalAmount)}</span>
      </div>
    </div>
  );
};

export default Cart;
