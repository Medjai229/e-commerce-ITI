const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const pass = document.getElementById('passreg');
const confirmPass = document.getElementById('confirmPass');
const bttn = document.getElementById('register');
const registerForm = document.getElementById('registerForm');
const errorsubmit=document.getElementById("error")
const error_pass =document.getElementById("eroorpass")
const error_email =document.getElementById("error_email")
const fname_error =document.getElementById("fname_error")

let userData = { isAdmin: false };
let nameRegex = /^([a-zA-Z]{3,}[\u0020])+[a-zA-Z]{3,}$/;
let mailRegex = /^[^\s@]+@[^\s@]+.(com|net|org|edu|gov|io|ai|info)$/;
let passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&.])[A-Za-z\d@$!%?&.]{8,}$/;

fullName.addEventListener('blur', () => {
  if (!nameRegex.test(fullName.value)) {
    console.log("Full name doesn't match");
    fname_error.innerHTML="invalid Nmae"

  } else {
    userData.fullname = fullName.value;
    console.log(userData);
  }
});

email.addEventListener('blur', () => {
  if (!mailRegex.test(email.value)) {
    console.log("Email doesn't match");
    error_email.innerHTML="invalid Email"

  } else {
    userData.email = email.value;
    console.log(userData);
  }
});

pass.addEventListener('blur', () => {
  if (!passRegex.test(pass.value)) {
    console.log("Password doesn't match");
    error_pass.innerHTML="invalid password"

  }
});

confirmPass.addEventListener('blur', () => {
  if (pass.value !== confirmPass.value) {
    error_pass.innerHTML="Please write the same password"

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
    errorsubmit.innerHTML = "Please enter valid data"
    
    console.log('Make sure all the fields are valid');
  } else if (userExists) {
    console.log('This user already exists');
  } else {
    errorsubmit.innerHTML =""
    errorsubmit.style.padding="0"

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


