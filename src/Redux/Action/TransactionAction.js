import Axios from 'axios'
import { API_TRANSACTION_START, API_TRANSACTION_SUCCESS, API_TRANSACTION_FAILED, API_FETCH_ADDRESS_SUCCESS } from '../type'
import { API_URL } from '../../Support/API_URL'



export const fetchTransaction = (userId) => {
    return async (dispatch) => {
        dispatch({
            type: API_TRANSACTION_START
        })
        try{
            let res = await Axios.get(`${API_URL}/transaction/getUserCart/${userId}`)
            console.log(res.data)
            dispatch({
                type: API_TRANSACTION_SUCCESS,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: API_TRANSACTION_FAILED
            })
        }
    }
}
export const fetchUserAddress = (userId) => {
    return async (dispatch) => {
        dispatch({
            type: API_TRANSACTION_START
        })
        try{
            let res = await Axios.get(`${API_URL}/transaction/getUserAddress/${userId}`)
            console.log(res.data)
            dispatch({
                type: API_FETCH_ADDRESS_SUCCESS,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: API_TRANSACTION_FAILED
            })
        }
    }
}

