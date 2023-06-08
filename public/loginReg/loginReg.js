const container = document.querySelector(".childContainer"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");
//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})
// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});
sessionStorage.setItem('isAuthenticated', true);
const item = sessionStorage.getItem('isAuthenticated');
if(item === "true"){
    const quiz = document.getElementById("quiz");
    quiz.style.display = "none";
    console.log(quiz)
}

function callLogin() {
    emailText = document.getElementById("loginId").value;
    passwordText = document.getElementById('passwordId').value;
    let loginBtn = document.getElementById("login-btn");

    if (emailText.length === 0 || passwordText.length === 0) {
        alert("Fill both the fields!!")
    } else {
        loginBtn.value = "Loging In....!!";
        loginBtn.setAttribute('disabled', 'true');
        console.log(emailText + passwordText)

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailText,
                password: passwordText,
            })
        }).then(res => res.json())
            .then(data => {
                loginBtn.value = "Login";
                loginBtn.disabled = false;
                (data.status === 200 ? loginBtn.style.backgroundColor = 'green': null)
                alert(data.message)
            }).catch(err => {
                console.log(err)
                loginBtn.value = "Login";
                loginBtn.disabled = false;
             alert('Something went wrong !');
            })
    }
}

function callRegister() {
    let nameText = document.getElementById("registerName").value;
    let emailText = document.getElementById("registerEmail").value;
    let passwordText = document.getElementById('registerPassword').value;
    let confirmPasswordText = document.getElementById("registerConfirmPassword").value;
    let registerBtn = document.getElementById("register-btn");
    if (nameText === 0 || emailText.length === 0 || passwordText.length === 0 || confirmPasswordText.length === 0) {
       alert("Fill all the fields!!")
    } else if(passwordText != confirmPasswordText){
        alert("Passwords doesn't match!!")
    }else {
        registerBtn.value = "Registering....!!";
        registerBtn.setAttribute('disabled', 'true');
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: nameText,
                lastname: nameText,
                email: emailText,
                password: passwordText,
            })
        }).then(res => res.json())
            .then(data => {
                registerBtn.value = "Signup";
                registerBtn.disabled = false;
                (data.status === 200 ? registerBtn.style.backgroundColor = 'green': null)
                alert(data.message)
            }).catch(err => {
                console.log(err)
                registerBtn.value = "Signup";
                registerBtn.disabled = false;
                alert('Something went wrong !');
            })
    }
}
