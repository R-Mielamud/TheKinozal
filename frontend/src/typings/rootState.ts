import { AlbumsState } from '../containers/AlbumsMenu/logic/state';
import { AuthState } from '../containers/LoginPage/logic/state';

export interface RootState {
	auth: AuthState;
	albums: AlbumsState;
}
