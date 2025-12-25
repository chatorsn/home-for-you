let cartCount = 0;
let cartItems = [];
let products = [];

// элементы страницы
const elements = {
  cartCount: document.getElementById("cart-count"),
  daysCounter: document.getElementById("days-counter"),
  menuToggle: document.getElementById("menu-toggle"),
  nav: document.querySelector(".nav"),
  productsContainer: document.getElementById("products-container"),
  discountModal: document.getElementById("discount-modal"),
  modalClose: document.getElementById("modal-close"),
  modalAction: document.getElementById("modal-action"),
};

// когда страница загрузилась
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  loadCartFromStorage();
  updateCartCount();
  initNewYearCounter();
  initMobileMenu();

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

  if (window.location.pathname.includes("contacts.html")) {
    initContactForm();
  }
});

// список товаров
function loadProducts() {
  products = [
    {
      id: 1,
      name: "Новогодний плед 'Зима'",
      price: 2499,
      category: "blankets",
      image:
        "https://i.pinimg.com/1200x/8f/9a/38/8f9a380872da4e6b7e508767db14f288.jpg",
      rating: 5,
      description: "Мягкий и теплый плед из 100% хлопка с новогодним узором.",
      categoryName: "Пледы и подушки",
      stock: 15,
      features: [
        "100% хлопок",
        "Размер 150×200 см",
        "Можно стирать",
        "Не линяет",
      ],
    },
    {
      id: 2,
      name: "Теплая пижама",
      price: 1899,
      category: "pajamas",
      image:
        "https://i.pinimg.com/1200x/dc/a0/f2/dca0f2fde5efb7b2c0c80bfbbc79bbae.jpg",
      rating: 4,
      description: "Уютная пижама из мягкого флиса.",
      categoryName: "Пижамы и халаты",
      stock: 15,
      features: [
        "Мягкий флис",
        "Эластичные манжеты",
        "Не линяет",
        "Два кармана",
      ],
    },
    {
      id: 3,
      name: "Ароматическая свеча 'Ель'",
      price: 899,
      category: "candles",
      image:
        "https://i.pinimg.com/1200x/9e/29/c5/9e29c5532f6e7d8440b41e5a0f28cca1.jpg",
      rating: 5,
      description: "Свеча с натуральным ароматом новогодней ели.",
      categoryName: "Свечи и ночники",
      stock: 25,
      features: [
        "Натуральный воск",
        "Аромат ели",
        "Горит 40 часов",
        "Стеклянная баночка",
      ],
    },
    {
      id: 4,
      name: "Мягкая игрушка 'Снеговик'",
      price: 1299,
      category: "toys",
      image:
        "https://i.pinimg.com/736x/5c/0d/08/5c0d08a63e9edc1b4abb60dce4a0df31.jpg",
      rating: 4,
      description: "Милый снеговик из мягкого плюша. Высота 35 см.",
      categoryName: "Мягкие игрушки",
      stock: 12,
      features: [
        "Мягкий плюш",
        "Безопасные глаза",
        "Можно стирать",
        "Гипоаллергенный",
      ],
    },
    {
      id: 5,
      name: "Ночник 'Ночной лес'",
      price: 1999,
      category: "candles",
      image:
        "https://i.pinimg.com/736x/c8/28/2a/c8282a91262fe471c0b1833ef5ad2db7.jpg",
      rating: 5,
      description: "Ночник тематический.",
      categoryName: "Свечи и ночники",
      stock: 10,
      features: ["USB-зарядка", "7 цветов", "Регулировка яркости", "Таймер"],
    },
    {
      id: 6,
      name: "Халат из флиса",
      price: 2999,
      category: "pajamas",
      image:
        "https://i.pinimg.com/1200x/78/72/0e/78720ead9a06faec6226d147c58e064c.jpg",
      rating: 5,
      description: "Теплый халат из флиса для уютных вечеров.",
      categoryName: "Пижамы и халаты",
      stock: 7,
      features: [
        "Два кармана",
        "Пояс",
        "Манжеты на рукавах",
        "Не садится после стирки",
      ],
    },
    {
      id: 7,
      name: "Подушка 'Леденец'",
      price: 999,
      category: "blankets",
      image:
        "https://i.pinimg.com/736x/99/7b/4e/997b4ecb9d0dbf4d2e1563de2910398c.jpg",
      rating: 4,
      description: "Декоративная подушка в форме леденца.",
      categoryName: "Пледы и подушки",
      stock: 20,
      features: [
        "Декоративная",
        "Съемный чехол",
        "Антиаллергенная",
        "Мягкая набивка",
      ],
    },
    {
      id: 8,
      name: "Игрушка 'Олень Рудольф'",
      price: 1599,
      category: "toys",
      image:
        "https://i.pinimg.com/736x/c9/c8/b9/c9c8b947be6eda5c53b22fff0bc2adb7.jpg",
      rating: 5,
      description: "Мягкая игрушка оленя Рудольфа с красным носом.",
      categoryName: "Мягкие игрушки",
      stock: 15,
      features: [
        "Светящийся нос",
        "Мягкий плюш",
        "Безопасные материалы",
        "Для детей от 3 лет",
      ],
    },
  ];
}

