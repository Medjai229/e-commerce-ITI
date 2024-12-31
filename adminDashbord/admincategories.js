const isUserAdmin = sessionStorage.getItem('isadmin');
if (!isUserAdmin || isUserAdmin == 'false') {
  window.location.href = '../products.html';
}

const categoryTable = document.getElementById('category_table');
const categoryInput = document.getElementById('category_input');
const warnSpan = document.getElementById('warn');
let categories;
fetch('http://localhost:3000/category')
  .then((response) => response.json())
  .then((data) => {
    categories = data;
    // console.log(categories);
    displayCategories();
  });

function displayCategories() {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const row = categoryTable.insertRow();
    const CatId = row.insertCell();
    const catName = row.insertCell();
    const catNewName = row.insertCell();
    const catUpdate = row.insertCell();
    const catDelete = row.insertCell();
    CatId.textContent = category.id;
    catName.textContent = category.name;

    const newNameInput = document.createElement('input');
    newNameInput.type = 'text';
    newNameInput.value = category.name;
    catNewName.appendChild(newNameInput);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    catUpdate.classList.add('update-button');
    updateButton.addEventListener('click', () => {
      updateCategory(newNameInput.value, category);
    });
    catUpdate.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    catDelete.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      deleteCategory(category);
    });
    catDelete.appendChild(deleteButton);
  }
}

function addCategory() {
  if (!categoryInput.value.trim() || categoryInput.value.length < 3) {
    warnSpan.textContent = 'Category must be 3 characters or longer';
    warnSpan.style.visibility = 'visible';
    return;
  }

  if (categories.find((cat) => cat.name === categoryInput.value)) {
    warnSpan.textContent = 'Category already exists';
    warnSpan.style.visibility = 'visible';
    return;
  }

  warnSpan.style.visibility = 'hidden';
  const newCategory = {
    name: categoryInput.value,
  };
  fetch('http://localhost:3000/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCategory),
  })
    .then((response) => response.json())
    .then((data) => {
      categories.push(data);
      // displayCategories();
    });
}
function deleteCategory(category) {
  fetch(`http://localhost:3000/category/${category.id}`, {
    method: 'DELETE',
  }).then((response) => response.json());
}

function updateCategory(newName, category) {
  if (!newName.trim()) {
    return;
  }
  const updatedCategory = {
    name: newName,
  };
  fetch(`http://localhost:3000/category/${category.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCategory),
  });
}
