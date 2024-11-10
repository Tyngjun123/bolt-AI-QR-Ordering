import { db, collection, getDocs, addDoc } from './firebase-config.js';

let cart = [];
let menuItems = [];

// Initialize the application
async function init() {
    await loadMenu();
    setupEventListeners();
}

// Load menu items from Firebase
async function loadMenu() {
    try {
        const querySnapshot = await getDocs(collection(db, 'menu'));
        menuItems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        displayMenu(menuItems);
    } catch (error) {
        console.error('Error loading menu:', error);
        showNotification('Error loading menu items', 'error');
    }
}

// Display menu items in the grid
function displayMenu(items) {
    const menuGrid = document.getElementById('menuItems');
    menuGrid.innerHTML = '';

    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-price">$${item.price.toFixed(2)}</p>
                <button class="btn-primary" onclick="addToCart('${item.id}')">Add to Cart</button>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Add item to cart
window.addToCart = function(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
        const cartItem = cart.find(i => i.id === itemId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCart();
        showNotification('Item added to cart', 'success');
    }
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
            <button class="btn-secondary" onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
window.removeFromCart = function(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showNotification('Item removed from cart', 'success');
}

// Handle checkout process
async function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    try {
        const order = {
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'orders'), order);
        generateQRCode(docRef.id);
        showOrderModal(order);
        cart = [];
        updateCart();
        showNotification('Order placed successfully', 'success');
    } catch (error) {
        console.error('Error placing order:', error);
        showNotification('Error placing order', 'error');
    }
}

// Generate QR Code for order
function generateQRCode(orderId) {
    const qrCode = document.getElementById('qrCode');
    qrCode.innerHTML = '';
    
    new QRCode(qrCode, {
        text: `${window.location.origin}/order/${orderId}`,
        width: 128,
        height: 128
    });
}

// Show order modal
function showOrderModal(order) {
    const modal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');
    
    orderDetails.innerHTML = `
        <h3>Order Summary</h3>
        ${order.items.map(item => `
            <div class="cart-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="cart-total">
            <span>Total:</span>
            <span>$${order.total.toFixed(2)}</span>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
window.closeModal = function() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            document.querySelectorAll('.category-btn').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            
            displayMenu(filteredItems);
        });
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('orderModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Initialize the application
init();