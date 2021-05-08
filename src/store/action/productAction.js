import { ActionTypes } from "../types";
import axios from "axios";
import { setLoader } from "./loaderAction";
import { Config } from "../../config";

//product er joto action shob ei action creator theke hocche
export const storeAllProduct = () => async (dispatch, getStore) => {
  dispatch(setLoader(true)); //jotokkhon data na asche setloader e true kore dicche
  let { data } = await axios.get(Config.BASE_URL + "/products"); //shudhu data k nicche
  dispatch(storeProductList(data)); //store product list er kache data k pathacche
  dispatch(setLoader(false)); //data asha sthe sthe setloader false kore feleche
};

export const storeSingleProduct = (id) => async (dispatch, getStore) => {
  //homepage theke jeno access korte pare tai export kore dise
  //store single product ta die product detail access kortise
  dispatch(setLoader(true));
  let { data } = await axios.get(`${Config.BASE_URL}/products/${id}`);
  dispatch(storeProduct(data));
  dispatch(setLoader(false));
};

export const storeProductByCat = (cat_id) => async (dispatch, getStore) => {
  dispatch(setLoader(true));
  let { data } = await axios.get(
    Config.BASE_URL + `/products/category/${cat_id}`
  );
  dispatch(storeProductForcategory(data));
  dispatch(setLoader(false));
};
export const addNewProduct = (data) => async (dispatch, getStore) => {
  dispatch(setLoader(true));

  dispatch(setLoader(false));
};

export const deleteProduct = (prod_id) => async (dispatch, getStore) => {
  const { token } = getStore().sessionStore;

  axios
    .delete(Config.BASE_URL + "/products/" + prod_id, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        storeNotification({
          message: "Product Deleted",
          type: "SUCCESS",
          display: true,
        })
      );
      dispatch(storeAllProduct());
    })
    .catch((e) => {
      dispatch(
        storeNotification({
          message: e.response.data.error,
          type: "FAILED",
          display: true,
        })
      );
    });
};

export const updateProduct = (data) => async (dispatch, getStore) => {
  const { token } = getStore().sessionStore;

  axios
    .patch(
      `${Config.BASE_URL}/products/${data.product_id}`,
      {
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        image: data.image,
        stock: data.stock,
        category: {
          _id: data.category,
        },
      },
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log();
      dispatch(
        storeNotification({
          message: res.data.message,
          type: "SUCCESS",
          display: true,
        })
      );
      dispatch(storeAllProduct());
    })
    .catch((e) => {
      dispatch(
        storeNotification({
          message: e.response.data.error,
          type: "SUCCESS",
          display: true,
        })
      );
    });
};

const storeProductList = (data) => {
  //store korbe product
  return {
    type: ActionTypes.STORE_ALL_PRODUCT,
    payload: data,
  };
};
const storeProductForcategory = (data) => {
  return {
    type: ActionTypes.STORE_PRODUCT_BY_CATEGORY,
    payload: data,
  };
};

const storeProduct = (data) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: data,
  };
};

const addProduct = (data) => {
  return {
    type: ActionTypes.ADD_NEW_PRODUCT,
    payload: data,
  };
};

const storeNotification = (data) => {
  return {
    type: ActionTypes.ADD_NEW_NOTIFICATION,
    payload: data,
  };
};
