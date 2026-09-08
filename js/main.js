document.body.insertAdjacentHTML('beforeend', `
  <div id="toastAlert" class="toast-alert">
      <i class="fa-solid fa-circle-check"></i> Added Successfully
  </div>
  <div id="confirmModalOverlay" class="confirm-modal-overlay">
      <div class="confirm-modal">
          <h3>Are you sure?</h3>
          <div class="confirm-btns">
              <button class="btn-cancel" onclick="closeConfirmModal()">Cancel</button>
              <button class="btn-delete" onclick="confirmDelete()">Delete</button>
          </div>
      </div>
  </div>
`);

const allProducts = [
  { proName: 'Classic Fried Chicken', proCat: 'Chicken', proPrice: 21.00, proAmount: 1, isSuper: true, proImg: 'images/chicken-1.png' },
  { proName: 'Spicy Crispy Chicken', proCat: 'Chicken', proPrice: 23.00, proAmount: 1, isSuper: true, proImg: 'images/chicken-2.png' },
  { proName: 'Buffalo Chicken Wings', proCat: 'Chicken', proPrice: 19.00, proAmount: 1, isSuper: true, proImg: 'images/chickin-3.jpg' },
  { proName: 'Family Chicken Strips', proCat: 'Chicken', proPrice: 18.00, proAmount: 1, isSuper: true, proImg: 'images/chickin-4.jpg' },
  { proName: 'Crispy Chicken Nuggets', proCat: 'Chicken', proPrice: 24.00, proAmount: 1, isSuper: true, proImg: 'images/chickin-5.jpeg' },
  { proName: 'Mixed Grill', proCat: 'Grill', proPrice: 25.00, proAmount: 1, isSuper: true, proImg: 'images/res-1.jpg' },
  { proName: 'Special Beef Kebab', proCat: 'Grill', proPrice: 21.00, proAmount: 1, isSuper: true, proImg: 'images/res-3.jpg' },
  { proName: 'Smoked Shish Tawook', proCat: 'Grill', proPrice: 22.00, proAmount: 1, isSuper: true, proImg: 'images/res-4.jpg' },
  { proName: 'Grilled Lamb Chops', proCat: 'Grill', proPrice: 22.00, proAmount: 1, isSuper: true, proImg: 'images/res-5.jpg' },
  { proName: 'Charcoal Grilled Chicken', proCat: 'Grill', proPrice: 15.00, proAmount: 1, isSuper: true, proImg: 'images/res-6.jpg' },
  { proName: 'Premium Beef Cubes', proCat: 'Grill', proPrice: 16.00, proAmount: 1, isSuper: true, proImg: 'images/res-8.jpg' },
  { proName: 'Italian Margherita Pizza', proCat: 'Pizza', proPrice: 18.00, proAmount: 1, isSuper: true, proImg: 'images/pizza-1.jpeg' },
  { proName: 'Cheesy Pepperoni Pizza', proCat: 'Pizza', proPrice: 20.00, proAmount: 1, isSuper: true, proImg: 'images/pizza-2.jpg' },
  { proName: 'Mixed Veggie Pizza', proCat: 'Pizza', proPrice: 15.00, proAmount: 1, isSuper: true, proImg: 'images/pizza-4.png' },
  { proName: 'BBQ Chicken Pizza', proCat: 'Pizza', proPrice: 13.00, proAmount: 1, isSuper: true, proImg: 'images/pizza-3.jpg' }
];

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const shopContainer = document.querySelector('.box .container');
if (shopContainer) {
  shopContainer.innerHTML = '';
  allProducts.forEach((value, index) => {
    shopContainer.innerHTML += `
      <div class="product-card">
        <img src="${value.proImg}" alt="${value.proName}" style="height: 120px; object-fit: contain; margin-bottom: 10px;">
        <div class="line-divider"></div>
        <span style="color: gray; font-size: 14px; font-style: italic;">${value.proCat}</span>
        <h4 style="margin: 5px 0;">${value.proName}</h4>
        <span class="price-tag" style="background-color: var(--green-color); color: white; padding: 4px 12px; border-radius: 15px; font-weight: bold;">$${value.proPrice.toFixed(2)}</span>
        <button class="btn add-cart-btn" onclick="addToCart(${index})" style="margin-top: 15px; width: 100%; justify-content: center;">
          Add to Cart <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    `;
  });
}

const sliderContainer = document.querySelector('#product-slider .splide__list');
if (sliderContainer) {
  sliderContainer.innerHTML = '';
  allProducts.slice(0, 6).forEach((value, index) => {
    sliderContainer.innerHTML += `
      <li class="splide__slide">
        <div class="product-card">
          <img src="${value.proImg}" alt="${value.proName}">
          <div class="line-divider"></div>
          <h4>${value.proName}</h4>
          <span class="price-tag">Price: $${value.proPrice.toFixed(2)}</span>
          <button class="btn add-cart-btn" onclick="addToCart(${index})">
            Add to Cart <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </li>
    `;
  });
}

window.addToCart = function(index) {
  let result = cartItems.find(e => e.proName === allProducts[index].proName);
  if (!result) {
    cartItems.push({ ...allProducts[index], proAmount: 1 });
  } else {
    result.proAmount += 1;
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  displayCartItems();

  const toast = document.getElementById('toastAlert');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
  }
};

