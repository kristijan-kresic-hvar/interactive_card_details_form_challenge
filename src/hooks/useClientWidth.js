import { useState, useEffect } from 'react'

const useClientWidth = () => {

    const [clientWidth, setClientWidth] = useState(window.innerWidth)

    const handleResize = () => {
        setClientWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        // cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return clientWidth

}

export default useClientWidth