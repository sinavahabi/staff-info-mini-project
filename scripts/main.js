"use strict";

// "sign-up.html"

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
        // Creating a function that hides error messages.
        this.hideError = (num) => {
            // Making sure target div (errorMessage container div element) exists at first.
            const targetError = document.getElementsByClassName("targetInput")[num];
            if (targetError.previousElementSibling){
                targetError.previousElementSibling.style.display = "none";
            }
                
        }
        for (let e of elements) {
            e.addEventListener("focusin", (event) => {
                if (event.target.type != "checkbox" && event.target.tagName != "BUTTON") {
                    // Check if input is not empty by following conditions.
                    if (event.target.value.length == 0) {                     
                        if (e.parentElement.previousSibling.tagName == "DIV") {
                            e.parentElement.previousSibling.style.display = "none";
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
        // Creating a function that gets an innerHTML value as input and, shows error messages.
        this.showError = (messageText, classValue="empty", num=0) => {
            const errorContainer = document.createElement("div");
            errorContainer.classList.add(classValue);
            errorContainer.innerHTML = `<span class="error">${messageText}</span>`;
            // Adding the "errorContainer" element before the input parent which is a div element itself.
            const targetInput = document.getElementsByClassName("targetInput")[num];
            targetInput.before(errorContainer);

            if (document.getElementsByClassName(classValue).length > 1) {
                document.getElementsByClassName(classValue)[0].remove();
            }
            // To make sure element is not hidden anymore.
            errorContainer.style.display = "block";
        }
        for (let e of elements) {
            e.addEventListener("focusout", (event) => {
                if (event.target.type != "checkbox" && event.target.tagName != "BUTTON") {
                    // Check if input is not empty by following conditions.
                    if (event.target.value.length == 0) {
                        const errorContainer = document.createElement("div");
                        errorContainer.classList.add("empty");
                        errorContainer.innerHTML = "<span class=\"error\">This field cannot be empty!</span>";
                        e.parentElement.before(errorContainer);
                    }
                    // Check if name input is valid by following conditions.
                    else if (event.target.id == "sign-up-name") {
                        // Check if name is not less than 3 characters. 
                        if (event.target.value.length < 3) {
                            this.showError("Cannot be less than 3 characters!", "name-error", 0);
                        }
                        // Make sure name is valid and not included with numbers or any other symbols. 
                        else if (familyValidator(event.target.value)) {
                            this.showError("Not valid!", "name-error", 0);
                        } else {
                            const familyError = document.querySelector(".name-error");
                            if (familyError) {
                                familyError.style.display = "none"; 
                            }
                        }
                    }
                    // Check if last name input is valid by following conditions.
                    else if (event.target.id == "sign-up-last") {
                        // Check if last name is not less than 3 characters. 
                        if (event.target.value.length < 3) {
                            this.showError("Cannot be less than 3 characters!", "family-error", 1);
                        }
                        // Make sure last name is valid and not included with numbers or any other symbols. 
                        else if (familyValidator(event.target.value)) {
                            this.showError("Not valid!", "family-error", 1);
                        } else {
                            const familyError = document.querySelector(".family-error");
                            if (familyError) {
                                familyError.style.display = "none"; 
                            }
                        }
                    }

                    // Check if email input is valid by following conditions.
                    else if(event.target.id == "sign-up-email") {
                        if (emailValidator(event.target.value)) {
                            const familyError = document.querySelector(".family-error");
                            if (familyError) {
                                familyError.style.display = "none"; 
                            }
                        } else {
                            this.showError("Not valid!", "email-error", 2);
                        }
                    }

                    // Check username input is valid by following conditions.
                    else if(event.target.id == "sign-up-username") {
                        if (event.target.value.length < 4) {
                            this.showError("Cannot be less than 4 characters!", "user-error", 3);
                        }
                        // Checking username validation first using ReGex.
                        else if (usernameValidator(event.target.value)) {
                            this.showError("Not valid!", "user-error", 3);
                        }
                        // Then program checks if username is started with "@" or not.
                        else if (event.target.value[0] != "@") {
                            this.showError("Username should start with \"@\"", "user-error", 3);
                        }
                        // After that program makes sure username text value is not ended with "." or "-".
                        else if (event.target.value[event.target.value.length - 1] == "-" || event.target.value[event.target.value.length - 1] == ".") {
                            this.showError("Username can't end with \".\" or \"-\"", "user-error", 3);
                        } else {
                            const familyError = document.querySelector(".family-error");
                            if (familyError) {
                                familyError.style.display = "none"; 
                            }
                        }
                    }

                    // Check password input is valid by following ReGex.
                    else if (event.target.id == "sign-up-password") {
                        if (passwordValidator(event.target.value)) {
                            const familyError = document.querySelector(".family-error");
                            if (familyError) {
                                familyError.style.display = "none"; 
                            }
                        } else {
                            this.showError("You can't use special characters in your password.\nyour password also should contain at least one uppercase letter, one lowercase letter,\none number, and a minimum of 8 characters!", "pass-error", 4);
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
catch(err){
    console.log("skipped!", err);
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

    let pageErrors = document.querySelectorAll(".error");
    if (pageErrors && pageErrors.length == 0 && flag) {
        signUpForm.submit();
        console.log("no errors on the page!");
    } else {
        alert("fix erros!");
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
    } else {
        passElem.type = "password";
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
        console.log("success match!");
    } else {
        // If not, user will face an error message and form default behavior which is submit, will stay prevented as same as before.
        alert("NO match!");
    }

    // Clearing both lists after each click and validations which happened here to make sure both lists are not overloaded, so that the next time, validation conditions are checked all over again correctly.
    userInfo = [];
    validationList = [];
};
