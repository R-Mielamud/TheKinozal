export interface VideosState {
	creatingVideo: boolean;
	updatingVideo: boolean;
}

export const initialState: VideosState = {
	creatingVideo: false,
	updatingVideo: false,
};
