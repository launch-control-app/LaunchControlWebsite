/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Model Class that defines a user
 */
// https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
class User {
  static authenticate(token) {
    localStorage.setItem('token', token);
  }

  static isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticate() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default User;