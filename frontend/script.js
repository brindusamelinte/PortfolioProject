const $menuBtn = document.querySelector('#menu-btn');
const $closeMenuBtn = document.querySelector('#close-menu-btn');

const $mediaQuery = window.matchMedia("(min-width: 1200px)");

const $navbar = document.querySelector('#navbar');
const $mobileNavbar = document.querySelector('#mobile-navbar');
const $mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

const $lightModeBtn = document.querySelector('.switch-mode__btn--light');
const $darkModeBtn = document.querySelector('.switch-mode__btn--dark');
const $switchMode = document.querySelector('.switch-mode');

const $submitMessage = document.querySelector('#submit-message');

// Menu Event
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

// MediaQuery Event
$mediaQuery.addEventListener('change', checkMediaQuery);
function checkMediaQuery($mediaQuery) {
    if($mediaQuery.matches) {
        $closeMenuBtn.style.display="none";
        $mobileNavbar.classList.remove('mobile-nav--active');
    } else if(!$mediaQuery.matches && $mobileNavbar.classList.contains('mobile-nav--active')) {
        $closeMenuBtn.style.display="block";
    }
}

// Dark/Light Mode Event
$switchMode.addEventListener('click', changeMode);
function changeMode() {
    document.body.classList.toggle("dark-mode");
}

// Form Submit
// const $submitMsgData = document.querySelector('[data-message-type]');

window.addEventListener('load', submitFormMessage);
function submitFormMessage() {
    const paramString = location.search;
    let searchParams = new URLSearchParams(paramString);

    if(searchParams.has('success')) {
        location.hash = 'contact';
        $submitMessage.setAttribute('data-message-type', "success");
        $submitMessage.innerText = searchParams.get('success');
    } else if(searchParams.has('errors')) {
        location.hash = 'contact';
        $submitMessage.setAttribute('data-message-type', "errors");
        $submitMessage.innerText = 'Couldn\'t send your message! \n\n';
        let errorArr = JSON.parse(searchParams.get('errors'));
        errorArr.forEach(error => {
            $submitMessage.innerText += error['msg'] + '\n';
        });
    }
}




