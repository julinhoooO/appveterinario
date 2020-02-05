import * as Actions from "~/store/actions/notifications.actions";

const initialState = {
    notifications: [],
    initialRow: 0, 
    count: 0,
    unreadCount: 0,
};

const notificationsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_NOTIFICATIONS: {
      let newArr = action.payload;
      if(action.reload){
        newArr = state.notifications.concat(action.payload);
      }
      return {
        ...state,
        notifications: newArr,
        count: action.count,
        unreadCount: action.unreadCount,
        initialRow: action.initialRow
      }
    }
    case Actions.RELOAD_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
        count: action.count,
        unreadCount: action.unreadCount,
        initialRow: 0
      }
    }
    case Actions.SET_NOTIFICATIONS_READ: {
      return {
        ...state,
        notifications: action.payload,
        count: action.count,
        unreadCount: action.unreadCount,
        initialRow: 0
      }
    }
    case Actions.SET_NOTIFICATION_READ: {
      return {
        ...state,
        notifications: action.payload,
        count: action.count,
        unreadCount: action.unreadCount,
        initialRow: 0
      }
    }
    default: {
      return state;
    }
  }
};

export default notificationsReducer;
