import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  TextInput,
  HelperText,
  Title,
  Subheading,
} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import * as AppointmentsActions from '~/store/actions/appointments.actions';

export default function BottomSheetRescheduleContent({
  appointment,
  handleClose,
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const {activeFilterDate} = useSelector(state => state.appointments);
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height / 2,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Title>
            {`${appointment.costumer.name} - ${appointment.pet.name}`}
          </Title>
          <Subheading>
            {`${appointment.date
              .split('-')
              .reverse()
              .join('/')} ${appointment.time}h`}
          </Subheading>
        </View>
        <TextInput
          style={{
            backgroundColor: 'transparent',
          }}
          label="Data da consulta"
          mode="flat"
          value={date}
          keyboardType="number-pad"
          onChangeText={setDate}
          render={props => (
            <TextInputMask
              {...props}
              type="custom"
              options={{
                mask: '99/99/9999',
              }}
            />
          )}
        />
        <HelperText type="info" visible={true}>
          Formato DD/MM/YYYY
        </HelperText>
        <TextInput
          style={{
            backgroundColor: 'transparent',
          }}
          label="Horário da consulta"
          mode="flat"
          value={time}
          keyboardType="number-pad"
          onChangeText={setTime}
          render={props => (
            <TextInputMask
              {...props}
              type="custom"
              options={{
                mask: '99:99',
              }}
            />
          )}
        />
        <HelperText type="info" visible={true}>
          Formato HH:MM
        </HelperText>
      </View>
      <Button
        mode="text"
        onPress={async () => {
          await dispatch(
            AppointmentsActions.rescheduleAppointment({
              id: appointment.id,
              date,
              time,
              activeFilterDate,
            }),
          );
          handleClose();
        }}>
        Reagendar
      </Button>
    </View>
  );
}
