class Products {
  getProducts() {
    return productsData;
  }
}

class UI {
  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      const faProductPrice = new Intl.NumberFormat('fa-IR').format(
        product.price
      );
      result += `
      <div class="product">
        <div class="img-container">
          <img
            class="product__img"
            src="${product.imageUrl}"
            alt="${product.alt}"
          />
        </div>
        <div class="product__desc">
          <p class="product__title">${product.title}</p>
          <p class="product__price">${faProductPrice} تومان</p>
        </div>
        <button class="add-to-cart" data-id=${product.id}>اضافه به سبد خرید</button>
      </div>
      `;
    });
    productsDOM.innerHTML = result;
  }

  getAddToCartButtons() {
    const buttons = [...document.querySelectorAll('.add-to-cart')];

    buttons.forEach(button => {
      const id = button.dataset.id;

      const isInCart = cart.find(product => product.id === id);

      if (isInCart) {
        button.innerText = 'اضافه شد';
        button.disabled = true;
      }

      button.addEventListener('click', e => {
        e.target.innerText = 'اضافه شد';
        e.target.disabled = true;

        // get product from products (storage)
        const addedProduct = { ...Storage.getProduct(id), quantity: 1 };
        // add product to cart
        cart = [...cart, addedProduct];
        // save cart
        Storage.saveCart(cart);

        // update cart value (cart items, cart price)
        this.setCartValue(cart);
        // display product in DOM
        this.addCartItem(addedProduct);
      });
    });
  }

  setCartValue(cart) {
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);

    const faTotalPrice = new Intl.NumberFormat('fa-IR').format(totalPrice);

    cartItems.innerText = tempCartItems;
    cartTotalPrice.innerText = `قیمت نهایی: ${faTotalPrice} تومان`;
  }

  addCartItem(cartItem) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart__item');

    const faCartItemPrice = new Intl.NumberFormat('fa-IR').format(
      cartItem.price
    );

    cartItemDiv.innerHTML = `
      <div class="img-container">
        <img
          class="cart__item-img"
          src="${cartItem.imageUrl}"
          alt="${cartItem.alt}"
        />
      </div>
      <div class="cart__item-desc">
        <h4 class="cart__item-title">${cartItem.title}</h4>
        <h5 class="cart__item-price">${faCartItemPrice} تومان</h5>
      </div>
      <div class="cart__Item-delete">
        <i class="fa-solid fa-trash-can" data-id=${cartItem.id}></i>
      </div>
      <div class="cart__item-controller">
        <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
        <span>${cartItem.quantity}</span>
        <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
      </div>
    `;

    cartContent.appendChild(cartItemDiv);
  }

  setupApp() {
    // get cart from localStorage
    cart = Storage.getCart() || [];
    // always show cart items in cart div (modal)
    cart.forEach(cartItem => this.addCartItem(cartItem));
    // set cart item and cart price
    this.setCartValue(cart);
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === parseInt(id));
  }

  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }
}

document.addEventListener('DOMContentLoaded', e => {
  const products = new Products();
  const productsData = products.getProducts();

  const ui = new UI();
  ui.displayProducts(productsData);
  ui.getAddToCartButtons();
  ui.setupApp();

  Storage.saveProducts(productsData);
});
