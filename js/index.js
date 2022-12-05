import { productsData } from './products.js';

const header = document.querySelector('header');
const main = document.querySelector('main');
const cartButton = document.querySelector('.nav__cart-icon');
const cartModal = document.querySelector('.cart');
const cartBackBtn = document.querySelector('.back');
const cartConfirmBtn = document.querySelector('.cart-confirm');
const productsDOM = document.querySelector('.products-center');
const cartTotalPrice = document.querySelector('.cart__total-price');
const cartItemsNumber = document.querySelector('.cart-items');
const cartContent = document.querySelector('.cart__content');

let cart = [];

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
              alt=""
            />
          </div>
          <div class="product__desc">
            <p class="product__title">${product.title}</p>
            <p class="product__price">${faProductPrice} تومان</p>
          </div>
          <button class="add-to-cart" data-id=${product.id}>اضافه به سبد خرید</button>
        </div>
      `;
      productsDOM.innerHTML = result;
    });
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

        const addedProduct = { ...Storage.getProdut(id), quantity: 1 };
        cart = [...cart, addedProduct];
        Storage.saveCart(cart);

        this.setCartValue(cart);

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

    cartItemsNumber.innerText = tempCartItems;
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
          alt=""
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

  setupApp(cart) {
    cart = Storage.getCart();
    cart.forEach(cartItem => this.addCartItem(cartItem));
    this.setCartValue(cart);
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProdut(id) {
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

document.addEventListener('DOMContentLoaded', () => {
  const products = new Products();
  const productsData = products.getProducts();

  const ui = new UI();
  ui.displayProducts(productsData);
  ui.getAddToCartButtons();
  ui.setupApp();

  Storage.saveProducts(productsData);
});
cartButton.addEventListener('click', showModal);
cartBackBtn.addEventListener('click', closeModal);
cartConfirmBtn.addEventListener('click', closeModal);

function showModal() {
  cartModal.style.opacity = 1;
  cartModal.style.transform = 'scaleX(1)';
  header.style.opacity = 0;
  main.style.opacity = 0;
  header.style.transition = '0.3s ease-in-out';
  main.style.transition = '0.3s ease-in-out';
}

function closeModal() {
  cartModal.style.opacity = 0;
  cartModal.style.transform = 'scaleX(0)';
  header.style.opacity = 1;
  main.style.opacity = 1;
  header.style.transition = '0.4s ease-in-out';
  main.style.transition = '0.4s ease-in-out';
}
