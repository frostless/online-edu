import LoginTypes from "../components/types/logintypes"

const _token  = 'token';
const _loginType  = 'loginType';
const _menus = "menus"

class User {
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

  /**
   * * @delete loginType
   */
  static deleteLoginType() {
    return localStorage.removeItem(_loginType);
  }

  /**
   * Returns a loginType
   *
   * @return {string} loginType to help render the UI
   */
  static getLoginType() {
    return localStorage.getItem(_loginType);
  }

  /**
   * * @param {string} value the loginType value
   *
   * @save token
   */
  static saveLoginType(value) {
    return localStorage.setItem(_loginType, LoginTypes[value]);
  }

  /**
   * * @param {string} value the permitted menus array
   *
   * @save menus
   */
  static savePermittedMenus(params) {
    return localStorage.setItem(_menus, JSON.stringify(params));
  }

  /**
   * Returns a permitted menus array
   *
   * @return {array} permitted menus array
   */
  static getPermittedMenus() {
    return JSON.parse(localStorage.getItem(_menus));
  }

  /**
   * * @delete permitted menus
   */
  static deletePermittedMenus() {
    return localStorage.removeItem(_menus);
  }
}

export default User;