const http = new XMLHttpRequest();
http.open('GET', 'productData.json');
http.send();
let allProducts;
http.addEventListener('readystatechange', function () {
  if (http.readyState == 4 && http.status == 200) {
    allProducts = JSON.parse(http.response);
    // console.log(allProducts);
    display(allProducts);
  }
});

let cart = [];
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  // console.log(cart);
} else {
  cart = [];
}

function display(products) {
  var product = '';
  for (let index = 0; index < products.length; index++) {
    product += `
     <div class="pro">
                <img src="${products[index].image}" alt="">
                <div class="pro_data">
                    <span>${products[index].category}</span>
                    <h5>${products[index].title} </h5>
                    <div class="star">
                       
                        ${createStarRating(products[index].rating.rate)}
                    </div>
                    <div class="price_card">
                    <h4 id="price">$${products[index].price}</h4>
                    <button onclick="toCart(${products[index].id},event)">
                    <a id="thecart" ><i class="fa-solid fa-cart-shopping cart" ></i></a></button>
                    </div>
                </div>
                
            </div>
    `;
  }
  document.getElementById('myProducts').innerHTML = product;
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
