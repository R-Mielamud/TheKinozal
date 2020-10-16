import { AlbumsState } from '../containers/AlbumsManagementPage/logic/state';
import { AuthState } from '../containers/LoginPage/logic/state';
import { VideosState } from '../containers/VideosManagementPage/logic/state';

export interface RootState {
	auth: AuthState;
	albums: AlbumsState;
	videos: VideosState;
}
