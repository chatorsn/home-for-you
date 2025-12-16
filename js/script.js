// Основной JavaScript файл для сайта Home for You

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let cartCount = 0;
let cartItems = [];
let products = [];

// ========== DOM ЭЛЕМЕНТЫ ==========
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

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", function () {
  // Загружаем товары
  loadProducts();
  enrichProductsWithDetails();

  // Загрузка корзины
  loadCartFromStorage();
  updateCartCount();

  // Инициализация компонентов
  initNewYearCounter();
  initMobileMenu();

  if (elements.snowfall) {
    initSnowfall();
  }

  if (elements.productsContainer) {
    renderProducts();
  }

  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    setTimeout(showDiscountModal, 5000);
  }

  initModal();

  if (window.location.pathname.includes("catalog.html")) {
    initCatalogFilters();
  }

  if (window.location.pathname.includes("cart.html")) {
    initCartPage();
  }

  if (window.location.pathname.includes("product.html")) {
    initProductPage();
  }

  if (window.location.pathname.includes("contact.html")) {
    initContactForm();
  }
});

// ========== МАССИВ ТОВАРОВ ==========
function loadProducts() {
  products = [
    {
      id: 1,
      name: "Новогодний плед 'Зима'",
      price: 2499,
      category: "blankets",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 2,
      name: "Теплая пижама с оленями",
      price: 1899,
      category: "pajamas",
      image:
        "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop",
      rating: 4,
    },
    {
      id: 3,
      name: "Ароматическая свеча 'Ель'",
      price: 899,
      category: "candles",
      image:
        "https://images.unsplash.com/photo-1590736966893-6c6d6b70a63e?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 4,
      name: "Мягкая игрушка 'Снеговик'",
      price: 1299,
      category: "toys",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
      rating: 4,
    },
    {
      id: 5,
      name: "Ночник 'Северное сияние'",
      price: 1999,
      category: "candles",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 6,
      name: "Халат из флиса",
      price: 2999,
      category: "pajamas",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 7,
      name: "Подушка 'Рождественский носок'",
      price: 999,
      category: "blankets",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4,
    },
    {
      id: 8,
      name: "Игрушка 'Олень Рудольф'",
      price: 1599,
      category: "toys",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 9,
      name: "Плед 'Новогодние узоры'",
      price: 2799,
      category: "blankets",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop",
      rating: 4,
    },
    {
      id: 10,
      name: "Пижама 'Снежинки'",
      price: 1699,
      category: "pajamas",
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 11,
      name: "Свеча 'Мандарин и корица'",
      price: 799,
      category: "candles",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      rating: 4,
    },
    {
      id: 12,
      name: "Игрушка 'Эльф'",
      price: 1199,
      category: "toys",
      image:
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=400&fit=crop",
      rating: 5,
    },
  ];
}

