// Основной JavaScript файл для сайта Home for You

// Глобальные переменные
let cartCount = 0;
let cartItems = [];
let products = [];

// DOM элементы
const elements = {
  cartCount: document.getElementById("cart-count"),
  daysCounter: document.getElementById("days-counter"),
  menuToggle: document.getElementById("menu-toggle"),
  nav: document.querySelector(".nav"),
  productsContainer: document.getElementById("products-container"),
  discountModal: document.getElementById("discount-modal"),
  modalClose: document.getElementById("modal-close"),
  modalAction: document.getElementById("modal-action"),
  snowfall: document.getElementById("snowfall"),
};

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  // Загрузка данных корзины из localStorage
  loadCartFromStorage();
  updateCartCount();

  // Инициализация новогоднего счетчика
  initNewYearCounter();

  // Инициализация мобильного меню
  initMobileMenu();

  // Инициализация снегопада (только на главной)
  if (elements.snowfall) {
    initSnowfall();
  }

  // Загрузка товаров (для главной и каталога)
  if (elements.productsContainer) {
    loadProducts();
    renderProducts();
  }

  // Показ модального окна скидки (только на главной)
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    setTimeout(showDiscountModal, 5000);
  }

  // Инициализация модального окна
  initModal();

  // Инициализация фильтров для каталога
  if (window.location.pathname.includes("catalog.html")) {
    initCatalogFilters();
  }

  // Инициализация корзины
  if (window.location.pathname.includes("cart.html")) {
    initCartPage();
  }

  // Инициализация страницы товара
  if (window.location.pathname.includes("product.html")) {
    initProductPage();
  }

  // Инициализация формы контактов
  if (window.location.pathname.includes("contacts.html")) {
    initContactForm();
  }
});

// Функция загрузки корзины из localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("homeForYouCart");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}

// Функция сохранения корзины в localStorage
function saveCartToStorage() {
  localStorage.setItem("homeForYouCart", JSON.stringify(cartItems));
}

// Функция обновления счетчика корзины
function updateCartCount() {
  if (elements.cartCount) {
    elements.cartCount.textContent = cartCount;
  }

  // Обновляем все элементы с классом cart-count на странице
  const allCartCounts = document.querySelectorAll(".cart-count");
  allCartCounts.forEach((element) => {
    element.textContent = cartCount;
  });
}

// Функция добавления товара в корзину
function addToCart(productId, quantity = 1) {
  // Поиск товара
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Проверяем, есть ли товар уже в корзине
  const existingItem = cartItems.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  // Обновляем счетчик
  cartCount += quantity;
  updateCartCount();

  // Сохраняем в localStorage
  saveCartToStorage();

  // Показываем уведомление
  showNotification(`Товар "${product.name}" добавлен в корзину!`);
}

// Функция удаления товара из корзины
function removeFromCart(productId) {
  const itemIndex = cartItems.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cartCount -= cartItems[itemIndex].quantity;
    cartItems.splice(itemIndex, 1);
    updateCartCount();
    saveCartToStorage();
    return true;
  }

  return false;
}

// Функция обновления количества товара в корзине
function updateCartItemQuantity(productId, newQuantity) {
  const item = cartItems.find((item) => item.id === productId);

  if (item) {
    const quantityDiff = newQuantity - item.quantity;
    item.quantity = newQuantity;
    cartCount += quantityDiff;
    updateCartCount();
    saveCartToStorage();
    return true;
  }

  return false;
}

// Функция расчета общей суммы корзины
function calculateCartTotal() {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

// Новогодний счетчик
function initNewYearCounter() {
  if (!elements.daysCounter) return;

  function updateCounter() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear =
      now.getMonth() === 11 && now.getDate() > 31
        ? currentYear + 1
        : currentYear;

    const newYear = new Date(nextYear, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    elements.daysCounter.textContent = days;
  }

  updateCounter();
  // Обновляем каждый день
  setInterval(updateCounter, 24 * 60 * 60 * 1000);
}

// Мобильное меню
function initMobileMenu() {
  if (!elements.menuToggle || !elements.nav) return;

  elements.menuToggle.addEventListener("click", function () {
    elements.nav.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      elements.nav.classList.remove("active");
      elements.menuToggle.classList.remove("active");
    });
  });
}

