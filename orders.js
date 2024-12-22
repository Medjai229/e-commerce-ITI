// localStorage.clear();
var ordersData = JSON.parse(localStorage.getItem('orders'));
var productsData = JSON.parse(localStorage.getItem('products'));
var usersData = JSON.parse(localStorage.getItem('users'));

if (!ordersData) {
  fetch('./orders.json')
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('orders', JSON.stringify(data));
      ordersData = data;
      console.log('Fetched and stored orders:', ordersData);
    })
    .catch((error) => console.error('Unable to fetch data:', error));
} else {
  console.log('Loaded from localStorage:', ordersData);
}

var orders = document.getElementById('orders');
var ordersHeaders = document.querySelectorAll('.orders-link');
console.log(ordersData.length);
console.log(productsData.length);

var productHTML;

showPending();

ordersHeaders[0].addEventListener('click', () => {
  showPending();
});
ordersHeaders[1].addEventListener('click', () => {
  showAccepted();
});

// Pending products
function showPending() {
  productHTML = '';
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'pending') {
      productHTML += `
      <div class="product">
        <img
          class="productImg"
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt=""
        />
        <h4>Prdocut Name</h4>
        <h5>Orderd on:</h5>
      </div>
      `;
    }
  }
  orders.innerHTML = productHTML;
}
function showAccepted() {
  productHTML = '';
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'approved') {
      productHTML += `
      <div class="product">
        <img
          class="productImg"
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt=""
        />
        <h4>Prdocut Name</h4>
        <h5>Accepted on:</h5>
      </div>
      `;
    }
  }
  orders.innerHTML = productHTML;
}
function showRejected() {
  productHTML = '';
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'rejected') {
      productHTML += `
      <div class="product">
        <img
          class="productImg"
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt=""
        />
        <h4>Prdocut Name</h4>
        <h5>Orderd on:</h5>
      </div>
      `;
    }
  }
  orders.innerHTML = productHTML;
}
