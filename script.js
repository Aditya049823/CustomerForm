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
    return true; // Form is valid, allow submission
}

//Submit Functionality
forms.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting

    const selectedValues = [];

    // Iterate through the form elements
    const formElements = forms.elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.tagName === "INPUT" || element.tagName === "SELECT") {
            const label = forms.querySelector(`label[for="${element.id}"]`);
            if (label) {
                const labelText = label.textContent.replace(':', ''); 
                let value = element.value;
                if (element.type === "radio" && !element.checked) {
                    continue; // Skip unchecked radio buttons
                }
                if (element.type === "select-one") {
                    value = element.options[element.selectedIndex].textContent;
                }
                selectedValues.push(`${labelText}: ${value}`);
            }
        }
    }

    // Populate the popup with selected values
    selectedList.innerHTML = selectedValues.map(value => `<li>${value}</li>`).join('');
    popUp.style.display = 'block';
});


// Close the popup and reset the form
closePopup.addEventListener('click', function () {
    popUp.style.display = 'none';
    forms.reset();
});