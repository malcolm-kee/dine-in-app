export const createEmptyArray = (length: number) => {
  if (Array.from) {
    return Array.from({
      length,
    });
  }
  const array = [];
  for (let index = 0; index < length; index++) {
    array.push(undefined);
  }
  return array;
};
