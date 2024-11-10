import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold">Zapalang dessert shop</h1>
          <p className="text-sm text-gray-500">Zapalang dessert shop</p>
        </div>
        <div className="bg-black text-white px-2 py-1 rounded text-sm">
          DEV
        </div>
      </div>
    </header>
  );
};

export default Header;