// Снегопад
function initSnowfall() {
  if (!elements.snowfall) return;

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    // Случайные параметры
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.3;
    const duration = Math.random() * 10 + 5;

    // Применяем стили
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;

    // Добавляем в контейнер
    elements.snowfall.appendChild(snowflake);

    // Удаляем снежинку после завершения анимации
    setTimeout(() => {
      snowflake.remove();
    }, duration * 1000);
  }

  // Создаем снежинки каждые 100ms
  setInterval(createSnowflake, 100);

  // Начальное создание снежинок
  for (let i = 0; i < 20; i++) {
    setTimeout(createSnowflake, i * 100);
  }
}

// Модальное окно скидки
function initModal() {
  if (!elements.discountModal || !elements.modalClose || !elements.modalAction)
    return;

  // Закрытие модального окна
  elements.modalClose.addEventListener("click", function () {
    elements.discountModal.style.display = "none";
  });

  // Клик по кнопке действия
  elements.modalAction.addEventListener("click", function () {
    window.location.href = "catalog.html";
  });

  // Закрытие при клике вне модального окна
  elements.discountModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  });

  // Закрытие по ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && elements.discountModal.style.display === "flex") {
      elements.discountModal.style.display = "none";
    }
  });
}

function showDiscountModal() {
  if (!elements.discountModal) return;

  // Проверяем, не показывали ли уже модальное окно
  const modalShown = localStorage.getItem("discountModalShown");
  if (!modalShown) {
    elements.discountModal.style.display = "flex";
    localStorage.setItem("discountModalShown", "true");
  }
}

// Уведомления
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
        <i class="fas fa-check-circle notification-icon"></i>
        <span class="notification-text">${message}</span>
    `;

  document.body.appendChild(notification);

  // Показываем уведомление
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Скрываем через 3 секунды
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Данные товаров
function loadProducts() {
  products = [
    {
      id: 1,
      name: 'Новогодний плед "Зима"',
      price: 2499,
      category: "blankets",
      image: "images/product-1.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Теплая пижама с оленями",
      price: 1899,
      category: "pajamas",
      image: "images/product-2.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: 'Ароматическая свеча "Ель"',
      price: 899,
      category: "candles",
      image: "images/product-3.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: 'Мягкая игрушка "Снеговик"',
      price: 1299,
      category: "toys",
      image: "images/product-4.jpg",
      rating: 4,
    },
    {
      id: 5,
      name: 'Ночник "Северное сияние"',
      price: 1999,
      category: "candles",
      image: "images/product-5.jpg",
      rating: 5,
    },
    {
      id: 6,
      name: "Халат из флиса",
      price: 2999,
      category: "pajamas",
      image: "images/product-6.jpg",
      rating: 5,
    },
    {
      id: 7,
      name: 'Подушка "Рождественский носок"',
      price: 999,
      category: "blankets",
      image: "images/product-7.jpg",
      rating: 4,
    },
    {
      id: 8,
      name: 'Игрушка "Олень Рудольф"',
      price: 1599,
      category: "toys",
      image: "images/product-8.jpg",
      rating: 5,
    },
    {
      id: 9,
      name: 'Плед "Новогодние узоры"',
      price: 2799,
      category: "blankets",
      image: "images/product-9.jpg",
      rating: 4,
    },
    {
      id: 10,
      name: 'Пижама "Снежинки"',
      price: 1699,
      category: "pajamas",
      image: "images/product-10.jpg",
      rating: 5,
    },
    {
      id: 11,
      name: 'Свеча "Мандарин и корица"',
      price: 799,
      category: "candles",
      image: "images/product-11.jpg",
      rating: 4,
    },
    {
      id: 12,
      name: 'Игрушка "Эльф"',
      price: 1199,
      category: "toys",
      image: "images/product-12.jpg",
      rating: 5,
    },
  ];
}

// Отображение товаров
function renderProducts(filteredProducts = null) {
  if (!elements.productsContainer) return;

  const productsToRender = filteredProducts || products;

  // Ограничиваем количество товаров на главной
  const productsForHome =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
      ? productsToRender.slice(0, 6)
      : productsToRender;

  elements.productsContainer.innerHTML = "";

  productsForHome.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <img src="${product.image}" alt="${
      product.name
    }" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${renderStars(product.rating)}
                </div>
                <div class="product-price">${formatPrice(product.price)} ₽</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small add-to-cart-btn" data-id="${
                      product.id
                    }">
                        В корзину
                    </button>
                    <button class="btn btn-outline btn-small view-product-btn" data-id="${
                      product.id
                    }">
                        Подробнее
                    </button>
                </div>
            </div>
        `;

    elements.productsContainer.appendChild(productCard);
  });

  // Добавляем обработчики событий для кнопок
  addProductEventListeners();
}

