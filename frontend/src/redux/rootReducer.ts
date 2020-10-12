import { combineReducers } from 'redux';
import { albumsReducer } from '../containers/AlbumsMenu/logic/reducer';
import { authReducer } from '../containers/LoginPage/logic/reducer';
import { RootState } from '../typings/rootState';

const rootReducer = combineReducers<RootState>({
	auth: authReducer,
	albums: albumsReducer,
});

export default rootReducer;
