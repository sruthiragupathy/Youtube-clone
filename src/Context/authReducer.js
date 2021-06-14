export const authReducer = (auth, { type, payload, value }) => {
	switch (type) {
		case 'SET_TOKEN':
			return { ...auth, token: payload };
		case 'SET_CURRENTUSER':
			return { ...auth, currentUser: payload };
		case 'SET_LOADING':
			return { ...auth, loading: !auth.loading };
		case 'RESET_USER':
			return { ...auth, token: '', currentUser: '' };
		default:
			return auth;
	}
};
