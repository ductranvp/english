import dayjs from "dayjs";

const filters = {
  uppercase(value) {
    if (value) return value.toUpperCase();
    return value;
  },

  lowercase(value) {
    if (value) return value.toLowerCase();
    return value;
  },

  capitalizeFirst(value) {
    if (value) {
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  },

  truncate(value, length) {
    if (value && value.length > length) return value.substr(0, length) + "...";
    return value;
  },

  firstName(value) {
    if (value) {
      let arr = value.split(" ");
      return arr[arr.length - 1];
    }
    return value;
  },

  format(value, format) {
    return dayjs(value).format(format);
  },

  fromNow(value) {
    return dayjs(value).fromNow();
  }
};
export default filters;
