let allProducts;
fetch('http://localhost:3000/products')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    getAllProducts(allProducts);
  })
  .catch((error) => console.error('Error fetching product list:', error));

function lastid(ele) {
  var id_num = ele[ele.length - 1].id;
  console.log(id_num);
  return id_num;
}

// function addCategory() {
//   var post = new XMLHttpRequest();
//   post.open("POST", `../productData.json`);
//   post.setRequestHeader("Content-Type", "application/json");
//     let data = JSON.stringify({
//       id: Number(localStorage.getItem("id")) + 1 + "",
//       title: title_value,
//       description: dec_value,
//     });
//     post.send(data);
//   }
// }

function getAllProducts(elem) {
  var note = `  
  <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>`;
  for (let i = 0; i < elem.length; i++) {
    note += ` <tbody>
                <tr>
                  <td>${elem[i].title}</td>
                  <td>${elem[i].price}</td>
                  <td>${elem[i].rating.rate}</td>
                  <td>${elem[i].category}</td>
                  <td>${elem[i].stock}</td>
                  <th class="adit_delete">
                    <button onclick="openPopUpUpdate(${elem[i].id})">Edit</button>
                    <button onclick="deleteProduct(${elem[i].id})">Delete</button>
                  </th>
                </tr>
                
              </tbody>`;
  }
  document.getElementById('product_table').innerHTML = note;
}

function addProduct(e) {
  var post = new XMLHttpRequest();
  const titleRegex = /^[A-Za-z][A-Za-z0-9 _&-]{2,49}$/;
  const categoryRegex = /^[A-Za-z ]{3,30}$/;
  const priceRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
  const ratingRegex = /^([0-4](\.\d)?|5(\.0)?)$/;
  const inpTitle = document.getElementById('addtitle').value;
  const inpPrice = document.getElementById('addprice').value;
  const inpCategory = document.getElementById('category').value;
  const inpImage = document.getElementById('img').value;
  const inpDesc = document.getElementById('descc').value;

  post.open('POST', `http://localhost:3000/products`);
  post.setRequestHeader('Content-Type', 'application/json');

  if (!titleRegex.test(inpTitle)) {
    document.getElementById('addtitle').nextElementSibling.innerHTML =
      'Invalid title: must start with a letter, be 3-50 characters, and can contain letters, numbers, spaces, _, &, or -.';
  } else {
    document.getElementById('addtitle').nextElementSibling.innerHTML = '';
  }

  if (!priceRegex.test(inpPrice)) {
    document.getElementById('addprice').nextElementSibling.innerHTML =
      'Invalid price: must be a positive number with up to 2 decimal places.';
  } else {
    document.getElementById('addprice').nextElementSibling.innerHTML = '';
  }

  if (!categoryRegex.test(inpCategory)) {
    document.getElementById('category').nextElementSibling.innerHTML =
      'Invalid category: must be 3-30 characters and contain only letters and spaces.';
  } else {
    document.getElementById('category').nextElementSibling.innerHTML = '';
  }

  if (inpDesc == '' || inpDesc.length > 500) {
    document.getElementById('descc').nextElementSibling.innerHTML =
      'Invalid description: must not exceed 500 characters. and must not be empty';
  } else {
    document.getElementById('descc').nextElementSibling.innerHTML = '';
  }

  if (
    titleRegex.test(inpTitle) &&
    priceRegex.test(inpPrice) &&
    categoryRegex.test(inpCategory) &&
    inpDesc &&
    inpDesc.length <= 500
  ) {
    const data = JSON.stringify({
      id: Number(localStorage.getItem('id')) + 1 + '',
      title: inpTitle,
      price: inpPrice,
      description: inpDesc,
      category: inpCategory,
      image: inpImage,
      stock: 0,
      rating: {
        rate: 0,
        count: 0,
      },
    });

    post.send(data);
    console.log('oooooo');
    popup.style.visibility = 'hidden';
  }
}
var popup = document.getElementById('popup');
var popUpUpdate = document.getElementById('popupUpdate');

function openPopUp() {
  popup.style.visibility = 'visible';
}

function openPopUpUpdate(id) {
  popUpUpdate.style.visibility = 'visible';
  localStorage.setItem('id', id);
}

function updatProduct() {
  var upId = localStorage.getItem('id');
  var upXhr = new XMLHttpRequest();
  upXhr.open('PUT', `http://localhost:3000/products/${upId}`);
  /////////////////////////////////////
  //////////////////////////////////
  const titleRegex = /^[A-Za-z][A-Za-z0-9 _&-]{2,49}$/;
  const categoryRegex = /^[A-Za-z ]{3,30}$/;
  const priceRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
  const ratingRegex = /^([0-4](\.\d)?|5(\.0)?)$/;

  ///////////////////////////////

  upXhr.setRequestHeader('Content-Type', 'application/json');
  const upTitle = document.getElementById('uptitle').value;
  const upPrice = document.getElementById('upprice').value;
  const upCategory = document.getElementById('catt').value;
  const upRating = document.getElementById('ratting').value;
  const upStoxk = document.getElementById('stok').value;
  /////////////
  if (!titleRegex.test(upTitle)) {
    document.getElementById('uptitle').nextElementSibling.innerHTML =
      'Invalid title: must start with a letter, be 3-50 characters, and can contain letters, numbers, spaces, _, &, or -.';
  } else {
    document.getElementById('uptitle').nextElementSibling.innerHTML = '';
  }

  if (!priceRegex.test(upPrice)) {
    document.getElementById('upprice').nextElementSibling.innerHTML =
      'Invalid price: must be a positive number with up to 2 decimal places.';
  } else {
    document.getElementById('upprice').nextElementSibling.innerHTML = '';
  }

  if (!categoryRegex.test(upCategory)) {
    document.getElementById('catt').nextElementSibling.innerHTML =
      'Invalid category: must be 3-30 characters and contain only letters and spaces.';
  } else {
    document.getElementById('catt').nextElementSibling.innerHTML = '';
  }

  if (!ratingRegex.test(upRating)) {
    document.getElementById('ratting').nextElementSibling.innerHTML =
      'Invalid rating: must be a number between 0 and 5 with up to 1 decimal place.';
  } else {
    document.getElementById('ratting').nextElementSibling.innerHTML = '';
  }

  //////////////////////////////
  if (
    titleRegex.test(upTitle) &&
    priceRegex.test(upPrice) &&
    categoryRegex.test(upCategory) &&
    ratingRegex.test(upRating)
  ) {
    const data = JSON.stringify({
      id: upId + '',
      title: upTitle,
      price: upPrice,
      description: '',
      category: upCategory,
      image: '',

      stock: upStoxk,
      rating: {
        rate: 3.6,
        count: 145,
      },
    });

    upXhr.send(data);
    console.log('oooooo');
    popup.style.visibility = 'hidden';
  }
}

function closePopUp() {
  popup.style.visibility = 'hidden';
}

function deleteProduct(id) {
  var delXhr = new XMLHttpRequest();
  delXhr.open('DELETE', `http://localhost:3000/products/${id}`);
  delXhr.send();
}

function closePopUpUpdate() {
  popUpUpdate.style.visibility = 'hidden';
}
