import { combineReducers } from 'redux';
import { manageUserReducer } from './ManageUserReducer';
import { transactionReducer } from './TransactionReducer';


export default combineReducers({
    listUser: manageUserReducer,
    dataTrans: transactionReducer
});