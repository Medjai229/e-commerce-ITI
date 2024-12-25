// * Get product from online API
/* const httpId = new XMLHttpRequest();
httpId.addEventListener('readystatechange', () => {
  if (httpId.readyState == 4 && httpId.status == 200) {
    var response = JSON.parse(httpId.responseText);
    // console.log(response);
    displayItem(response);
  } else if (httpId.readyState == 4) {
    console.log('error: ', httpId.status);
  }
});

const id = location.search.split('?')[1].split('=')[1];
// console.log(id);

httpId.open('GET', 'https://fakestoreapi.com/products/' + id);
httpId.send();
 */

// * Get product from json-server file
let productList;
fetch('http://localhost:3000/products')
  .then((response) => response.json())
  .then((data) => {
    productList = data;

    const id = location.search.split('?')[1].split('=')[1];
    const product = productList.find((p) => p.id == id);
    displayItem(product);
  })
  .catch((error) => console.error('Error fetching product list:', error));

const main = document.getElementById('main');

function displayItem(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  // console.log(product);
  const productDiv = document.createElement('div');
  productDiv.classList.add('cartitem');

  const image = document.createElement('img');
  image.classList.add('image');
  image.src = product.image;

  const title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = product.title;

  const price = document.createElement('span');
  price.classList.add('price');
  price.textContent = product.price + '$';

  const category = document.createElement('p');
  category.textContent = product.category;

  const description = document.createElement('p');
  description.textContent = product.description;

  const br = document.createElement('br');

  const addToCart = document.createElement('button');
  if (cart.includes(product.id)) {
    addToCart.textContent = 'Remove from cart';
    addToCart.classList.remove('addtocart');
    addToCart.classList.add('removefromcart');
  } else {
    addToCart.textContent = 'Add to cart';
    addToCart.classList.remove('removefromcart');
    addToCart.classList.add('addtocart');
  }
  addToCart.addEventListener('click', () => {
    if (cart.includes(product.id)) {
      cart.splice(cart.indexOf(product.id), 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      addToCart.textContent = 'Add to cart';
      addToCart.classList.remove('removefromcart');
      addToCart.classList.add('addtocart');
    } else {
      cart.push(product.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      addToCart.textContent = 'Remove from cart';
      addToCart.classList.remove('addtocart');
      addToCart.classList.add('removefromcart');
    }
  });

  productDiv.appendChild(image);
  productDiv.appendChild(title);
  productDiv.appendChild(price);
  productDiv.appendChild(br);
  productDiv.appendChild(category);
  productDiv.appendChild(description);
  productDiv.appendChild(br);
  productDiv.appendChild(addToCart);

  main.appendChild(productDiv);
}
