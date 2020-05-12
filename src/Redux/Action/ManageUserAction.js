import {
     API_MANAGE_USER_START,
     API_MANAGE_USER_SUCCESS,
     API_MANAGE_USER_FAILED,
     API_FETCH_SUCCESS
} from '../type'
import Axios from 'axios'
import {API_URL} from '../../Support/API_URL'

export const fetchListUser = () => {
    return async (dispatch) => {
        dispatch({
            type: API_MANAGE_USER_START
        })
        try{
           let res = await Axios.get(`${API_URL}/manage-user/getAllUsers`) 
           console.log(res.data)
            dispatch({
                type: API_FETCH_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: API_MANAGE_USER_SUCCESS
            })
        }catch(err){
            dispatch({
                type: API_MANAGE_USER_FAILED
            })
        }
    }
}

export const updateUser = (id,userId) => {
    return async (dispatch) => {
        dispatch({
            type: API_MANAGE_USER_START
        })
        try{
            await Axios.patch(`${API_URL}/manage-user/update-status/${id}/${userId}`)
            dispatch({
                type: API_MANAGE_USER_SUCCESS
            })
        }catch(err){
            dispatch({
                type: API_MANAGE_USER_FAILED
            })
        }
    }
}

export const deleteUser = (id) => {
    return async (dispatch) => {
        dispatch({
            type: API_MANAGE_USER_START
        })
        try{
            await Axios.delete(`${API_URL}/manage-user/delete-user/${id}`)
            dispatch({
                type: API_MANAGE_USER_SUCCESS
            })
        }catch(err){
            dispatch({
                type: API_MANAGE_USER_FAILED
            })
        }

    }
}