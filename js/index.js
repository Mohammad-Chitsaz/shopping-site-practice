import { productsData } from './products.js';

const header = document.querySelector('header');
const main = document.querySelector('main');
const cartButton = document.querySelector('.nav__cart-icon');
const cartModal = document.querySelector('.cart');
const cartBackBtn = document.querySelector('.back');
const cartConfirmBtn = document.querySelector('.cart-confirm');
const productsDOM = document.querySelector('.products-center');

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
    buttons.forEach(button => {});
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
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
