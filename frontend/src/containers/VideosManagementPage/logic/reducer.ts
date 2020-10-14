import createReducer from '../../../helpers/createReducer';
import * as actionTypes from './actionTypes';
import { initialState } from './state';

export const videosReducer = createReducer(initialState, {
	[actionTypes.CREATE_VIDEO](state) {
		return {
			...state,
			creatingVideo: true,
		};
	},
	[actionTypes.CREATE_VIDEO_SUCCESS](state) {
		return {
			...state,
			creatingVideo: false,
		};
	},
	[actionTypes.UPDATE_VIDEO](state) {
		return {
			...state,
			updatingVideo: true,
		};
	},
	[actionTypes.UPDATE_VIDEO_SUCCESS](state) {
		return {
			...state,
			updatingVideo: false,
		};
	},
});
