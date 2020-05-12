import { 
    API_MANAGE_USER_START,
    API_MANAGE_USER_SUCCESS,
    API_MANAGE_USER_FAILED,
    API_FETCH_SUCCESS
} from '../type'

const INITIAL_STATE = {
    dataList : [],
    loading : false
}

export const manageUserReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case API_MANAGE_USER_START : 
            return{
                ...state,
                loading: true
            }
        case API_MANAGE_USER_SUCCESS:
            return{
                ...state,
                loading: false
            }
        case API_MANAGE_USER_FAILED:
            return{
                ...state,
                loading: false
            }
        case API_FETCH_SUCCESS:
            return{
                ...state,
                dataList: action.payload
            }
            default : 
            return state
    }

}