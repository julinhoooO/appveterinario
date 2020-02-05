import * as Actions from "~/store/actions/navigation.actions";

const initialState = {
    swipeEnabled: true,
    height: 54,
    initalRoute: 'Main'
};

const navigationReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.STACK_DEEP_FOCUSED: {
        return {
            ...state,
            swipeEnabled: false,
            height: 0
        }
    }
    case Actions.STACK_MAIN_FOCUSED: {
        return {
            ...state,
            swipeEnabled: true,
            height: 54
        }
    }
    case Actions.CHANGE_INITIAL_ROUTE: {
      return {
        ...state,
        initialRoute: action.initalRoute
      }
    }
    default: {
      return state;
    }
  }
};

export default navigationReducer;
