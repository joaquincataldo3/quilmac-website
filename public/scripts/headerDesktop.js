window.addEventListener('load', () => {

    // ----- desktop js ------

        // elements for iphone dropdown
        const iphonesLi = document.getElementById('iphones-li');
        const iphonesDropdown = document.getElementById('iphones-dropdown');
        const iphonesDropdownArrow = document.querySelector('#iphones-li i');

        //elements for macbooks dropdown
        const macbooksLi = document.getElementById('macbooks-li');
        const macbooksDropdown = document.getElementById('macbooks-dropdown');
        const macbooksDropdownArrow = document.querySelector('#macbooks-li i');

        // elements for technical service dropdown

        const technicalServiceLi = document.getElementById('technical-service-desktop-li');
        const technicalServiceDropdown = document.getElementById('technical-service-desktop-dropdown');
        const technicalServiceDropdownArrow = document.querySelector('#technical-service-desktop-li i');

        // elements for accesories dropdown

        // elements for technical service dropdown

        const accesoriesLi = document.getElementById('accesories-li');
        const accesoriesDropdown = document.getElementById('accesories-dropdown');
        const accesoriesDropdownArrow = document.querySelector('#accesories-li i');

        // elements for admin logout dropdown

        const adminDiv = document.getElementById('desktop-admin-username')
        const adminDropdown = document.querySelector('.desktop-admin-logout-container')

        //interaction with iphones li

        iphonesLi.addEventListener('mouseover', () => {
            iphoneDropdownInteraction();
        })

        function iphoneDropdownInteraction () {

            const macbookDropdownIsActive = macbooksDropdown.classList.contains('desktop-li-submenu-active');

            if(macbookDropdownIsActive) {
                macbooksDropdown.classList.remove('desktop-li-submenu-active');
                macbooksDropdownArrow.classList.remove('bx-chevron-down-active');
            } 
            

            iphonesDropdown.classList.toggle('desktop-li-submenu-active');
            iphonesDropdownArrow.classList.toggle('bx-chevron-down-active');
        }


        //interaction with macbooks li

        macbooksLi.addEventListener('click', () => {
            macbooksDropdownInteraction();

        })
        
        function macbooksDropdownInteraction () {

            const iphoneDropdownIsActive = iphonesDropdown.classList.contains('desktop-li-submenu-active');

            if(iphoneDropdownIsActive) {
                iphonesDropdown.classList.toggle('desktop-li-submenu-active');
                iphonesDropdownArrow.classList.toggle('bx-chevron-down-active');
            }

            macbooksDropdown.classList.toggle('desktop-li-submenu-active');
            macbooksDropdownArrow.classList.toggle('bx-chevron-down-active');
        }

        //interaction with accesories li

        accesoriesLi.addEventListener('click', () => {
            accesoriesDropdownInteraction();

        })
        
        function accesoriesDropdownInteraction () {

           /*  const iphoneDropdownIsActive = iphonesDropdown.classList.contains('desktop-iphones-li-submenu-active');

            if(iphoneDropdownIsActive) {
                iphonesDropdown.classList.toggle('desktop-li-submenu-active');
                iphonesDropdownArrow.classList.toggle('bx-chevron-down-active');
            } */

           accesoriesDropdown.classList.toggle('desktop-li-submenu-active');
           accesoriesDropdownArrow.classList.toggle('bx-chevron-down-active');
        }

        // interaction with technical-service li

        technicalServiceLi.addEventListener('click', () => {
            technicalServiceDropdownInteraction();

        })
        
        function technicalServiceDropdownInteraction () {

           /*  const iphoneDropdownIsActive = iphonesDropdown.classList.contains('desktop-iphones-li-submenu-active');

            if(iphoneDropdownIsActive) {
                iphonesDropdown.classList.toggle('desktop-li-submenu-active');
                iphonesDropdownArrow.classList.toggle('bx-chevron-down-active');
            } */

           technicalServiceDropdown.classList.toggle('desktop-li-submenu-active');
           technicalServiceDropdownArrow.classList.toggle('bx-chevron-down-active');
        }

        // interaction with admin logout dropdown

        adminDiv.addEventListener('click', () => {
            adminLogoutDropdownInteraction()
        } )

        function adminLogoutDropdownInteraction () {
            adminDropdown.style.pointerEvents = 'auto'
            adminDropdown.classList.toggle('desktop-admin-logout-container-active')
        }

})