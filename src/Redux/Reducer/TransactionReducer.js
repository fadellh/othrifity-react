import { API_TRANSACTION_START, API_TRANSACTION_SUCCESS, API_TRANSACTION_FAILED, API_MANAGE_USER_FAILED, API_FETCH_ADDRESS_SUCCESS} from '../type'

const INITIAL_STATE = {
    dataCart : [],
    userAddress: [],
    loading : false
}

export const transactionReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case API_TRANSACTION_START: 
            return{
                ...state,
                loading: true
            }
        
        case API_TRANSACTION_SUCCESS: 
            return{
                ...state,
                loading: false,
                dataCart: action.payload
            }
        case API_FETCH_ADDRESS_SUCCESS: 
            return{
                ...state,
                loading: false,
                userAddress: action.payload
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