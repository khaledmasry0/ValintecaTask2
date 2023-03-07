const product_container = document.getElementById("product_container");
const card_span = document.getElementById("cart_span");
const modal = document.querySelector(".modal");
const dropdown = document.querySelector(".dropdown");
const cart = document.querySelector(".cart");
const arrow = document.querySelector(".arrow");
let addedProducts = [];
let localItems = JSON.parse(localStorage.getItem("products"));

let products = [
  {
    product_id: 1,
    product_name: "Iphone 13 pro",
    product_price: "1300",
    product_image: "./images/apple1.jpg",
    added_to_cart: checklocalItem(0),
  },
  {
    product_id: 2,
    product_name: "apple watch",
    product_price: "550",
    product_image: "./images/apple2.jpg",
    added_to_cart: checklocalItem(1),
  },
  {
    product_id: 3,
    product_name: "wireless charger",
    product_price: "99",
    product_image: "./images/apple3.jpg",
    added_to_cart: checklocalItem(2),
  },
  {
    product_id: 4,
    product_name: "Iphone 12",
    product_price: "1050",
    product_image: "./images/apple4.jpg",
    added_to_cart: checklocalItem(3),
  },
  {
    product_id: 5,
    product_name: "airPods",
    product_price: "240",
    product_image: "./images/apple5.jpg",
    added_to_cart: checklocalItem(4),
  },
  {
    product_id: 6,
    product_name: "gaming motherboard",
    product_price: "650",
    product_image: "./images/apple6.jpg",
    added_to_cart: checklocalItem(5),
  },
];

// check if that product exist in local storage or not

function checklocalItem(e) {
  if (localStorage.getItem("products")) {
    return localItems[e]?.added_to_cart ? true : false;
  }
  return false;
}

// get the count of products

let counter = localItems
  ? localItems.filter((addedOnes) => addedOnes.added_to_cart == true).length
  : 0;
card_span.innerHTML = counter;

// Show all products

function showAllProducts() {
  let allProducts = "";

  products.forEach((product) => {
    allProducts += `<div class="card" data-set=${product.product_id}>
        <div class="card-image">
          <img src="./images/apple${product.product_id}.jpg" alt="" />
        </div>
        <div class="card-description">
          <h3>${product.product_name}</h3>
          <h3>price: $${product.product_price}</h3>
        </div>
        <div class="card-buttons">
          ${
            !product.added_to_cart
              ? "<button data-model=disactive onclick='addToCart(this)'>add to cart</button>"
              : "<button data-model=disactive onclick='removeFromCart(this)'>remove from cart</button>"
          }
          <button onclick='quickView(this)'>quick view</button>
        </div>
      </div>`;
  });

  product_container.innerHTML = allProducts;
  counter ? arrow.classList.add("moving") : arrow.classList.remove("moving");
}
showAllProducts();

// add to cart
function addToCart(e) {
  counter++;
  card_span.innerHTML = counter;
  for (let i = 0; i < products.length; i++) {
    products[i].product_id ==
      e.parentElement.parentElement.getAttribute("data-set") &&
      (products[i].added_to_cart = !products[i].added_to_cart);
  }
  showAllProducts();
  e.getAttribute("data-model") != "disactive" && quickView(e);
  localStorage.setItem("products", JSON.stringify(products));
  getAddedProducts();
}

// remove from cart

function removeFromCart(e) {
  counter--;
  card_span.innerHTML = counter;
  for (let i = 0; i < products.length; i++) {
    products[i].product_id ==
      e.parentElement.parentElement.getAttribute("data-set") &&
      (products[i].added_to_cart = !products[i].added_to_cart);
  }
  showAllProducts();
  e.getAttribute("data-model") != "disactive" && quickView(e);
  localStorage.setItem("products", JSON.stringify(products));
  getAddedProducts();
}

// Show Modal

function quickView(e) {
  let card = e.parentElement.parentElement;

  modal.style.display = "block";
  let [choosenProduct] = products.filter(
    (product) => product.product_id == card.getAttribute("data-set")
  );

  modal.innerHTML = `
      <div class="view-card" data-set=${choosenProduct.product_id}>
        <div class="card-image">
          <img src="${choosenProduct.product_image}" alt="" />
        </div>
        <div>
          <div class="card-description">
            <h3>${choosenProduct.product_name}</h3>
            <h3>price: $${choosenProduct.product_price}</h3>
          </div>
          <div class="card-buttons">
          ${
            !choosenProduct.added_to_cart
              ? "<button onclick='addToCart(this.parentElement)'>add to cart</button>"
              : "<button onclick='removeFromCart(this.parentElement)'>remove from cart</button>"
          }
          <button onclick="closeModel()" class="close-model">close</button>
          </div>
        </div>
    </div>
  `;
}

function closeModel() {
  modal.style.display = "none";
}

// get added products to the dropdown from local storage

function getAddedProducts() {
  let cartItems = "";
  let totalPrice = 0;
  addedProducts = JSON.parse(localStorage.getItem("products")).filter(
    (addedOnes) => addedOnes.added_to_cart == true
  );
  addedProducts?.forEach((item) => {
    cartItems += `
    <div class="row">
      <div class="card-image">
        <img src="${item.product_image}" alt="" />
      </div>
      <div>
        <div class="card-description">
          <h3>${item.product_name}</h3>
          <h3>price: $${item.product_price}</h3>
        </div>
      </div>
  </div>
    `;
    totalPrice += parseInt(item.product_price);
  });
  cartItems += `
  <div class="row">
    <div class = "total-price">
      <span>total price:</span> <span>${totalPrice} $</span>
    </div>
  </div>
  `;
  dropdown.innerHTML = cartItems;
}

// toggle the dropdown
cart.addEventListener("click", () => {
  counter && dropdown.classList.toggle("open");
  getAddedProducts();
});
