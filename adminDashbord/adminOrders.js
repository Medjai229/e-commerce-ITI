let ordersData;

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
    if (ordersData[i].status === 'pending') {
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

      const approveBttn = document.createElement('button');
      approveBttn.setAttribute('id', `approve-${ordersData[i].id}`);
      approveBttn.setAttribute('class', 'buttons');
      approveBttn.addEventListener('click', approveOrder);
      approveBttn.textContent = 'Approve';

      const rejectBttn = document.createElement('button');
      rejectBttn.setAttribute('id', `reject-${ordersData[i].id}`);
      rejectBttn.setAttribute('class', 'buttons');
      rejectBttn.addEventListener('click', rejectOrder);
      rejectBttn.textContent = 'Reject';

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      productDiv.appendChild(approveBttn);
      productDiv.appendChild(rejectBttn);
      orders.appendChild(productDiv);
    }
  }
}
async function showAccepted() {
  orders.innerHTML = '';
  console.log('accepted working');
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'approved') {
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

      const rejectBttn = document.createElement('button');
      rejectBttn.setAttribute('id', `reject-${ordersData[i].id}`);
      rejectBttn.setAttribute('class', 'buttons');
      rejectBttn.addEventListener('click', rejectOrder);
      rejectBttn.textContent = 'Reject';

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      productDiv.appendChild(rejectBttn);
      orders.appendChild(productDiv);
    }
  }
}

async function showRejected() {
  orders.innerHTML = '';
  console.log('decliend working');
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'decliend') {
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

      const approveBttn = document.createElement('button');
      approveBttn.setAttribute('id', `approve-${ordersData[i].id}`);
      approveBttn.setAttribute('class', 'buttons');
      approveBttn.addEventListener('click', approveOrder);
      approveBttn.textContent = 'Approve';

      productDiv.appendChild(productImg);
      productDiv.appendChild(productName);
      productDiv.appendChild(productStatus);
      productDiv.appendChild(approveBttn);
      orders.appendChild(productDiv);
    }
  }
}

async function showPrevious() {
  orders.innerHTML = '';
  console.log('accepted working');
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'previous') {
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

function approveOrder(event) {
  const bttnId = event.target.id.slice(8);

  fetch(`http://localhost:3000/orders/${bttnId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: 'approved',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function rejectOrder(event) {
  const bttnId = event.target.id.slice(7);

  fetch(`http://localhost:3000/orders/${bttnId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: 'decliend',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
