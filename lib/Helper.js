import moment from 'moment';

class Helper {
  /**
   * * @param {string} date the input date string
   *
   * @return {string} output date string in yyyy-mm-dd format
   */
  static formatDate(date, format="YYYY-MM-DD") {
    if (!date) return;
    const d = new Date(date);
    return moment.utc(d).format(format);    
  }

  /**
   * * @param {string} date the input date string
   *
   * @return {date} output date int
   */
  static getDate(date) {
    if (!date) return;
    const d = new Date(date);
    return d.getDate();
  }

  /**
   * * @param {object} antd table pagination object
   *
   * @return {object} query object ready to pass to API
   */
  static paginationToUrlObject(pagination) {
    let { current, pageSize } = pagination;
    return {"page": --current, "pagesize": pageSize};
  }
}

export default Helper;
