import React from 'react';
import { X } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cart</h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Cart Items */}
          <div className="space-y-4">
            {/* Example cart item */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Item name</p>
                <p className="text-sm text-gray-500">$9.90</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
                  -
                </button>
                <span>1</span>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>$9.90</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-4 font-medium">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;