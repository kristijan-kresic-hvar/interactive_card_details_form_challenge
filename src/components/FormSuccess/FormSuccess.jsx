import React from 'react'
import iconSVG from '../../images/icon-complete.svg'

import styles from './formsuccess.module.css'

const FormSuccess = (props) => {
    return (
        <div className={styles.success}>
            <div className={styles.success__icon}>
                <img src={iconSVG} alt="success" />
            </div>
            <div className={styles.success__body}>
                <h2>{props.heading || "Thank you!"}</h2>
                <p>{props.subheading || "We’ve added your card details"}</p>
            </div>
            <button onClick={() => window.location.reload()} className={styles.success__submit}>Continue</button>
        </div>
    )
}

export default FormSuccess