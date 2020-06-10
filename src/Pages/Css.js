import React, { useEffect } from 'react'
import styled from 'styled-components'
import { render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransaction } from '../Redux/Action'

function Css() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTransaction(1))
    }, [dispatch])
    
    const {dataCart} = useSelector(state=>state.dataTrans)
    console.log(dataCart)
    return (
        <div>
            Ini CSS
        </div>
    )
}

export default Css
