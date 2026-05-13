export const getRandomFromArray = <T>(array: T[]): T | undefined => {
  if (!array || array?.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};


export const moveElement = (
  array: any[],
  fromIndex: number,
  toIndex: number
) => {
  const element = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, element);

  return array;
};