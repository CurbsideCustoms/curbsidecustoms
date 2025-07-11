document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const closeButton = document.querySelector("#hamburger-menu button");
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const menuOverlay = document.createElement("div");

    // Create an overlay div
    menuOverlay.id = "menu-overlay";
    document.body.appendChild(menuOverlay);

    function openMenu() {
        hamburgerMenu.classList.add("open");
        menuOverlay.classList.add("show");
    }

    function closeMenu() {
        hamburgerMenu.classList.remove("open");
        menuOverlay.classList.remove("show");
    }

    // Open menu on button click
    menuToggle.addEventListener("click", openMenu);

    // Close menu on clicking the "X" button
    closeButton.addEventListener("click", closeMenu);

    // Close menu when clicking outside the menu
    menuOverlay.addEventListener("click", closeMenu);
});




// Get elements
const openFormBtn = document.getElementById('open-form-btn');
const customForm = document.getElementById('custom-package-form');
const closeFormBtn = document.getElementById('close-form-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sendBtn = document.getElementById('send-btn');
const thankYouMessage = document.getElementById('thank-you-message');
const packageForm = document.getElementById('package-form');

// Open form when clicking on the custom package button
openFormBtn.addEventListener('click', () => {
    customForm.style.display = 'flex';
});

// Close form when clicking on the close button
closeFormBtn.addEventListener('click', () => {
    customForm.style.display = 'none';
});

// Close form when clicking the cancel button
cancelBtn.addEventListener('click', () => {
    customForm.style.display = 'none';
});

// Handle form submission
packageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Hide the form and show the "Thank You" message
    customForm.style.display = 'none';
    thankYouMessage.style.display = 'block';

    // Optionally, you can send the form data to a server here via AJAX

    // Hide the "Thank You" message after 5 seconds
    setTimeout(() => {
        thankYouMessage.style.display = 'none';
    }, 5000);
});



