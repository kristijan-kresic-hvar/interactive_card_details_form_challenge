import React, { useState, createContext } from 'react'

const CardInformationContext = createContext()


function CardInformationContextProvider(props) {

    const [cardInformation, setCardInformation] = useState({
        cardholder: "",
        cardnumber: "",
        expdatemm: "",
        expdateyy: "",
        cvc: ""
    })

    return (
        <CardInformationContext.Provider
            value={{ cardInformation, setCardInformation }}
        >
            {props.children}
        </CardInformationContext.Provider>
    )
}

export { CardInformationContextProvider, CardInformationContext }