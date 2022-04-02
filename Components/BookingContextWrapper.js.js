import SelectAddressContext from "../contexts/SelectAddressContext.js.js";
import {useState} from "react";

function BookingContextWrapper({children}) {

    const [select, setSelect] = useState(null)
    const [origin, setOrigin] = useState(null)
    const [cargo, setCargo] = useState([])


    const values = {
        select, setSelect
        ,cargo, setCargo,origin, setOrigin
    }
    return (
        <SelectAddressContext.Provider value={values}>
            {children}

        </SelectAddressContext.Provider>
    )

}

export default BookingContextWrapper