// ========== ПОДРОБНЫЕ ДАННЫЕ ТОВАРОВ ==========
function enrichProductsWithDetails() {
  const productDetails = {
    1: {
      description:
        "Мягкий и теплый плед из 100% хлопка с новогодним узором. Идеально подходит для холодных зимних вечеров, создает уютную атмосферу в вашем доме. Размер 150×200 см.",
      features: [
        "100% хлопок",
        "Мягкая ткань",
        "Не вызывает аллергии",
        "Легко стирается",
        "Размер 150×200 см",
      ],
      specs: {
        Материал: "100% хлопок",
        Размер: "150×200 см",
        Вес: "1.2 кг",
        Цвет: "Зеленый с белым узором",
        Уход: "Стирка при 30°C",
      },
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      ],
      categoryName: "Пледы и подушки",
      stock: 15,
      sku: "HFY-PLD-001",
    },
    2: {
      description:
        "Уютная пижама из мягкого флиса с новогодним принтом оленей. Не стесняет движений, сохраняет тепло. Идеальна для зимнего отдыха дома. Доступна в размерах S, M, L, XL.",
      features: [
        "Мягкий флис",
        "Эластичные манжеты",
        "Не линяет при стирке",
        "Два кармана",
        "Комплект: кофта + брюки",
      ],
      specs: {
        Материал: "Флис",
        Размеры: "S, M, L, XL",
        Цвет: "Красный с белым",
        Комплект: "Кофта + брюки",
        Уход: "Стирка при 40°C",
      },
      images: [
        "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      ],
      categoryName: "Пижамы и халаты",
      stock: 8,
      sku: "HFY-PJ-002",
    },
    3: {
      description:
        "Свеча с натуральным ароматом новогодней ели. Горит до 40 часов, создавая праздничную атмосферу и уют в вашем доме. Изготовлена из соевого воска.",
      features: [
        "Натуральный воск",
        "Аромат ели",
        "Горит 40 часов",
        "Стеклянная баночка",
        "Безопасный фитиль",
      ],
      specs: {
        Материал: "Соевый воск",
        "Время горения": "40 часов",
        Вес: "300 г",
        Аромат: "Ель и мандарин",
        Размер: "Ø8×8 см",
      },
      images: [
        "https://images.unsplash.com/photo-1590736966893-6c6d6b70a63e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop",
      ],
      categoryName: "Свечи и ночники",
      stock: 25,
      sku: "HFY-CND-003",
    },
    4: {
      description:
        "Милый снеговик из мягкого плюша. Высота 35 см, безопасен для детей. Отличный подарок на Новый год для детей и взрослых.",
      features: [
        "Мягкий плюш",
        "Безопасные глаза",
        "Можно стирать",
        "Высота 35 см",
        "Гипоаллергенный",
      ],
      specs: {
        Материал: "Плюш, синтепон",
        Высота: "35 см",
        Возраст: "От 3 лет",
        Цвет: "Белый с оранжевым",
        Уход: "Ручная стирка",
      },
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&h=600&fit=crop",
      ],
      categoryName: "Мягкие игрушки",
      stock: 12,
      sku: "HFY-TOY-004",
    },
  };

  // Добавляем подробные данные к товарам
  products.forEach((product) => {
    const details = productDetails[product.id];
    if (details) {
      Object.assign(product, details);
    } else {
      // Дефолтные данные если нет подробностей
      Object.assign(product, {
        description: `Качественный ${product.name.toLowerCase()}. Идеально подходит для новогодних праздников.`,
        features: [
          "Высокое качество",
          "Удобно в использовании",
          "Долговечность",
          "Безопасность",
        ],
        specs: {
          Материал: "Качественные материалы",
          Размер: "Стандартный",
          Вес: "1 кг",
          Цвет: "Разные варианты",
          Уход: "По инструкции",
        },
        images: [
          product.image.replace("w=400", "w=800").replace("h=400", "h=600"),
          product.image.replace("w=400", "w=800").replace("h=400", "h=600"),
          product.image.replace("w=400", "w=800").replace("h=400", "h=600"),
        ],
        categoryName: getCategoryName(product.category),
        stock: Math.floor(Math.random() * 20) + 5,
        sku: `HFY-${String(product.id).padStart(3, "0")}`,
      });
    }
  });
}

// ========== КОРЗИНА (базовые функции) ==========
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("homeForYouCart");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}

function saveCartToStorage() {
  localStorage.setItem("homeForYouCart", JSON.stringify(cartItems));
}

function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

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

  cartCount += quantity;
  updateCartCount();
  saveCartToStorage();

  showNotification(`"${product.name}" добавлен в корзину!`);

  // Обновляем отображение если находимся на странице корзины
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  }
}

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

function updateCartCount() {
  if (elements.cartCount) {
    elements.cartCount.textContent = cartCount;
  }

  const allCartCounts = document.querySelectorAll(".cart-count");
  allCartCounts.forEach((element) => {
    element.textContent = cartCount;
  });
}

// ========== НОВОГОДНИЙ СЧЕТЧИК ==========
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
  setInterval(updateCounter, 24 * 60 * 60 * 1000);
}

// ========== МОБИЛЬНОЕ МЕНЮ ==========
function initMobileMenu() {
  if (!elements.menuToggle || !elements.nav) return;

  elements.menuToggle.addEventListener("click", function () {
    elements.nav.classList.toggle("active");
    this.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      elements.nav.classList.remove("active");
      elements.menuToggle.classList.remove("active");
    });
  });
}

