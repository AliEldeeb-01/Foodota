/**
 * Contact & WhatsApp Cart Ordering Script
 * Dedicated script for contact.html
 * Target WhatsApp Number: 01008455808 (+201008455808)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Target WhatsApp number (Egypt format)
  const WHATSAPP_PHONE = '201008455808';
  const DISPLAY_PHONE = '01008455808';

  // State
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let itemToDeleteIndex = null;

  // DOM Elements
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCartView = document.getElementById('emptyCartView');
  const cartCalcBox = document.getElementById('cartCalcBox');
  const subtotalEl = document.getElementById('subtotalVal');
  const deliveryEl = document.getElementById('deliveryVal');
  const grandTotalEl = document.getElementById('grandTotalVal');
  const cartBadgeCount = document.getElementById('cartBadgeCount');
  const btnClearCart = document.getElementById('btnClearCart');
  const waPreviewBubble = document.getElementById('waPreviewBubble');
  const orderForm = document.getElementById('orderForm');
  const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
  const confirmModal = document.getElementById('confirmModal');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const toastMsg = document.getElementById('toastMsg');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  // Input Elements
  const custNameInput = document.getElementById('custName');
  const custPhoneInput = document.getElementById('custPhone');
  const custAreaInput = document.getElementById('custArea');
  const custAddressInput = document.getElementById('custAddress');
  const custNotesInput = document.getElementById('custNotes');
  const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Toast helper
  function showToast(message, type = 'success') {
    if (!toastMsg) return;
    toastMsg.className = `toast-msg show ${type}`;
    toastMsg.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-xmark'}"></i>
      <span>${message}</span>
    `;
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3500);
  }

  // Calculate Totals
  function getCartSummary() {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.proPrice) || 0;
      const amount = parseInt(item.proAmount, 10) || 1;
      subtotal += price * amount;
    });

    // Delivery is free for orders > $30 or flat $2 otherwise (or free for demonstration)
    const deliveryFee = subtotal > 0 ? (subtotal >= 40 ? 0 : 3.00) : 0;
    const grandTotal = subtotal + deliveryFee;

    return {
      subtotal: subtotal.toFixed(2),
      deliveryFee: deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`,
      deliveryValue: deliveryFee,
      grandTotal: grandTotal.toFixed(2),
      itemCount: cartItems.reduce((acc, curr) => acc + (parseInt(curr.proAmount, 10) || 1), 0)
    };
  }

  // Render Cart Items
  function renderCart() {
    if (!cartItemsList) return;

    if (cartItems.length === 0) {
      if (emptyCartView) emptyCartView.style.display = 'block';
      if (cartCalcBox) cartCalcBox.style.display = 'none';
      cartItemsList.innerHTML = '';
      if (cartBadgeCount) cartBadgeCount.textContent = '0';
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      if (grandTotalEl) grandTotalEl.textContent = '$0.00';
      updateMessagePreview();
      return;
    }

    if (emptyCartView) emptyCartView.style.display = 'none';
    if (cartCalcBox) cartCalcBox.style.display = 'block';

    const summary = getCartSummary();
    if (cartBadgeCount) cartBadgeCount.textContent = `${summary.itemCount} Items`;
    if (subtotalEl) subtotalEl.textContent = `$${summary.subtotal}`;
    if (deliveryEl) {
      deliveryEl.innerHTML = summary.deliveryFee === 'Free' 
        ? '<span class="badge-free">مجاني / Free</span>' 
        : summary.deliveryFee;
    }
    if (grandTotalEl) grandTotalEl.textContent = `$${summary.grandTotal}`;

    // Generate HTML
    cartItemsList.innerHTML = cartItems.map((item, index) => {
      const price = parseFloat(item.proPrice) || 0;
      const amount = parseInt(item.proAmount, 10) || 1;
      const itemTotal = (price * amount).toFixed(2);
      const imgSrc = item.proImg || 'images/chicken-1.png';

      return `
        <div class="cart-item-card" data-index="${index}">
          <div class="cart-item-img">
            <img src="${imgSrc}" alt="${item.proName || 'Product'}" onerror="this.src='images/burger-1.png'">
          </div>
          <div class="cart-item-info">
            <h4>${item.proName || 'Product'}</h4>
            <span class="cart-item-cat">${item.proCat || 'Foodota'}</span>
            <div class="cart-item-unit-price">$${price.toFixed(2)} each</div>
          </div>
          <div class="cart-item-qty">
            <button type="button" class="cart-qty-btn" onclick="window.changeQuantity(${index}, -1)" title="Decrease">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="cart-qty-num">${amount}</span>
            <button type="button" class="cart-qty-btn" onclick="window.changeQuantity(${index}, 1)" title="Increase">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="cart-item-total">$${itemTotal}</div>
          <button type="button" class="cart-item-delete" onclick="window.openDeleteModal(${index})" title="Remove item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }).join('');

    updateMessagePreview();
  }

  // Quantity Handler
  window.changeQuantity = function(index, delta) {
    if (!cartItems[index]) return;
    const newQty = (parseInt(cartItems[index].proAmount, 10) || 1) + delta;
    if (newQty <= 0) {
      window.openDeleteModal(index);
      return;
    }
    cartItems[index].proAmount = newQty;
    saveCart();
    renderCart();
  };

  // Delete Handlers
  window.openDeleteModal = function(index) {
    itemToDeleteIndex = index;
    if (confirmModal) confirmModal.classList.add('show');
  };

  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener('click', () => {
      itemToDeleteIndex = null;
      if (confirmModal) confirmModal.classList.remove('show');
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (itemToDeleteIndex !== null && cartItems[itemToDeleteIndex]) {
        const removedName = cartItems[itemToDeleteIndex].proName || 'Item';
        cartItems.splice(itemToDeleteIndex, 1);
        itemToDeleteIndex = null;
        saveCart();
        renderCart();
        if (confirmModal) confirmModal.classList.remove('show');
        showToast(`تم حذف ${removedName} من السلة`, 'warning');
      }
    });
  }

  // Clear entire cart
  if (btnClearCart) {
    btnClearCart.addEventListener('click', () => {
      if (cartItems.length === 0) return;
      if (confirm('هل أنت متأكد من تفريغ كل المنتجات من السلة؟')) {
        cartItems = [];
        saveCart();
        renderCart();
        showToast('تم تفريغ سلة التسوق بنجاح', 'warning');
      }
    });
  }

  function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Get selected payment method
  function getSelectedPaymentMethod() {
    let method = 'كاش عند الاستلام (Cash on Delivery)';
    paymentInputs.forEach(input => {
      if (input.checked) {
        if (input.value === 'vodafone') method = 'فودافون كاش (Vodafone Cash)';
        else if (input.value === 'visa') method = 'فيزا / بطاقة عند الاستلام (POS)';
        else method = 'كاش عند الاستلام (Cash on Delivery)';
      }
    });
    return method;
  }

  // Build WhatsApp formatted message text
  function generateWhatsAppMessage() {
    const custName = custNameInput?.value.trim() || 'غير محدد';
    const custPhone = custPhoneInput?.value.trim() || 'غير محدد';
    const custArea = custAreaInput?.value.trim() || '';
    const custAddress = custAddressInput?.value.trim() || 'غير محدد';
    const custNotes = custNotesInput?.value.trim() || 'لا توجد ملاحظات';
    const payment = getSelectedPaymentMethod();
    const summary = getCartSummary();
    const dateStr = new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' });

    let itemsListText = '';
    if (cartItems.length === 0) {
      itemsListText = '⚠️ السلة فارغة حالياً';
    } else {
      itemsListText = cartItems.map((item, i) => {
        const price = parseFloat(item.proPrice) || 0;
        const qty = parseInt(item.proAmount, 10) || 1;
        const total = (price * qty).toFixed(2);
        return `${i + 1}. *${item.proName}* [x${qty}] = $${total}`;
      }).join('\n');
    }

    const fullAddress = custArea ? `${custArea} - ${custAddress}` : custAddress;

    const message = 
`🍔 *طلب جديد من مطعم Foodota* 🍟
━━━━━━━━━━━━━━━━━━━━
👤 *العميل:* ${custName}
📞 *الهاتف:* ${custPhone}
📍 *العنوان:* ${fullAddress}
💳 *طريقة الدفع:* ${payment}
📝 *ملاحظات:* ${custNotes}
━━━━━━━━━━━━━━━━━━━━
🛒 *تفاصيل الطلبات:*
${itemsListText}
━━━━━━━━━━━━━━━━━━━━
💵 *مجموع الطلبات:* $${summary.subtotal}
🚚 *خدمة التوصيل:* ${summary.deliveryFee}
💰 *الإجمالي النهائي:* $${summary.grandTotal}
🕒 *تاريخ الطلب:* ${dateStr}
━━━━━━━━━━━━━━━━━━━━
✨ برجاء تأكيد استلام الطلب والبدء في تجهيزه. شكراً لكم!`;

    return message;
  }

  // Update Live Preview
  function updateMessagePreview() {
    if (!waPreviewBubble) return;
    waPreviewBubble.textContent = generateWhatsAppMessage();
  }

  // Attach live preview listeners to inputs
  [custNameInput, custPhoneInput, custAreaInput, custAddressInput, custNotesInput].forEach(el => {
    if (el) {
      el.addEventListener('input', updateMessagePreview);
    }
  });

  paymentInputs.forEach(input => {
    input.addEventListener('change', updateMessagePreview);
  });

  // Send Order via WhatsApp
  if (btnSendWhatsApp) {
    btnSendWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();

      // Check cart
      if (cartItems.length === 0) {
        showToast('سلة التسوق فارغة! الرجاء اختيار وجباتك أولاً من المتجر.', 'warning');
        return;
      }

      // Check required fields
      const name = custNameInput?.value.trim();
      const phone = custPhoneInput?.value.trim();
      const address = custAddressInput?.value.trim();

      if (!name) {
        showToast('يرجى إدخال الاسم بالكامل لتأكيد الطلب', 'error');
        custNameInput.focus();
        return;
      }

      if (!phone || phone.length < 9) {
        showToast('يرجى إدخال رقم هاتف صحيح للتواصل والتوصيل', 'error');
        custPhoneInput.focus();
        return;
      }

      if (!address) {
        showToast('يرجى كتابة عنوان التوصيل بالتفصيل', 'error');
        custAddressInput.focus();
        return;
      }

      // Prepare Message
      const message = generateWhatsAppMessage();
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

      showToast('جاري تحويلك إلى واتساب لإرسال الطلب...', 'success');

      // Open WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
    });
  }

  // Initial render
  renderCart();
});
