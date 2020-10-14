import { combineReducers } from 'redux';
import { albumsReducer } from '../containers/AlbumsManagementPage/logic/reducer';
import { authReducer } from '../containers/LoginPage/logic/reducer';
import { videosReducer } from '../containers/VideosManagementPage/logic/reducer';
import { RootState } from '../typings/rootState';

const rootReducer = combineReducers<RootState>({
	auth: authReducer,
	albums: albumsReducer,
	videos: videosReducer,
});

export default rootReducer;
