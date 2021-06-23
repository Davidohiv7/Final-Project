
//Validaciones
function validateName(name) {
    const nameErrors = []
    if(!name) nameErrors.push('A name is required')
    if(name && !(/^[A-Za-z]+$/.test(name))) nameErrors.push('First name must contain only letters')
    if(name && !(/^.{3,}$/.test(name))) nameErrors.push('First name must be 3 characters long minimum')
    if(nameErrors.length > 0) return nameErrors
}

function validateLastName(lastName) {
    const lastNameErrors = []
    if(!lastName) lastNameErrors.push('A last name is required')
    if(lastName && !(/^[A-Za-z]+$/.test(lastName))) lastNameErrors.push('Last name must contain only letters')
    if(lastName && !(/^.{3,}$/.test(lastName))) lastNameErrors.push('Last name must be 3 characters long minimum')
    if(lastNameErrors.length > 0) return lastNameErrors
}


function validateEmail(email) {
    const emailErrors = []
    if(!email) emailErrors.push('A e-mail is required')
    if(email && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) emailErrors.push('This is not an e-mail')
    if(emailErrors.length > 0) return emailErrors
}

function validatePassword(pasword, confirmPassword) {
    const passwordErrors = []
    if(!pasword) passwordErrors.push('A password is required')
    if(pasword && !(/^.{8,}$/.test(pasword))) passwordErrors.push('Password must be 8 characters long minimum')
    if(pasword && !(/\d/.test(pasword))) passwordErrors.push('Password must contain at least one number')
    if(pasword && !(/[A-Z]/.test(pasword))) passwordErrors.push('Password must contain at least an upper case')
    if(pasword && (pasword !== confirmPassword)) passwordErrors.push('Passwords are different')
    if(passwordErrors.length > 0) return passwordErrors
}

function validateEmailSignIn(email) {
    const emailErrors = []
    if(!email) emailErrors.push('A e-mail is required')
    if(emailErrors.length > 0) return emailErrors
}

function validatePasswordSignIn(pasword) {
    const passwordErrors = []
    if(!pasword) passwordErrors.push('A password is required')
    if(passwordErrors.length > 0) return passwordErrors
}


export function signUpValidation(obj) {
    const errors = {}

    const nameErrors = validateName(obj.name)
    if (nameErrors) errors.name = nameErrors

    const lastNameErrors = validateLastName(obj.lastName)
    if (lastNameErrors) errors.lastName = lastNameErrors

    const emailErrors = validateEmail(obj.email)
    if (emailErrors) errors.email = emailErrors

    const passwordErrors = validatePassword(obj.password, obj.confirmPassword)
    if (passwordErrors) errors.password = passwordErrors
    
    return errors
}

export const resetSignUpInput = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export function signInValidation(obj) {
    const errors = {}

    const emailErrors = validateEmailSignIn(obj.email)
    if (emailErrors) errors.email = emailErrors

    const passwordErrors = validatePasswordSignIn(obj.password)
    if (passwordErrors) errors.password = passwordErrors
    
    return errors
}

export const resetSignInInput = {
    email: '',
    password: '',
}
