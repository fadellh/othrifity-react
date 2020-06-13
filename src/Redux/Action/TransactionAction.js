import Axios from 'axios'
import { API_TRANSACTION_START, API_TRANSACTION_SUCCESS, API_TRANSACTION_FAILED, API_FETCH_ADDRESS_SUCCESS,API_ADD_PAYMENT_SUCCESS, API_ADD_IMG_SUCCESS, API_FETCH_WAITING } from '../type'
import { API_URL } from '../../Support/API_URL'



export const fetchTransaction = (userId) => {
    return async (dispatch) => {
        dispatch({
            type: API_TRANSACTION_START
        })
        try{
            let res = await Axios.get(`${API_URL}/transaction/getUserCart/${userId}`)
            console.log(res.data,"INI ACTION DATA CART")
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
            console.log(res.data,"INI ACTION USER ADDRESS")
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

export const addPayment = (shopDate,totalTagihan,donasi,totalOngkir,serviceFee,totalBelanja,userId) => {
    return async dispatch => {
        dispatch({
            type:API_TRANSACTION_START
        })
        try{
            let query = `shopDate='${shopDate}'&totalTagihan=${totalTagihan}&donasi=${donasi}&totalOngkir=${totalOngkir}&serviceFee=${serviceFee}&totalBelanja=${totalBelanja}`
            let res = await Axios.post(`${API_URL}/transaction/add-payment/${userId}?${query}`)
            dispatch({
                type:API_ADD_PAYMENT_SUCCESS,
            })
        }catch(err){
            dispatch({
                type: API_TRANSACTION_FAILED
            })
        }
    }
}

export const addImage = (id,reSubmit,formData) => {
    return async dispatch => {
        dispatch({
            type:API_TRANSACTION_START
        })
        try{
            let headers = {
                headers : {
                    // 'Authorization' : `Bearer ${token}`,
                    'Content-Type' :  'multipart/form-data'
                }
            }
            let res = await Axios.post(`${API_URL}/transaction/add-image/${id}?reSubmit=${reSubmit}`,formData,headers)
            dispatch({
                type: API_ADD_IMG_SUCCESS,
            }) 
        }catch(err){
            dispatch({
                type: API_TRANSACTION_FAILED
            })
        }
    }
} 

export const getWaitingPayment = (userId) => {
    return async dispatch => {
        dispatch({
            type:API_TRANSACTION_START
        })
        try{
            let res = await Axios.get(`${API_URL}/transaction/get-wait-pay/${userId}`)
            console.log(res.data)
            dispatch({
                type: API_FETCH_WAITING,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: API_TRANSACTION_FAILED
            })
        }    
    } 
}
export const updatePaymentStatus = (status,id) => {
    return async dispatch => {
        dispatch({
            type:API_TRANSACTION_START
        })
        try{
            let res = await Axios.post(`${API_URL}/transaction/update-status/${status}/${id}`)
            console.log(res.data)
            dispatch({
                type: API_TRANSACTION_SUCCESS,
            })
        }catch(err){
            dispatch({
                type: API_TRANSACTION_FAILED
            })
        }    
    } 
}

