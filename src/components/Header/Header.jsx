import React from 'react'
import styles from './header.module.css'
import headerBG from '../../images/bg-main-mobile.png'

import CardFront from '../Card/CardFront/CardFront'
import CardBack from '../Card/CardBack/CardBack'
import useClientWidth from '../../hooks/useClientWidth'

const headerStyle = {
    background: `url(${headerBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
}

const Header = () => {

    const clientWidth = useClientWidth()

    console.log("render")

    return (
        <div className={styles.header} style={headerStyle}>
            <div className={styles.cardWrapper}>
                <CardFront clientWidth={clientWidth} />
                <CardBack clientWidth={clientWidth} />
            </div>
        </div>
    )
}

export default Header