import React, { useState, useContext, useEffect, useRef } from 'react'
import { removeSpaces } from '../../helpers'
import { CardInformationContext } from '../../context/CardInformationContext'
import useValidation from '../../hooks/useValidation'


import FormSuccess from '../../components/FormSuccess/FormSuccess'

import styles from './form.module.css'

const Form = () => {

    const { cardInformation, setCardInformation } = useContext(CardInformationContext)
    const {
        isValidCardNumber,
        isValidMonth,
        isValidUsername,
        isValidYear,
        isEmpty,
        isNumber
    } = useValidation()

    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)
    const [formattedCardNumber, setFormattedCardNumber] = useState("")
    const [formattedCvc, setFormattedCvc] = useState("")

    const formRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        // check for empty fields
        for (const [key, value] of Object.entries(cardInformation)) {
            if (isEmpty(value)) {
                setErrors(prevState => ({
                    ...prevState,
                    [key + "Error"]: "Can't be blank"
                }))
            }
        }

        if (errors.cardholderError || isEmpty(cardInformation.cardholder) ||
            errors.cardnumberError || isEmpty(cardInformation.cardnumber) ||
            errors.expdateyyError || isEmpty(cardInformation.expdateyy) ||
            errors.expdatemmError || isEmpty(cardInformation.expdatemm) ||
            errors.cvcError || isEmpty(cardInformation.cvc)) {
            formRef?.current.classList.add("animateShake")

            return setTimeout(() => {
                formRef?.current.classList.remove("animateShake")
            }, 300)
        }

        setIsFormValid(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "cardnumber" && !isEmpty(value) && !isNumber(value)) return

        setCardInformation(({
            ...cardInformation,
            [name]: value
        }))

    }

    const handleBlur = (e) => {
        const { name, value } = e.target

        if (isEmpty(value.trim())) {
            setErrors(prevState => ({
                ...prevState,
                [name + "Error"]: "Can't be blank"
            }))
        }
    }

    // check for card holder errors
    useEffect(() => {
        if (cardInformation.cardholder.length > 0 && !isValidUsername(cardInformation.cardholder)) {
            setErrors(prevState => ({
                ...prevState,
                cardholderError: "Wrong format, letters only"
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                cardholderError: ""
            }))
        }
    }, [cardInformation.cardholder])

    // check for year input errors
    useEffect(() => {
        if ((cardInformation.expdateyy.length > 0 && !isValidYear(cardInformation.expdateyy))
            || (cardInformation.expdateyy.length > 0 && !isNumber(cardInformation.expdateyy))) {
            setErrors(prevState => ({
                ...prevState,
                expdateyyError: "Invalid year"
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                expdateyyError: ""
            }))
        }
    }, [cardInformation.expdateyy])

    // check for month input errors
    useEffect(() => {
        if ((cardInformation.expdatemm.length > 0 && !isValidMonth(cardInformation.expdatemm))
            || (cardInformation.expdatemm.length > 0 && !isNumber(cardInformation.expdatemm))) {
            setErrors(prevState => ({
                ...prevState,
                expdatemmError: "Invalid month"
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                expdatemmError: ""
            }))
        }
    }, [cardInformation.expdatemm])

    // check if credit card number is valid
    useEffect(() => {
        if (cardInformation.cardnumber.length > 0 && !isNumber(cardInformation.cardnumber)) {
            setErrors(prevState => ({
                ...prevState,
                cardnumberError: "Wrong format, numbers only"
            }))
        } else if (cardInformation.cardnumber.length > 0 && !isValidCardNumber(cardInformation.cardnumber)) {
            setErrors(prevState => ({
                ...prevState,
                cardnumberError: "Card number not valid"
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                cardnumberError: ""
            }))
        }
    }, [cardInformation.cardnumber])

    // check for cvc errors
    useEffect(() => {
        if (cardInformation.cvc.length > 0 && !isNumber(cardInformation.cvc)) {
            setErrors(prevState => ({
                ...prevState,
                cvcError: "Wrong format, numbers only"
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                cvcError: ""
            }))
        }
    }, [cardInformation.cvc])

    // format cardnumber
    useEffect(() => {
        const formattedCardNumber = cardInformation.cardnumber.split('').filter(item => item !== " ").map((number, index) => {


            if (index >= 16) return null

            if (index > 0 && index % 4 === 0) {
                return " " + number
            }

            return number
        })

        setFormattedCardNumber(formattedCardNumber.join(''))
    }, [cardInformation.cardnumber])

    // format cvc
    useEffect(() => {

        const formattedCvc = cardInformation.cvc.trim().split('').map((item, index) => {
            if (index > 2) return null

            return item
        })

        setFormattedCvc(formattedCvc.join(''))
    }, [cardInformation.cvc])

    return (
        <>
            {!isFormValid ?
                <div className={styles.form}>
                    <form ref={formRef} onSubmit={handleSubmit} method="post" action="">
                        <div className={styles.form__control}>
                            <label className={styles.form__label} htmlFor="cardholder">Cardholder Name</label>
                            <input onBlur={handleBlur} className={errors.cardholderError ? styles.form__input_error : null} value={cardInformation.cardholder} onChange={handleChange} id="cardholder" type="text" name="cardholder" placeholder="e.g. Jane Appleseed" />
                            {errors.cardholderError && <div className={styles.form__error_message}>{errors.cardholderError}</div>}
                        </div>
                        <div className={styles.form__control}>
                            <label className={styles.form__label} htmlFor="cardnumber">Card Number</label>
                            <input onBlur={handleBlur} className={errors.cardnumberError ? styles.form__input_error : null} value={formattedCardNumber} onChange={handleChange} id="cardnumber" type="text" name="cardnumber" maxLength="19" placeholder="e.g. 1234 5678 9123 0000" />
                            {errors.cardnumberError && <div className={styles.form__error_message}>{errors.cardnumberError}</div>}
                        </div>
                        <div className={styles.form__month_cvc}>
                            <div style={{ flex: 1.5, marginRight: '.8rem' }}>
                                <label className={styles.form__label} htmlFor="expdatemm">Exp. Date (MM/YY)</label>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 1, marginRight: ".5rem" }}>
                                        <input onBlur={handleBlur} value={Number(cardInformation.expdatemm) || ""} className={errors.expdatemmError ? styles.form__input_error : null} onChange={handleChange} style={{ flex: 1, marginRight: '.8rem' }} id="expdatemm" type="text" name="expdatemm" placeholder="MM" />
                                        {(errors.expdateyyError || errors.expdatemmError) && <div className={styles.form__error_message}>{errors.expdateyyError || errors.expdatemmError}</div>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <input onBlur={handleBlur} className={errors.expdateyyError ? styles.form__input_error : null} value={Number(cardInformation.expdateyy) || ""} onChange={handleChange} style={{ flex: 1, marginRight: '1.2rem' }} id="expdateyy" type="text" name="expdateyy" placeholder="YY" />
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 2 }}>
                                <label className={styles.form__label} htmlFor="cvc">CVC</label>
                                <input onBlur={handleBlur} value={formattedCvc} className={errors.cvcError ? styles.form__input_error : null} onChange={handleChange} id="cvc" type="text" name="cvc" placeholder="e.g. 123" />
                                {errors.cvcError && <div className={styles.form__error_message}>{errors.cvcError}</div>}
                            </div>
                        </div>
                        <button className={styles.form__submit}>Confirm</button>
                    </form>
                </div>
                : <FormSuccess />}
        </>
    )
}

export default Form