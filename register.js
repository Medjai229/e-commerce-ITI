const fullName = document.getElementById('fullName');
const email = document.getElementById('mail');
const pass = document.getElementById('pass');
const confirmPass = document.getElementById('confirmPass');
const registerForm = document.getElementById('registerForm');

let userData = {};
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
  if (pass.value != confirmPass.value) {
    console.log('Please write the same password');
  } else {
    userData.password = confirmPass.value;
    console.log(userData);
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    !nameRegex.test(fullName.value) ||
    !mailRegex.test(email.value) ||
    !passRegex.test(pass.value) ||
    pass.value != confirmPass.value
  ) {
    e.preventDefault();
    console.log('Make sure all the fields are valid');
  } else {
    registerForm.submit();
  }
});
