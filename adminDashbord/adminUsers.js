var xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:3000/users`);
xhr.send();

xhr.addEventListener('readystatechange', function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var data_json = JSON.parse(xhr.response);
    console.log(JSON.parse(xhr.response));
    getAllProducts(data_json);
  }
});

// ! refactor with create element
function getAllProducts(elem) {
  var note = `  
              <thead> 
                <tr>
                  <th class="centerText">User ID</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th class="centerText">Admin</th>
                  <th class="centerText">Action</th>
                </tr>
              </thead>`;
  for (let i = 0; i < elem.length; i++) {
    // ! in the admin section make display user or admin
    // ! in line 35 match the class name with the button
    note += ` <tbody>
                <tr>
                  <td class="centerText boldText">${elem[i].id}</td>
                  <td>${elem[i].fullname}</td>
                  <td>${elem[i].email}</td>
                  <td class="centerText boldText">${elem[i].isAdmin}</td>
                  <td class="adit_delete">
                    <button onclick= "changeRole(event)">Change Role</button>
                  </td>
                </tr>
              </tbody>`;
  }
  document.getElementById('product_table').innerHTML = note;
}

function changeRole(event) {
  let isAdmin = true;
  let userRole = event.target.parentElement.previousElementSibling.textContent;
  if (userRole === 'true') {
    isAdmin = false;
  }
  let userId =
    event.target.parentElement.parentElement.firstElementChild.textContent;
  console.log(userId);
  fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isAdmin: isAdmin,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
