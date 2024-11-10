import React from 'react';
import { Plus } from 'lucide-react';

const categories = [
  { id: 'all', name: '全部' },
  { id: 'top', name: '人気 TOP' },
  { id: 'main', name: '主食' },
  { id: 'snacks', name: '小吃' },
  { id: 'dessert', name: '甜点' }
];

const menuItems = [
  // TOP Items
  {
    id: '1',
    code: 'TOP001',
    name: 'Signature Milk Tea',
    price: 5.90,
    category: 'top'
  },
  {
    id: '2',
    code: 'TOP002',
    name: 'Brown Sugar Boba',
    price: 6.90,
    category: 'top'
  },
  // Main Course
  {
    id: '3',
    code: 'MAIN001',
    name: 'Braised Pork Rice',
    price: 12.90,
    category: 'main'
  },
  {
    id: '4',
    code: 'MAIN002',
    name: 'Chicken Curry Rice',
    price: 13.90,
    category: 'main'
  },
  {
    id: '5',
    code: 'MAIN003',
    name: 'Beef Noodle Soup',
    price: 14.90,
    category: 'main'
  },
  // Snacks
  {
    id: '6',
    code: 'SNK001',
    name: 'Popcorn Chicken',
    price: 7.90,
    category: 'snacks'
  },
  {
    id: '7',
    code: 'SNK002',
    name: 'Sweet Potato Fries',
    price: 6.90,
    category: 'snacks'
  },
  {
    id: '8',
    code: 'SNK003',
    name: 'Spring Rolls (3pcs)',
    price: 5.90,
    category: 'snacks'
  },
  // Desserts
  {
    id: '9',
    code: 'DST001',
    name: 'Mango Pudding',
    price: 4.90,
    category: 'dessert'
  },
  {
    id: '10',
    code: 'DST002',
    name: 'Red Bean Soup',
    price: 4.50,
    category: 'dessert'
  },
  {
    id: '11',
    code: 'DST003',
    name: 'Bubble Waffle',
    price: 6.90,
    category: 'dessert'
  }
];

const MenuList = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Category Navigation */}
      <nav className="bg-white border-r border-gray-200 fixed left-0 top-[89px] w-20 bottom-16 overflow-y-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full py-3 px-2 text-sm text-center ${
              selectedCategory === category.id
                ? 'bg-gray-100 font-medium'
                : 'text-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>

      {/* Menu Items */}
      <div className="ml-20 px-4 pb-16">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="py-4 flex items-center justify-between border-b border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-black text-white px-2 py-1 rounded text-sm">
                DEV
              </div>
              <div>
                <p className="text-sm font-medium">{item.code}. {item.name}</p>
                <p className="text-sm text-red-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="bg-white p-1 rounded-full border border-gray-300"
              aria-label="Add to cart"
            >
              <Plus size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;