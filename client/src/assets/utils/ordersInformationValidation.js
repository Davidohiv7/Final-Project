function validateName(name) {
    const nameErrors = []
    if(!name) nameErrors.push('A name is required')
    if(name && !(/^[A-Za-z]+$/.test(name))) nameErrors.push('First name must contain only letters')
    if(nameErrors.length > 0) return nameErrors
}

function validateLastName(lastName) {
    const lastNameErrors = []
    if(!lastName) lastNameErrors.push('A last name is required')
    if(lastName && !(/^[A-Za-z]+$/.test(lastName))) lastNameErrors.push('Last name must contain only letters')
    if(lastNameErrors.length > 0) return lastNameErrors
}

function validateEmail(email) {
    const emailErrors = []
    if(!email) emailErrors.push('An e-mail is required')
    if(email && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) emailErrors.push('This is not an e-mail')
    if(emailErrors.length > 0) return emailErrors
}

function validateAddress(address) {
    const addressErrors = []
    if(!address) addressErrors.push('An address is required')
    if(address && !(/^[A-Za-z0-9'.-\s,]/.test(address))) addressErrors.push('Address must include only letters and numbers')
    if(addressErrors.length > 0) return addressErrors
}

function validateZip(zip) {
    const zipErrors = []
    if(!zip) zipErrors.push('A postal code is required')
    if(zip && !(/^[0-9]{5}(?:-[0-9]{4})?$/.test(zip))) zipErrors.push('Postal code must have only 4 or 5 numbers')
    if(zipErrors.length > 0) return zipErrors
}

function validateCity(city) {
    const cityErrors = []
    if(!city) cityErrors.push('A city is required')
    if(cityErrors.length > 0) return cityErrors
}

export function customerInformationValidation(obj) {
    const errors = {}

    const nameErrors = validateName(obj.name)
    if (nameErrors) errors.name = nameErrors

    const lastNameErrors = validateLastName(obj.lastName)
    if (lastNameErrors) errors.lastName = lastNameErrors

    const emailErrors = validateEmail(obj.email)
    if (emailErrors) errors.email = emailErrors

    const streetErrors = validateAddress(obj.street)
    if (streetErrors) errors.street = streetErrors

    const zipErrors = validateZip(obj.zip)
    if (zipErrors) errors.zip = zipErrors

    const cityErrors = validateCity(obj.city)
    if (cityErrors) errors.city = cityErrors
    
    return errors
}

export const resetCustomerInformationInput = {
    name: '',
    lastName: '',
    email: '',
    street: '',
    neighborhood: '',
    city: '',
    zip: '',
}
