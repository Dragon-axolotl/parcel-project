import Handlebars from "handlebars";
import { products } from "../data.js";

// Шаблон: зверни увагу, ми виводимо {{priceText}}, а не {{price}}
const productsListTemplate = `
<ul class="product-list">
  {{#each products}}
    <li class="product-card" data-id="{{id}}">
      <h3 class="product-name">{{name}}</h3>
      <p class="product-price">Ціна: $ {{priceText}}</p> 
      <p class="product-desc">{{description}}</p>
      <button class="delete-btn" data-action="delete">Видалити</button>
    </li>
  {{/each}}
</ul>
`;

const appContainer = document.getElementById("app");
const form = document.getElementById("product-form");

let currentProducts = [...products];

function renderProducts() {
  // Примусово створюємо текстове поле priceText для кожної картки
  const safeProducts = currentProducts.map(p => ({
    id: p.id,
    name: p.name,
    priceText: String(p.price), // Ось тут гарантовано буде текст, а не об'єкт
    description: p.description
  }));

  const template = Handlebars.compile(productsListTemplate);
  const html = template({ products: safeProducts });
  appContainer.innerHTML = html;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const newProduct = {
    id: Date.now(),
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    description: document.getElementById("description").value,
  };

  currentProducts.push(newProduct);
  form.reset();
  renderProducts();
});

appContainer.addEventListener("click", (event) => {
  if (event.target.dataset.action === "delete") {
    const productId = Number(event.target.closest(".product-card").dataset.id);
    currentProducts = currentProducts.filter((product) => product.id !== productId);
    renderProducts();
  }
});

renderProducts();