const questions = document.querySelectorAll('.faq__question-btn');
const header = document.querySelector('.header');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__nav-link');
const toggleMenu = document.querySelector('.main-nav__toggle');
const closeMenu = document.querySelector('.mobile-menu__close');
const copyrightYear = document.getElementById('copyright-year');
const body = document.querySelector('body');

// FAQ Accordion
questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        
        if (answer.classList.contains('toggle-answer')) {
            answer.classList.remove('toggle-answer');
            answer.style.maxHeight = '0px';
            question.classList.remove('active');
        } else {
            answer.classList.add('toggle-answer');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
            question.classList.add('active');
        }
    });
});

// Scroll Nav Animation
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 1) {
        header.classList.add('active');
        toggleMenu.classList.add('active');
    } else {
        header.classList.remove('active');
        toggleMenu.classList.remove('active');
    }
});

// Toggle Menu
toggleMenu.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    body.classList.add('no-scroll');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    body.classList.remove('no-scroll');
});

// Close Mobile Menu on Nav Link Click
mobileMenuLinks.forEach(mobileMenuLink => {
    mobileMenuLink.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});

// Copyright Year
const d = new Date();
let year = d.getFullYear();
copyrightYear.innerText = year;

// ✅ AJAX Form Submission (Without Reload)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop form from reloading the page

            let formData = new FormData(this);

            fetch("form.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json()) // Parse response as JSON
            .then(data => {
                if (data.status === "success") {
                    alert("✅ Your request has been sent successfully!"); // Show success popup
                    form.reset(); // Reset form on success
                } else {
                    alert("❌ " + data.message); // Show error popup
                }
            })
            .catch(error => {
                alert("❌ An error occurred. Please try again.");
                console.error("AJAX Error:", error); // Log error for debugging
            });
        });
    }
});
