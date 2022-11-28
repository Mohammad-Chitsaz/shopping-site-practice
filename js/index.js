import { productsData } from './products.js';

const header = document.querySelector('header');
const main = document.querySelector('main');
const cartButton = document.querySelector('.nav__cart-icon');
const cartModal = document.querySelector('.cart');
const cartBackBtn = document.querySelector('.back');
const cartConfirmBtn = document.querySelector('.cart-confirm');
const productsDOM = document.querySelector('.products-center');
const cartTotalPrice = document.querySelector('.cart__total-price');
const cartItems = document.querySelector('.cart-items');

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
      const productPrice = new Intl.NumberFormat('fa-IR').format(product.price);
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
          <p class="product__price">${productPrice}</p>
        </div>
        <button class="add-to-cart" data-id="${product.id}">اضافه به سبد خرید</button>
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
        e.target.innerText = 'اضافه شد';
        e.target.disabled = true;
      }

      button.addEventListener('click', e => {
        e.target.innerText = 'اضافه شد';
        e.target.disabled = true;

        // get product from products
        const addedProduct = { ...Storage.getProduct(id), quantity: 1 };
        // add product to cart
        cart = [...cart, addedProduct];
        // save cart to local storage
        Storage.saveCart(cart);
        // update cart value

        // display cart
      });
    });
  }

  setCartValue(cart) {
    cart.reduce((acc, curr) => {
      const productPrice = new Intl.NumberFormat('fa-IR').format(curr.price);
      return acc + curr.quantity * productPrice;
    });
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
}

document.addEventListener('DOMContentLoaded', () => {
  const products = new Products();
  const productsData = products.getProducts();

  const ui = new UI();
  ui.displayProducts(productsData);
  ui.getAddToCartButtons();

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
