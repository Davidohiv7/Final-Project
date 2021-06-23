
function validateDescription(description) {
    const descriptionErrors = []
    if(!description) descriptionErrors.push('A review description is required')
    if(description && !(/^.{20,}$/.test(description))) descriptionErrors.push('Review description must be 20 characters minimum')
    if(descriptionErrors.length > 0) return descriptionErrors
}

function validateScore(score) {
    const scoreErrors = []
    if(!score) scoreErrors.push('Please rate the product')
    if(scoreErrors.length > 0) return scoreErrors
}

export function reviewValidation(obj) {
    const errors = {}

    const descriptionErrors = validateDescription(obj.description)
    if (descriptionErrors) errors.description = descriptionErrors

    const scoreErrors = validateScore(obj.score)
    if (scoreErrors) errors.score = scoreErrors
    
    return errors
}