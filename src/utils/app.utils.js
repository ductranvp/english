import lodashClone from "lodash/cloneDeep";
import dayjs from "dayjs";

export function formatDate(date, format) {
  return dayjs(date).format(format);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function arrayToObject(arr, key) {
  const object = {};
  arr.forEach(item => {
    object[item[key]] = item;
  });
  return object;
}

export function cloneDeep(payload) {
  return lodashClone(payload);
}

export function getLocalStorage(key, defaultResult = null) {
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
  return defaultResult;
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function reactive(source, target) {
  return Object.assign({}, source, target);
}

export function sortArray(array, sortField, sortDirection) {
  const isDesc = sortDirection === "DESC";
  return array.sort((a, b) => {
    if (a[sortField] < b[sortField]) return isDesc ? 1 : -1;
    if (a[sortField] > b[sortField]) return isDesc ? -1 : 1;
    return 0;
  });
}

export function generateUuid() {
  let dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
