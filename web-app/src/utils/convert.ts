import { IDataResponse } from "./../interfaces/searchTest";

export const convertArrayToObject = (array: IDataResponse[], key: keyof IDataResponse) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};
