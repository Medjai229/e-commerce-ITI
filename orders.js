let ordersData;
let userId = sessionStorage.getItem('id') || 1;

addEventListener('load', () => {
  fetch('http://localhost:3000/orders', { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      ordersData = data;
      showPending();
    });
});

var orders = document.getElementById('orders');
var ordersHeaders = document.querySelectorAll('.orders-link');

var productHTML;

ordersHeaders[0].addEventListener('click', () => {
  showPending();
});
ordersHeaders[1].addEventListener('click', () => {
  showAccepted();
});
ordersHeaders[2].addEventListener('click', () => {
  showRejected();
});
ordersHeaders[3].addEventListener('click', () => {
  showPrevious();
});

// Pending products
async function showPending() {
  orders.innerHTML = '';
  console.log('pending working');
  for (var i = 0; i < ordersData.length; i++) {
    if (
      ordersData[i].status === 'pending' &&
      ordersData[i].customerId === userId
    ) {
      const product = await getProduct(ordersData[i].productId);
      const productDiv = document.createElement('div');
      productDiv.setAttribute('class', 'product');
      const productImg = document.createElement('img');
      productImg.setAttribute('class', 'productImg');
      productImg.setAttribute('src', product.image);
      const productName = document.createElement('h4');
      productName.textContent = product.title;
      const productStatus = document.createElement('h5');
      productStatus.textContent = `Orderd on: ${ordersData[i].lastModified}`;
      const cancelBttn = document.createElement('button');
      cancelBttn.setAttribute('id', `cancel-${ordersData[i].id}`);
      cancelBttn.setAttribute('class', 'buttons');
      cancelBttn.addEventListener('click', removeOrder);
      cancelBttn.textContent = 'Cancel';

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      productDiv.appendChild(cancelBttn);
      orders.appendChild(productDiv);
    }
  }
}
async function showAccepted() {
  orders.innerHTML = '';
  console.log('accepted working');
  for (var i = 0; i < ordersData.length; i++) {
    if (
      ordersData[i].status === 'approved' &&
      ordersData[i].customerId === userId
    ) {
      const product = await getProduct(ordersData[i].productId);
      const productDiv = document.createElement('div');
      productDiv.setAttribute('class', 'product');
      const productImg = document.createElement('img');
      productImg.setAttribute('class', 'productImg');
      productImg.setAttribute('src', product.image);
      const productName = document.createElement('h4');
      productName.textContent = product.title;
      const productStatus = document.createElement('h5');
      productStatus.textContent = `Approved on: ${ordersData[i].lastModified}`;

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      orders.appendChild(productDiv);
    }
  }
}

async function showRejected() {
  orders.innerHTML = '';
  console.log('decliend working');
  for (var i = 0; i < ordersData.length; i++) {
    if (
      ordersData[i].status === 'decliend' &&
      ordersData[i].customerId === userId
    ) {
      const product = await getProduct(ordersData[i].productId);
      const productDiv = document.createElement('div');
      productDiv.setAttribute('class', 'product');
      const productImg = document.createElement('img');
      productImg.setAttribute('class', 'productImg');
      productImg.setAttribute('src', product.image);
      const productName = document.createElement('h4');
      productName.textContent = product.title;
      const productStatus = document.createElement('h5');
      productStatus.textContent = `Decliend on: ${ordersData[i].lastModified}`;

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      orders.appendChild(productDiv);
    }
  }
}

async function showPrevious() {
  orders.innerHTML = '';
  console.log('accepted working');
  for (var i = 0; i < ordersData.length; i++) {
    if (
      ordersData[i].status === 'previous' &&
      ordersData[i].customerId === userId
    ) {
      const product = await getProduct(ordersData[i].productId);
      const productDiv = document.createElement('div');
      productDiv.setAttribute('class', 'product');
      const productImg = document.createElement('img');
      productImg.setAttribute('class', 'productImg');
      productImg.setAttribute('src', product.image);
      const productName = document.createElement('h4');
      productName.textContent = product.title;
      const productStatus = document.createElement('h5');
      productStatus.textContent = `Delivered on: ${ordersData[i].lastModified}`;

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      orders.appendChild(productDiv);
    }
  }
}

function getProduct(productId) {
  return fetch(`http://localhost:3000/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function removeOrder(event) {
  const bttnId = event.target.id.slice(7);

  fetch(`http://localhost:3000/orders/${bttnId}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
