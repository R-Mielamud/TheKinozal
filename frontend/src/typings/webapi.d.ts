interface Identified {
	id: number;
}

namespace WebApi.Entity {
	interface User extends Identified {
		email: string;
		password: string;
	}
}

namespace WebApi.Specific {
	interface AuthResult {
		user: WebApi.Entity.User;
		jwt_token: string;
	}
}
