import axios from 'axios';
import {
  authRequest,
  authSuccess,
  authFailed,
  authError,
  stuffAdded,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
  productSuccess,
  productDetailsSuccess,
  getProductDetailsFailed,
  getProductsFailed,
  setFilteredProducts,
  getSearchFailed,
  AdminProductSuccess,
  getAdminProductsFailed,
  stuffUpdated,
  updateFailed,
  getCustomersListFailed,
  customersListSuccess,
  getSpecificProductsFailed,
  specificProductSuccess,
  updateCurrentUser,
} from './userSlice';

const REACT_APP_BASE_URL = "http://localhost:5178";

// Helper function to handle errors and make them serializable
const handleSerializableError = (error) => {
  return error.response?.data?.message || error.message || 'Unknown error';
};

export const authUser = (fields, role, mode) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${REACT_APP_BASE_URL}/${role}${mode}`, fields, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(authError(handleSerializableError(error)));
  }
};

export const addStuff = (address, fields) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${REACT_APP_BASE_URL}/${address}`, fields, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (result.data.message) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(stuffAdded());
    }
  } catch (error) {
    dispatch(authError(handleSerializableError(error)));
  }
};

export const updateStuff = (fields, id, address) => async (dispatch) => {
  try {
    const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`, fields, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.data.message) {
      dispatch(updateFailed(result.data.message));
    } else {
      dispatch(stuffUpdated());
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const deleteStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.delete(`${REACT_APP_BASE_URL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getDeleteSuccess());
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const updateCustomer = (fields, id) => async (dispatch) => {
  dispatch(updateCurrentUser(fields));

  const newFields = { ...fields };
  delete newFields.token;

  try {
    await axios.put(`${REACT_APP_BASE_URL}/CustomerUpdate/${id}`, newFields, {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch(stuffUpdated());
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const getProductsbyAdmin = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/getAdminProducts/${id}`);
    if (result.data.message) {
      dispatch(getAdminProductsFailed(result.data.message));
    } else {
      dispatch(AdminProductSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const getProducts = () => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/getProducts`);
    if (result.data.message) {
      dispatch(getProductsFailed(result.data.message));
    } else {
      dispatch(productSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/getProductDetail/${id}`);
    if (result.data.message) {
      dispatch(getProductDetailsFailed(result.data.message));
    } else {
      dispatch(productDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const getCustomers = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getCustomersListFailed(result.data.message));
    } else {
      dispatch(customersListSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const getSpecificProducts = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getSpecificProductsFailed(result.data.message));
    } else {
      dispatch(specificProductSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};

export const getSearchedProducts = (address, key) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${key}`);
    if (result.data.message) {
      dispatch(getSearchFailed(result.data.message));
    } else {
      dispatch(setFilteredProducts(result.data));
    }
  } catch (error) {
    dispatch(getError(handleSerializableError(error)));
  }
};
