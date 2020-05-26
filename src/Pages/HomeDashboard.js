import React, { useState } from 'react'
import { DropdownToggle, Button } from 'reactstrap'

function HomeDashboard() {
    const [total, setTotal] = useState([0])
    console.log(total)
    const handleTotal = (total) => {
        // setTotal(total => total.concat(5))
        setTotal(total => [...total,5])
    }

    return (
        <div>
            <Button onClick={()=> handleTotal(total)}>
                Nambah 1 value                
            </Button>
        </div>
    )
}

export default HomeDashboard
