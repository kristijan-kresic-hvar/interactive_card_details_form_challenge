import React from 'react'
import styles from './header.module.css'
import headerBG from '../../images/bg-main-mobile.png'

import CardFront from '../Card/CardFront/CardFront'
import CardBack from '../Card/CardBack/CardBack'

const headerStyle = {
    background: `url(${headerBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
}

const Header = () => {
    return (
        <div className={styles.header} style={headerStyle}>
            <div className={styles.cardWrapper}>
                <CardFront />
                <CardBack />
            </div>
        </div>
    )
}

export default Header