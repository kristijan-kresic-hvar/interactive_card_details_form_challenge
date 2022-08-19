import React, { useContext, useState, memo, forwardRef } from 'react'
import cardFrontBG from '../../../images/bg-card-front.png'
import logoSVG from '../../../images/card-logo.svg'
import { removeSpaces } from '../../../helpers'
import useValidation from '../../../hooks/useValidation'
import with3DRotation from '../../../hocs/with3DRotation'

import { CardInformationContext } from '../../../context/CardInformationContext'

import styles from './cardfront.module.css'

const cardFrontStyle = {
    background: `url(${cardFrontBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
}

const CardFront = forwardRef((props, ref) => {

    const { cardInformation } = useContext(CardInformationContext)
    const { isValidUsername, isValidMonth, isValidYear, isNumber } = useValidation()

    const [cardNumberPlaceholder] = useState(Array(16).fill("*"))

    // card number formatting code
    // const cardNumber = cardInformation.cardnumber.trim().split('').filter(item => item !== " ").map((number, index) => {

    //     if (index >= 16) return false

    //     if (index > 0 && index % 4 === 0) {
    //         return " " + number
    //     }

    //     return number
    // })

    const formatMonth = (str) => {
        if (!str) return false

        let month = Number(str)

        return month < 10 ? "0" + month : month
    }

    return (
        <div
            ref={ref}
            className={styles.card}
            style={cardFrontStyle}
            onMouseEnter={(props.clientWidth >= 1200) ? props.onMouseEnter : null}
            onMouseLeave={(props.clientWidth >= 1200) ? props.onMouseLeave : null}
            onMouseMove={(props.clientWidth >= 1200) ? props.onMouseMove : null}
        >
            <div className={styles.card__logo}>
                <img src={logoSVG} alt="card logo" />
            </div>
            <div className={styles.card__number}>
                <span style={{ letterSpacing: '5px' }}>
                    {cardNumberPlaceholder.map((item, index) => (
                        <span key={index}>
                            {(index > 0 && index % 4 === 0)
                                ?
                                (removeSpaces(cardInformation.cardnumber)[index] && isNumber(removeSpaces(cardInformation.cardnumber)[index])) ?
                                    <span> {removeSpaces(cardInformation.cardnumber)[index]}</span> :
                                    <span style={{ opacity: '.5' }}> {removeSpaces(cardInformation.cardnumber)[index] || item}</span>
                                :
                                (removeSpaces(cardInformation.cardnumber)[index] && isNumber(removeSpaces(cardInformation.cardnumber)[index])) ?
                                    <span>{removeSpaces(cardInformation.cardnumber)[index]}</span> :
                                    <span style={{ opacity: '.5' }}>{item}</span>
                            }
                        </span>
                    ))}
                </span>
            </div>
            <div className={styles.card__footer}>
                <p>{(isValidUsername(cardInformation.cardholder) && cardInformation.cardholder) || "John Doe"}</p>
                <p>
                    {(isValidMonth(cardInformation.expdatemm) && formatMonth(cardInformation.expdatemm)) || "**"}/
                    {(isValidYear(cardInformation.expdateyy) && cardInformation.expdateyy) || "**"}
                </p>
            </div>
        </div>
    )
})

export default memo(with3DRotation(CardFront, { threshold: 5 }))