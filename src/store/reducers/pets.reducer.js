import * as Actions from '~/store/actions/pets.actions';

const initialState = {
  pets: {},
  pet: {},
  message: '',
  dropdown: {
    species: [],
    races: [],
    vaccines: [],
  },
  successVisible: false,
  confirmationVisible: false,
  datepickerVisible: false,
  alertDialogVisible: false,
  confirmDeleteDialogVisible: false,
};

const petsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PET: {
      return {
        ...state,
        pet: action.payload,
      };
    }
    case Actions.CREATE_PET: {
      return {
        ...state,
        pet: action.payload,
      };
    }
    case Actions.EDIT_PET: {
      return {
        ...state,
        pet: action.payload,
      };
    }
    case Actions.CHANGE_AVATAR_PET: {
      return {
        ...state,
        pet: action.payload,
      };
    }
    case Actions.GET_SPECIES_DROPDOWN: {
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          species: action.payload,
        },
      };
    }
    case Actions.GET_RACES_DROPDOWN: {
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          races: action.payload,
        },
      };
    }
    case Actions.SET_SUCCESS_VISIBLE: {
      return {
        ...state,
        successVisible: action.payload,
      };
    }
    case Actions.SET_CONFIRMATION_VISIBLE: {
      return {
        ...state,
        confirmationVisible: action.payload,
      };
    }
    case Actions.SET_DATEPICKER_VISIBLE: {
      return {
        ...state,
        datepickerVisible: action.payload,
      };
    }
    case Actions.SET_VACINE_PET: {
      return {
        ...state,
        pet: action.payload,
        message: action.message,
      };
    }
    case Actions.DELETE_VACINE_PET: {
      return {
        ...state,
        pet: action.payload,
        message: action.message,
      };
    }
    case Actions.UPDATE_VACINE_PET: {
      return {
        ...state,
        pet: action.payload,
        message: action.message,
      };
    }
    case Actions.GET_VACINES_DROPDOWN: {
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          vaccines: action.payload,
        },
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

export default petsReducer;
