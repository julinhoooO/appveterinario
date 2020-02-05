import {takeLatest, put, call} from 'redux-saga/effects';
import api from '~/services/api';
import {
  GET_COSTUMER,
  SAGA_GET_COSTUMER,
  GET_COSTUMERS,
  SAGA_GET_COSTUMERS,
  CREATE_COSTUMER,
  SAGA_CREATE_COSTUMER,
  EDIT_COSTUMER,
  SAGA_EDIT_COSTUMER,
  FILTER_COSTUMERS,
  SAGA_FILTER_COSTUMERS,
  DELETE_COSTUMER,
  SAGA_DELETE_COSTUMER,
} from '~/store/actions/users.actions';

import {
  GET_PET,
  SAGA_GET_PET,
  CREATE_PET,
  SAGA_CREATE_PET,
  EDIT_PET,
  SAGA_EDIT_PET,
  CHANGE_AVATAR_PET,
  SAGA_CHANGE_AVATAR_PET,
  GET_SPECIES_DROPDOWN,
  GET_RACES_DROPDOWN,
  SAGA_GET_SPECIES_DROPDOWN,
  SAGA_GET_RACES_DROPDOWN,
  DELETE_PET,
  SAGA_DELETE_PET,
  SET_VACINE_PET,
  SAGA_SET_VACINE_PET,
  DELETE_VACINE_PET,
  SAGA_DELETE_VACINE_PET,
  SAGA_GET_VACINES_DROPDOWN,
  GET_VACINES_DROPDOWN,
  UPDATE_VACINE_PET,
  SAGA_UPDATE_VACINE_PET,
} from '~/store/actions/pets.actions';

import {
  GET_APPOINTMENT,
  SAGA_GET_APPOINTMENT,
  GET_APPOINTMENTS,
  SAGA_GET_APPOINTMENTS,
  CREATE_APPOINTMENT,
  SAGA_CREATE_APPOINTMENT,
  EDIT_APPOINTMENT,
  SAGA_EDIT_APPOINTMENT,
  GET_COSTUMERS_DROPDOWN,
  GET_ANIMALS_DROPDOWN,
  SAGA_GET_COSTUMERS_DROPDOWN,
  SAGA_GET_ANIMALS_DROPDOWN,
  DELETE_APPOINTMENT,
  SAGA_DELETE_APPOINTMENT,
  RESCHEDULE_APPOINTMENT,
  SAGA_RESCHEDULE_APPOINTMENT,
  APPOINTMENT_OBSERVATION,
  SAGA_APPOINTMENT_OBSERVATION,
  COMPLETED_APPOINTMENT,
  SAGA_COMPLETED_APPOINTMENT,
} from '~/store/actions/appointments.actions';

import {
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS_READ,
  RELOAD_NOTIFICATIONS,
  SET_NOTIFICATION_READ,
  SAGA_GET_NOTIFICATIONS,
  SAGA_SET_NOTIFICATIONS_READ,
  SAGA_SET_NOTIFICATION_READ,
  SAGA_RELOAD_NOTIFICATIONS,
} from '~/store/actions/notifications.actions';

import {
  GET_COSTUMER_REMINDERS,
  GET_PET_REMINDERS,
  CREATE_REMINDER,
  DELETE_REMINDER,
  SAGA_GET_COSTUMER_REMINDERS,
  SAGA_GET_PET_REMINDERS,
  SAGA_CREATE_REMINDER,
  SAGA_DELETE_REMINDER,
} from '~/store/actions/reminders.actions';

function apiFetchData(method, url, data, headers) {
  const response = api.request({
    method,
    url,
    data,
    headers,
  });
  console.log(response);
  return response;
}

function uploadImage(url, data) {
  const response = api.post(url, data);
  return response;
}

