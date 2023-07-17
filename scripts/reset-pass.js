"use strict";

// Defining a validator class as we did on "sign-up.html" file.
class Validator {
    // Constructor objects.
    constructor(elem) {
        this.__elem = elem;
        this.FocusIn(elem);
        this.FocusOut(elem);
    }

    // Methods.
    // FOCUSIN!
    FocusIn(elem) {
        // By using "addEventListener" program will wait and listen to changes, which in this case is "focusin" event.
        elem.addEventListener("focusin", () => {
            // The "elem" class and, method input is basically the "input" element with id="email" which we pass to class when we initialized it as new object a few codes below.
            if (elem.value.length == 0) {
                // "hideError" function is defined at the bottom and we'll be discussed where it's defined. It's invoked here and is working because of the hoisted concept."
                hideError("empty-error")
            }
            else if (!emailValidator(elem.value)) {
                hideError("valid-error");
            }
            // When this function result is false, it means that user input value is not valid by ReGex email validation, otherwise ReGex result will be true.
            function emailValidator(regex) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(regex);
            }
        });
    }

    // FOCUSIN!
    FocusOut(elem) {
        // By using "addEventListener" program will wait and listen to changes, which in this case is "focusout" event.
        elem.addEventListener("focusout", () => {
            // The "elem" class and, method input in here is also, the "input" element with id="email" which we pass to class when we initialized it as new object a few codes below.
            // Check if input is not empty by following condition.
            if (elem.value.length == 0) {
                // "showError" function is defined at the bottom and we'll be discussed where it's defined. It's invoked here and is working because of the hoisted concept."
                elem.parentElement.after(showError("This field cannot be empty!", "empty-error"));
                // "elem.parentElement" is basically the location of the element that program we'll put the error message attached to it. In here, this location refers to "div.input-group.w-100" element.
            }
            // Check if email input is valid by following condition.
            else if (!emailValidator(elem.value)) {
                elem.parentElement.after(showError("Not a valid email!", "valid-error"));
            }
            // When this function result is false, it means that user input value is not valid by ReGex email validation, otherwise ReGex result will be true.
            function emailValidator(regex) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(regex);
            }
        });
    }
}

// Creating an object from class.
let valid = new Validator(email);

// Creating "div" element to display timer to user each time they press submit button and, inserted email value is valid and, match with user signed-up value outside the relevant function. So, program only use it in "startTimer" function.
const timeContainer = document.createElement("div");
timeContainer.className = "timer";

// Creating this function helps users if they didn't receive a reset password link, they can try again in 90sec and ask for a new link.
function startTimer() {
    // Setting the timer to 90 seconds outside the "timerDisplay" function so that program doesn't have to recreate this variable each second all over again until this function task is done after times up.
    let seconds = 90;
    
    // Creating this function helped to avoid repetitious steps with some tiny differences. By giving two function arguments those tiny differences have been solved.
    const timerDisplay = (before, after=0) => {
        timeContainer.innerHTML = `
            <span class="left text-muted">
                If you didn't receive the link:
            </span>
            <span class="right">
                Try again in ${before}${seconds - after}
            </span>
        `;
        document.querySelector(".input-group").before(timeContainer);
        seconds--;
    }

    const timer = setInterval(() => {
        // Making sure there wouldn't be two timers on the page at the same time.
        if (document.querySelector(".timer")) {
            document.querySelector(".timer").remove();
        }

        // Stop the timer when it reaches 0
        if (seconds === 0) {
            clearInterval(timer); 
        }
        // Until the timer reaches zero, timer seconds will decrease from 60 to 0 each second step by step.
        // With different arguments for "timerDisplay" functions, program will give different shapes of timer display on the page.
        else if (seconds >= 70) {
            timerDisplay("01:", 60);
        }
        else if (seconds < 70 && seconds >= 60) {
            timerDisplay("01:0", 60);
        }
        else if (seconds < 10) {
            timerDisplay("00:0");
        } else {
            timerDisplay("00:");
        }
    }, 1000); 
}

// This is the "onclick" event function, which has been defined to control actions and, make proper responds after this button has been clicked.
const submitFunc = (btn) => {
    // Creating two constants to check and, avoid more than one message on the display at the same time.
    const getError = document.querySelector(".submit-error");
    const getSuccess = document.querySelector(".submit-success");

    if (getSuccess) {
        getSuccess.remove();
    } 

    if (getError) {
        getError.remove();
    }

    // Accessing to saved data and, inserted data in this page to check both emails match.
    const emailValue = btn.previousElementSibling.value;
    const storageEmailValue = localStorage.email;
    if (emailValue === storageEmailValue) {
        // When user inserts right and, valid email following actions will occur.
        document.body.prepend(showSuccess());
        btn.disabled = true;
        startTimer();
        // After 91sec, button in not disabled anymore and, users can ask for new reset password link.
        setTimeout(() => {
            btn.disabled = false;
        }, 91000);
    } else {
        document.body.prepend(showError("This email doesn't exist!", "submit-error"));
    }    
};

// With hoisted concept program were able to defined these functions at the bottom and, uses their actions at the top level.
function showError(errorMessage, classValue) {
    // Creating and, preparing error message and, returning the result in order to be used on above different conditions. This function will show each error at the moment the "input" element is focused out.
    const valueError = document.createElement("div");
    valueError.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show", "text-center", classValue);
    valueError.setAttribute("role", "alert");
    valueError.innerHTML = `
        <span>
            ${errorMessage}
        </span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    return valueError;
}

function hideError(classValue) {
    // Creating an action which will hide error message and, returning the result in order to be used on above different conditions. This function will hide each error at the moment the "input" element is focused in.
    const clearError = document.querySelector(`.${classValue}`);
    if (clearError) {
        clearError.remove();
    }
}


function showSuccess() {
    // This function will show success message when user inserts a valid and, matched email with previous one they sign-up with.
    const submitSuccess = document.createElement("div");
    submitSuccess.classList.add("submit-success", "alert", "alert-success", "text-center");
    submitSuccess.setAttribute("role", "alert");
    submitSuccess.innerHTML = `
        <span>
            We've send a link to your email. Check your email and change your password.
        </span>
    `;
    return submitSuccess;
}
