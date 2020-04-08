const ACTION_ID = 'COSTUMERS ACTIONS';

export const GET_COSTUMER = `[${ACTION_ID}] GET COSTUMER`;
export const GET_COSTUMERS = `[${ACTION_ID}] GET COSTUMERS`;
export const CREATE_COSTUMER = `[${ACTION_ID}] CREATE COSTUMER`;
export const EDIT_COSTUMER = `[${ACTION_ID}] EDIT COSTUMER`;
export const FILTER_COSTUMERS = `[${ACTION_ID}] FILTER COSTUMERS`;
export const SAGA_GET_COSTUMER = `[${ACTION_ID}] SAGA GET COSTUMER`;
export const SAGA_GET_COSTUMERS = `[${ACTION_ID}] SAGA GET COSTUMERS`;
export const SAGA_CREATE_COSTUMER = `[${ACTION_ID}] SAGA CREATE COSTUMER`;
export const SAGA_EDIT_COSTUMER = `[${ACTION_ID}] SAGA EDIT COSTUMER`;
export const SAGA_FILTER_COSTUMERS = `[${ACTION_ID}] SAGA FILTER COSTUMERS`;

export const SET_SUCCESS_VISIBLE = `[${ACTION_ID}] SET SUCCESS DIALOG VISIBLE`;
export const SET_CONFIRMATION_VISIBLE = `[${ACTION_ID}] SET CONFIRMATION DIALOG VISIBLE`;
export const SET_SHIMMER_VISIBLE = `[${ACTION_ID}] SET SHIMMER EFFECT VISIBLE`;
export const DELETE_COSTUMER = `[${ACTION_ID}] DELETE COSTUMER`;
export const SAGA_DELETE_COSTUMER = `[${ACTION_ID}] SAGA DELETE COSTUMER`;

export function getCostumer(id) {
  return {
    type: SAGA_GET_COSTUMER,
    payload: id,
  };
}

export function getCostumers() {
  return {
    type: SAGA_GET_COSTUMERS,
  };
}

export function createCostumer(data) {
  return {
    type: SAGA_CREATE_COSTUMER,
    payload: data,
  };
}

export function saveCostumer(data) {
  return {
    type: SAGA_EDIT_COSTUMER,
    payload: data,
  };
}
export function filterCostumers(name) {
  if (name) {
    return {
      type: SAGA_FILTER_COSTUMERS,
      payload: name,
    };
  } else {
    return {
      type: SAGA_GET_COSTUMERS,
    };
  }
}

export function setSuccessVisible(visible) {
  return {
    type: SET_SUCCESS_VISIBLE,
    payload: visible,
  };
}

export function setConfirmationVisible(visible) {
  return {
    type: SET_CONFIRMATION_VISIBLE,
    payload: visible,
  };
}
export function deleteCostumer(id) {
  return {
    type: SAGA_DELETE_COSTUMER,
    payload: id,
  };
}
export function setShimmerVisible(visible) {
  return {
    type: SET_SHIMMER_VISIBLE,
    payload: visible,
  };
}
