let email = document.getElementById("inputEmail");
let subscribeButton = document.getElementById("buttonForSubscribe");
let form = document.getElementById("subscribeForm");
let label = document.getElementById("labelOfEmail");
let errorMessage = document.querySelector(".warning");
let bodyTag = document.querySelector("body");

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Function: show error styles
function btnStylesInError() {
    subscribeButton.style.backgroundColor = "hsl(234, 29%, 20%)";
    email.style.color = "hsl(4, 100%, 67%)";
    email.style.border = "1px solid hsl(4, 100%, 67%)";
    errorMessage.id = "displayWarning";
}

// Function: remove error styles
function resetStyles() {
    subscribeButton.style.backgroundColor = "";
    email.style.color = "";
    email.style.border = "";
    if (errorMessage.id === "displayWarning") {
        errorMessage.removeAttribute("id");
    }
}

// Function: Success Message
function displaySuccessMessage(emailText) {
    bodyTag.innerHTML = `
        <section id="messageWrapper">
            <div class="successMessage">
                <img src="icon-list.svg" alt="CheckMark icon" id="iconInSucess">
                <p id="greeting">Thanks for subscribing!</p>
                <p>A confirmation email has been sent to  
                   <span id="emailAccount">${emailText}</span>. 
                   Please open it and click the button inside to confirm your subscription.</p>
                <button id="dismissBtn">Dismiss message</button>
            </div>
        </section>
    `;

    // ✅ Add event listener AFTER rendering
    let dismissButton = document.getElementById("dismissBtn");
    dismissButton.addEventListener("click", () => {
        location.reload(); // Reset the page
        email.value=" ";
    });
}

// Blur event (field se bahar nikalne par)
email.addEventListener("blur", () => {
    let inputValue = email.value.trim();
    if (!emailRegex.test(inputValue)) {
        btnStylesInError();
    } else {
        resetStyles();
    }
});

// Submit event
form.addEventListener("submit", function (event) {
    let inputValue = email.value.trim();
    if (!emailRegex.test(inputValue)) {
        event.preventDefault();
        btnStylesInError();
    } else {
        event.preventDefault(); // To prevent page reload
        resetStyles();
        displaySuccessMessage(inputValue);
    }
});

// Image swap on load
document.addEventListener("DOMContentLoaded", function () {
    let image = document.querySelector("#desktopImg");
    if (document.body.clientWidth <= 480) {
        image.src = "images/illustration-sign-up-mobile.svg";
    } else {
        image.src = "images/illustration-sign-up-desktop.svg";
    }
});