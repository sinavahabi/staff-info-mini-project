"use strict";

// "sign-up.html"
// Defining "formValidator" class to make things easier and faster.
class formValidator {
    constructor(formElem) {
        // Constructor objects.
        this.__elem = formElem;
        this.FocusIn(formElem.elements);
        this.FocusOut(formElem.elements);
    }

    // Methods.
    // FOCUSIN!
    FocusIn(elements) {
        // Creating a function that hides error messages with a number as input.
        this.hideError = (num) => {
            // Accessing specific input which has a class with "targetInput" value and, a number that has been specified for each input exactly.
            const targetError = document.getElementsByClassName("targetInput")[num];
            // Checking if it exists first. 
            if (targetError.previousElementSibling){
                // Then hiding error message.
                targetError.previousElementSibling.style.display = "none";
                targetError.previousElementSibling.remove();
            }
                
        }
        for (let e of elements) {
            e.addEventListener("focusin", (event) => {
                // Making sure "focusin" event doesn't include following elements before we start.
                if (event.target.type != "checkbox" && event.target.tagName != "BUTTON") {
                    // Check if inputs are not empty by following condition.
                    if (event.target.value.length == 0) {                     
                        if (e.parentElement.previousSibling.tagName == "DIV") {
                            e.parentElement.previousSibling.style.display = "none";
                            // Removing error nodes for the moment either user focused on specified input or fixed the error by inserting validated input, in order to check error messages elements existence on the page.
                            e.parentElement.previousSibling.remove();
                        }            

                    }      
                    // Check if name input is valid by following conditions.
                    else if (event.target.id == "sign-up-name") {
                            if (event.target.value.length < 3) {
                                this.hideError(0);
                            }
                            // Make sure name is valid and not included with numbers or any other symbols. 
                            else if (familyValidator(event.target.value)) {
                                this.hideError(0);
                            }
                    }
                    // Check if last name input is valid by following conditions.
                    else if (event.target.id == "sign-up-last") {
                        if (event.target.value.length < 3) {
                            this.hideError(1);
                        }
                        // Make sure last name is valid and not included with numbers or any other symbols. 
                        else if (familyValidator(event.target.value)) {
                            this.hideError(1);
                        }
                    }
                    // Check if email input is valid by following conditions.
                    else if(event.target.id == "sign-up-email") {
                        if (!emailValidator(event.target.value)) {
                            this.hideError(2);
                        }
                    }

                    // Check username input is valid by following conditions.
                    else if(event.target.id == "sign-up-username") {
                        if (event.target.value.length < 4) {
                            this.hideError(3);
                        }
                        // Checking username validation first using ReGex.
                        else if (usernameValidator(event.target.value)) {
                            this.hideError(3);
                        }
                        // Then program checks if username is started with "@" or not.
                        else if (event.target.value[0] != "@") {
                            this.hideError(3);
                        }
                         // After that program makes sure username text value is not ended with "." or "-".
                        else if (event.target.value[event.target.value.length - 1] == "-" || event.target.value[event.target.value.length - 1] == ".") {
                            this.hideError(3);
                        }
                    }

                    // Check password input is valid by following ReGex.
                    else if (event.target.id == "sign-up-password") {
                        if (!passwordValidator(event.target.value)) {
                            this.hideError(4);
                        }
                    }

                    // When this function result is true, it means that user input value includes numbers and symbols, otherwise ReGex result will be false.
                    function familyValidator(regex) {
                        return /[^a-zA-Z\s]/.test(regex);
                    }
                    
                    // When this function result is false, it means that user input value is not valid by ReGex email validation, otherwise ReGex result will be true.
                    function emailValidator(regex) {
                        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(regex);
                    }
                    
                    // When this function result is true, it means that user input value is not valid by ReGex username validation, otherwise ReGex result will be false.
                    function usernameValidator(regex) {
                        return /[^a-zA-Z\d@._-]/.test(regex);
                    }
                    
                    // When this function result is false, it means that user input value is not valid by ReGex email validation, otherwise ReGex result will be true.
                    function passwordValidator(regex) {
                        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(regex); 
                    }
                }
            }); 
        }
    }

