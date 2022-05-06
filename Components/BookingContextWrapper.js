import SelectAddressContext from "../contexts/SelectAddressContext.js"
import { useState } from "react";

function BookingContextWrapper({ children }) {

    const [select, setSelect] = useState(null)
    const [origin, setOrigin] = useState(null)
    const [transportation, setTransportation] = useState(null)
    const [cargo, setCargo] = useState([])


    const values = {
        select, setSelect
        , cargo, setCargo, origin, setOrigin, transportation, setTransportation
    }
    return (
        <SelectAddressContext.Provider value={values}>
            {children}

        </SelectAddressContext.Provider>
    )

}

export default BookingContextWrapper