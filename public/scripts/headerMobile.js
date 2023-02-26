window.addEventListener('load', () => {

    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const xCloseBurgerMenuBtn = document.querySelector('.x-close-menu-btn');

    const mainDropdownMenu = document.querySelector('.mobile-main-dropdown');

    // selecting elements for apple products
    const iphonesLi = document.getElementById('iphones-box');
    const iphonesDropdown = document.querySelector('.iphones-dropdown');
    const arrowForIphonesDropdown = document.querySelector('#iphones-box i');

    // selecting elements for macbooks
    const macbooksLi = document.getElementById('macbooks-box');
    const macbooksDropdown = document.querySelector('.macbooks-dropdown');
    const arrowForMacbooksDropdown = document.querySelector('#macbooks-box i');

    // selecting elements for technical service
    const technicalServiceLi = document.getElementById('technical-service-box');
    const technicalServiceDropdown = document.querySelector('.technical-service-dropdown');
    const arrowForTechnicalService = document.querySelector('#technical-service-box i');

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
    iphonesLi.addEventListener('click', () => {
        iphonesDropdownInteraction();
    })

    // when clicking the apple products li dropdown
    macbooksLi.addEventListener('click', () => {
        macbooksDropdownInteraction();
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


    function iphonesDropdownInteraction() {
        iphonesDropdown.classList.toggle('mobile-submenu-active');
        arrowForIphonesDropdown.classList.toggle('bx-chevron-down-active');
    }

    function macbooksDropdownInteraction() {
        macbooksDropdown.classList.toggle('mobile-li-submenu');
        macbooksDropdown.classList.toggle('mobile-submenu-active');
        arrowForMacbooksDropdown.classList.toggle('bx-chevron-down-active');
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