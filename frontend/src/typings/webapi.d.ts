interface Identified {
	id: number;
}

namespace WebApi.Entity {
	interface User extends Identified {
		email: string;
		password: string;
	}

	interface Video extends Identified {
		name: string;
		youtube_id: string;
	}

	interface Album extends Identified {
		name: string;
		videos: Video[];
	}
}

namespace WebApi.Specific {
	interface AuthResult {
		user: WebApi.Entity.User;
		jwt_token: string;
	}
}