// ========== СНЕГОПАД ==========
function initSnowfall() {
  if (!elements.snowfall) return;

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.3;
    const duration = Math.random() * 10 + 5;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;

    elements.snowfall.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, duration * 1000);
  }

  setInterval(createSnowflake, 100);

  for (let i = 0; i < 20; i++) {
    setTimeout(createSnowflake, i * 100);
  }
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function initModal() {
  if (!elements.discountModal || !elements.modalClose || !elements.modalAction)
    return;

  elements.modalClose.addEventListener("click", function () {
    elements.discountModal.style.display = "none";
  });

  elements.modalAction.addEventListener("click", function () {
    window.location.href = "catalog.html";
  });

  elements.discountModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && elements.discountModal.style.display === "flex") {
      elements.discountModal.style.display = "none";
    }
  });
}

function showDiscountModal() {
  if (!elements.discountModal) return;

  const modalShown = localStorage.getItem("discountModalShown");
  if (!modalShown) {
    elements.discountModal.style.display = "flex";
    localStorage.setItem("discountModalShown", "true");
  }
}

// ========== УВЕДОМЛЕНИЯ ==========
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
        <i class="fas fa-check-circle notification-icon"></i>
        <span class="notification-text">${message}</span>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
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

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getCategoryName(category) {
  const categories = {
    pajamas: "Пижамы и халаты",
    blankets: "Пледы и подушки",
    candles: "Свечи и ночники",
    toys: "Мягкие игрушки",
  };
  return categories[category] || category;
}

// ========== СОЗДАНИЕ КАРТОЧКИ ТОВАРА С БЕЙДЖЕМ ==========
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  // Определяем бейдж в зависимости от категории
  let badge = "";
  if (product.category === "pajamas") {
    badge = '<span class="product-badge">Пижама</span>';
  } else if (product.category === "blankets") {
    badge = '<span class="product-badge">Плед</span>';
  } else if (product.category === "candles") {
    badge = '<span class="product-badge">Свеча</span>';
  } else if (product.category === "toys") {
    badge = '<span class="product-badge">Игрушка</span>';
  }

  card.innerHTML = `
        <div class="product-card-inner">
            <div class="product-image-container">
                <img src="${product.image}" alt="${
    product.name
  }" class="product-image">
                ${badge}
                <div class="product-watermark">🎅</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${renderStars(product.rating)}
                    <span class="rating-count">(${
                      Math.floor(Math.random() * 50) + 20
                    })</span>
                </div>
                <div class="product-price">${formatPrice(product.price)} ₽</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small add-to-cart-btn" data-id="${
                      product.id
                    }">
                        В корзину
                    </button>
                    <a href="product.html?id=${
                      product.id
                    }" class="btn btn-outline btn-small view-details-btn">
                        Подробнее
                    </a>
                </div>
            </div>
        </div>
    `;
  return card;
}

// ========== ОТОБРАЖЕНИЕ ТОВАРОВ ==========
function renderProducts(filteredProducts = null) {
  if (!elements.productsContainer) return;

  const productsToRender = filteredProducts || products;
  const productsForHome =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
      ? productsToRender.slice(0, 6)
      : productsToRender;

  elements.productsContainer.innerHTML = "";

  productsForHome.forEach((product) => {
    const productCard = createProductCard(product);
    elements.productsContainer.appendChild(productCard);
  });

  addProductEventListeners();
}

function addProductEventListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// ========== КАТАЛОГ ==========
function initCatalogFilters() {
  // Применение фильтров
  const applyFiltersBtn = document.getElementById("apply-filters");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const sortSelect = document.getElementById("sort-by");

  if (!applyFiltersBtn || !resetFiltersBtn || !sortSelect) return;

  // Применение фильтров
  applyFiltersBtn.addEventListener("click", applyCatalogFilters);

  // Сброс фильтров
  resetFiltersBtn.addEventListener("click", function () {
    // Сброс радио-кнопок категорий
    document.querySelector(
      'input[name="category"][value="all"]'
    ).checked = true;

    // Сброс радио-кнопок рейтинга
    document.querySelector('input[name="rating"][value="all"]').checked = true;

    // Сброс цены
    const priceMin = document.getElementById("price-min");
    const priceMax = document.getElementById("price-max");
    const priceSlider = document.getElementById("price-slider");

    if (priceMin) priceMin.value = "0";
    if (priceMax) priceMax.value = "10000";
    if (priceSlider) priceSlider.value = "10000";

    // Обновление отображения значения слайдера
    const priceSliderValue = document.querySelector(".price-slider-value");
    if (priceSliderValue) {
      priceSliderValue.textContent = `До: ${formatPrice(10000)} ₽`;
    }

    // Сброс сортировки
    sortSelect.value = "default";

    // Обновление отображения
    applyCatalogFilters();
  });

  // Сортировка
  sortSelect.addEventListener("change", applyCatalogFilters);

  // Обновление поля максимальной цены при изменении слайдера
  const priceSlider = document.getElementById("price-slider");
  const priceMaxInput = document.getElementById("price-max");

  if (priceSlider && priceMaxInput) {
    const priceSliderValue = document.querySelector(".price-slider-value");

    priceSlider.addEventListener("input", function () {
      priceMaxInput.value = this.value;
      if (priceSliderValue) {
        priceSliderValue.textContent = `До: ${formatPrice(this.value)} ₽`;
      }
    });

    priceMaxInput.addEventListener("change", function () {
      priceSlider.value = this.value;
      if (priceSliderValue) {
        priceSliderValue.textContent = `До: ${formatPrice(this.value)} ₽`;
      }
    });
  }

  // Применение фильтров при изменении радио-кнопок
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const ratingRadios = document.querySelectorAll('input[name="rating"]');

  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", applyCatalogFilters);
  });

  ratingRadios.forEach((radio) => {
    radio.addEventListener("change", applyCatalogFilters);
  });

  // Применение фильтров при изменении цены
  const priceMinInput = document.getElementById("price-min");
  const priceMaxInputField = document.getElementById("price-max");

  if (priceMinInput) {
    priceMinInput.addEventListener("change", applyCatalogFilters);
  }

  if (priceMaxInputField) {
    priceMaxInputField.addEventListener("change", applyCatalogFilters);
  }
}

function applyCatalogFilters() {
  // Получаем выбранные фильтры
  const selectedCategory = document.querySelector(
    'input[name="category"]:checked'
  ).value;
  const selectedRating = document.querySelector(
    'input[name="rating"]:checked'
  ).value;
  const sortBy = document.getElementById("sort-by").value;

  // Получаем диапазон цен
  const priceMin = parseInt(document.getElementById("price-min").value) || 0;
  const priceMax =
    parseInt(document.getElementById("price-max").value) || 10000;

  // Фильтруем товары
  let filteredProducts = products.filter((product) => {
    // Фильтр по категории
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }

    // Фильтр по рейтингу
    if (selectedRating !== "all" && product.rating < parseInt(selectedRating)) {
      return false;
    }

    // Фильтр по цене
    if (product.price < priceMin || product.price > priceMax) {
      return false;
    }

    return true;
  });

  // Сортировка
  filteredProducts = sortProducts(filteredProducts, sortBy);

  // Обновляем счетчик товаров
  updateProductsCount(filteredProducts.length);

  // Отображаем отфильтрованные товары
  renderFilteredProducts(filteredProducts);
}

function sortProducts(productsArray, sortType) {
  const sortedProducts = [...productsArray];

  switch (sortType) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price);

    case "rating-desc":
      return sortedProducts.sort((a, b) => b.rating - a.rating);

    case "name-asc":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    default:
      return sortedProducts;
  }
}

function updateProductsCount(count) {
  const countElement = document.getElementById("products-count");
  if (countElement) {
    countElement.textContent = count;
  }
}

