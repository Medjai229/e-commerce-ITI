const http = new XMLHttpRequest();
http.open("GET", "productData.json");
http.send();
http.addEventListener("readystatechange", function () {
  if (http.readyState == 4 && http.status == 200) {
    allProducts = JSON.parse(http.response);
    console.log(allProducts);
    display(allProducts);
  }
});

function display(products) {
  var product = "";
  for (let index = 0; index < products.length; index++) {
    product += `
     <div class="pro">
                <img src="${products[index].image}" alt="">
                <div class="pro_data">
                    <span>${products[index].category}</span>
                    <h5>${products[index].title} </h5>
                    <div class="star">
                       
                        ${createStarRating(products[index].rating.rate)}
                    </div>
                    <div class="price_card">
                    <h4 id="price">$${products[index].price}</h4>
                    <a id="thecart" href="#"><i class="fa-solid fa-cart-shopping cart"></i></i></a>
                    </div>
                </div>
                
            </div>
    `;
  }
  document.getElementById("myProducts").innerHTML = product;
}

function createStarRating(rating) {
  const fullStar = Math.floor(rating);
  const hasHalfRating = rating % 1 >= 0;
  const emptyStarts = 5 - fullStar - (hasHalfRating ? 1 : 0);
  let starHtml = "";

  for (let i = 0; i < fullStar; i++) {
    starHtml += ` <i class="fa-solid fa-star"></i>`;
  }

  if (hasHalfRating) {
    starHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
  }
  for (let i = 0; i < emptyStarts; i++) {
    starHtml += ` <i class="fa-regular fa-star"></i>`;
  }

  return starHtml;
}
