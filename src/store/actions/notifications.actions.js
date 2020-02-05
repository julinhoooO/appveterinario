const ACTION_ID = 'NOTIFICATIONS ACTIONS';

export const GET_NOTIFICATIONS = `[${ACTION_ID}] GET NOTIFICATIONS`;
export const SET_NOTIFICATIONS_READ = `[${ACTION_ID}] SET NOTIFICATIONS READ`;
export const SET_NOTIFICATION_READ = `[${ACTION_ID}] SET NOTIFICATION READ`;
export const RELOAD_NOTIFICATIONS = `[${ACTION_ID}] RELOAD NOTIFICATIONS`;
export const SAGA_GET_NOTIFICATIONS = `[${ACTION_ID}] SAGA GET NOTIFICATIONS`;
export const SAGA_SET_NOTIFICATIONS_READ = `[${ACTION_ID}] SAGA SET NOTIFICATIONS READ`;
export const SAGA_SET_NOTIFICATION_READ = `[${ACTION_ID}] SAGA SET NOTIFICATION READ`;
export const SAGA_RELOAD_NOTIFICATIONS = `[${ACTION_ID}] SAGA RELOAD NOTIFICATIONS`;

export function getNotifications(initialRow) {
  return {
    type: SAGA_GET_NOTIFICATIONS,
    initialRow,
    limitRow: 15,
  };
}

export function reloadNotifications() {
  return {
    type: SAGA_RELOAD_NOTIFICATIONS,
  };
}

export function setNotificationsRead() {
  return {
    type: SAGA_SET_NOTIFICATIONS_READ,
  };
}

export function setNotificationRead(id) {
  return {
    type: SAGA_SET_NOTIFICATION_READ,
    payload: id,
  };
}
