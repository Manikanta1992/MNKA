export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.auth_token) {
        return { 'x-access-token': user.auth_token,'Content-Type': 'application/json;charset=utf-8' };
    } else {
        return {};
    }
}