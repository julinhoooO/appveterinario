import * as Actions from '~/store/actions/users.actions';

const initialState = {
  data: [],
  allData: [],
  user: {},
  errors: [],
  successVisible: false,
  confirmationVisible: false,
  shimmerVisible: true,
};

const navigationReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_COSTUMERS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.GET_COSTUMER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case Actions.CREATE_COSTUMER: {
      return {
        ...state,
        data: action.payload,
        user: action.user,
      };
    }
    case Actions.EDIT_COSTUMER: {
      return {
        ...state,
        data: action.payload,
        user: action.user,
      };
    }
    case Actions.FILTER_COSTUMERS: {
      return {
        ...state,
        data: action.payload,
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
    case Actions.SET_SHIMMER_VISIBLE: {
      return {
        ...state,
        shimmerVisible: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default navigationReducer;