function renderFilteredProducts(filteredProducts) {
  const productsContainer = document.getElementById("products-container");
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
            <div class="no-products">
                <div class="no-products-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
            </div>
        `;
    return;
  }

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });

  // Добавляем обработчики для кнопок
  addProductEventListeners();
}

// ========== СТРАНИЦА ТОВАРА ==========
function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  if (!productId) {
    window.location.href = "product.html?id=1";
    return;
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    window.location.href = "product.html?id=1";
    return;
  }

  loadProductDetail(product);
}

function loadProductDetail(product) {
  // Обновляем заголовок
  document.title = `${product.name} - Home for You`;

  // Хлебные крошки
  const categoryElement = document.getElementById("product-category");
  const categoryBadge = document.getElementById("product-category-badge");
  if (categoryElement) categoryElement.textContent = product.categoryName;
  if (categoryBadge) categoryBadge.textContent = product.categoryName;

  // Основная информация
  const titleElement = document.getElementById("product-title");
  const priceElement = document.getElementById("product-price");
  const descElement = document.getElementById("product-description");

  if (titleElement) titleElement.textContent = product.name;
  if (priceElement)
    priceElement.textContent = `${formatPrice(product.price)} ₽`;
  if (descElement) descElement.textContent = product.description;

  // Рейтинг
  const ratingElement = document.getElementById("product-rating");
  if (ratingElement) {
    ratingElement.innerHTML =
      renderStars(product.rating) +
      `<span> (${Math.floor(Math.random() * 200) + 50} отзывов)</span>`;
  }

  // Особенности
  const featuresElement = document.getElementById("product-features");
  if (featuresElement && product.features) {
    featuresElement.innerHTML = product.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
  }

  // Характеристики
  const specsElement = document.getElementById("product-specs");
  if (specsElement && product.specs) {
    specsElement.innerHTML = Object.entries(product.specs)
      .map(
        ([key, value]) => `
                <div class="spec-item">
                    <span class="spec-key">${key}:</span>
                    <span class="spec-value">${value}</span>
                </div>
            `
      )
      .join("");
  }

  // Количество на складе
  const stockElement = document.getElementById("stock-count");
  if (stockElement && product.stock) {
    stockElement.textContent = product.stock;
  }

  // Галерея
  const mainImage = document.getElementById("main-product-image");
  const thumbnailsContainer = document.getElementById("thumbnails-container");

  if (mainImage && product.images && product.images.length > 0) {
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = "";
      product.images.forEach((image, index) => {
        const thumbBtn = document.createElement("button");
        thumbBtn.className = `thumbnail-btn ${index === 0 ? "active" : ""}`;
        thumbBtn.innerHTML = `<img src="${image}" alt="${product.name} - вид ${
          index + 1
        }">`;

        thumbBtn.addEventListener("click", () => {
          document.querySelectorAll(".thumbnail-btn").forEach((btn) => {
            btn.classList.remove("active");
          });
          thumbBtn.classList.add("active");
          mainImage.src = image;
        });

        thumbnailsContainer.appendChild(thumbBtn);
      });
    }
  }

  // Кнопки действий
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const buyNowBtn = document.getElementById("buy-now-btn");
  const quantityInput = document.getElementById("quantity-input");
  const quantityMinus = document.getElementById("quantity-minus");
  const quantityPlus = document.getElementById("quantity-plus");

  if (addToCartBtn && quantityInput) {
    addToCartBtn.addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value) || 1;
      addToCart(product.id, quantity);
    });
  }

  if (buyNowBtn && quantityInput) {
    buyNowBtn.addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value) || 1;
      addToCart(product.id, quantity);
      window.location.href = "cart.html";
    });
  }

  if (quantityMinus && quantityInput) {
    quantityMinus.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
  }

  if (quantityPlus && quantityInput) {
    quantityPlus.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value < 10) {
        quantityInput.value = value + 1;
      }
    });
  }

  // Похожие товары
  loadSimilarProducts(product);
}

function loadSimilarProducts(currentProduct) {
  const similarContainer = document.getElementById("similar-products");
  if (!similarContainer) return;

  let similarProducts = products
    .filter(
      (p) =>
        p.id !== currentProduct.id && p.category === currentProduct.category
    )
    .slice(0, 4);

  if (similarProducts.length === 0) {
    similarProducts = products
      .filter((p) => p.id !== currentProduct.id)
      .slice(0, 4);
  }

  similarContainer.innerHTML = "";
  similarProducts.forEach((product) => {
    const card = createProductCard(product);
    similarContainer.appendChild(card);
  });

  // Добавляем обработчики для кнопок в похожих товарах
  addProductEventListeners();
}

