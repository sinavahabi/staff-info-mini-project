"use strict";

let validationList = [];
let userInfo = [];

// Creating an arrow function that declares actions after clicking on "Login" button.
const Login = (event) => {
    // Accessing necessary input elements by DOM searching. 
    const selectedInputs = document.querySelectorAll(".info");
    // Pushing items to global created list variable ("userInfo"), to gather input values which user entered in `login` page.
    for (let item of selectedInputs) {
        userInfo.push(item.value);
    }

    // Pushing items to global created list variable ("validationList"), to gather input values which user entered in `sign-up` page.
    for (let data in localStorage) {
        if (localStorage.getItem(data)){
            validationList.push(localStorage.getItem(data));
        }
    }    

    // Making sure user inserted data indexes are positioned exactly as "localStorage" datalist.
    let selectedIndex = 2;
    let pos = 0;
    let temp = userInfo[selectedIndex];

    for (let i = selectedIndex; i >= pos; i--) {
        userInfo[i] = userInfo[i-1];
    }

    userInfo[pos] = temp;

    // Prevent the form from being submitted.
    event.preventDefault();

    // This is the part which final form validation happens. 
    if (JSON.stringify(validationList) === JSON.stringify(userInfo)) {
        // If condition is true and both lists ("validationList" and "validationList") are exactly equal, submit will happen by JavaScript.
        const successMessage = () => {
            const createMessage = document.createElement("div");
            createMessage.className = "login-success-message";
            createMessage.innerHTML = `
                <span class="login-success-message">
                    Success login ✔️  
                </span>
            `;
    
            document.loginForm.before(createMessage);
            
            // Keeps success login message on the screen for about 1 sec and, half.
            setTimeout(() => {
                createMessage.remove();
                loginForm.submit();
            }, 1500);
        };
        successMessage();

    } else {
        // If not, user will face an error message and form default behavior which is submit, will stay prevented as same as before.
        // By defining this arrow function error message is created step by step.
        const createErrorFunc = () => {   
            const createError = document.createElement("div");
            createError.className = "login-error-message";
            createError.innerHTML = `
                <span class="login-error-message">
                    Username, email or password is not correct! ⛔️ 
                </span>
                <button class="close-error" title="close">
                    <i class="far fa-window-close"></i>
                </button>
            `;
    
            document.loginForm.before(createError);
            createError.style.opacity = 1;
    
            // Defining two inner "setTimeout" and "setInterval" before "errorTimeout" to make sure it's usable a few codes below.
            let errorInterval;
            let errorStop;
            // After 5 seconds error message will start to fade away for about 10 seconds slowly.
            const errorTimeout = setTimeout(() => {
                errorInterval = setInterval(() => {
                    if (createError.style.opacity > .4) {
                        createError.style.opacity -= 0.05;
                    } else {
                        // Faster error message hiding.
                        createError.style.opacity -= 0.1;
                    }

                }, 500);
                // Making sure error display is fully hidden and, the interval defined above is now cleared.
                errorStop = setTimeout(() => {
                    clearInterval(errorInterval);
                    createError.style.display = "none";
                    createError.remove();
                }, 8000);
            },5000);
    
            // Program will listen and wait, the moment user clicks on the error message close button, all timeouts and intervals will be cleared and, the error message will be removed.
            createError.childNodes[3].addEventListener("click", () => {
                clearTimeout(errorTimeout);
                clearInterval(errorInterval);
                clearTimeout(errorStop);
                createError.remove();
            });

            let currentErrorList = document.querySelectorAll("div.login-error-message");
            // After program noticed that currently there are more than 3 errors on page, it will disable login button for 5 seconds and, user will not understand too.
            // This action will continue as long as user keep ups wrong actions and, following condition will happen rapidly. also following condition will help browser not to crash even if user continue to commit this wrong action!
            if (currentErrorList && currentErrorList.length > 3) {
                currentErrorList[0].remove();
                event.srcElement.disabled = true;
                setTimeout(() => {
                    event.srcElement.disabled = false;
                }, 5000);
            }
        };
        createErrorFunc();
    }

    // Clearing both lists after each click and validations which happened here to make sure both lists are not overloaded, so that the next time, validation conditions are checked all over again correctly.
    userInfo = [];
    validationList = [];
};

// Creating an arrow function that declares actions after clicking on "Show password" button.
const showLoginPass = () => {
    const passElem = document.getElementById("password");
    if (passElem.type == "password") {
        passElem.type = "text";
    } else {
        passElem.type = "password";
    }
};
