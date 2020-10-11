import { combineReducers } from 'redux';
import { authReducer } from '../containers/LoginPage/logic/reducer';

const rootReducer = combineReducers({
	auth: authReducer,
});

export default rootReducer;
