const $menuBtn = document.querySelector('#menu-btn');
const $closeMenuBtn = document.querySelector('#close-menu-btn');

const $navbar = document.querySelector('#navbar');
const $mobileNavbar = document.querySelector('#mobile-navbar');
const $mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

$menuBtn.addEventListener('click', displayMenu);
function displayMenu() {
    $closeMenuBtn.style.display = 'block';
    $mobileNavbar.classList.add('mobile-nav--active');
}

$closeMenuBtn.addEventListener('click', closeMenu);
$mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});
function closeMenu() {
    $closeMenuBtn.style.display = 'none';
    $mobileNavbar.classList.remove('mobile-nav--active');
}