    // FOCUSOUT!
    FocusOut(elements) {
        // Creating a function that gets an innerHTML value, class value and, a number as input and, shows error messages.
        this.showError = (messageText, classValue="empty", num=0) => {
            // Creating "div" element which is parent of "span" element.
            const errorContainer = document.createElement("div");
            errorContainer.classList.add(classValue);
            errorContainer.innerHTML = `<span class="error">${messageText}</span>`;
            // Error message is ready and will be added to specified input ("targetInput") with a number, as "targetInput" elements previousSibling.
            const targetInput = document.getElementsByClassName("targetInput")[num];
            targetInput.before(errorContainer);
            // To make sure element is not hidden anymore.
            errorContainer.style.display = "block";
        }
        for (let e of elements) {
            e.addEventListener("focusout", (event) => {
                // Making sure "focusout" event doesn't include following elements before we start.
                if (event.target.type != "checkbox" && event.target.tagName != "BUTTON") {
                    // Check if inputs are not empty by following conditions.
                    if (event.target.value.length == 0) {
                        // In order to show error messages in the field of empty input values program performs a different task.
                        const errorContainer = document.createElement("div");
                        errorContainer.classList.add("empty");
                        errorContainer.innerHTML = "<span class=\"error\">This field cannot be empty!</span>";
                        // Using "e" variable which is an input element of "form" elements will help to show each input field error where it belongs.
                        e.parentElement.before(errorContainer);
                    }
                    // Check if name input is valid by following conditions.
                    else if (event.target.id == "sign-up-name") {
                        // Check if name is not less than 3 characters. 
                        if (event.target.value.length < 3) {
                            this.showError("Name cannot be less than 3 characters!", "name-error", 0);
                        }
                        // Make sure name is valid and not included with numbers or any other symbols. 
                        else if (familyValidator(event.target.value)) {
                            this.showError("Not a valid name!", "name-error", 0);
                        } else {
                            // After program was confident about name validation, shown error messages will no longer exist on the page.
                            const nameError = document.querySelector(".name-error");
                            if (nameError) {
                                nameError.style.display = "none"; 
                            }
                        }
                    }
                    // Check if last name input is valid by following conditions.
                    else if (event.target.id == "sign-up-last") {
                        // Check if last name is not less than 3 characters. 
                        if (event.target.value.length < 3) {
                            this.showError("Last name cannot be less than 3 characters!", "family-error", 1);
                        }
                        // Make sure last name is valid and not included with numbers or any other symbols. 
                        else if (familyValidator(event.target.value)) {
                            this.showError("Not a valid last name!", "family-error", 1);
                        } else {
                            // After program was confident about last name validation, shown error messages will no longer exist on the page.
                            const familyError = document.querySelector(".family-error");
                            if (familyError) {
                                familyError.style.display = "none"; 
                            }
                        }
                    }

                    // Check if email input is valid by following conditions.
                    else if(event.target.id == "sign-up-email") {
                        if (emailValidator(event.target.value)) {
                            // When program is confident about email validation, shown error messages will no longer exist on the page.
                            const emailError = document.querySelector(".email-error");
                            if (emailError) {
                                emailError.style.display = "none";
                            }
                        } else {
                            this.showError("Not a valid email!", "email-error", 2);
                        }
                    }

                    // Check username input is valid by following conditions.
                    else if(event.target.id == "sign-up-username") {
                        if (event.target.value.length < 4) {
                            this.showError("Username cannot be less than 4 characters!", "user-error", 3);
                        }
                        // Checking username validation first using ReGex.
                        else if (usernameValidator(event.target.value)) {
                            this.showError("Not a valid username!", "user-error", 3);
                        }
                        // Then program checks if username is started with "@" or not.
                        else if (event.target.value[0] != "@") {
                            this.showError("Username should start with \"@\"", "user-error", 3);
                        }
                        // After that program makes sure username text value is not ended with "." or "-".
                        else if (event.target.value[event.target.value.length - 1] == "-" || event.target.value[event.target.value.length - 1] == ".") {
                            this.showError("Username can't end with \".\" or \"-\"", "user-error", 3);
                        } else {
                            // After program was confident about username validation, shown error messages will no longer exist on the page.
                            const usernameError = document.querySelector(".user-error");
                            if (usernameError) {
                                usernameError.style.display = "none"; 
                            }
                        }
                    }

                    // Check password input is valid by following ReGex.
                    else if (event.target.id == "sign-up-password") {
                        if (passwordValidator(event.target.value)) {
                            // When program is confident about password validation, shown error messages will no longer exist on the page.
                            const passwordError = document.querySelector(".pass-error");
                            if (passwordError) {
                                passwordError.style.display = "none"; 
                            }
                        } else {
                            this.showError("You can't use special characters in your password. Your password also should contain at least one uppercase letter, one lowercase letter, one number, and a minimum of 8 characters!", "pass-error", 4);
                        }
                    }
                    
                    // When this function result is true, it means that user input value includes numbers and symbols, otherwise ReGex result will be false.
                    function familyValidator(regex) {
                        return /[^a-zA-Z\s]/.test(regex);
                    }

                    // When this function result is false, it means that user input value is not valid by ReGex email validation, otherwise ReGex result will be true.
                    function emailValidator(regex) {
                        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(regex);
                    }

                    // When this function result is true, it means that user input value is not valid by ReGex username validation, otherwise ReGex result will be false.
                    function usernameValidator(regex) {
                        return /[^a-zA-Z\d@._-]/.test(regex);
                    }

                    // When this function result is false, it means that user input value is not valid by ReGex email validation, otherwise ReGex result will be true.
                    function passwordValidator(regex) {
                        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(regex); 
                    }
                }
            }); 
        }
    }
}

