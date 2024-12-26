let cart;

// * Get cart from local storage
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
} else {
  cart = [];
}

// * Set cart for testing
// cart = [1, 5, 9, 3, 4];

let productList;
// * Get product list from online API
/* const httpReq = new XMLHttpRequest();

httpReq.addEventListener('readystatechange', () => {
  if (httpReq.readyState == 4 && httpReq.status == 200) {
    
    productList = JSON.parse(httpReq.responseText);
    
    displayCart(cart);
  } else if (httpReq.readyState == 4) {
    console.log('error: ', httpReq.status);
  }
});
httpReq.open('GET', 'https://fakestoreapi.com/products');
httpReq.send(); */

// * Get product list from api.json file
fetch('http://localhost:3000/products')
  .then((response) => response.json())
  .then((data) => {
    productList = data;
    displayCart(cart);
  })
  .catch((error) => console.error('Error fetching product list:', error));

const cartItems = document.getElementById('cartitems');

// * A model for the div
/* <div class="cartitem">
        <img src="./images/2.png" alt="" class="image" />
        <h3 class="title">Title</h3>
        <span class="price">$$$$</span>
        <span class="qs"
          ><label class="quantitylabel" for="quantity">Quantity</label>
          <input
            list="quantitylist"
            class="quantity"
            name="quantity"
            value="1" />
          <datalist id="quantitylist" class="qlist">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option></datalist></span
        ><br />

        <p>Category</p>
        <p>Description</p>
        <button class="remove">Remove</button>
      </div> */
let totalPrice = 0;
let idCount = {};
const total = document.getElementsByClassName('totalprice')[0];

function displayCart(cart) {
  for (let i = 0; i < cart.length; i++) {
    const product = productList.find((p) => p.id == cart[i]);

    const productDiv = document.createElement('div');
    productDiv.classList.add('cartitem');

    const linkImg = document.createElement('a');
    linkImg.href = `details.html?id=${product.id}`;

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = product.image;

    linkImg.appendChild(image);

    const linkTitle = document.createElement('a');
    linkTitle.href = `details.html?id=${product.id}`;
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = product.title;
    linkTitle.appendChild(title);

    const price = document.createElement('span');
    price.classList.add('price');
    price.textContent = product.price + '$';
    totalPrice += product.price;

    const quantity = document.createElement('span');
    quantity.classList.add('qs');
    const quantityLabel = document.createElement('label');
    quantityLabel.classList.add('quantitylabel');
    quantityLabel.textContent = 'Quantity';
    const quantityInput = document.createElement('input');
    quantityInput.classList.add('quantity');
    quantityInput.id = `quantity${product.id}`;
    quantityInput.list = 'quantitylist';
    quantityInput.name = 'quantity';
    quantityInput.value = 1;
    idCount[product.id] = product.price;
    quantityInput.addEventListener('change', (e) => {
      // console.log(e.target.value, product.price);

      idCount[product.id] = e.target.value * product.price;
      calculateTotal();
    });

    const quantityList = document.createElement('datalist');
    quantityList.classList.add('qlist');
    for (let i = 1; i <= 4; i++) {
      const quantityOption = document.createElement('option');
      quantityOption.value = i;
      quantityList.appendChild(quantityOption);
    }

    quantity.appendChild(quantityLabel);
    quantity.appendChild(quantityInput);
    quantity.appendChild(quantityList);

    const category = document.createElement('p');
    category.textContent = product.category;

    const description = document.createElement('p');
    description.textContent = product.description;

    const remove = document.createElement('button');
    remove.classList.add('remove');
    remove.textContent = 'Remove';
    remove.addEventListener('click', (e) => {
      // console.log(cart);
      cart.splice(cart.indexOf(product.id), 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      idCount[product.id] = 0;
      calculateTotal();
      // Remove the created div
      e.target.parentElement.remove();
      // console.log(cart);
    });

    const br = document.createElement('br');

    productDiv.appendChild(linkImg);
    productDiv.appendChild(linkTitle);
    productDiv.appendChild(price);
    productDiv.appendChild(quantity);
    productDiv.appendChild(br);
    productDiv.appendChild(category);
    productDiv.appendChild(description);
    productDiv.appendChild(remove);

    cartItems.appendChild(productDiv);
  }

  calculateTotal();
}
function calculateTotal() {
  totalPrice = 0;

  for (let key in idCount) {
    totalPrice += idCount[key];
    totalPrice = Math.round(totalPrice * 100) / 100;
    total.textContent = totalPrice + '$';
  }
}

function checkout() {
  const customerId = sessionStorage.getItem('id') || 1024;
  // !Enable login
  // if (!customerId) {
  //   open('login.html', '_self');
  //   return;
  // }
  const date = new Date();
  for (let item of cart) {
    // console.log(item);
    const elem = document.getElementById(`quantity${item}`);
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customerId,
        productId: item,
        quantity: parseInt(elem.value),
        status: 'pending',
        timeCreated: date.toLocaleString(),
        lastModified: date.toLocaleString(),
      }),
    })
      .then((res) => res.json())
      .then((location.href = 'orders.html'));
  }
}
