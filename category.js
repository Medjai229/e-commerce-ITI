const allProductsDiv = document.getElementById('myProducts');
const categoriesSelect = document.getElementById('categories-select');
let categoryQuery = location.search;

const smallPriceFilter = document.getElementById('price-range-small');
const bigPriceFilter = document.getElementById('price-range-big');
const ratingFilter = document.getElementById('rating-select');
const categoryFilter = document.getElementById('categories-select');

if (categoryQuery) {
  categoryQuery = categoryQuery.split('?')[1].split('=')[1];
  categoryQuery = decodeURIComponent(categoryQuery);
  // console.log(categoryQuery);
}

let allProducts;
const categories = [];

fetch('http://localhost:3000/category')
  .then((response) => response.json())
  .then((data) => {
    for (let cat of data) {
      categories.push(cat.name);
      const catSel = document.createElement('option');
      catSel.textContent = cat.name;
      catSel.value = cat.name;
      categoriesSelect.appendChild(catSel);
    }
  })
  .then(() =>
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        allProducts = data;
        if (categoryQuery) {
          categoryFilter.value = categoryQuery.toString();
          filterItems();
        } else {
          display(allProducts);
        }
      })
      .catch((error) => console.error('Error fetching product list:', error))
  );

let cart = [];
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  // console.log(cart);
} else {
  cart = [];
}

let wishList = [];
if (localStorage.getItem('wishList')) {
  wishList = JSON.parse(localStorage.getItem('wishList'));
  // console.log(wishList);
} else {
  wishList = [];
}

function display(products) {
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

    const imageLink = document.createElement('a');
    imageLink.href = `details.html?id=${products[index].id}`;

    const image = document.createElement('img');
    image.src = products[index].image;
    imageLink.appendChild(image);

    const proData = document.createElement('div');
    proData.classList.add('pro_data');

    const span = document.createElement('span');
    span.textContent = products[index].category;

    const h5Link = document.createElement('a');
    h5Link.classList.add('detailslink');
    h5Link.href = `details.html?id=${products[index].id}`;
    const h5 = document.createElement('h5');
    h5.textContent = products[index].title;
    h5Link.appendChild(h5);

    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = createStarRating(products[index].rating.rate);

    const priceCard = document.createElement('div');
    priceCard.classList.add('price_card');

    const price = document.createElement('h4');
    price.id = 'price';
    price.textContent = '$' + products[index].price;
    const wishButton = document.createElement('button');
    wishButton.setAttribute(
      'onclick',
      `toWishList(${products[index].id},event)`
    );
    wishButton.classList.add('thewish');
    const wishIcon = document.createElement('i');
    wishIcon.classList.add('fa-solid', 'fa-heart', 'wish');
    if (wishList.includes(products[index].id)) {
      wishButton.style.backgroundColor = 'red';
    }
    wishButton.appendChild(wishIcon);

    const button = document.createElement('button');

    button.setAttribute('onclick', `toCart(${products[index].id},event)`);
    button.classList.add('thecart');
    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa-solid', 'fa-cart-shopping', 'cart');
    if (cart.includes(products[index].id)) {
      cartIcon.style.backgroundColor = '#02C77D';
    }
    button.appendChild(cartIcon);

    proData.appendChild(span);
    proData.appendChild(h5Link);
    proData.appendChild(star);
    proData.appendChild(priceCard);
    priceCard.appendChild(price);
    priceCard.appendChild(wishButton);
    priceCard.appendChild(button);

    productDiv.appendChild(imageLink);
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
    // console.log(sty);
    sty.style.backgroundColor = '#02C77D';
  } else {
    cart.splice(cart.indexOf(product.id), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    const sty = e.target;
    // console.log(sty);
    sty.style.backgroundColor = '#0049C6';
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
    price: [smallPriceFilter.value, bigPriceFilter.value],
    rating: ratingFilter.value,
    category: categoryFilter.value,
  };
  // console.log(objFilter);

  allProductsDiv.innerHTML = '';
  // const defaultFilter = {
  //   price: ['0', '1000'],
  //   rating: 'all',
  //   category: 'all',
  // };

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
  }

  if (productsFiltered.length != 0) {
    display(productsFiltered);
  } else {
    allProductsDiv.innerHTML = '<h2> No products found</h2>';
  }
}
function resetItems() {
  document.getElementById('price-range-small').value = 0;
  document.getElementById('price-range-big').value = 1000;
  document.getElementById('rating-select').value = 'all';
  document.getElementById('categories-select').value = 'all';
  filterItems();
}
function toWishList(id, e) {
  const product = allProducts.find((p) => p.id == id);
  if (!wishList.includes(product.id)) {
    wishList.push(product.id);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    let sty;
    if (e.target.classList.contains('fa-heart')) {
      sty = e.target.parentElement;
    } else {
      sty = e.target;
    }
    // console.log(sty);
    sty.style.backgroundColor = 'red';
  } else {
    wishList.splice(wishList.indexOf(product.id), 1);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    let sty;
    if (e.target.classList.contains('fa-heart')) {
      sty = e.target.parentElement;
    } else {
      sty = e.target;
    }
    // console.log(sty);
    sty.style.backgroundColor = '#0049C6';
  }
}
