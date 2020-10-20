interface Identified {
	id: number;
}

namespace WebApi.Entity {
	interface User extends Identified {
		email: string;
		password: string;
		user: number;
	}

	interface Video extends Identified {
		name: string;
		youtube_id: string;
		album: number;
	}

	interface Album extends Identified {
		name: string;
		videos: Video[];
		favorite: boolean;
	}
}

namespace WebApi.Specific {
	interface AuthResult {
		user: WebApi.Entity.User;
		jwt_token: string;
	}
}
