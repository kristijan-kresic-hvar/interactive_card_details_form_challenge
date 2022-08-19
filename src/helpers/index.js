const removeSpaces = (str) => {
    if (!str) return false
    return str.replace(/\s/g, '')
}

export {
    removeSpaces
}