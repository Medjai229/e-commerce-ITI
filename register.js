const fullName = document.getElementById('fullName');
const email = document.getElementById('mail');
const pass = document.getElementById('pass');
const confirmPass = document.getElementById('confirmPass');
const bttn = document.getElementById('register');
const registerForm = document.getElementById('registerForm');

let userData = { isAdmin: false };
let nameRegex = /^([a-zA-Z]{3,}[\u0020])+[a-zA-Z]{3,}$/;
let mailRegex = /^[^\s@]+@[^\s@]+.(com|net|org|edu|gov|io|ai|info)$/;
let passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&.])[A-Za-z\d@$!%?&.]{8,}$/;

fullName.addEventListener('blur', () => {
  if (!nameRegex.test(fullName.value)) {
    console.log("Full name doesn't match");
  } else {
    userData.fullname = fullName.value;
    console.log(userData);
  }
});

email.addEventListener('blur', () => {
  if (!mailRegex.test(email.value)) {
    console.log("Email doesn't match");
  } else {
    userData.email = email.value;
    console.log(userData);
  }
});

pass.addEventListener('blur', () => {
  if (!passRegex.test(pass.value)) {
    console.log("Password doesn't match");
  }
});

confirmPass.addEventListener('blur', () => {
  if (pass.value !== confirmPass.value) {
    console.log('Please write the same password');
  } else {
    userData.password = confirmPass.value;
    console.log(userData);
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let userExists = await checkUser();
  if (
    !nameRegex.test(fullName.value) ||
    !mailRegex.test(email.value) ||
    !passRegex.test(pass.value) ||
    pass.value != confirmPass.value
  ) {
    console.log('Make sure all the fields are valid');
  } else if (userExists) {
    console.log('This user already exists');
  } else {
    postUser(userData);
    registerForm.submit();
  }
});

function checkUser() {
  return fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      return !!data.find((user) => user.email === email.value);
    });
}

function postUser(data) {
  fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
