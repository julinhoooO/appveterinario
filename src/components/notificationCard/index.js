import React from 'react';
import {useDispatch} from 'react-redux';

import {
  NotificationCard,
  NotificationCardTitle,
  NotificationCardIcon,
  Ripple,
} from './styles';

import * as NotificationsActions from '~/store/actions/notifications.actions';

export default function notificationCard({navigation, data}) {
  const screenProps = JSON.parse(data.screenProps);
  const dispatch = useDispatch();
  function diff_time(dt2, dt1) {
    let diff = Math.abs((dt2.getTime() - dt1.getTime()) / 1000);
    let message = '';
    if (diff > 60) {
      diff /= 60;
      message = ' M';
    }
    if (diff > 60) {
      diff /= 60;
      message = ' H';
    }
    if (diff > 24) {
      diff /= 24;
      message = ' D';
    }
    return Math.round(diff) + message;
  }
  return (
    <NotificationCard read={data.read}>
      <NotificationCardTitle
        onPress={() => {
          dispatch(NotificationsActions.setNotificationRead(data.id));
          navigation.navigate(data.screen, screenProps);
        }}
        title={data.message}
        titleStyle={{
          fontSize: 14,
        }}
        titleNumberOfLines={3}
        description={diff_time(
          new Date(data.created_at.split(' ').join('T') + '.000Z'),
          new Date(),
        )}
        descriptionStyle={{
          fontSize: 12,
          marginTop: 3,
        }}
        descriptionNumberOfLines={1}
        left={props => (
          <NotificationCardIcon
            {...props}
            icon={
              data.target_type === 'appointment' ? 'calendar-outline' : 'needle'
            }
          />
        )}
      />
    </NotificationCard>
  );
}
