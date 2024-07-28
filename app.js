document.addEventListener('DOMContentLoaded', (event) => {
    const slotSelector = document.getElementById('slot-selector');
    const inputName = document.getElementById('input-name');
    const submitBtn = document.getElementById('submit-btn');
    const output = document.getElementById('output');

    const labSelector = document.getElementById('lab-selector');
    const labName = document.getElementById('lab-name');
    const labSubmitBtn = document.getElementById('lab-btn');

    // Object to store applied colors for each slot
    const slotColors = {};

    // Function to generate a random medium to dark color
    function getRandomMediumDarkColor() {
        const min = 50; // Minimum value for medium to dark colors
        const max = 150; // Maximum value for RGB
        const r = Math.floor(Math.random() * (max - min) + min);
        const g = Math.floor(Math.random() * (max - min) + min);
        const b = Math.floor(Math.random() * (max - min) + min);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Function to apply colors to slots
    function applyColors(selectedClasses, color) {
        selectedClasses.forEach(className => {
            const elements = document.querySelectorAll(`.${className.trim()}`);
            elements.forEach(element => {
                element.style.backgroundColor = color;
                slotColors[className.trim()] = color; // Store applied color
            });
        });
    }

    // Function to reset color of a slot to original
    function resetColor(className) {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            element.style.backgroundColor = 'lightgoldenrodyellow';
            delete slotColors[className]; // Reset stored color
        });
    }

    // Function to display output with delete button
    function displayOutput(selectedValue, name) {
        const entry = document.createElement('div');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            const selectedClasses = selectedValue.split('+');
            selectedClasses.forEach(className => {
                resetColor(className.trim());
            });
            entry.remove(); // Remove entry from output
        });
        entry.textContent = `${selectedValue} - ${name}`;
        entry.appendChild(deleteBtn);
        output.appendChild(entry);
    }

    submitBtn.addEventListener('click', () => {
        // Get the selected value from the dropdown
        const selectedValue = slotSelector.value;

        // Get the inputted name
        const name = inputName.value;

        // Split the selected value by '+'
        const selectedClasses = selectedValue.split('+');

        // Generate a random color to apply to the slots
        const randomColor = getRandomMediumDarkColor();

        // Apply colors to slots if not already applied
        selectedClasses.forEach(className => {
            if (!slotColors[className.trim()]) {
                applyColors([className.trim()], randomColor);
            }
        });

        // Display the selected slot and the inputted name with delete button
        displayOutput(selectedValue, name);

        // Clear input field after submission
        inputName.value = '';
    });

    labSubmitBtn.addEventListener('click', () => {
        // Get the selected value from the lab dropdown
        const selectedValue = labSelector.value;

        // Get the inputted lab name
        const name = labName.value;

        // Split the selected value by '+'
        const selectedClasses = selectedValue.split('+');

        // Generate a random color to apply to the lab slots
        const randomColor = getRandomMediumDarkColor();

        // Apply colors to lab slots if not already applied
        selectedClasses.forEach(className => {
            if (!slotColors[className.trim()]) {
                applyColors([className.trim()], randomColor);
            }
        });

        // Display the selected lab slot and the inputted name with delete button
        displayOutputLab(selectedValue, name);

        // Clear lab name field after submission
        labName.value = '';
    });
    function displayOutputLab(selectedValue, name) {
        const entry = document.createElement('div');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            const selectedClasses = selectedValue.split('+');
            selectedClasses.forEach(className => {
                resetColor(className.trim());
            });
            entry.remove(); // Remove entry from output
        });
        entry.textContent = `${selectedValue} - ${name}`;
        entry.appendChild(deleteBtn);
        laboutput.appendChild(entry);
    }
});
