export const authReducer = (auth, { type, payload, value }) => {
	switch (type) {
		case 'SET_ISLOGGEDIN':
			return { ...auth, isLoggedIn: payload };
		case 'SET_CURRENTUSER':
			return { ...auth, currentUser: payload };
		case 'SET_LOADING':
			return { ...auth, loading: !auth.loading };
		case 'SET_USER':
			return { ...auth, user: { _id: payload } };
		case 'RESET_USER':
			return { ...auth, user: {}, currentUser: '' };
		default:
			return auth;
	}
};
