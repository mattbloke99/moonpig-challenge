export function isEmpty(val) {
    return (val == undefined || val == null || val.length <= 0) ? true : false;
};

export function truncate(string, length) {
  if (isEmpty(string)) {
    return '';
  }
  if (string.length > length) {
    return string.substring(0,length)+'...';
  }
  return string;
};
