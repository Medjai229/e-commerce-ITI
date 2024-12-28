var xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:3000/users`);
xhr.send();

xhr.addEventListener('readystatechange', function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var data_json = JSON.parse(xhr.response);
    console.log(JSON.parse(xhr.response));
    // var my_id = lastid(data_json);
    // localStorage.setItem('id', my_id);
    getAllProducts(data_json);
  }
});

// function allData() {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', `http://localhost:3000/users`);
//   xhr.send();
//   var theDataa;
//   xhr.addEventListener('readystatechange', function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       theDataa = JSON.parse(xhr.response);
//       console.log(JSON.parse(xhr.response));
//     }
//   });
//   return theDataa;
// }

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

// ! refactor with create element
function getAllProducts(elem) {
  var note = `  
  <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Admin</th>
                  <th>Action</th>

                </tr>
              </thead>`;
  for (let i = 0; i < elem.length; i++) {
    // ! in the admin section make display user or admin
    note += ` <tbody>
                <tr>
                  <td>${elem[i].fullname}</td>
                  <td>${elem[i].email}</td>
                  <td>${elem[i].isAdmin}</td>
                  <th class="adit_delete">
                    <button onclick="openPopUpUpdate(${elem[i].id})">Edit</button>
                    <button>Update</button>
                  </th>
                </tr>
              </tbody>`;
  }
  document.getElementById('product_table').innerHTML = note;
}
