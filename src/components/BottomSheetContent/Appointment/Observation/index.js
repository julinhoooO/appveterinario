import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, TextInput, Title, Subheading} from 'react-native-paper';
import * as AppointmentsActions from '~/store/actions/appointments.actions';
import * as PetsActions from '~/store/actions/pets.actions';

export default function BottomSheetObservationContent({
  appointment,
  handleClose,
  location,
}) {
  const [obs, setObs] = useState(appointment.obs);
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
          label="Observação"
          mode="flat"
          value={obs}
          onChangeText={setObs}
          multiline
        />
      </View>
      <Button
        mode="text"
        onPress={() => {
          dispatch(
            AppointmentsActions.appointmentObservation({
              id: appointment.id,
              obs,
              activeFilterDate,
            }),
          );
          if (location === 'pet') {
            console.log(location);
            dispatch(PetsActions.getPet(appointment.pet.id));
          }
          handleClose();
        }}>
        Salvar
      </Button>
    </View>
  );
}
