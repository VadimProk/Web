const cityData = {
    ukraine: ['Kyiv', 'Lviv', 'Odesa', 'Dnipro', 'Kharkiv'],
    usa: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    poland: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan'],
    france: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice']
};

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tabId = btn.getAttribute('data-tab');

        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    })
})

const togglePassword = (inputId, togglerId) => {
    const passwordInput = document.getElementById(inputId);
    const toggler = document.getElementById(togglerId);

    toggler.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggler.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            toggler.textContent = '👁️';
        }
    });
};

togglePassword('regPassword', 'toggleRegPassword');
togglePassword('confirmPassword', 'toggleConfirmPassword');
togglePassword('loginPassword', 'toggleLoginPassword');

const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

countrySelect.addEventListener('change', (e) => {
    const country = countrySelect.value;

    citySelect.innerHTML = '<option value="">Select a city</option>';
    citySelect.disabled = true;

    if (country) {
        citySelect.disabled = false;

        cityData[country].forEach((item) => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            citySelect.appendChild(option);
        });

        validateSelect(countrySelect, 'Please, select a country');
    } else {
        citySelect.disabled = true;
    }
});


const showError = (inputElement, message) => {
    inputElement.classList.remove('valid');
    inputElement.classList.add('invalid');

    const feedbackElement = inputElement.nextElementSibling.tagName === 'I' ?
        inputElement.nextElementSibling.nextElementSibling :
        inputElement.nextElementSibling;

    feedbackElement.textContent = message;
    feedbackElement.classList.remove('valid');
    feedbackElement.classList.add('invalid');
};

const showSuccess = (inputElement, message = 'Looks good!') => {
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');

    const feedbackElement = inputElement.nextElementSibling.tagName === 'I' ?
        inputElement.nextElementSibling.nextElementSibling :
        inputElement.nextElementSibling;

    feedbackElement.textContent = message;
    feedbackElement.classList.remove('invalid');
    feedbackElement.classList.add('valid');
};

const validateName = (nameInput) => {
    const value = nameInput.value.trim();

    if (value === ''){
        showError(nameInput, 'This field is required');
        return false;
    } else if (value.length < 3) {
        showError(nameInput, 'Must have at least 3 characters long');
        return false;
    } else if (value.length > 15) {
        showError(nameInput, 'Must have less than 15 characters');
        return false;
    } else {
        showSuccess(nameInput);
        return true;
    }
};

const validateEmail = (emailInput) => {
    const value = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (value === '') {
        showError(emailInput, 'Email is required');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(emailInput, 'Invalid email address');
        return false;
    } else  {
        showSuccess(emailInput);
        return true;
    }
};

const validatePassword = (passwordInput) => {
    const value = passwordInput.value.trim();

    if (value === '') {
        showError(passwordInput, 'Password is required');
        return false;
    } else if (value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        return false;
    } else {
        showSuccess(passwordInput);
        return true;
    }
};

const validateLoginPassword = (loginPasswordInput) => {
    const value = loginPasswordInput.value.trim();

    if (value === '') {
        showError(loginPasswordInput, 'Password is required');
        return false;
    } else if (value.length < 6) {
        showError(loginPasswordInput, 'Password must be at least 6 characters');
        return false;
    } else {
        showSuccess(loginPasswordInput);
        return true;
    }
};

const validateConfirmPassword = (confirmPasswordInput, passwordInput) => {
    const confirmValue = confirmPasswordInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (confirmValue === '') {
        showError(confirmPasswordInput, 'Please confirm your password');
        return false;
    } else if (confirmValue !== passwordValue) {
        showError(confirmPasswordInput, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPasswordInput);
        return true;
    }
};

const validatePhone = (phoneInput) => {
    const value = phoneInput.value.trim();
    const phoneRegex = /^\+380\d{9}$/;

    if (value === '') {
        showError(phoneInput, 'Phone number is required.');
        return false;
    } else if (!phoneRegex.test(value)) {
        showError(phoneInput, 'Please enter a valid Ukrainian phone number (+380XXXXXXXXX).');
        return false;
    } else {
        showSuccess(phoneInput);
        return true;
    }
};

const validateBirthDate = (birthDateInput) => {
    const value = birthDateInput.value;

    if (value === '') {
        showError(birthDateInput, 'Date of birth is required.');
        return false;
    }

    const birthDate = new Date(value);
    const today = new Date();

    if (birthDate > today) {
        showError(birthDateInput, 'Date of birth cannot be in the future.');
        return false;
    }

    const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));

    if (age < 12) {
        showError(birthDateInput, 'You must be at least 12 years old to register.');
        return false;
    } else {
        showSuccess(birthDateInput);
        return true;
    }
};

