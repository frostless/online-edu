class Helper {
  /**
   * * @param {string} date the input date string
   *
   * @return {string} output date string in yyyy-mm-dd format
   */
  static formatDate(date) {
    if (!date) return;
    let d = new Date(date);
    return d.toISOString().slice(0, 10).replace("/'", "-");
  }

  /**
   * * @param {string} date the input date string
   *
   * @return {date} output date int
   */
  static getDate(date) {
    if (!date) return;
    const d = new Date();
    return d.getDate();
  }

  /**
   * * @param {object} antd table pagination object
   *
   * @return {string} pager query string
   */
  static makeQuery(pagination) {
    let { current, pageSize } = pagination;
    return `?page=${--current}&pagesize=${pageSize}`;
  }
}

export default Helper;
