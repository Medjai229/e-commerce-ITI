var mail = document.getElementById("mail")
var pass = document.getElementById("pass")
var submit = document.getElementById("submit")

var mailmsg_error = document.getElementById("mailmsg_error")
var passmsg_error = document.getElementById("password_error")
var submsg_error = document.getElementById("submition_error")

const regexmail = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|ai|info)$/;
const regexpass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&.])[A-Za-z\d@$!%?&.]{8,}$/

var validate = true

mail.addEventListener("blur", email_valid)
function email_valid (validate) {
validate = true; // Reset validation state
var mail_value = mail.value
if (!regexmail.test(mail_value)){
mailmsg_error.innerHTML = "Please enter valid email"
mailmsg_error.style.padding="5px"
validate = false
}
else{mailmsg_error.innerHTML = ""
     mailmsg_error.style.padding="0"

}
}
//pass validate
 pass.addEventListener("blur",pass_valid )
 function pass_valid(validate){ 
validate = true; // Reset validation state
var pass_val = pass.value
if (!regexpass.test(pass_val)){
passmsg_error.innerHTML = "Please enter valid pass"
passmsg_error.style.padding="5px"
validate = false
 }
 else{passmsg_error.innerHTML =""
     passmsg_error.style.padding="0"
 }
 }


//submit 
submit.addEventListener("submit" , submtion) 
async function submtion (event) {
event.preventDefault()
let userV = await checkUser();
var mail_value = mail.value
var pass_val = pass.value


if(!validate || mail_value =="" || pass_val =="" )
{
submsg_error.innerHTML = " Data input check failed. Please try again"
submsg_error.style.padding="5px"
}
else{submsg_error.style.padding="0"
}
}

// fetch data
var users
async function fetchdata () {
var responce = await fetch("http://localhost:3000/users",)
const usersList = await responce.json()
console.log(usersList)
return usersList
}
fetchdata()

// veriify    

async function checkUser() {
users = await fetchdata()
        for (const user of users) {
                if (mail.value == user.email ) {
                   if (pass.value != user.password ) {
                        console.log(pass.value)
                        console.log(user.password)
                        console.log('error');
                        return 'wrong password'
                   } else {
                        console.log('this is user')
                         sessionStorage.setItem("id", user.id);
                         sessionStorage.setItem("name", user.fullname);
                         sessionStorage.setItem("isadmin", user.isAdmin);
                         console.log("Email and password saved to local storage");
                     }
                        submit.submit() 
                        return 'verified'
                   }
                }
        
        console.log("Error: Email not found");
     submsg_error.innerHTML = "email or password isn't connected to an account."
     return "no email";

     
}