function validateName(name) {
    const nameErrors = []
    if (!name) nameErrors.push('A name is required')
    if (name && !(/^[A-Za-z]+$/.test(name))) nameErrors.push('First name must contain only letters')
    if (name && !(/^.{3,}$/.test(name))) nameErrors.push('First name must be 3 characters long minimum')
    if (nameErrors.length > 0) return nameErrors
}

function validateLastName(lastName) {
    const lastNameErrors = []
    if (!lastName) lastNameErrors.push('A last name is required')
    if (lastName && !(/^[A-Za-z]+$/.test(lastName))) lastNameErrors.push('Last name must contain only letters')
    if (lastName && !(/^.{3,}$/.test(lastName))) lastNameErrors.push('Last name must be 3 characters long minimum')
    if (lastNameErrors.length > 0) return lastNameErrors
}


function validateEmail(email) {
    const emailErrors = []
    if (!email) emailErrors.push('A e-mail is required')
    if (email && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) emailErrors.push('This is not an e-mail')
    if (emailErrors.length > 0) return emailErrors
}

function validateMessage(message) {
    const messageErrors = []
    if (!message) return messageErrors.push('A message is required')
    if (!(/^.{10,}$/.test(message))) messageErrors.push('Message must be 10 characters long minimum')
    if (messageErrors.length > 0) return messageErrors
}

export function messageValidation(obj) {
    const errors = {}

    const nameErrors = validateName(obj.name)
    if (nameErrors) errors.name = nameErrors

    const lastNameErrors = validateLastName(obj.lastName)
    if (lastNameErrors) errors.lastName = lastNameErrors

    const emailErrors = validateEmail(obj.email)
    if (emailErrors) errors.email = emailErrors

    const messageErrors = validateMessage(obj.message)
    if (messageErrors) errors.message = messageErrors

    return errors
}

export const resetMessage = {
    name: '',
    lastName: '',
    email: '',
    message: '',
}