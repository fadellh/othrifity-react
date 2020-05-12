import { combineReducers } from 'redux';
import { manageUserReducer } from './ManageUserReducer';


export default combineReducers({
    listUser: manageUserReducer
});