// TODO add categories to the selectors

let allProducts;
fetch('http://localhost:3000/products')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    // display(allProducts);
  })
  .catch((error) => console.error('Error fetching product list:', error));

let cart = [];
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  // console.log(cart);
} else {
  cart = [];
}
const categories = [];
fetch('http://localhost:3000/category')
  .then((response) => response.json())
  .then((data) => {
    for (let cat of data) categories.push(cat.name);
  });
const allProductsDiv = document.getElementById('myProducts');
function display(products) {
  var product = '';
  for (let index = 0; index < products.length; index++) {
    // !redesign the button so it starts green if in cart
    // product += `
    //  <div class="pro">
    //             <img src="${products[index].image}" alt="">
    //             <div class="pro_data">
    //                 <span>${products[index].category}</span>
    //                 <h5>${products[index].title} </h5>
    //                 <div class="star">

    //                     ${createStarRating(products[index].rating.rate)}
    //                 </div>
    //                 <div class="price_card">
    //                 <h4 id="price">$${products[index].price}</h4>
    //                 <button onclick="toCart(${products[index].id},event)">
    //                 <a id="thecart" ><i class="fa-solid fa-cart-shopping cart" ></i></a></button>
    //                 </div>
    //             </div>

    //         </div>
    // `;
    const productDiv = document.createElement('div');
    productDiv.classList.add('pro');

    const image = document.createElement('img');
    image.src = products[index].image;

    const proData = document.createElement('div');
    proData.classList.add('pro_data');

    const span = document.createElement('span');
    span.textContent = products[index].category;

    const h5 = document.createElement('h5');
    h5.textContent = products[index].title;

    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = createStarRating(products[index].rating.rate);

    const priceCard = document.createElement('div');
    priceCard.classList.add('price_card');

    const price = document.createElement('h4');
    price.id = 'price';
    price.textContent = '$' + products[index].price;

    const button = document.createElement('button');

    button.setAttribute('onclick', `toCart(${products[index].id},event)`);
    button.setAttribute('id', 'thecart');
    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa-solid', 'fa-cart-shopping', 'cart');
    if (cart.includes(products[index].id)) {
      cartIcon.style.backgroundColor = 'lightgreen';
    }
    button.appendChild(cartIcon);

    proData.appendChild(span);
    proData.appendChild(h5);
    proData.appendChild(star);
    proData.appendChild(priceCard);
    priceCard.appendChild(price);
    priceCard.appendChild(button);

    productDiv.appendChild(image);
    productDiv.appendChild(proData);
    allProductsDiv.appendChild(productDiv);
  }
}

function toCart(id, e) {
  const product = allProducts.find((p) => p.id == id);
  if (!cart.includes(product.id)) {
    cart.push(product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    const sty = e.target;
    console.log(sty);
    sty.style.backgroundColor = 'lightgreen';
  } else {
    cart.splice(cart.indexOf(product.id), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    const sty = e.target;
    console.log(sty);
    sty.style.backgroundColor = '#e9e6e4';
  }
}

function createStarRating(rating) {
  const fullStar = Math.floor(rating);
  const hasHalfRating = rating % 1 >= 0;
  const emptyStarts = 5 - fullStar - (hasHalfRating ? 1 : 0);
  let starHtml = '';

  for (let i = 0; i < fullStar; i++) {
    starHtml += ` <i class="fa-solid fa-star"></i>`;
  }

  if (hasHalfRating) {
    starHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
  }
  for (let i = 0; i < emptyStarts; i++) {
    starHtml += ` <i class="fa-regular fa-star"></i>`;
  }

  return starHtml;
}
function filterItems() {
  objFilter = {
    price: [
      document.getElementById('price-range-small').value,
      document.getElementById('price-range-big').value,
    ],
    rating: document.getElementById('raiting-select').value,
    category: document.getElementById('categories-select').value,
  };
  allProductsDiv.innerHTML = '';
  // console.log(objFilter);

  if (!objFilter) {
    display(allProducts);
    return;
  }
  let productsFiltered = allProducts;
  if (objFilter.category != 'all') {
    productsFiltered = productsFiltered.filter(
      (p) => p.category == objFilter.category
    );
    // console.log(productsFiltered);
  }
  if (objFilter.price) {
    productsFiltered = productsFiltered.filter(
      (p) => p.price >= objFilter.price[0] && p.price <= objFilter.price[1]
    );
    // console.log(productsFiltered);
  }
  if (objFilter.rating != 'all') {
    productsFiltered = productsFiltered.filter(
      (p) => p.rating.rate >= objFilter.rating
    );
    console.log(productsFiltered);
  }
  if (productsFiltered) {
    display(productsFiltered);
  } else {
    allProductsDiv.innerHTML = '<h2> No products found</h2>';
  }
}
setTimeout(() => {
  filterItems({ rating: [4, 5], category: 'jewelery' });
}, 1000);
