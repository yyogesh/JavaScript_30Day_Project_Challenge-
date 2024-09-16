document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('jsonFileInput');
    const formContainer = document.getElementById('formContainer');
    // input file change 
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const jsonData = JSON.parse(event.target.result);
                    generateForm(jsonData)
                } catch (e) {
                    console.error('Error parsing JSON:', error);
                    formContainer.innerHTML = '<p>Error: Invalid JSON file</p>';
                }
            }

            reader.readAsText(file);
        }
    })
    // generate form
    function generateForm(jsonData) {
        let formHtml = `<form id="dynamicForm" novalidate>`;
        jsonData.fields.forEach(field => {
            formHtml += `<div class="form-group">`;
            formHtml += `<label for="${field.id}">${field.label}</label>`;

            switch (field.type) {
                case 'text':
                case 'email':
                case 'number':
                    formHtml += `<input type="${field.type}" id="${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>`;
                    break;
                case 'select':
                    formHtml += `<select id="${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>`;
                    field.options.forEach(option => {
                        formHtml += `<option value="${option.value}">${option.label}</option>`;
                    });
                    formHtml += `</select>`;
                    break
                case 'textarea':
                    formHtml += `<textarea id="${field.id}" name="${field.id}" ${field.required ? 'required' : ''}></textarea>`;
                    break
            }

            formHtml += `<span class="error" id="${field.id}-error"></span></div>`;
        })

        formHtml += '<button type="submit">Submit</button></form>';
        formContainer.innerHTML = formHtml;

        const form = document.getElementById('dynamicForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if(validateForm(jsonData)) {
                alert('Form submitted successfully!');
            }
        });
    }
    // validate form

    function validateForm(formData) {
        let isValid = true;

        formData.fields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorSpan = document.getElementById(`${field.id}-error`);
            let errorMessage = '';

            if(field.required && !input.value) {
                errorMessage = `${field.label} is required`;
            } else if(field.validation) {
                const value = input.value;

                if (field.validation.minLength && value.length < field.validation.minLength) {
                    errorMessage = field.validation.message;
                }

                if (field.validation.maxLength && value.length > field.validation.maxLength) {
                    errorMessage = field.validation.message;
                }

                if (field.validation.min && Number(value) < field.validation.min) {
                    errorMessage = field.validation.message;
                }
                if (field.validation.max && Number(value) > field.validation.max) {
                    errorMessage = field.validation.message;
                }

                if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
                    errorMessage = field.validation.message;
                }
            }

            if(errorMessage) {
                isValid = false;
                errorSpan.textContent = errorMessage;
                input.classList.add('invalid');
            } else {
                errorSpan.textContent = '';
                input.classList.remove('invalid');
            }

        })

        return isValid;
    }
});