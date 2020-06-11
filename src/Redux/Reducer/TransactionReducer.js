import { API_TRANSACTION_START,API_ADD_IMG_SUCCESS, API_TRANSACTION_SUCCESS, API_TRANSACTION_FAILED, API_MANAGE_USER_FAILED, API_FETCH_ADDRESS_SUCCESS,API_ADD_PAYMENT_SUCCESS, API_FETCH_WAITING} from '../type'

const INITIAL_STATE = {
    dataCart : [],
    userAddress: [],
    userTrans:[],
    loading : false,
    shopDate:'',
    waitingPay:''
}

export const transactionReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case API_TRANSACTION_START: 
            return{
                ...state,
                loading: true
            }
        
        case API_TRANSACTION_SUCCESS: 
        console.log(action.payload,"INI REDUCER UNTUK CART")
            return{
                ...state,
                loading: false,
                dataCart: action.payload
            }
        case API_ADD_IMG_SUCCESS: 
            return{
                ...state,
                loading: false,
            }
        case API_FETCH_ADDRESS_SUCCESS: 
        console.log(action.payload,"INI REDUCER UNTUK ADRESSS")
            return{
                ...state,
                loading: false,
                userAddress: action.payload
                
            }
        case API_ADD_PAYMENT_SUCCESS: 
            return{
                ...state,
                loading: false,
            }
        case API_FETCH_WAITING: 
            return{
                ...state,
                loading: false,
                waitingPay:action.payload
            }
        
        case API_MANAGE_USER_FAILED: 
            return{
                ...state,
                loading: false
            }    
    default: 
    return state
    }
}