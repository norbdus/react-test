class Auth {
    static authenticateToken(token) {
        if(token !== 'undefined'){
            sessionStorage.setItem('token', token);
        }
    }

    static isUserAuthenticated() {
        return (sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== 'undefined') ;
    }

    static deauthenticateToken() {
        sessionStorage.removeItem('token');
    }

    static getToken() {
        return sessionStorage.getItem('token');
    }
}

export default Auth;