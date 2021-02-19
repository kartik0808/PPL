

module.exports = {

  convertDate:function(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  },

  convertTime:function(str) {
    var date = new Date(str),
      hours = ("0" + (date.getHours())).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2);
    return [hours, minutes].join(":");
  }

}