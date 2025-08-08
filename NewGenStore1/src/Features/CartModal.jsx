import { useSelector, useDispatch } from 'react-redux';
import Cart from '../components/Cart';
import { closeCart } from '../redux/CartSlice';
import { createPortal } from 'react-dom';

const CartModal = ({ title = 'Your Cart', actions }) => {
  const isOpen = useSelector((state) => state.cart.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return createPortal(
    <dialog
      open
      aria-modal="true"
      role="dialog"
      className="backdrop:bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl rounded-md"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <Cart />
        <form method="dialog" className="flex justify-end gap-2 mt-4">
          {actions ? actions : (
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(closeCart())}
            >
              Close
            </button>
          )}
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
};

export default CartModal;