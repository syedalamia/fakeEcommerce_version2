import { ActionTypes } from "../types";

export const setLoader = (data) => {
  //loader ta kmne ghurbe oita upor dependkortise
  return {
    type: ActionTypes.LOADER,
    payload: data,
  };
};
