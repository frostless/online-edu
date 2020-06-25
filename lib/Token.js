const _token  = 'token';
class Token {
  /**
   * Returns a authorisation token
   *
   * @return {string} token to insert in the reqeust header
   */
  static getToken() {
    return localStorage.getItem(_token);
  }

  /**
   * * @param {string} value the token value
   *
   * @save token
   */
  static saveToken(value) {
    return localStorage.setItem(_token, value);
  }

  /**
   * * @delete token
   */
  static deleteToken() {
    return localStorage.removeItem(_token);
  }
}

export default Token;