// Creating an object from class.
let formValid;
try{
    formValid = new formValidator(signUpForm);
}
catch(catchErr){
    console.log("skipped!");
}

// Creating an arrow function that declares actions after clicking on "Sign-up" button.
const signUp = (event) => {
    // Accessing necessary input elements by DOM searching. 
    const inputList = document.querySelectorAll(".target");

    // Setting input attributes (name and value) values in order to save them in browser (page) on client side. 
    for (let item of inputList) {
        localStorage.setItem(item.name, item.value);
    }
    
    // Making it more clean after deleting irrelevant data to validate essential information, after `sign-up`, later on `login` page.
    localStorage.removeItem("name");
    localStorage.removeItem("last name");

    // Prevent the form from being submitted.
    event.preventDefault();

    // First we check for all input values to make sure user is leaving none of them behind.
    let flag = true;    
    for (let i of inputList) {
        if (i.value == "") {
            console.log("fill empty fields!");
            flag = false;
        }
    }

    // If above condition are all good, flag variable will stay true and following condition will take care of the rest. 
    let pageErrors = document.querySelectorAll(".error");
    // If errors node list exist on the page and, the list length is zero (means there's no error element at the moment(when "sign-up button" has been clicked)) and also, flag is true (means no input field left empty on above statement), then submit form.
    if (pageErrors && pageErrors.length == 0 && flag) {
        signUpForm.submit();
        alert("no errors on the page!");
    } else {
        // Show sign-up error message.
        alert("fix errors!");
        // After that, program will check for all inputs with error messages and, activate those inputs focus event from below to above. User has to fix input fields issue one by one.
        for (let err of pageErrors) {
            switch (err.parentElement.nextElementSibling.childElementCount) {
                case 1:
                    err.parentElement.nextElementSibling.childNodes[1].focus();
                    break;
                case 2: 
                    err.parentElement.nextElementSibling.childNodes[3].focus(); 
                    break;
                default:
                    err.parentElement.nextElementSibling.childNodes[3].focus();   
                    break;
            }
        }
        // Finally, clearing the error list will inform the program that recent errors are no longer in "pageError" list, so that no problem happens next time user tries to sign-up with valid information.
        pageErrors.forEach((err) => {
            err.remove();
        });
    }
};

// Creating an arrow function that declares actions after clicking on "Show password" button.
const showPass = (elemValue) => {
    // Accessing target input (input element with type="password") by DOM navigation.
    const passElem = elemValue.parentNode.previousSibling.previousSibling.childNodes[3];
    // Checking some condition to make buttons work more sensible each time user clicks on the button to show/hide password.
    if (passElem.type == "password") {
        passElem.type = "text";
        // Accessing icon element ("i") by DOM navigation.
        let lockIcon = passElem.previousElementSibling.childNodes[1];
        // changing class so that every time user asks to unhidden the password input, the icon will change appearance.
        lockIcon.className = "fas fa-lock-open";
    } else {
        passElem.type = "password";
        // Accessing icon element ("i") by DOM navigation.
        let lockIcon = passElem.previousElementSibling.childNodes[1];
        // changing class so that every time user asks to unhidden the password input, the icon will change appearance.
        lockIcon.className = "fas fa-lock";
    }
}

// "login.html"
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

    console.log(userInfo);
    console.log(validationList);

    // Prevent the form from being submitted.
    event.preventDefault();

    // This is the part which final form validation happens. 
    if (JSON.stringify(validationList) === JSON.stringify(userInfo)) {
        // If condition is true and both lists ("validationList" and "validationList") are exactly equal, submit will happen by JavaScript.
        document.getElementById("login-form").submit();
        alert("success match!");
    } else {
        // If not, user will face an error message and form default behavior which is submit, will stay prevented as same as before.
        const checkError = document.querySelector("div.login-error-message");
        // After "checkError" variable is defined, program will be to check if there is already a error message in page or not.
        const createErrorFunc = (val=false) => {
            // By defining this arrow function error message is created step by step.
            const createError = document.createElement("div");
            createError.className = "login-error-message";
            createError.innerHTML = `
                <span class="login-error-message">
                    Username, email or password is not correct!
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
            },5000)
    
            // Program will listen and wait, the moment user clicks on the error message close button, all timeouts and intervals will be cleared and, the error message will be removed.
            createError.childNodes[3].addEventListener("click", () => {
                clearTimeout(errorTimeout);
                clearInterval(errorInterval);
                clearTimeout(errorStop);
                createError.remove();
            });

            if (val) {
                // This condition is useful for the time which there is already an error message on the page and, function input "val" is set to true boolean.
                clearTimeout(errorTimeout);
                clearInterval(errorInterval);
                clearTimeout(errorStop);
                createError.remove();
            }
        };

        if (!checkError) {
            createErrorFunc();
        } else {
            createErrorFunc(true);
        }
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
