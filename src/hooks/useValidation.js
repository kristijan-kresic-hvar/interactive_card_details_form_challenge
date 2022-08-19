import validator from 'validator'
import { removeSpaces } from '../helpers/'

function useValidation() {

    const isValidCardNumber = (str) => {

        if (!str) return false

        return validator.isCreditCard(removeSpaces(str)) && removeSpaces(str).length === 16 ? true : false
    }

    const isValidMonth = (str) => {

        if (!str) return false

        if (!isNumber(str)) return false

        return Number(str) > 12 || Number(str) < 0 || Number(str) === 0 ? false : true
    }

    const isValidUsername = (str) => {

        if (!str) return false

        return validator.isAlpha(str, "en-US", { ignore: ' -' })
    }

    const isValidYear = (str) => {

        if (!str) return false

        if (!isNumber(str)) return false

        return Number(str) < Number(new Date().getFullYear().toString().slice(-2)) || Number(str) >= 100 ? false : true
    }

    const isEmpty = (str) => {
        return validator.isEmpty(str)
    }

    const isNumber = (str) => {

        if (!str) return false

        return validator.isNumeric(str.replace(/ /g, ''))
    }

    return {
        isValidCardNumber,
        isValidMonth,
        isValidUsername,
        isValidYear,
        isEmpty,
        isNumber
    }
}

export default useValidation