import * as Actions from '~/store/actions/reminders.actions';

const initialState = {
  reminders: [],
  activeReminder: null,
  alertDialogVisible: false,
  backdropVisible: false,
  confirmationDialogVisible: false,
  creationDialogVisible: false,
  message: null,
  activeReminder: null,
};

const remindersReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_COSTUMER_REMINDERS: {
      return {
        ...state,
        reminders: action.payload,
      };
    }
    case Actions.GET_PET_REMINDERS: {
      return {
        ...state,
        reminders: action.payload,
      };
    }
    case Actions.CREATE_REMINDER: {
      return {
        ...state,
        reminders: action.payload,
        message: action.message,
      };
    }
    case Actions.DELETE_REMINDER: {
      return {
        ...state,
        reminders: action.payload,
        message: action.message,
      };
    }
    case Actions.SET_ALERT_VISIBLE: {
      return {
        ...state,
        alertDialogVisible: action.payload,
      };
    }
    case Actions.SET_CONFIRMATION_VISIBLE: {
      return {
        ...state,
        confirmationDialogVisible: action.payload,
      };
    }
    case Actions.SET_CREATION_VISIBLE: {
      return {
        ...state,
        creationDialogVisible: action.payload,
      };
    }
    case Actions.SET_BACKDROP_VISIBLE: {
      return {
        ...state,
        backdropVisible: action.payload,
      };
    }
    case Actions.SET_ACTIVE_REMINDER: {
      return {
        ...state,
        activeReminder: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default remindersReducer;
