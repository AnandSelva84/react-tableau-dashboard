export function sortOptions(a, b) {
  if (a.order < b.order) {
    return 1;
  }
  if (a.order > b.orde) {
    return -1;
  }
  return 0;
}

const matchedArray = (array_1, array_2) => {
  debugger;
  let match = true;
  if (array_1.length !== array_2.length) match = false;
  array_1.forEach((elem, index) => {
    if (array_1[index] !== array_2[index]) match = false;
  });

  return match;
};

export const getArrayValue = (obj) => {
  const keys = Object.keys(obj);
  let idsArray = [];
  keys.forEach((key) => {
    const arrayLength = obj[key].length;
    idsArray.push(arrayLength);
  });
  return idsArray;
};

export const isEquelObj = (obj_1, obj_2) => {
  //return an array of lengthes then compare them
  return matchedArray(getArrayValue(obj_2), getArrayValue(obj_1));
};