// работа с корзиной
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

function updateCartCount() {
  if (elements.cartCount) {
    elements.cartCount.textContent = cartCount;
  }
}

// счетчик до нового года
function initNewYearCounter() {
  if (!elements.daysCounter) return;
  const now = new Date();
  const currentYear = now.getFullYear();
  const newYear = new Date(currentYear + 1, 0, 1);
  const diff = newYear - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  elements.daysCounter.textContent = days;
}

// мобильное меню
function initMobileMenu() {
  if (!elements.menuToggle || !elements.nav) return;
  elements.menuToggle.addEventListener("click", function () {
    elements.nav.classList.toggle("active");
    this.classList.toggle("active");
  });
}

// окно скидки
function initModal() {
  if (!elements.discountModal || !elements.modalClose || !elements.modalAction)
    return;

  elements.modalClose.addEventListener(
    "click",
    () => (elements.discountModal.style.display = "none")
  );
  elements.modalAction.addEventListener(
    "click",
    () => (window.location.href = "catalog.html")
  );

  elements.discountModal.addEventListener("click", (e) => {
    if (e.target === elements.discountModal) {
      elements.discountModal.style.display = "none";
    }
  });
}

function showDiscountModal() {
  if (!elements.discountModal) return;
  elements.discountModal.style.display = "flex";
}

