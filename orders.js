var orders = document.getElementById('orders');

var pending = [];
var accepted = [];
var rejected = [];
var previous = [];
// fetch products

// Pending products
function showPending() {
  if (product.status === 'pending') {
    pending.append(product);
  }

  for (const product of pending) {
    var divProduct = document.createElement(div);
    orders.appendChild(divProduct);
  }
}

// Accepted products
function showAccepted() {
  if (product.status === 'accepted') {
    accepted.append(product);
  }

  for (const product of accepted) {
    var divProduct = document.createElement(div);
    orders.appendChild(divProduct);
  }
}

// Rejected Orders
function showRejected() {
  if (product.status === 'rejected') {
    rejected.append(product);
  }

  for (const product of rejected) {
    var divProduct = document.createElement(div);
    orders.appendChild(divProduct);
  }
}

// Previous orders
function showPrevious() {
  if (product.status === 'previous') {
    previous.append(product);
  }

  for (const product of previous) {
    var divProduct = document.createElement(div);
    orders.appendChild(divProduct);
  }
}
