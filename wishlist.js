let wishList;

// * Get wishList from local storage
if (localStorage.getItem('wishList')) {
  wishList = JSON.parse(localStorage.getItem('wishList'));
} else {
  wishList = [];
}

let productList;
// * Get product list from online API
/* const httpReq = new XMLHttpRequest();

httpReq.addEventListener('readystatechange', () => {
  if (httpReq.readyState == 4 && httpReq.status == 200) {
    
    productList = JSON.parse(httpReq.responseText);
    
    displayWishList(wishList);
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
    displayWishList(wishList);
  })
  .catch((error) => console.error('Error fetching product list:', error));

const wishListItems = document.getElementById('wishlistitems');

// * A model for the div
/* <div class="wishlistitem">
        <img src="./images/2.png" alt="" class="image" />
        <h3 class="title">Title</h3>
        <span class="price">$$$$</span>
        

        <p>Category</p>
        <p>Description</p>
        <button class="remove">Remove</button>
      </div> */
let totalPrice = 0;
let idCount = {};
const total = document.getElementsByClassName('totalprice')[0];

function displayWishList(wishList) {
  for (let i = 0; i < wishList.length; i++) {
    const product = productList.find((p) => p.id == wishList[i]);

    const productDiv = document.createElement('div');
    productDiv.classList.add('wishlistitem');

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

    const category = document.createElement('p');
    category.textContent = product.category;

    const description = document.createElement('p');
    description.textContent = product.description;

    const remove = document.createElement('button');
    remove.classList.add('remove');
    remove.textContent = 'Remove';
    remove.addEventListener('click', (e) => {
      // console.log(wishList);
      wishList.splice(wishList.indexOf(product.id), 1);
      localStorage.setItem('wishList', JSON.stringify(wishList));
      // Remove the created div
      e.target.parentElement.remove();
      // console.log(wishList);
    });

    // const br = document.createElement('br');

    productDiv.appendChild(linkImg);
    productDiv.appendChild(linkTitle);
    productDiv.appendChild(price);
    // productDiv.appendChild(br);
    productDiv.appendChild(category);
    productDiv.appendChild(description);
    productDiv.appendChild(remove);

    wishListItems.appendChild(productDiv);
  }
}
