import React, { useState, useContext, memo, forwardRef } from 'react'
import cardBackBG from '../../../images/bg-card-back.png'
import { CardInformationContext } from '../../../context/CardInformationContext'
import { removeSpaces } from '../../../helpers'
import with3DRotation from '../../../hocs/with3DRotation'

import styles from './cardback.module.css'

const cardFrontStyle = {
    background: `url(${cardBackBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
}

const CardBack = forwardRef((props, ref) => {

    const { cardInformation: { cvc } } = useContext(CardInformationContext)

    const [cvcPlaceholder] = useState(Array(3).fill("*"))

    return (
        <div
            ref={ref}
            onMouseEnter={props.onMouseEnter || null}
            onMouseLeave={props.onMouseLeave || null}
            className={styles.card}
            style={cardFrontStyle}
            onMouseMove={props.onMouseMove || null}
        >
            <div className={styles.card__cvc}>
                {cvcPlaceholder.map((item, index) => (
                    <span key={index}>
                        {removeSpaces(cvc)[index] ? <span>{removeSpaces(cvc)[index]}</span> : <span style={{ opacity: '.5' }}>{item}</span>}
                    </span>
                ))}
            </div>
        </div>
    )
})

export default memo(with3DRotation(CardBack, { threshold: 5 }))