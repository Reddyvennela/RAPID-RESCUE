let currentDomain = '';
let currentLocationMethod = '';

function showDomainPage(domain) {
    currentDomain = domain;
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('domainPage').style.display = 'block';
    document.getElementById('locationPage').style.display = 'none';
    document.getElementById('domainTitle').textContent = domain.charAt(0).toUpperCase() + domain.slice(1).replace('-', ' ');
    document.getElementById('helpForm').style.display = 'none';
}

function showLocationPage() {
    document.getElementById('domainPage').style.display = 'none';
    document.getElementById('locationPage').style.display = 'block';
}

function goBack() {
    if (document.getElementById('helpForm').style.display === 'block') {
        document.getElementById('helpForm').style.display = 'none';
    } else {
        document.getElementById('mainPage').style.display = 'block';
        document.getElementById('domainPage').style.display = 'none';
        document.getElementById('locationPage').style.display = 'none';
        currentDomain = '';
    }
}

function goBackToDomain() {
    document.getElementById('locationPage').style.display = 'none';
    document.getElementById('domainPage').style.display = 'block';
    resetLocationForm();
}

function toggleHelpForm() {
    const form = document.getElementById('helpForm');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

function selectLocationMethod(method) {
    currentLocationMethod = method;
    document.getElementById('currentLocation').style.display = 'none';
    document.getElementById('manualLocation').style.display = 'none';

    if (method === 'current') {
        document.getElementById('currentLocation').style.display = 'block';
    } else {
        document.getElementById('manualLocation').style.display = 'block';
    }

    document.querySelectorAll('.location-option').forEach(option => {
        option.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

function getCurrentLocation() {
    const locationStatus = document.getElementById('locationStatus');
    locationStatus.textContent = 'Getting location...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                locationStatus.textContent = 'Location acquired!';
                // Here you would typically update the map with the coordinates
                // position.coords.latitude and position.coords.longitude
            },
            (error) => {
                locationStatus.textContent = 'Error getting location: ' + error.message;
            }
        );
    } else {
        locationStatus.textContent = 'Geolocation is not supported by this browser.';
    }
}

function submitLocation() {
    if (currentLocationMethod === 'current') {
        alert('Location confirmed! Ready to accept request.');
    } else if (currentLocationMethod === 'manual') {
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zipcode = document.getElementById('zipcode').value;

        if (address && city && state && zipcode) {
            alert('Location confirmed! Ready to accept request.');
        } else {
            alert('Please fill in all address fields');
            return;
        }
    }
    resetLocationForm();
    goBackToDomain();
}

function resetLocationForm() {
    currentLocationMethod = '';
    document.getElementById('currentLocation').style.display = 'none';
    document.getElementById('manualLocation').style.display = 'none';
    document.querySelectorAll('.location-option').forEach(option => {
        option.classList.remove('active');
    });

    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('zipcode').value = '';
    document.getElementById('locationStatus').textContent = '';
}

function submitRequest() {
    const problem = document.getElementById('problem').value;
    const description = document.getElementById('description').value;

    if (problem && description) {
        alert('Your request has been submitted successfully!');
        document.getElementById('problem').value = '';
        document.getElementById('description').value = '';
        document.getElementById('helpForm').style.display = 'none';
    } else {
        alert('Please fill in all fields');
    }
}
