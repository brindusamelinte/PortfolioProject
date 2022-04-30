const $menuBtn = document.querySelector('#menu-btn');
const $closeMenuBtn = document.querySelector('#close-menu-btn');

const $mediaQuery = window.matchMedia("(min-width: 1200px)");

const $navbar = document.querySelector('#navbar');
const $mobileNavbar = document.querySelector('#mobile-navbar');
const $mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

// const $portfolioCardsOdd = document.querySelectorAll('.portfolio-card:nth-child(odd)');

// $portfolioCardsOdd.forEach(oddCard => {
//     oddCard.classList.add('portfolio-card--odd');
// })

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

$mediaQuery.addEventListener('change', checkMediaQuery);
function checkMediaQuery($mediaQuery) {
    if($mediaQuery.matches) {
        $closeMenuBtn.style.display="none";
        $mobileNavbar.classList.remove('mobile-nav--active');
    } else if(!$mediaQuery.matches && $mobileNavbar.classList.contains('.mobile-nav--active')) {
        $closeMenuBtn.style.display="block";
    }
}

