class Helper {
  /**
   * * @param {string} date the input date string
   *
   * @return {string} output date string in yyyy-mm-dd format
   */
  static formatDate(date) {
      if (!date) return;
      let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}

export default Helper;
