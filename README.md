<div align="center">

# 🍔 Foodota

### Modern Restaurant & Online Food Ordering Website

A modern, responsive restaurant website built with pure HTML, CSS, and JavaScript.

Foodota provides a complete front-end restaurant experience with product browsing, shopping cart management, order checkout, and WhatsApp ordering.

<br>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)

</div>

---

## 📖 About The Project

Foodota is a modern restaurant website designed to provide customers with a smooth and realistic online food ordering experience.

The project includes a restaurant landing page, product shop, dynamic shopping cart, checkout form, and WhatsApp-based ordering system.

Instead of using a backend, the project currently uses internal JavaScript arrays as the main product data source, while the shopping cart is persisted using browser Local Storage.

The project was built with pure HTML, CSS, and JavaScript to demonstrate strong fundamentals in front-end development, DOM manipulation, state management, data handling, and responsive UI design.

---

## ✨ Features

### 🏠 Home Page

- Modern restaurant landing page
- Hero section with clear call-to-action
- Restaurant-focused design
- Quick access to the shop
- Integrated shopping cart
- Modern animations and visual effects
- Hover and active states
- Fully responsive layout

### 🛍️ Shop

- Display restaurant products dynamically
- Products generated from JavaScript data
- Product categories and information
- Add products directly to the shopping cart
- Smooth and interactive user experience

### 🛒 Shopping Cart

The shopping cart provides complete cart management functionality:

- Add products
- Increase product quantity
- Decrease product quantity
- Remove individual products
- Clear the entire cart
- Calculate subtotal
- Calculate total
- Display total number of products
- Persist cart data after page refresh
- Continue shopping directly from the cart

Cart data is stored using browser Local Storage, allowing users to keep their cart even after refreshing the page.

### 📦 Order Checkout

Customers can enter their:

- Customer name
- Phone number
- Address
- Additional order notes
- Payment method

The checkout system automatically prepares the complete order information before sending it to WhatsApp.

### 💬 WhatsApp Ordering

Foodota includes a complete WhatsApp ordering flow.

After completing the checkout form, the website generates a structured and user-friendly order message containing:

- Customer information
- Phone number
- Delivery address
- Ordered products
- Product quantities
- Total order price
- Payment method
- Additional notes

The generated message is then sent directly through WhatsApp.

This allows the website to provide a realistic online ordering experience without requiring a dedicated backend or payment gateway.

### 🚚 Restaurant Features

- Online Ordering
- Fast Delivery
- Fresh Food
- Special Offers
- Responsive Design
- Modern User Interface

### 🎨 UI / UX

- Modern restaurant-oriented interface
- Responsive design
- Smooth animations
- Hover effects
- Active states
- Interactive buttons
- Clean visual hierarchy
- Mobile-friendly layout
- Optimized experience for small screens

The layout supports screens around 320px and above, with responsive behavior across different device sizes.

---

## 🧰 Technologies Used

### Front-End

- HTML5
- CSS3
- JavaScript
- Font Awesome

### Browser APIs

- Local Storage

### Data Management

Product information is currently stored in JavaScript arrays and rendered dynamically into the interface.

---

## 📂 Project Structure

```text
Foodota/
│
├── index.html
├── shop.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── shop.js
│   ├── cart.js
│   └── contact.js
│
├── images/
│   └── ...
│
├── screenshots/
│   ├── home.png
│   ├── shop.png
│   └── contact.png
│
└── README.md
