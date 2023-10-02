const forms=document.getElementById("customerForm");
const popUp=document.getElementById("popup");
const selectedList=document.getElementById("selectedValues");
const closePopup=document.getElementById("closePopup");

//Reset Functinality
document.getElementById("resetForm").addEventListener("click", function () {
    forms.reset();
});

function validateForm() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const dob = document.getElementById("dob").value;
    const country = document.getElementById("country").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const profession = document.getElementById("prof").value;
    const email = document.getElementById("email").value;
    const mob = document.getElementById("mob").value;

    // Check if required fields are empty
    if (fname === "" || lname === "" || dob === "" || country === "" || !gender || profession === "" || email === "" || mob === "") {
        alert("All required fields must be filled out");
        return false; // Prevent form submission
    }

    // Add more specific validation checks here, e.g., for email and mobile number format.

    return true; // Form is valid, allow submission
}

//Submit Functionality
forms.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting

    const selectedValues = [];
    const labels = forms.getElementsByTagName('label');
    const inputs = forms.getElementsByTagName('input');
    const selects = forms.getElementsByTagName('select');
    const radios = forms.querySelectorAll('input[type="radio"]:checked');

    for (let i = 0; i < labels.length; i++) {
        const labelText = labels[i].textContent.replace(':', ''); // Remove the colon
        if (inputs[i] && inputs[i].type === 'text') {
            selectedValues.push(`${labelText}: ${inputs[i].value}`);
        } else if (selects[i]) {
            const selectedOption = selects[i].options[selects[i].selectedIndex];
            selectedValues.push(`${labelText}: ${selectedOption.textContent}`);
        }
    }

    for (let i = 0; i < radios.length; i++) {
        selectedValues.push(`Gender: ${radios[i].value}`);
    }

    // Add Date of Birth and Country to selected values
    const dob = forms.querySelector('#dob');
    selectedValues.push(`Date of Birth: ${dob.value}`);

    const country = forms.querySelector('#country');
    const selectedCountryOption = country.options[country.selectedIndex];
    selectedValues.push(`Country: ${selectedCountryOption.textContent}`);

    // Populate the popup with selected values
    selectedList.innerHTML = selectedValues.map(value => `<li>${value}</li>`).join('');
    popUp.style.display = 'block';
});


// Close the popup and reset the form
closePopup.addEventListener('click', function () {
    popUp.style.display = 'none';
    forms.reset();
});