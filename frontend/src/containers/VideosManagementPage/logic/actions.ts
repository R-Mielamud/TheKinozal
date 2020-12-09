import createAction from '../../../helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const createVideo = createAction<actionTypes.CreateVideo>(actionTypes.CREATE_VIDEO);
export const createVideoFile = createAction<actionTypes.CreateVideoFile>(actionTypes.CREATE_VIDEO_FILE);
export const createVideoSuccess = createAction<actionTypes.CreateVideoSuccess>(actionTypes.CREATE_VIDEO_SUCCESS);
export const updateVideo = createAction<actionTypes.UpdateVideo>(actionTypes.UPDATE_VIDEO);
export const updateVideoFile = createAction<actionTypes.UpdateVideoFile>(actionTypes.UPDATE_VIDEO_FILE);
export const updateVideoSuccess = createAction<actionTypes.UpdateVideoSuccess>(actionTypes.UPDATE_VIDEO_SUCCESS);
export const deleteVideo = createAction<actionTypes.DeleteVideo>(actionTypes.DELETE_VIDEO);
export const deleteVideoSuccess = createAction<actionTypes.DeleteVideoSuccess>(actionTypes.DELETE_VIDEO_SUCCESS);
