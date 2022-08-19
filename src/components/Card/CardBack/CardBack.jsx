import React, { useState, useContext, memo, forwardRef } from 'react'
import cardBackBG from '../../../images/bg-card-back.png'
import { CardInformationContext } from '../../../context/CardInformationContext'
import { removeSpaces } from '../../../helpers'
import with3DRotation from '../../../hocs/with3DRotation'
import useValidation from '../../../hooks/useValidation'

import styles from './cardback.module.css'

const cardFrontStyle = {
    background: `url(${cardBackBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
}

const CardBack = forwardRef((props, ref) => {

    const { cardInformation: { cvc } } = useContext(CardInformationContext)
    const { isNumber } = useValidation()

    const [cvcPlaceholder] = useState(Array(3).fill("*"))

    return (
        <div
            ref={ref}
            onMouseEnter={(props.clientWidth >= 1200) ? props.onMouseEnter : null}
            onMouseLeave={(props.clientWidth >= 1200) ? props.onMouseLeave : null}
            className={styles.card}
            style={cardFrontStyle}
            onMouseMove={(props.clientWidth >= 1200) ? props.onMouseMove : null}
        >
            <div className={styles.card__cvc}>
                {cvcPlaceholder.map((item, index) => (
                    <span key={index}>
                        {(removeSpaces(cvc)[index] && isNumber(removeSpaces(cvc)[index])) ? <span>{removeSpaces(cvc)[index]}</span> : <span style={{ opacity: '.5' }}>{item}</span>}
                    </span>
                ))}
            </div>
        </div>
    )
})

export default memo(with3DRotation(CardBack, { threshold: 5 }))