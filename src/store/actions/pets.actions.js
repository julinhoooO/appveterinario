const ACTION_ID = 'PETS ACTIONS';

export const GET_PET = `[${ACTION_ID}] GET PET`;
export const CREATE_PET = `[${ACTION_ID}] CREATE PET`;
export const EDIT_PET = `[${ACTION_ID}] EDIT PET`;
export const CHANGE_AVATAR_PET = `[${ACTION_ID}] CHANGE AVATAR PET`;
export const GET_SPECIES_DROPDOWN = `[${ACTION_ID}] GET SPECIES DROPDOWN`;
export const GET_RACES_DROPDOWN = `[${ACTION_ID}] GET RACES DROPDOWN`;
export const SAGA_GET_PET = `[${ACTION_ID}] SAGA GET PET`;
export const SAGA_CREATE_PET = `[${ACTION_ID}] SAGA CREATE PET`;
export const SAGA_EDIT_PET = `[${ACTION_ID}] SAGA EDIT PET`;
export const SAGA_CHANGE_AVATAR_PET = `[${ACTION_ID}] SAGA CHANGE AVATAR PET`;
export const SAGA_GET_SPECIES_DROPDOWN = `[${ACTION_ID}] SAGA GET SPECIES DROPDOWN`;
export const SAGA_GET_RACES_DROPDOWN = `[${ACTION_ID}] SAGA GET RACES DROPDOWN`;
export const SET_SUCCESS_VISIBLE = `[${ACTION_ID}] SET SUCCESS DIALOG VISIBLE`;
export const SET_CONFIRMATION_VISIBLE = `[${ACTION_ID}] SET CONFIRMATION DIALOG VISIBLE`;
export const DELETE_PET = `[${ACTION_ID}] DELETE PET`;
export const SAGA_DELETE_PET = `[${ACTION_ID}] SAGA DELETE PET`;
export const SET_DATEPICKER_VISIBLE = `[${ACTION_ID}] SET DATEPICKER VISIBLE`;
export const SET_VACINE_PET = `[${ACTION_ID}] SET VACINE PET`;
export const SAGA_SET_VACINE_PET = `[${ACTION_ID}] SAGA SET VACINE PET`;
export const DELETE_VACINE_PET = `[${ACTION_ID}] DELETE VACINE PET`;
export const SAGA_DELETE_VACINE_PET = `[${ACTION_ID}] SAGA DELETE VACINE PET`;
export const UPDATE_VACINE_PET = `[${ACTION_ID}] UPDATE VACINE PET`;
export const SAGA_UPDATE_VACINE_PET = `[${ACTION_ID}] SAGA UPDATE VACINE PET`;
export const GET_VACINES_DROPDOWN = `[${ACTION_ID}] GET VACINES DROPDOWN`;
export const SAGA_GET_VACINES_DROPDOWN = `[${ACTION_ID}] SAGA GET VACINES DROPDOWN`;
export const SET_ALERT_DIALOG_VISIBLE = `[${ACTION_ID}] SET ALERT DIALOG VISIBLE`;
export const SET_CONFIRM_DELETE_DIALOG_VISIBLE = `[${ACTION_ID}] SET CONFIRM DELETE DIALOG VISIBLE`;

export function getPet(id) {
  return {
    type: SAGA_GET_PET,
    payload: id,
  };
}

export function createPet(data) {
  return {
    type: SAGA_CREATE_PET,
    payload: data,
  };
}

export function savePet(data) {
  return {
    type: SAGA_EDIT_PET,
    payload: data,
  };
}

export function saveAvatar(data) {
  return {
    type: SAGA_CHANGE_AVATAR_PET,
    payload: data,
  };
}

export function getSpeciesDropdown(data) {
  return {
    type: SAGA_GET_SPECIES_DROPDOWN,
    payload: data,
  };
}

export function getRacesDropdown(data) {
  return {
    type: SAGA_GET_RACES_DROPDOWN,
    payload: data,
  };
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
export function deletePet(id) {
  return {
    type: SAGA_DELETE_PET,
    payload: id,
  };
}
export function setDatePickerVisible(visible) {
  return {
    type: SET_DATEPICKER_VISIBLE,
    payload: visible,
  };
}
export function setVacine(data) {
  return {
    type: SAGA_SET_VACINE_PET,
    payload: data,
  };
}

export function updateVacine(data) {
  return {
    type: SAGA_UPDATE_VACINE_PET,
    payload: data,
  };
}

export function deleteVacine(data) {
  return {
    type: SAGA_DELETE_VACINE_PET,
    payload: data,
  };
}
export function getVacinesDropdown(specie) {
  return {
    type: SAGA_GET_VACINES_DROPDOWN,
    payload: specie,
  };
}
export function setAlertDialogVisible() {
  return {
    type: SET_ALERT_DIALOG_VISIBLE,
  };
}
export function setConfirmDeleteDialogVisible() {
  return {
    type: SET_CONFIRM_DELETE_DIALOG_VISIBLE,
  };
}
