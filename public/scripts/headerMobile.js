window.addEventListener('load', () => {

    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const xCloseBurgerMenuBtn = document.querySelector('.x-close-menu-btn');

    const mainDropdownMenu = document.querySelector('.mobile-main-dropdown');

    // selecting elements for apple products
    const appleProductsLi = document.getElementById('apple-products-li');
    const appleProductsDropDown = document.querySelector('.apple-products-dropdown');
    const arrowForAppleProductsDropdown = document.querySelector('#apple-products-li i');

    // selecting elements for technical service
    const technicalServiceLi = document.getElementById('technical-service-li');
    const technicalServiceDropdown = document.querySelector('.technical-service-dropdown');
    const arrowForTechnicalService = document.querySelector('#technical-service-li i');

    //selecting elements for admindropdown 

    const adminIconContainer = document.getElementById('admin-icon-container');
    const adminUsernameDropdown = document.querySelector('.admin-username-dropdown');
    const adminIcon = document.querySelector('.admin-icon')

    // when clicking the mainburger menu
    burgerMenuBtn.addEventListener('click', () => {
        console.log('click')
        burgerMenuInteraction();
    })


    // when clicking the apple products li dropdown
    appleProductsLi.addEventListener('click', () => {
        appleProductsDropdownInteraction();
    })

    // when interacting with the apple products li dropdownmenu
    technicalServiceLi.addEventListener('click', () => {
        technicalServiceDropdownInteraction();
    })


    // functions for the events
    function burgerMenuInteraction() {
        mainDropdownMenu.classList.add('mobile-main-dropdown-active');
        burgerMenuBtn.style.display = 'none';
        xCloseBurgerMenuBtn.style.display = 'block';

        xCloseBurgerMenuBtn.addEventListener('click', () => {
            closeBurgerMenu();
        })
    }

    // when clicking user admin icon
    adminIconContainer.addEventListener('click', () => {
        adminIconInteraction();
    })


    function appleProductsDropdownInteraction() {
        appleProductsDropDown.classList.toggle('mobile-li-submenu');
        appleProductsDropDown.classList.toggle('mobile-submenu-active');
        arrowForAppleProductsDropdown.classList.toggle('bx-chevron-down-active');
    }

    function technicalServiceDropdownInteraction() {
        technicalServiceDropdown.classList.toggle('mobile-li-submenu');
        technicalServiceDropdown.classList.toggle('mobile-submenu-active');
        arrowForTechnicalService.classList.toggle('bx-chevron-down-active');
    }

    function closeBurgerMenu() {
        mainDropdownMenu.classList.remove('mobile-main-dropdown-active');
        burgerMenuBtn.style.display = 'block';
        xCloseBurgerMenuBtn.style.display = 'none';
    }


    function adminIconInteraction() {
       adminUsernameDropdown.classList.toggle('admin-username-dropdown-active');
       adminIcon.classList.toggle('admin-icon-active')
    }


})