window.addEventListener('load', () => {

    const deviceTypeSelected = document.getElementById('select_device_type')
    const coresContainer = document.getElementById('cores-container');
    const ssdsContainer = document.getElementById('ssds-container');
    const ramsContainer = document.getElementById('rams-container');
    const storagesContainer = document.getElementById('storages-for-iphone');

    if (deviceTypeSelected.value != 1) {
        coresContainer.style.display = 'block';
        ssdsContainer.style.display = 'block';
        ramsContainer.style.display = 'block';
        coresContainer.style.display = 'block';
        storagesContainer.style.display = 'none';      

    } else {
        storagesContainer.style.display = 'block';
        coresContainer.style.display = 'none';
        ssdsContainer.style.display = 'none';
        ramsContainer.style.display = 'none';
        coresContainer.style.display = 'none';
        
    }

    deviceTypeSelected.addEventListener('change', () => { // if user selects iphone, we will display iphone options. if not, other options
        if (deviceTypeSelected.selectedIndex != 0) {
            coresContainer.style.display = 'block';
            ssdsContainer.style.display = 'block';
            ramsContainer.style.display = 'block';
            coresContainer.style.display = 'block';
            storagesContainer.style.display = 'none';
           
            

        } else {
            storagesContainer.style.display = 'block';
            coresContainer.style.display = 'none';
            ssdsContainer.style.display = 'none';
            ramsContainer.style.display = 'none';
            coresContainer.style.display = 'none';
            
        }

    })



})