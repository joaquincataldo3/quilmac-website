window.addEventListener('load', () => {

    const deviceTypeSelected = document.getElementById('select_device_type')
    const coresContainer = document.getElementById('cores-container');
    const ssdsContainer = document.getElementById('ssds-container');
    const ramsContainer = document.getElementById('rams-container');
    const storagesContainer = document.getElementById('storages-for-iphone');

    const changeStyleDisplay = (containersArray, method) => {
        const otherMethod = method == 'block' ? 'none' : 'block';
        for (let i = 0; i < containersArray.length; i++) {
            if (i < 4) {
                containersArray[i].style.display = method;
            } else {
                containersArray[i].style.display = otherMethod;
            }
        }
    }

    if (deviceTypeSelected.value != 1) {
        const arrayToChangeStyle = [coresContainer, ssdsContainer, ramsContainer, coresContainer, storagesContainer];
        const method = 'block';
        changeStyleDisplay(arrayToChangeStyle, method);

    } else {
        const arrayToChangeStyle = [coresContainer, ssdsContainer, ramsContainer, coresContainer, storagesContainer];
        const method = 'none';
        changeStyleDisplay(arrayToChangeStyle, method);
    }

    deviceTypeSelected.addEventListener('change', () => { // if user selects iphone, we will display iphone options. if not, other options
        if (deviceTypeSelected.selectedIndex != 0) {
            const arrayToChangeStyle = [coresContainer, ssdsContainer, ramsContainer, coresContainer, storagesContainer];
            const method = 'block';
            changeStyleDisplay(arrayToChangeStyle, method);
        } else {
            const arrayToChangeStyle = [coresContainer, ssdsContainer, ramsContainer, coresContainer, storagesContainer];
            const method = 'none';
            changeStyleDisplay(arrayToChangeStyle, method); 
        }

    })



})