const validateGender = () => {
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderSelected = Array.from(genderInputs).some(input => input.checked);
    const feedbackElement = document.querySelector('.gender-options').nextElementSibling;

    if (!genderSelected) {
        feedbackElement.textContent = 'Please select your gender';
        feedbackElement.classList.remove('valid');
        feedbackElement.classList.add('invalid');
        return false;
    } else {
        feedbackElement.textContent = '';
        feedbackElement.classList.remove('invalid');
        return true;
    }
};


const validateSelect = (selectElement, errorMessage) => {
    if (selectElement.value === '') {
        showError(selectElement, errorMessage);
        return false;
    } else {
        showSuccess(selectElement);
        return true;
    }
};

const validateTerms = () => {
    const termsCheck = document.getElementById('termsCheck');
    const feedbackElement = document.getElementById('termsCheckFeedback');

    if (!termsCheck.checked) {
        feedbackElement.textContent = 'You must agree to the Terms and Conditions.';
        feedbackElement.classList.remove('valid');
        feedbackElement.classList.add('invalid');
        return false;
    } else {
        feedbackElement.textContent = '';
        feedbackElement.classList.remove('invalid');
        return true;
    }
};

const validateUsername = (usernameInput) => {
    const value = usernameInput.value.trim();

    if (value === '') {
        showError(usernameInput, 'Username is required.');
        return false;
    } else {
        showSuccess(usernameInput);
        return true;
    }
};

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const regPassword = document.getElementById('regPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const phone = document.getElementById('phone');
    const birthDate = document.getElementById('birthDate');
    const country = document.getElementById('country');
    const city = document.getElementById('city');

    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(regPassword);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword, regPassword);
    const isPhoneValid = validatePhone(phone);
    const isBirthDateValid = validateBirthDate(birthDate);
    const isGenderValid = validateGender();
    const isCountryValid = validateSelect(country, 'Please select a country');
    const isCityValid = validateSelect(city, 'Please select a city');
    const isTermsValid = validateTerms();

    if (
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isPhoneValid &&
        isBirthDateValid &&
        isGenderValid &&
        isCountryValid &&
        isCityValid &&
        isTermsValid
    ) {
        const formData = new FormData(registerForm);

        console.log('Form Data:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        document.getElementById('registerSuccess').style.display = 'block';

        registerForm.reset();

        const formControls = registerForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('valid', 'invalid');
        });

        const feedbacks = registerForm.querySelectorAll('.feedback');
        feedbacks.forEach(feedback => {
            feedback.textContent = '';
            feedback.classList.remove('valid', 'invalid');
        });

        citySelect.innerHTML = '<option value="">Select a city</option>';
        citySelect.disabled = true;

        setTimeout(() => {
            document.getElementById('registerSuccess').style.display = 'none';
        }, 3000);
    }
});


const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username');
    const loginPassword = document.getElementById('loginPassword');

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(loginPassword);

    if (isUsernameValid && isPasswordValid) {
        const formData = new FormData(loginForm);

        console.log('Login Form Data:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        document.getElementById('loginSuccess').style.display = 'block';

        loginForm.reset();

        const formControls = loginForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('valid', 'invalid');
        });

        const feedbacks = loginForm.querySelectorAll('.feedback');
        feedbacks.forEach(feedback => {
            feedback.textContent = '';
            feedback.classList.remove('valid', 'invalid');
        });

        setTimeout(() => {
            document.getElementById('loginSuccess').style.display = 'none';
        }, 3000);
    }
})

document.getElementById('firstName').addEventListener('blur', function() {
    validateName(this);
});

document.getElementById('lastName').addEventListener('blur', function() {
    validateName(this);
});

document.getElementById('email').addEventListener('blur', function() {
    validateEmail(this);
});

document.getElementById('regPassword').addEventListener('blur', function() {
    validatePassword(this);
});

document.getElementById('confirmPassword').addEventListener('blur', function() {
    validateConfirmPassword(this, document.getElementById('regPassword'));
});

document.getElementById('phone').addEventListener('blur', function() {
    validatePhone(this);
});

document.getElementById('birthDate').addEventListener('change', function() {
    validateBirthDate(this);
});

document.getElementById('city').addEventListener('change', function() {
    validateSelect(this, 'Please select a city.');
});

document.getElementById('username').addEventListener('blur', function() {
    validateUsername(this);
});

document.getElementById('loginPassword').addEventListener('blur', function() {
    validatePassword(this, document.getElementById('loginPassword'));
});

document.getElementById('phone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');

    if (!this.value.startsWith('+')) {
        if (value.startsWith('380')) {
            this.value = '+' + value;
        } else if (value.startsWith('80')) {
            this.value = '+3' + value;
        } else if (value.startsWith('0')) {
            this.value = '+38' + value;
        } else {
            this.value = '+380' + value;
        }
    }

    if (this.value.length > 13) {
        this.value = this.value.slice(0, 13);
    }
});
