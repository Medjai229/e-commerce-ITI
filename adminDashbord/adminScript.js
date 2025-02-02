const isUserAdmin = sessionStorage.getItem('isadmin');
if (!isUserAdmin || isUserAdmin == 'false') {
  window.location.href = '../products.html';
}

let allProducts;
fetch('http://localhost:3000/products')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    // console.log(allProducts);

    getAllProducts(allProducts);
  })
  .catch((error) => console.error('Error fetching product list:', error));

// function lastid(ele) {
//   var id_num = ele[ele.length - 1].id;
//   console.log(id_num);
//   return id_num;
// }

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
  // console.log(elem);

  var note = `  
  <thead>
                <tr>
                  <th>Title</th>
                  <th class="centerText">Price</th>
                  <th class="centerText">Rating</th>
                  <th>Category</th>
                  <th class="centerText">Stock</th>
                  <th class="centerText">Action</th>
                </tr>
              </thead>`;
  for (let i = 0; i < elem.length; i++) {
    note += ` <tbody>
                <tr>
                  <td id="productTitle">${elem[i].title}</td>
                  <td class="centerText">${elem[i].price}</td>
                  <td class="centerText">${elem[i].rating.rate}</td>
                  <td>${elem[i].category}</td>
                  <td class="centerText">${elem[i].stock}</td>
                  <td class="adit_delete centerText">
                    <button onclick="openPopUpUpdate('${elem[i].id}')">Edit</button>
                    <button class="delBttn"onclick="deleteProduct('${elem[i].id}')">Delete</button>
                  </td>
                </tr>
                
              </tbody>`;
  }
  document.getElementById('product_table').innerHTML = note;
}

function addProduct(e) {
  const titleRegex = /^[A-Za-z][A-Za-z0-9 _&-]{2,}$/;
  const categoryRegex = /^[A-Za-z ]{3,}$/;
  const priceRegex = /^(0|[1-9]\d*)(\.\d{1,})?$/;
  const ratingRegex = /^([0-4](\.\d)?|5(\.0)?)$/;
  const inpTitle = document.getElementById('addtitle').value;
  const inpPrice = document.getElementById('addprice').value;
  const inpCategory = document.getElementById('category').value;
  const inpImage = document.getElementById('img').value;
  const inpDesc = document.getElementById('descc').value;

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
    // const data = JSON.stringify({
    //   id: Number(localStorage.getItem('id')) + 1 + '',
    //   title: inpTitle,
    //   price: inpPrice,
    //   description: inpDesc,
    //   category: inpCategory,
    //   image: inpImage,
    //   stock: 0,
    //   rating: {
    //     rate: 0,
    //     count: 0,
    //   },
    // });

    fetch('http://localhost:3000/products', {
      method: 'POST',
      body: JSON.stringify({
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
      }),
      headers: { 'Content-type': 'application/json' },
    }).then((response) => response.json());
    // console.log('oooooo');
    popup.style.visibility = 'hidden';
  }
}
var popup = document.getElementById('popup');
var popUpUpdate = document.getElementById('popupUpdate');

function openPopUp() {
  popup.style.visibility = 'visible';
}

function openPopUpUpdate(id) {
  // console.log(id);

  popUpUpdate.style.visibility = 'visible';
  localStorage.setItem('id', id);
  // get the old values from alproducts by id and put it in the input fields

  const oldProduct = allProducts.find((product) => product.id == id);
  const oldValues = {
    title: oldProduct.title,
    price: oldProduct.price,
    category: oldProduct.category,
    rating: oldProduct.rating,
    stock: oldProduct.stock,
  };
  document.getElementById('uptitle').value = oldValues.title;
  document.getElementById('upprice').value = oldValues.price;
  document.getElementById('catt').value = oldValues.category;
  document.getElementById('ratting').value = oldValues.rating.rate;
  document.getElementById('stok').value = oldValues.stock;
}

function updatProduct() {
  var upId = localStorage.getItem('id');

  // get the product from allproduct
  const oldProduct = allProducts.find((product) => product.id == upId);
  var upXhr = new XMLHttpRequest();
  upXhr.open('PUT', `http://localhost:3000/products/${upId}`);
  /////////////////////////////////////
  //////////////////////////////////
  const titleRegex = /^[A-Za-z][A-Za-z0-9 _&-]{3,}$/;
  const categoryRegex = /^[A-Za-z ]{3,}$/;
  const priceRegex = /^(0|[1-9]\d*)(\.\d{1,})?$/;
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
      description: oldProduct.description,
      category: upCategory,
      image: oldProduct.image,

      stock: upStoxk,
      rating: {
        rate: upRating,
        count: 145,
      },
    });
    localStorage.removeItem('id');
    upXhr.send(data);
    // console.log('oooooo');
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
