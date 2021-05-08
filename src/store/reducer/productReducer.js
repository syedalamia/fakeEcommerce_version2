import { ActionTypes } from "../types";
const initial = {
  selectedProduct: {},
  productList: [],
  productBycat: [], //question korbo
};

const productReducer = (state = initial, action) => {
  switch (action.type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case ActionTypes.STORE_ALL_PRODUCT:
      return { ...state, productList: action.payload };
    case ActionTypes.STORE_PRODUCT_BY_CATEGORY:
      return { ...state, productBycat: action.payload };
    default:
      return state;
  }
};

export default productReducer;
//nuru jeita korse o hocche action type theke action nia asche first e then
//oder call dise  ebong she 3 ta array banaise upore sleected product  store all  producty by category
