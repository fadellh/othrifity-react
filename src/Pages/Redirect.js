import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'

function RedirectComponent() {
    const [loading,setLoading] = useState(true)

    return (
        <div>
           <Redirect to='/thanks' /> 
        </div>
    )
}

export default RedirectComponent
