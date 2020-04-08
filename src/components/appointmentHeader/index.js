import React from 'react';
import {useDispatch} from 'react-redux';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  IconButton
} from 'react-native-paper';

import * as AppointmentsActions from '~/store/actions/appointments.actions';
import { Container } from './styles';

export default function appointmentHeader({date}) {
    const dispatch = useDispatch();
    return (
      <Container>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'background',
            duration: 200,
            highlightColor: 'rgba(0, 21, 35, .95)',
          }}
          style={{
            paddingBottom: 20,
            height: '100%'
          }}
          calendarHeaderStyle={{
            color: '#001523',
            marginBottom: 20,
            paddingTop: 10,
          }}
          calendarColor={'transparent'}
          dateNumberStyle={{color: '#001523'}}
          dateNameStyle={{color: '#001523'}}
          highlightDateNumberStyle={{color: '#FFF'}}
          highlightDateNameStyle={{color: '#FFF'}}
          iconContainer={{flex: 0.1}}
          startingDate={moment(
            date
              .split('/')
              .reverse()
              .join('-'),
          )}
          selectedDate={moment(
            date
              .split('/')
              .reverse()
              .join('-'),
          )}
          onDateSelected={async date => {
            await dispatch(
              AppointmentsActions.setFilterDate(
                moment(date).format('DD/MM/YYYY'),
              ),
            );
            dispatch(
              AppointmentsActions.getAppointments(
                moment(date).format('DD/MM/YYYY'),
              ),
            );
          }}
        />
        <IconButton
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          icon="calendar-search"
          onPress={() => dispatch(AppointmentsActions.setDatePickerVisible(true))}
        />
      </Container>
    );
}
