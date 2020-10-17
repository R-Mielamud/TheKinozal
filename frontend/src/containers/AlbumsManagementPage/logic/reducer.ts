import createReducer from '../../../helpers/createReducer';
import { initialState } from './state';
import * as actionTypes from './actionTypes';
import * as videosActionTypes from '../../VideosManagementPage/logic/actionTypes';

export const albumsReducer = createReducer(initialState, {
	[actionTypes.LOAD_ALBUMS_SUCCESS](state, action: actionTypes.LoadAlbumsSuccess) {
		return {
			...state,
			albums: action.albums,
			albumsLoaded: true,
		};
	},
	[actionTypes.CREATE_ALBUM](state) {
		return {
			...state,
			creatingAlbum: true,
		};
	},
	[actionTypes.CREATE_ALBUM_SUCCESS](state, action: actionTypes.CreateAlbumSuccess) {
		if (action.album) {
			return {
				...state,
				albums: [...state.albums, action.album],
				creatingAlbum: false,
			};
		}

		return {
			...state,
			creatingAlbum: false,
		};
	},
	[actionTypes.UPDATE_ALBUM](state) {
		return {
			...state,
			updatingAlbum: true,
		};
	},
	[actionTypes.UPDATE_ALBUM_SUCCESS](state, action: actionTypes.UpdateAlbumSuccess) {
		if (action.album) {
			const newAlbums: WebApi.Entity.Album[] = [...state.albums];
			const index = newAlbums.findIndex((album) => album.id === action.id);
			newAlbums[index] = action.album;

			return {
				...state,
				albums: newAlbums,
				updatingAlbum: false,
			};
		}

		return {
			...state,
			updatingAlbum: false,
		};
	},
	[actionTypes.DELETE_ALBUM_SUCCESS](state, action: actionTypes.DeleteAlbumSuccess) {
		const newAlbums: WebApi.Entity.Album[] = [...state.albums];
		const index = newAlbums.findIndex((album) => album.id === action.id);
		newAlbums.splice(index, 1);

		return {
			...state,
			albums: newAlbums,
		};
	},
	[videosActionTypes.CREATE_VIDEO_SUCCESS](state, action: videosActionTypes.CreateVideoSuccess) {
		if (action.video) {
			const newAlbums: WebApi.Entity.Album[] = [...state.albums];
			const index = newAlbums.findIndex((album) => album.id === action.video?.album);
			newAlbums[index].videos.push(action.video);

			return {
				...state,
				albums: newAlbums,
			};
		}

		return state;
	},
	[videosActionTypes.UPDATE_VIDEO_SUCCESS](state, action: videosActionTypes.UpdateVideoSuccess) {
		if (action.video) {
			const newAlbums: WebApi.Entity.Album[] = [...state.albums];
			const index = newAlbums.findIndex((album) => album.id === action.video?.album);
			const newVideos: WebApi.Entity.Video[] = newAlbums[index].videos;
			const videoIndex = newVideos.findIndex((video) => video.id === action.id);
			newVideos[videoIndex] = action.video;
			newAlbums[index].videos = newVideos;

			return {
				...state,
				albums: newAlbums,
			};
		}

		return state;
	},
	[videosActionTypes.DELETE_VIDEO_SUCCESS](state, action: videosActionTypes.DeleteVideoSuccess) {
		const newAlbums: WebApi.Entity.Album[] = [...state.albums];
		const index = newAlbums.findIndex((album) => album.id === action.albumId);
		const newVideos: WebApi.Entity.Video[] = newAlbums[index].videos;
		const videoIndex = newVideos.findIndex((video) => video.id === action.id);
		newVideos.splice(videoIndex);
		newAlbums[index].videos = newVideos;

		return {
			...state,
			albums: newAlbums,
		};
	},
});
