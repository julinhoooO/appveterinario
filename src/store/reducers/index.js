import {combineReducers} from 'redux';
import appointments from './appointments.reducer';
import navigation from './navigation.reducer';
import users from './users.reducer';
import pets from './pets.reducer';
import notifications from './notifications.reducer';
import reminders from './reminders.reducer';

const reducer = combineReducers({
  appointments,
  navigation,
  users,
  pets,
  notifications,
  reminders,
});

export default reducer;