//Costumers
function* getCostumers(action) {
  try {
    const {data} = yield call(apiFetchData, 'get', 'costumers');
    yield put({
      type: GET_COSTUMERS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* filterCostumers(action) {
  try {
    const {data} = yield call(
      apiFetchData,
      'get',
      `costumers/filter/${action.payload}`,
    );
    yield put({
      type: FILTER_COSTUMERS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getCostumer(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `costumers/${action.payload}`,
    );
    yield put({
      type: GET_COSTUMER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* createCostumer(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'costumers',
      action.payload,
    );
    yield put({
      type: CREATE_COSTUMER,
      payload: response.data.users,
      user: response.data.user,
    });
  } catch (error) {
    console.error(error);
  }
}

function* saveCostumer(action) {
  try {
    const response = yield call(
      apiFetchData,
      'put',
      'costumers',
      action.payload,
    );
    yield put({
      type: EDIT_COSTUMER,
      payload: response.data.users,
      user: response.data.user,
    });
  } catch (error) {
    console.error(error);
  }
}

function* deleteCostumer(action) {
  try {
    yield call(apiFetchData, 'delete', 'costumers', action.payload);
    yield put({
      type: DELETE_COSTUMER,
    });
  } catch (error) {
    console.error(error);
  }
}

//Appointments
function* getAppointments(action) {
  try {
    let route = 'appointments';
    let method = 'get';
    if (action.payload) {
      if (action.payload.date) {
        route = 'appointments/filter';
        method = 'post';
      }
    }
    const {data} = yield call(apiFetchData, method, route, action.payload);
    yield put({
      type: GET_APPOINTMENTS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getAppointment(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `appointments/${action.payload}`,
    );
    yield put({
      type: GET_APPOINTMENT,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* deleteAppointment(action) {
  try {
    const response = yield call(
      apiFetchData,
      'delete',
      'appointments',
      action.payload,
    );
    yield put({
      type: DELETE_APPOINTMENT,
      payload: response.data.appointments,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getCostumersDropdown(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `appointments/dropdown/costumers`,
    );
    yield put({
      type: GET_COSTUMERS_DROPDOWN,
      payload: response.data.costumers,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getAnimalsDropdown(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `appointments/dropdown/animals/${action.payload}`,
    );
    yield put({
      type: GET_ANIMALS_DROPDOWN,
      payload: response.data.animals,
    });
  } catch (error) {
    console.error(error);
  }
}

function* createAppointment(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'appointments',
      action.payload,
    );
    yield put({
      type: CREATE_APPOINTMENT,
      payload: response.data.appointments,
      appointment: response.data.appointment,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* saveAppointment(action) {
  try {
    const response = yield call(
      apiFetchData,
      'put',
      'appointments',
      action.payload,
    );
    yield put({
      type: EDIT_APPOINTMENT,
      payload: response.data.appointments,
      appointment: response.data.appointment,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* rescheduleAppointment(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'appointments/reschedule',
      action.payload,
    );
    yield put({
      type: RESCHEDULE_APPOINTMENT,
      payload: response.data.appointments,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* completedAppointment(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'appointments/completed',
      action.payload,
    );
    yield put({
      type: COMPLETED_APPOINTMENT,
      payload: response.data.appointments,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* appointmentObservation(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'appointments/observation',
      action.payload,
    );
    yield put({
      type: APPOINTMENT_OBSERVATION,
      payload: response.data.appointments,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

//Pets
function* getPet(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `animals/${action.payload}`,
    );
    yield put({
      type: GET_PET,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* createPet(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'animals',
      action.payload,
    );
    yield put({
      type: CREATE_PET,
      payload: response.data.pet,
    });
  } catch (error) {
    console.error(error);
  }
}

function* savePet(action) {
  try {
    const response = yield call(apiFetchData, 'put', 'animals', action.payload);
    yield put({
      type: EDIT_PET,
      payload: response.data.pet,
    });
  } catch (error) {
    console.error(error);
  }
}

function* deletePet(action) {
  try {
    yield call(apiFetchData, 'delete', 'animals', action.payload);
    yield put({
      type: DELETE_PET,
    });
  } catch (error) {
    console.error(error);
  }
}

function* saveAvatarPet(action) {
  try {
    const response = yield call(uploadImage, 'animals/avatar', action.payload);
    yield put({
      type: CHANGE_AVATAR_PET,
      payload: response.data.pet,
    });
  } catch (error) {
    console.error(error);
  }
}

function* vacinePet(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'vaccines',
      action.payload,
    );
    yield put({
      type: SET_VACINE_PET,
      payload: response.data.pet,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* updateVacinePet(action) {
  try {
    const response = yield call(
      apiFetchData,
      'put',
      'vaccines',
      action.payload,
    );
    yield put({
      type: UPDATE_VACINE_PET,
      payload: response.data.pet,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* deleteVacinePet(action) {
  try {
    const response = yield call(
      apiFetchData,
      'delete',
      'vaccines',
      action.payload,
    );
    yield put({
      type: DELETE_VACINE_PET,
      payload: response.data.pet,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getSpeciesDropdown(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `animals/dropdown/species`,
    );
    yield put({
      type: GET_SPECIES_DROPDOWN,
      payload: response.data.species,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getRacesDropdown(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `animals/dropdown/races/${action.payload}`,
    );
    yield put({
      type: GET_RACES_DROPDOWN,
      payload: response.data.races,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getVacinesDropdown(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'vaccines/dropdown',
      action.payload,
    );
    yield put({
      type: GET_VACINES_DROPDOWN,
      payload: response.data.vaccines,
    });
  } catch (error) {
    console.error(error);
  }
}

//Notifications
function* getNotifications(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `notifications?initialRow=${action.initialRow}&limitRow=${action.limitRow}`,
    );
    yield put({
      type: GET_NOTIFICATIONS,
      payload: response.data.notifications,
      initialRow: action.initialRow + action.limitRow,
      count: response.data.count,
      unreadCount: response.data.unreadCount,
    });
  } catch (error) {
    console.error(error);
  }
}

function* reloadNotifications(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `notifications?initialRow=0&limitRow=15`,
    );
    yield put({
      type: RELOAD_NOTIFICATIONS,
      payload: response.data.notifications,
      count: response.data.count,
      unreadCount: response.data.unreadCount,
    });
  } catch (error) {
    console.error(error);
  }
}

function* setNotificationsRead(action) {
  try {
    const response = yield call(apiFetchData, 'get', 'notifications/read');
    yield put({
      type: SET_NOTIFICATIONS_READ,
      payload: response.data.notifications,
      count: response.data.count,
      unreadCount: response.data.unreadCount,
    });
  } catch (error) {
    console.error(error);
  }
}

function* setNotificationRead(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `notifications/read/${action.payload}`,
    );
    yield put({
      type: SET_NOTIFICATIONS_READ,
      payload: response.data.notifications,
      count: response.data.count,
      unreadCount: response.data.unreadCount,
    });
  } catch (error) {
    console.error(error);
  }
}

//Reminders
function* getCostumerReminders(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `reminders/costumer/${action.payload}`,
    );
    yield put({
      type: GET_COSTUMER_REMINDERS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* getPetReminders(action) {
  try {
    const response = yield call(
      apiFetchData,
      'get',
      `reminders/pet/${action.payload}`,
    );
    yield put({
      type: GET_PET_REMINDERS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

function* createReminder(action) {
  try {
    const response = yield call(
      apiFetchData,
      'post',
      'reminders',
      action.payload,
    );
    yield put({
      type: CREATE_REMINDER,
      payload: response.data.reminders,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

function* deleteReminder(action) {
  try {
    const response = yield call(
      apiFetchData,
      'delete',
      'reminders',
      action.payload,
    );
    yield put({
      type: DELETE_REMINDER,
      payload: response.data.reminders,
      message: response.data.message,
    });
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  //Costumers
  yield takeLatest(SAGA_GET_COSTUMER, getCostumer);
  yield takeLatest(SAGA_GET_COSTUMERS, getCostumers);
  yield takeLatest(SAGA_FILTER_COSTUMERS, filterCostumers);
  yield takeLatest(SAGA_CREATE_COSTUMER, createCostumer);
  yield takeLatest(SAGA_EDIT_COSTUMER, saveCostumer);
  yield takeLatest(SAGA_DELETE_COSTUMER, deleteCostumer);

  //Pet
  yield takeLatest(SAGA_GET_PET, getPet);
  yield takeLatest(SAGA_CREATE_PET, createPet);
  yield takeLatest(SAGA_EDIT_PET, savePet);
  yield takeLatest(SAGA_CHANGE_AVATAR_PET, saveAvatarPet);
  yield takeLatest(SAGA_GET_SPECIES_DROPDOWN, getSpeciesDropdown);
  yield takeLatest(SAGA_GET_RACES_DROPDOWN, getRacesDropdown);
  yield takeLatest(SAGA_DELETE_PET, deletePet);
  yield takeLatest(SAGA_SET_VACINE_PET, vacinePet);
  yield takeLatest(SAGA_DELETE_VACINE_PET, deleteVacinePet);
  yield takeLatest(SAGA_GET_VACINES_DROPDOWN, getVacinesDropdown);
  yield takeLatest(SAGA_UPDATE_VACINE_PET, updateVacinePet);

  //Appointment
  yield takeLatest(SAGA_GET_APPOINTMENT, getAppointment);
  yield takeLatest(SAGA_GET_APPOINTMENTS, getAppointments);
  yield takeLatest(SAGA_CREATE_APPOINTMENT, createAppointment);
  yield takeLatest(SAGA_EDIT_APPOINTMENT, saveAppointment);
  yield takeLatest(SAGA_DELETE_APPOINTMENT, deleteAppointment);
  yield takeLatest(SAGA_COMPLETED_APPOINTMENT, completedAppointment);
  yield takeLatest(SAGA_RESCHEDULE_APPOINTMENT, rescheduleAppointment);
  yield takeLatest(SAGA_APPOINTMENT_OBSERVATION, appointmentObservation);
  yield takeLatest(SAGA_GET_COSTUMERS_DROPDOWN, getCostumersDropdown);
  yield takeLatest(SAGA_GET_ANIMALS_DROPDOWN, getAnimalsDropdown);

  //Notifications
  yield takeLatest(SAGA_GET_NOTIFICATIONS, getNotifications);
  yield takeLatest(SAGA_SET_NOTIFICATIONS_READ, setNotificationsRead);
  yield takeLatest(SAGA_SET_NOTIFICATION_READ, setNotificationRead);
  yield takeLatest(SAGA_RELOAD_NOTIFICATIONS, reloadNotifications);

  //Costumers
  yield takeLatest(SAGA_GET_COSTUMER_REMINDERS, getCostumerReminders);
  yield takeLatest(SAGA_GET_PET_REMINDERS, getPetReminders);
  yield takeLatest(SAGA_CREATE_REMINDER, createReminder);
  yield takeLatest(SAGA_DELETE_REMINDER, deleteReminder);
}