// Функция отрисовки звезд рейтинга
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star star"></i>';
    } else {
      stars += '<i class="far fa-star star"></i>';
    }
  }
  return stars;
}

// Форматирование цены
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Добавление обработчиков событий для товаров
function addProductEventListeners() {
  // Кнопки "В корзину"
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      addToCart(productId);
    });
  });

  // Кнопки "Подробнее"
  const viewProductButtons = document.querySelectorAll(".view-product-btn");
  viewProductButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      window.location.href = `product.html?id=${productId}`;
    });
  });
}

// Функции для каталога
function initCatalogFilters() {
  const categorySelect = document.getElementById("category");
  const priceRange = document.querySelector(".price-range");
  const minPrice = document.getElementById("min-price");
  const maxPrice = document.getElementById("max-price");
  const applyFiltersBtn = document.getElementById("apply-filters");

  if (!categorySelect || !priceRange || !applyFiltersBtn) return;

  // Инициализация ценового диапазона
  if (priceRange && minPrice && maxPrice) {
    priceRange.addEventListener("input", function () {
      minPrice.textContent = "0";
      maxPrice.textContent = this.value;
    });
  }

  // Применение фильтров
  applyFiltersBtn.addEventListener("click", function () {
    const selectedCategory = categorySelect.value;
    const maxPriceValue = priceRange ? parseInt(priceRange.value) : 10000;

    let filteredProducts = products;

    // Фильтрация по категории
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Фильтрация по цене
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPriceValue
    );

    renderProducts(filteredProducts);
  });
}

// Функции для корзины
function initCartPage() {
  renderCartItems();
  updateCartTotal();

  // Обработчики событий для кнопок в корзине
  document.addEventListener("click", function (e) {
    // Удаление товара
    if (e.target.classList.contains("remove-item-btn")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      if (removeFromCart(productId)) {
        renderCartItems();
        updateCartTotal();
        showNotification("Товар удален из корзины");
      }
    }

    // Обновление количества
    if (e.target.classList.contains("quantity-btn")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const action = e.target.getAttribute("data-action");
      const quantityInput = document.querySelector(
        `.quantity-input[data-id="${productId}"]`
      );

      if (quantityInput) {
        let quantity = parseInt(quantityInput.value);

        if (action === "increase") {
          quantity++;
        } else if (action === "decrease" && quantity > 1) {
          quantity--;
        }

        quantityInput.value = quantity;

        if (updateCartItemQuantity(productId, quantity)) {
          updateCartTotal();
        }
      }
    }

    // Оформление заказа
    if (e.target.id === "checkout-btn") {
      if (cartItems.length === 0) {
        alert("Корзина пуста!");
        return;
      }

      const total = calculateCartTotal();
      alert(
        `Спасибо за заказ! Общая сумма: ${formatPrice(
          total
        )} ₽\nНаш менеджер свяжется с вами для подтверждения.`
      );

      // Очистка корзины
      cartItems = [];
      cartCount = 0;
      saveCartToStorage();
      updateCartCount();
      renderCartItems();
      updateCartTotal();
    }
  });
}

