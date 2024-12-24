let ordersData;

addEventListener('load', () => {
  fetch('http://localhost:3000/orders', { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
function showPending() {
  console.log('pending working');
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
  console.log('accepted working');
  console.log(ordersData);
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
  console.log('rejected working');
  productHTML = '';
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'decliend') {
      productHTML += `
      <div class="product">
      <img
      class="productImg"
      src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
      alt=""
      />
      <h4>Prdocut Name</h4>
      <h5>Rejected on:</h5>
      </div>
      `;
    }
  }
  orders.innerHTML = productHTML;
}

function showPrevious() {
  console.log('previous working');
  productHTML = '';
  for (var i = 0; i < ordersData.length; i++) {
    if (ordersData[i].status === 'previous') {
      productHTML += `
      <div class="product">
        <img
          class="productImg"
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt=""
        />
        <h4>Prdocut Name</h4>
        <h5>Delevired on:</h5>
      </div>
      `;
    }
  }
  orders.innerHTML = productHTML;
}
