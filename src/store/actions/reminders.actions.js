const ACTION_ID = 'REMINDERS ACTIONS';

export const GET_COSTUMER_REMINDERS = `[${ACTION_ID}] GET REMINDERs`;
export const GET_PET_REMINDERS = `[${ACTION_ID}] GET REMINDERS`;
export const CREATE_REMINDER = `[${ACTION_ID}] CREATE REMINDER`;
export const DELETE_REMINDER = `[${ACTION_ID}] EDIT REMINDER`;
export const SET_ACTIVE_REMINDER = `[${ACTION_ID}] SET ACTIVE REMINDER`;
export const SAGA_GET_COSTUMER_REMINDERS = `[${ACTION_ID}] SAGA GET REMINDERs`;
export const SAGA_GET_PET_REMINDERS = `[${ACTION_ID}] SAGA GET REMINDERS`;
export const SAGA_CREATE_REMINDER = `[${ACTION_ID}] SAGA CREATE REMINDER`;
export const SAGA_DELETE_REMINDER = `[${ACTION_ID}] SAGA EDIT REMINDER`;

export const SET_ALERT_VISIBLE = `[${ACTION_ID}] SET ALERT DIALOG VISIBLE`;
export const SET_CONFIRMATION_VISIBLE = `[${ACTION_ID}] SET CONFIRMATION DIALOG VISIBLE`;
export const SET_CREATION_VISIBLE = `[${ACTION_ID}] SET CREATION DIALOG VISIBLE`;
export const SET_BACKDROP_VISIBLE = `[${ACTION_ID}] SET BACKDROP VISIBLE`;

export function getCostumerReminders(costumer) {
  return {
    type: SAGA_GET_COSTUMER_REMINDERS,
    payload: costumer,
  };
}

export function getPetReminders(pet) {
  return {
    type: SAGA_GET_PET_REMINDERS,
    payload: pet,
  };
}

export function createReminder(data) {
  return {
    type: SAGA_CREATE_REMINDER,
    payload: data,
  };
}

export function deleteReminder(id) {
  return {
    type: SAGA_DELETE_REMINDER,
    payload: id,
  };
}

export function setAlertDialogVisible(visible) {
  return {
    type: SET_ALERT_VISIBLE,
    payload: visible,
  };
}

export function setConfirmationDialogVisible(visible) {
  return {
    type: SET_CONFIRMATION_VISIBLE,
    payload: visible,
  };
}

export function setCreationDialogVisible(visible) {
  return {
    type: SET_CREATION_VISIBLE,
    payload: visible,
  };
}

export function setBackdropVisible(visible) {
  return {
    type: SET_BACKDROP_VISIBLE,
    payload: visible,
  };
}

export function setActiveReminder(reminder) {
  return {
    type: SET_ACTIVE_REMINDER,
    payload: reminder,
  };
}
