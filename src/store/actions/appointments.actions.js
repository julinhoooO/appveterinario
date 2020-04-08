const ACTION_ID = 'APPOINTMENTS ACTIONS';

export function today() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
}

export const GET_APPOINTMENT = `[${ACTION_ID}] GET APPOINTMENT`;
export const GET_APPOINTMENTS = `[${ACTION_ID}] GET APPOINTMENTS`;
export const CREATE_APPOINTMENT = `[${ACTION_ID}] CREATE APPOINTMENT`;
export const EDIT_APPOINTMENT = `[${ACTION_ID}] EDIT APPOINTMENT`;
export const GET_TYPES_DROPDOWN = `[${ACTION_ID}] GET TYPES DROPDOWN`;
export const GET_COSTUMERS_DROPDOWN = `[${ACTION_ID}] GET COSTUMERS DROPDOWN`;
export const GET_ANIMALS_DROPDOWN = `[${ACTION_ID}] GET ANIMALS DROPDOWN`;
export const DELETE_APPOINTMENT = `[${ACTION_ID}] DELETE APPOINTMENT`;
export const SAGA_GET_APPOINTMENT = `[${ACTION_ID}] SAGA GET APPOINTMENT`;
export const SAGA_GET_APPOINTMENTS = `[${ACTION_ID}] SAGA GET APPOINTMENTS`;
export const SAGA_CREATE_APPOINTMENT = `[${ACTION_ID}] SAGA CREATE APPOINTMENT`;
export const SAGA_EDIT_APPOINTMENT = `[${ACTION_ID}] SAGA EDIT APPOINTMENT`;
export const SAGA_GET_TYPES_DROPDOWN = `[${ACTION_ID}] SAGA GET TYPES DROPDOWN`;
export const SAGA_GET_COSTUMERS_DROPDOWN = `[${ACTION_ID}] SAGA GET COSTUMERS DROPDOWN`;
export const SAGA_GET_ANIMALS_DROPDOWN = `[${ACTION_ID}] SAGA GET ANIMALS DROPDOWN`;
export const SAGA_DELETE_APPOINTMENT = `[${ACTION_ID}] SAGA DELETE APPOINTMENT`;
export const SET_DATEPICKER_VISIBLE = `[${ACTION_ID}] SET DATEPICKER VISIBLE`;
export const RESCHEDULE_APPOINTMENT = `[${ACTION_ID}] RESCHEDULE APPOINTMENT`;
export const SAGA_RESCHEDULE_APPOINTMENT = `[${ACTION_ID}] SAGA RESCHEDULE APPOINTMENT`;
export const APPOINTMENT_OBSERVATION = `[${ACTION_ID}] APPOINTMENT OBSERVATION`;
export const SAGA_APPOINTMENT_OBSERVATION = `[${ACTION_ID}] SAGA APPOINTMENT OBSERVATION`;
export const COMPLETED_APPOINTMENT = `[${ACTION_ID}] COMPLETED APPOINTMENT`;
export const SAGA_COMPLETED_APPOINTMENT = `[${ACTION_ID}] SAGA COMPLETED APPOINTMENT`;
export const SET_FILTER_DATE = `[${ACTION_ID}] SET FILTER DATE`;
export const SET_ALERT_DIALOG_VISIBLE = `[${ACTION_ID}] SET ALERT DIALOG VISIBLE`;
export const SET_CONFIRM_DELETE_DIALOG_VISIBLE = `[${ACTION_ID}] SET CONFIRM DELETE DIALOG VISIBLE`;
export const EDIT_VACCINE = `[${ACTION_ID}] EDIT VACCINE`;
export const SAGA_EDIT_VACCINE = `[${ACTION_ID}] SAGA EDIT VACCINE`;

export function getAppointment(id) {
  return {
    type: SAGA_GET_APPOINTMENT,
    payload: id,
  };
}

export function getAppointments(date = null) {
  return {
    type: SAGA_GET_APPOINTMENTS,
    payload: {date},
  };
}

export function createAppointment(data) {
  return {
    type: SAGA_CREATE_APPOINTMENT,
    payload: data,
  };
}

export function saveAppointment(data) {
  return {
    type: SAGA_EDIT_APPOINTMENT,
    payload: data,
  };
}

export function deleteAppointment(id) {
  return {
    type: SAGA_DELETE_APPOINTMENT,
    payload: id,
  };
}

export function rescheduleAppointment(data) {
  return {
    type: SAGA_RESCHEDULE_APPOINTMENT,
    payload: data,
  };
}

export function appointmentObservation(data) {
  return {
    type: SAGA_APPOINTMENT_OBSERVATION,
    payload: data,
  };
}

export function completedAppointment(id) {
  return {
    type: SAGA_COMPLETED_APPOINTMENT,
    payload: id,
  };
}
export function getTypesDropdown(data) {
  return {
    type: SAGA_GET_TYPES_DROPDOWN,
    payload: data,
  };
}
export function getCostumersDropdown(data) {
  return {
    type: SAGA_GET_COSTUMERS_DROPDOWN,
    payload: data,
  };
}
export function getAnimalsDropdown(data) {
  return {
    type: SAGA_GET_ANIMALS_DROPDOWN,
    payload: data,
  };
}
export function setDatePickerVisible(visible) {
  return {
    type: SET_DATEPICKER_VISIBLE,
    payload: visible,
  };
}
export function setFilterDate(date) {
  return {
    type: SET_FILTER_DATE,
    payload: date,
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

export function editVaccine(data){
  return {
    type: SAGA_EDIT_VACCINE,
    payload: data
  }
}