// уведомления
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// мелкие функции
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars +=
      i <= rating
        ? '<i class="fas fa-star star"></i>'
        : '<i class="far fa-star star"></i>';
  }
  return stars;
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// создание карточки товара
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-card-inner">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">${renderStars(product.rating)}</div>
        <div class="product-price">${formatPrice(product.price)} ₽</div>
        <div class="product-actions">
          <button class="btn btn-primary btn-small add-to-cart-btn" data-id="${
            product.id
          }">В корзину</button>
          <a href="product.html?id=${
            product.id
          }" class="btn btn-outline btn-small view-details-btn">Подробнее</a>
        </div>
      </div>
    </div>
  `;
  return card;
}

// показ товаров на странице
function renderProducts(filteredProducts = null) {
  const container = elements.productsContainer;
  if (!container) return;

  const productsToRender = filteredProducts || products;
  let productsToShow;

  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    productsToShow = productsToRender.slice(0, 4);
  } else {
    productsToShow = productsToRender;
  }

  container.innerHTML = "";

  if (productsToShow.length === 0) {
    container.innerHTML =
      '<div style="grid-column: 1 / -1; text-align: center; padding: 40px;"><p>Товары не найдены</p></div>';
    return;
  }

  productsToShow.forEach((product) => {
    container.appendChild(createProductCard(product));
  });

  // обработка кнопок "в корзину"
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// фильтры в каталоге
function initCatalogFilters() {
  const applyFiltersBtn = document.getElementById("apply-filters");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const sortSelect = document.getElementById("sort-by");

  if (!applyFiltersBtn || !resetFiltersBtn || !sortSelect) return;

  applyFiltersBtn.addEventListener("click", applyCatalogFilters);
  resetFiltersBtn.addEventListener("click", resetCatalogFilters);
  sortSelect.addEventListener("change", applyCatalogFilters);
}

function applyCatalogFilters() {
  const selectedCategory = document.querySelector(
    'input[name="category"]:checked'
  ).value;
  const selectedRating = document.querySelector(
    'input[name="rating"]:checked'
  ).value;
  const sortBy = document.getElementById("sort-by").value;

  let filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory)
      return false;
    if (selectedRating !== "all" && product.rating < parseInt(selectedRating))
      return false;
    return true;
  });

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  updateProductsCount(filteredProducts.length);
  renderProducts(filteredProducts);
}

function resetCatalogFilters() {
  document.querySelector('input[name="category"][value="all"]').checked = true;
  document.querySelector('input[name="rating"][value="all"]').checked = true;
  document.getElementById("sort-by").value = "default";
  applyCatalogFilters();
}

function updateProductsCount(count) {
  const countElement = document.getElementById("products-count");
  if (countElement) {
    countElement.textContent = count;
  }
}

// страница одного товара
function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id")) || 1;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    window.location.href = "product.html?id=1";
    return;
  }

  document.title = `${product.name} - Home for You`;

  const categoryElement = document.getElementById("product-category");
  const categoryBadge = document.getElementById("product-category-badge");
  const titleElement = document.getElementById("product-title");
  const priceElement = document.getElementById("product-price");
  const descElement = document.getElementById("product-description");
  const stockElement = document.getElementById("stock-count");
  const mainImage = document.getElementById("main-product-image");

  if (categoryElement) categoryElement.textContent = product.categoryName;
  if (categoryBadge) categoryBadge.textContent = product.categoryName;
  if (titleElement) titleElement.textContent = product.name;
  if (priceElement)
    priceElement.textContent = `${formatPrice(product.price)} ₽`;
  if (descElement) descElement.textContent = product.description;
  if (stockElement) stockElement.textContent = product.stock;
  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

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

  if (similarProducts.length < 2) {
    similarProducts = products
      .filter((p) => p.id !== currentProduct.id)
      .slice(0, 4);
  }

  similarContainer.innerHTML = "";
  similarProducts.forEach((product) => {
    similarContainer.appendChild(createProductCard(product));
  });

  document
    .querySelectorAll("#similar-products .add-to-cart-btn")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        addToCart(productId);
      });
    });
}

// страница корзины
function initCartPage() {
  updateCartDisplay();

  document.addEventListener("click", function (e) {
    if (e.target.closest(".remove-item-btn")) {
      const productId = parseInt(
        e.target.closest(".remove-item-btn").getAttribute("data-id")
      );
      if (removeFromCart(productId)) {
        updateCartDisplay();
        showNotification("Товар удален из корзины");
      }
    }

    if (e.target.closest(".quantity-increase")) {
      const productId = parseInt(
        e.target.closest(".quantity-increase").getAttribute("data-id")
      );
      const item = cartItems.find((item) => item.id === productId);
      if (item && item.quantity < 10) {
        item.quantity += 1;
        cartCount += 1;
        saveCartToStorage();
        updateCartCount();
        updateCartDisplay();
      }
    }

    if (e.target.closest(".quantity-decrease")) {
      const productId = parseInt(
        e.target.closest(".quantity-decrease").getAttribute("data-id")
      );
      const item = cartItems.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        cartCount -= 1;
        saveCartToStorage();
        updateCartCount();
        updateCartDisplay();
      }
    }

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

    cartItemsBody.innerHTML = "";
    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${formatPrice(item.price)} ₽</td>
        <td>
          <div class="quantity-selector">
            <button class="quantity-btn quantity-decrease" data-id="${
              item.id
            }">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn quantity-increase" data-id="${
              item.id
            }">+</button>
          </div>
        </td>
        <td>${formatPrice(item.price * item.quantity)} ₽</td>
        <td><button class="remove-item-btn" data-id="${
          item.id
        }"><i class="fas fa-trash"></i></button></td>
      `;
      cartItemsBody.appendChild(row);
    });

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
    showNotification("Корзина пуста!");
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  showNotification(`Заказ оформлен на сумму ${formatPrice(total)} ₽!`);

  cartItems = [];
  cartCount = 0;
  saveCartToStorage();
  updateCartCount();
  updateCartDisplay();
}

// форма контактов
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showNotification("Сообщение отправлено!");
    contactForm.reset();
  });
}
