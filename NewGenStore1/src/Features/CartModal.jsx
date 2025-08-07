// Features/CartModal.jsx
import { useImperativeHandle, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from '../components/Cart';

const CartModal = forwardRef(({ title = 'Your Cart', actions }, ref) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
    },
  }));

  return createPortal(
   <dialog
  ref={dialogRef}
  className="backdrop:bg-black/40  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl rounded-md"
>
  <div className="bg-white rounded-lg p-6 shadow-lg">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <Cart />
    <form method="dialog" className="flex justify-end gap-2 mt-4">
      {actions}
    </form>
  </div>
</dialog>,
    document.getElementById('modal') // 🔸 ensure this div is in public/index.html
  );
});

export default CartModal;
