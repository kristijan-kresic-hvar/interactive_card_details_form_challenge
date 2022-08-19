import React, { useState, useRef } from 'react'

const with3DRotation = (component, options = {}) => {

    return function (props) {

        const [isInsideElement, setIsInsideElement] = useState(false)

        const C = component
        const THRESHOLD = options.threshold || 15;
        const elementRef = useRef(null)

        const handleMouseEnter = (e) => {

            setIsInsideElement(true)

            const { clientX, clientY, currentTarget } = e;
            const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

            const horizontal = (clientX - offsetLeft) / clientWidth;
            const vertical = (clientY - offsetTop) / clientHeight;

            const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
            const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

            elementRef.current.style.transform =
                `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
        }

        const resetPosition = (e) => {
            elementRef.current.style.transform =
                `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
        }

        return <C
            ref={elementRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={(e) => { setIsInsideElement(false); resetPosition(e) }}
            onMouseMove={isInsideElement ? handleMouseEnter : null}
            {...props}
        />
    }
}

export default with3DRotation