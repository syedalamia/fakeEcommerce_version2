import axios from "axios";
import { ActionTypes } from "../types";
import { Config } from "../../config";

export const storeAllCategory = () => async (dispatch, getStore) => {
  let { data } = await axios.get(Config.BASE_URL + "/category");
  dispatch(storeCategory(data));
};
export const addNewCateogry = (data) => async (dispatch, getStore) => {
  const { token } = getStore().sessionStore;

  axios
    .post(
      Config.BASE_URL + "/category",
      {
        name: data.name,
        description: data.description,
        image: data.image,
      },
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(
        storeNotification({
          message: "Added new category",
          type: "SUCCESS",
          display: true,
        })
      );
      dispatch(storeAllCategory());
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

export const deleteCateogry = (category_id) => async (dispatch, getStore) => {
  const { token } = getStore().sessionStore;

  axios
    .delete(Config.BASE_URL + "/category/" + category_id, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        storeNotification({
          message: "Category Deleted",
          type: "SUCCESS",
          display: true,
        })
      );
      dispatch(storeAllCategory());
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

export const updateCategory = (data) => async (dispatch, getStore) => {
  const { token } = getStore().sessionStore;

  axios
    .patch(
      `${Config.BASE_URL}/category/${data.category_id}`,
      {
        name: data.name,
        description: data.description,
        image: data.image,
      },
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(
        storeNotification({
          message: "Category Updated",
          type: "SUCCESS",
          display: true,
        })
      );
      dispatch(storeAllCategory());
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

const storeCategory = (data) => {
  return {
    type: ActionTypes.STORE_ALL_CATEGORY,
    payload: data,
  };
};

const storeNotification = (data) => {
  return {
    type: ActionTypes.ADD_NEW_NOTIFICATION,
    payload: data,
  };
};