function displayCartItems() {
  const cartDomContainer = document.querySelector('.cart aside') || document.querySelector('.cart .cart-container');
  const cartMessage = document.getElementById('cartMessage') || document.querySelector('.cart > span:nth-of-type(1)');
  const totalDom = document.getElementById('total') || document.querySelector('.cart .total b');

  if (!cartDomContainer) return;

  if (cartItems.length === 0) {
    if (cartMessage) cartMessage.style.display = 'block';
    cartDomContainer.innerHTML = '';
    if (totalDom) totalDom.innerHTML = '$0.00';
  } else {
    if (cartMessage) cartMessage.style.display = 'none';
    let cartTotal = 0;
    let itemHTML = '';

    cartItems.forEach((value, cartIndex) => {
      cartTotal += value.proPrice * value.proAmount;
      itemHTML += `
      <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
        <div class="item-img"><img src="${value.proImg}" style="width: 50px; border-radius: 5px;"></div>
        <div class="item-title" style="display: flex; flex-direction: column; width: 45%;">
          <span style="font-size: 14px; font-weight: bold; color: var(--dark-color);">${value.proName}</span>
          <span style="color: var(--green-color); font-weight: bold;">$${(value.proPrice * value.proAmount).toFixed(2)}</span>
        </div>
        <div class="item-actions" style="display: flex; gap: 10px; align-items: center;">
          <button onclick="handleAmount(${cartIndex}, 'plus')" style="border:none; background:none; cursor:pointer; color:var(--green-color); font-size:16px;"><i class="fa-solid fa-plus"></i></button>
          <span style="font-weight: bold;">${value.proAmount}</span>
          <button onclick="handleAmount(${cartIndex}, 'minus')" style="border:none; background:none; cursor:pointer; color:#f39c12; font-size:16px;"><i class="fa-solid fa-minus"></i></button>
          <button onclick="deleteProduct(${cartIndex})" style="border:none; background:none; cursor:pointer; color:#e74c3c; font-size:16px; margin-left: 5px;"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      `;
    });

    cartDomContainer.innerHTML = itemHTML;
    if (totalDom) totalDom.innerHTML = `$${cartTotal.toFixed(2)}`;
  }
}

window.handleAmount = function(cartIndex, type) {
  if (type === 'plus') {
    cartItems[cartIndex].proAmount++;
  } else if (type === 'minus') {
    if (cartItems[cartIndex].proAmount > 1) {
      cartItems[cartIndex].proAmount--;
    }
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  displayCartItems();
};

let itemToDeleteIndex = null;

window.deleteProduct = function(cartIndex) {
  itemToDeleteIndex = cartIndex;
  const modal = document.getElementById('confirmModalOverlay');
  if (modal) modal.classList.add('show');
};

window.confirmDelete = function() {
  if (itemToDeleteIndex !== null) {
    cartItems.splice(itemToDeleteIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    closeConfirmModal();
  }
};

window.closeConfirmModal = function() {
  itemToDeleteIndex = null;
  const modal = document.getElementById('confirmModalOverlay');
  if (modal) modal.classList.remove('show');
};

window.addEventListener('load', function () {
  if (document.querySelector('#slider')) {
    var splide = new Splide('#slider', {
      type: 'loop', 
      rewind: true,
      loop : true ,
      perPage: 1, 
      perMove: 1, 
      autoplay: true, 
      interval: 3000, 
      pauseOnHover: false, 
      pauseOnFocus: false, 
      arrows: false, 
      pagination: false, 
      speed: 800
    });
    splide.mount();
    
  }

  if (document.querySelector('#product-slider')) {
    var productSlider = new Splide('#product-slider', {
      type: 'loop', perPage: 5, perMove: 1, gap: '20px', arrows: false, pagination: false, speed: 2000,
      breakpoints: { 1200: { perPage: 4 }, 992: { perPage: 3 }, 768: { perPage: 2 }, 576: { perPage: 1 } }
    });
    productSlider.mount();

    var prevBtn = document.getElementById('prod-prev');
    var nextBtn = document.getElementById('prod-next');
    if(prevBtn) prevBtn.addEventListener('click', function () { productSlider.go('-1'); });
    if(nextBtn) nextBtn.addEventListener('click', function () { productSlider.go('+1'); });
  }
});

const cartObj = document.querySelector('.cart');
const cartBtns = document.querySelectorAll('.cart-btn, .cart0');
const cartClose = document.querySelector('.close-btn');

cartBtns.forEach(btn => btn.addEventListener('click', () => { if(cartObj) cartObj.style.transform = 'translateX(0)'; }));
if (cartClose && cartObj) cartClose.addEventListener('click', () => { cartObj.style.transform = 'translateX(100%)'; });

let nav = document.querySelector('nav');
let isHomePage = document.querySelector('.hero') !== null;

if (nav) {
  if (!isHomePage) {
    nav.classList.add('active');
    window.addEventListener('scroll', () => {
      nav.classList.add('active');
    });
  } else {
    document.addEventListener('scroll', () => {
      if (scrollY > 100) nav.classList.add('active');
      else nav.classList.remove('active');
    });
  }
}

displayCartItems();




// تشغيل قائمة الموبايل (Hamburger Menu)
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinksContainer = document.getElementById('nav-links');

if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('show-menu');
    });
}



