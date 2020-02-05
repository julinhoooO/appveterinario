import React, {useCallback, useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {FAB, Portal, Appbar} from 'react-native-paper';
import {Container, Appointments, Footer} from './styles';
import NotifactionCard from '~/components/notificationCard';

import {useFocusEffect} from '@react-navigation/native';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as NotificationActions from '~/store/actions/notifications.actions';

function NotificationHeader() {
  const dispatch = useDispatch();
  return (
    <Appbar
      style={{
        backgroundColor: 'transparent',
      }}>
      <Appbar.Content title="Notificações" />
      <Appbar.Action
        icon="email-open-outline"
        onPress={() => dispatch(NotificationActions.setNotificationsRead())}
      />
    </Appbar>
  );
}

function Main({navigation, notificationsState}) {
  const dispatch = useDispatch();
  const {notifications, initialRow, count} = notificationsState;
  const [refreshing, setRefreshing] = useState(false);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_MAIN_FOCUSED});
    }, []),
  );
  return (
    <Container>
      <Appointments
        data={notifications}
        renderItem={({item}) => (
          <NotifactionCard navigation={navigation} data={item} />
        )}
        keyExtractor={item =>
          item.id
            ? item.id.toString()
            : Math.round(Math.random() * 100000).toString()
        }
        ListFooterComponent={<Footer />}
        ListHeaderComponent={<NotificationHeader />}
        onRefresh={async () => {
          setRefreshing(true);
          await dispatch(NotificationActions.reloadNotifications());
          setRefreshing(false);
        }}
        refreshing={refreshing}
        onEndReached={() => {
          if (count < initialRow) {
            return false;
          }
          dispatch(NotificationActions.getNotifications(initialRow));
        }}
        onEndReachedThreshold={0.9}
      />
    </Container>
  );
}

export default connect(state => ({notificationsState: state.notifications}))(
  Main,
);
