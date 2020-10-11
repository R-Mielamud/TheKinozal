import createAction from '../../../helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const login = createAction<actionTypes.Login>(actionTypes.LOGIN);
export const loadProfileSuccess = createAction<actionTypes.LoadProfileSuccess>(actionTypes.LOAD_PROFILE_SUCCESS);
