export const cleanObj = (obj: any) => {
  if (typeof obj !== 'object') return obj;
  for (let propName in obj) {
    if (obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};
