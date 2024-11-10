import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Header from './components/Header';
import MenuList from './components/MenuList';
import Cart from './components/Cart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-16">
        {/* Promotion Banner */}
        <div className="bg-red-500 text-white py-3 px-4 text-center font-medium">
          Promotion items
        </div>
        
        <MenuList />

        {/* Fixed Cart Button */}
        <div 
          className="fixed bottom-0 left-0 right-0 bg-red-500 text-white py-4 px-4 text-center font-medium"
          onClick={() => setIsCartOpen(true)}
        >
          CART
        </div>

        {/* Cart Modal */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </main>
    </div>
  );
}

export default App;