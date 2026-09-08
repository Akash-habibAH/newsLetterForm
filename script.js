const email = document.getElementById("inputEmail");
const form = document.getElementById("subscribeForm");
const errorMessage = document.getElementById("errorMessage");
const bodyTag = document.querySelector("body");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Function: show error styles
function errorStyling() {
  errorMessage.className = "display-error-message";
  email.setAttribute("aria-invalid", "true");
  email.classList.remove("input__field-ns");
  email.classList.add("email-in-error");
}

// Function: remove error styles
function resetStyles() {
  errorMessage.className = "input__error-message";
  email.setAttribute("aria-invalid", "false");
  email.classList.add("input__field-ns");
  email.classList.remove("email-in-error");
}

// Function: Success Message
function displaySuccessMessage(email__input) {
  bodyTag.innerHTML = `
            <div
              class="success-message"
              tabindex="-1"
              aria-labelledby="successHeading"
            >
                <div class="success-message-content">
                    <img src="public/images/icon-success.svg" alt="" class="success-message__icon" height="16"
                    width="16"
                    loading="lazy"
                    decoding="async">
                <h1 id="successHeading" class="success-message__greeting">Thanks for subscribing!</h1>
                    <p class="success-message__description">A confirmation email has been sent to  
                    <span id="emailAccount" class="success-message__email">${email__input}</span>. 
                    Please open it and click the button inside to confirm your subscription.</p>
                </div>    
                <button id="dismissBtn" class="success-message__closing-btn">Dismiss message</button>
                
            </div>
    `;

  const successMessage = document.querySelector(".success-message");
  successMessage.focus();

  const dismissButton = document.getElementById("dismissBtn");
  dismissButton.addEventListener("click", () => {
    location.reload(); // Reset the page
  });
}

// Blur event (field se bahar nikalne par)
email.addEventListener("blur", () => {
  let inputEmail = email.value.trim();
  if (!emailRegex.test(inputEmail)) {
    errorStyling();
  } else {
    resetStyles();
  }
});

// Show the same accessible error for the browser's required-field validation.
email.addEventListener("invalid", errorStyling);

// Submit event
form.addEventListener("submit", function (event) {
  let inputEmail = email.value.trim();
  if (!emailRegex.test(inputEmail)) {
    event.preventDefault();
    errorStyling();
  } else {
    event.preventDefault(); // To prevent page reload
    resetStyles();
    displaySuccessMessage(inputEmail);
  }
});
