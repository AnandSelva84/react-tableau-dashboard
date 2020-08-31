const constructValue = (title, value) => `${title}=${value}`.trim();

export const formatQueryStrings = (array) => {
  let url = "?";
  array.forEach(({ value, title }, index) => {
    const prefix = index === 0 ? "" : "&";
    const _value = prefix + constructValue(title, value);
    url += _value;
  });

  return url;
};