// ========== КОРЗИНА (страница) ==========
function initCartPage() {
  updateCartDisplay();

  // Обработчики событий
  document.addEventListener("click", function (e) {
    // Удаление товара
    if (e.target.closest(".remove-item-btn")) {
      const button = e.target.closest(".remove-item-btn");
      const productId = parseInt(button.getAttribute("data-id"));
      if (removeFromCart(productId)) {
        updateCartDisplay();
        showNotification("Товар удален из корзины");
      }
    }

    // Увеличение количества
    if (e.target.closest(".quantity-increase")) {
      const button = e.target.closest(".quantity-increase");
      const productId = parseInt(button.getAttribute("data-id"));
      const input = document.querySelector(
        `.quantity-input[data-id="${productId}"]`
      );
      if (input) {
        let value = parseInt(input.value);
        if (value < 10) {
          input.value = value + 1;
          updateCartItemQuantity(productId, value + 1);
          updateCartDisplay();
        }
      }
    }

    // Уменьшение количества
    if (e.target.closest(".quantity-decrease")) {
      const button = e.target.closest(".quantity-decrease");
      const productId = parseInt(button.getAttribute("data-id"));
      const input = document.querySelector(
        `.quantity-input[data-id="${productId}"]`
      );
      if (input) {
        let value = parseInt(input.value);
        if (value > 1) {
          input.value = value - 1;
          updateCartItemQuantity(productId, value - 1);
          updateCartDisplay();
        }
      }
    }

    // Оформление заказа
    if (e.target.id === "checkout-btn") {
      checkoutOrder();
    }
  });
}

function updateCartDisplay() {
  const emptyCart = document.getElementById("empty-cart");
  const cartWithItems = document.getElementById("cart-with-items");
  const cartItemsBody = document.getElementById("cart-items-body");

  if (!emptyCart || !cartWithItems || !cartItemsBody) return;

  if (cartItems.length === 0) {
    emptyCart.style.display = "block";
    cartWithItems.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartWithItems.style.display = "block";

    // Очищаем таблицу
    cartItemsBody.innerHTML = "";

    // Заполняем товарами
    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image">
                        <div>
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-sku">Артикул: HFY-${String(
                              item.id
                            ).padStart(3, "0")}</div>
                        </div>
                    </div>
                </td>
                <td class="cart-item-price">${formatPrice(item.price)} ₽</td>
                <td>
                    <div class="quantity-selector">
                        <button class="quantity-btn quantity-decrease" data-id="${
                          item.id
                        }">-</button>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" max="10" 
                               class="quantity-input" data-id="${
                                 item.id
                               }" readonly>
                        <button class="quantity-btn quantity-increase" data-id="${
                          item.id
                        }">+</button>
                    </div>
                </td>
                <td class="cart-item-total">${formatPrice(
                  item.price * item.quantity
                )} ₽</td>
                <td>
                    <button class="remove-item-btn" data-id="${
                      item.id
                    }" title="Удалить">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
      cartItemsBody.appendChild(row);
    });

    // Обновляем итоговую сумму
    updateCartTotal();
  }
}

function updateCartTotal() {
  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalElement.textContent = `${formatPrice(total)} ₽`;
  }
}

function checkoutOrder() {
  if (cartItems.length === 0) {
    showNotification("Корзина пуста! Добавьте товары для оформления заказа.");
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (confirm(`Оформить заказ на сумму ${formatPrice(total)} ₽?`)) {
    showNotification(
      "Заказ оформлен! Наш менеджер свяжется с вами для подтверждения."
    );

    // Очищаем корзину
    cartItems = [];
    cartCount = 0;
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();
  }
}

// ========== КОНТАКТЫ ==========
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showNotification("Пожалуйста, заполните все поля");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Пожалуйста, введите корректный email");
      return;
    }

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

// ========== ЭКСПОРТ ДЛЯ ОТЛАДКИ ==========
window.HomeForYou = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  calculateCartTotal,
  showNotification,
  products,
};
