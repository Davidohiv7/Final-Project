//Borre los campos de name, email y lastname
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

function validateNeighborhood(neighborhood) {
    const neighborhoodErrors = []
    if(!neighborhood) neighborhoodErrors.push('A neighborhood is required')
    if(neighborhoodErrors.length > 0) return neighborhoodErrors
}

export function customerInformationValidation(obj) {
    const errors = {}

    const streetErrors = validateAddress(obj.street)
    if (streetErrors) errors.street = streetErrors

    const zipErrors = validateZip(obj.zip)
    if (zipErrors) errors.zip = zipErrors

    const cityErrors = validateCity(obj.city)
    if (cityErrors) errors.city = cityErrors
    
    return errors
}

export function addressValidation(obj) {
    const errors = {}

    const streetErrors = validateAddress(obj.street)
    if (streetErrors) errors.street = streetErrors

    const zipErrors = validateZip(obj.zip)
    if (zipErrors) errors.zip = zipErrors

    const cityErrors = validateCity(obj.city)
    if (cityErrors) errors.city = cityErrors

    const neighborhoodErrors = validateNeighborhood(obj.neighborhood)
    if (neighborhoodErrors) errors.neighborhood = neighborhoodErrors
    
    return errors
}

export const resetCustomerInformationInput = {
    street: '',
    neighborhood: '',
    city: '',
    zip: '',
}