function renderCartItems() {
  const cartContainer = document.querySelector(".cart-items");
  const emptyCart = document.querySelector(".empty-cart");
  const cartTable = document.querySelector(".cart-table tbody");
  const cartFooter = document.querySelector(".cart-footer");

  if (!cartContainer) return;

  if (cartItems.length === 0) {
    if (emptyCart) emptyCart.style.display = "block";
    if (cartTable) cartTable.innerHTML = "";
    if (cartFooter) cartFooter.style.display = "none";
    return;
  }

  if (emptyCart) emptyCart.style.display = "none";
  if (cartFooter) cartFooter.style.display = "block";

  if (cartTable) {
    cartTable.innerHTML = "";

    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image">
                        <span class="cart-item-name">${item.name}</span>
                    </div>
                </td>
                <td>${formatPrice(item.price)} ₽</td>
                <td>
                    <div class="quantity-selector">
                        <button class="quantity-btn" data-id="${
                          item.id
                        }" data-action="decrease">-</button>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="quantity-btn" data-id="${
                          item.id
                        }" data-action="increase">+</button>
                    </div>
                </td>
                <td>${formatPrice(item.price * item.quantity)} ₽</td>
                <td>
                    <button class="btn btn-small remove-item-btn" data-id="${
                      item.id
                    }">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
      cartTable.appendChild(row);
    });
  }
}

function updateCartTotal() {
  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    totalElement.textContent = `${formatPrice(calculateCartTotal())} ₽`;
  }
}

// Функции для страницы товара
function initProductPage() {
  // Получаем ID товара из URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id")) || 1;

  // Находим товар
  const product = products.find((p) => p.id === productId) || products[0];

  // Заполняем информацию о товаре
  document.querySelector(".product-title").textContent = product.name;
  document.querySelector(".product-price").textContent = `${formatPrice(
    product.price
  )} ₽`;
  document.querySelector(".product-rating").innerHTML = renderStars(
    product.rating
  );

  // Заполняем галерею
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  // Обработчики для миниатюр
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      // Убираем активный класс у всех миниатюр
      thumbnails.forEach((t) => t.classList.remove("active"));
      // Добавляем активный класс текущей миниатюре
      this.classList.add("active");
      // Меняем основное изображение
      if (mainImage) {
        mainImage.src = `images/product-${productId}-${index + 1}.jpg`;
      }
    });
  });

  // Обработчики для кнопок количества
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const quantityInput = document.querySelector(".quantity-input");

  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener("click", function () {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });

    plusBtn.addEventListener("click", function () {
      let value = parseInt(quantityInput.value);
      if (value < 10) {
        quantityInput.value = value + 1;
      }
    });
  }

  // Обработчики для кнопок действий
  const addToCartBtn = document.querySelector(".add-to-cart");
  const buyNowBtn = document.querySelector(".buy-now");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const quantity = parseInt(quantityInput.value);
      addToCart(productId, quantity);
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function () {
      const quantity = parseInt(quantityInput.value);
      addToCart(productId, quantity);
      window.location.href = "cart.html";
    });
  }
}

// Функции для формы контактов
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Получаем значения полей
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Простая валидация
    if (!name || !email || !message) {
      showNotification("Пожалуйста, заполните все поля");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Пожалуйста, введите корректный email");
      return;
    }

    // В реальном приложении здесь была бы отправка данных на сервер
    showNotification(
      "Сообщение отправлено! Мы свяжемся с вами в ближайшее время."
    );
    contactForm.reset();
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Экспортируем функции для использования в консоли (для отладки)
window.HomeForYou = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  calculateCartTotal,
  showNotification,
};
