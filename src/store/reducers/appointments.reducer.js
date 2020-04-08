import * as Actions from '~/store/actions/appointments.actions';

const initialState = {
  activeFilterDate: Actions.today(),
  appointments: [],
  appointment: {},
  dropdown: {
    costumers: [],
    animals: [],
    types: [],
  },
  datepickerVisible: false,
  alertDialogVisible: false,
  confirmDeleteDialogVisible: false,
  message: '',
};

const appointmentsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_APPOINTMENTS: {
      return {
        ...state,
        appointments: action.payload,
      };
    }
    case Actions.GET_APPOINTMENT: {
      return {
        ...state,
        appointment: action.appointment,
      };
    }
    case Actions.CREATE_APPOINTMENT: {
      return {
        ...state,
        appointments: action.payload,
        appointment: action.appointment,
        message: action.message,
      };
    }
    case Actions.EDIT_VACCINE: {
      return {
        ...state,
        appointments: action.payload,
        appointment: action.appointment,
        message: action.message,
      };
    }
    case Actions.EDIT_APPOINTMENT: {
      return {
        ...state,
        appointments: action.payload,
        appointment: action.appointment,
        message: action.message,
      };
    }
    case Actions.DELETE_APPOINTMENT: {
      return {
        ...state,
        appointments: action.payload,
        message: action.message,
      };
    }
    case Actions.GET_ANIMALS_DROPDOWN: {
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          animals: action.payload,
        },
      };
    }
    case Actions.GET_COSTUMERS_DROPDOWN: {
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          costumers: action.payload,
        },
      };
    }
    case Actions.SET_DATEPICKER_VISIBLE: {
      return {
        ...state,
        datepickerVisible: action.payload,
      };
    }
    case Actions.SET_FILTER_DATE: {
      return {
        ...state,
        activeFilterDate: action.payload,
      };
    }
    case Actions.RESCHEDULE_APPOINTMENT: {
      return {
        ...state,
        appointments: action.payload,
        alertDialogVisible: true,
        message: action.message,
      };
    }
    case Actions.APPOINTMENT_OBSERVATION: {
      return {
        ...state,
        appointments: action.payload,
        alertDialogVisible: true,
        message: action.message,
      };
    }
    case Actions.COMPLETED_APPOINTMENT: {
      return {
        ...state,
        appointments: action.payload,
        message: action.message,
      };
    }
    case Actions.SET_ALERT_DIALOG_VISIBLE: {
      return {
        ...state,
        alertDialogVisible: !state.alertDialogVisible,
      };
    }
    case Actions.SET_CONFIRM_DELETE_DIALOG_VISIBLE: {
      return {
        ...state,
        confirmDeleteDialogVisible: !state.confirmDeleteDialogVisible,
      };
    }
    default: {
      return state;
    }
  }
};

export default appointmentsReducer;
