import React, {useState} from 'react';
import {View} from 'react-native';
import {
  List,
  Dialog,
  Portal,
  Paragraph,
  Button,
  Title,
  Subheading,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as AppointmentsActions from '~/store/actions/appointments.actions';

export default function BottomSheetMenuContent({
  setBackdropType,
  appointment,
  handleClose,
}) {
  const [dialogType, setDialogType] = useState('completed');
  const [alertVisible, setAlertVisible] = useState(false);
  const {confirmDeleteDialogVisible, message, activeFilterDate} = useSelector(
    state => state.appointments,
  );
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: '#FFF',
      }}>
      {appointment && !appointment.completed && (
        <List.Item
          title={`Reagendar ${appointment && appointment.type_id === "vaccine" ? "Vacinação" : "Consulta"}`}
          onPress={() => setBackdropType('reschedule')}
          left={props => <List.Icon {...props} icon="calendar-clock" />}
        />
      )}
      <List.Item
        title={`${
          appointment && !appointment.obs ? 'Adicionar' : 'Alterar'
        } observação`}
        onPress={() => setBackdropType('observation')}
        left={props => (
          <List.Icon {...props} icon="file-document-edit-outline" />
        )}
      />
      {appointment && !appointment.completed && (
        <List.Item
          title="Marcar como concluída"
          onPress={() => {
            setDialogType('completed');
            dispatch(AppointmentsActions.setConfirmDeleteDialogVisible());
          }}
          left={props => <List.Icon {...props} icon="calendar-check" />}
        />
      )}
      <List.Item
        title={`${
          appointment && !appointment.completed ? 'Desmarcar' : 'Excluir'
        } ${appointment && appointment.type_id === "vaccine" ? "Vacinação" : "Consulta"}`}
        onPress={() => {
          setDialogType(
            appointment && !appointment.completed ? 'unschedule' : 'delete',
          );
          dispatch(AppointmentsActions.setConfirmDeleteDialogVisible());
        }}
        left={props => <List.Icon {...props} icon="calendar-minus" />}
      />
      {appointment && appointment.type_id === "vaccine" && !appointment.completed && (
      <List.Item
        title="Alterar Vacinas"
        onPress={() => setBackdropType('editVaccine')}
        left={props => <List.Icon {...props} icon="needle" />}
      />)}
      <Portal>
        <Dialog visible={alertVisible} onDismiss={() => setAlertVisible(false)}>
          <Dialog.Content
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../../../../assets/lottie/success.json')}
              loop={false}
              resizeMode="cover"
              autoPlay
              style={{
                width: 300,
                height: 300,
                marginBottom: -140,
                marginTop: -40,
              }}
            />
            <Paragraph style={{fontSize: 18}}>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setAlertVisible(false);
                handleClose();
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={confirmDeleteDialogVisible}
          onDismiss={() =>
            dispatch(AppointmentsActions.setConfirmDeleteDialogVisible())
          }>
          <Dialog.Content>
            <Paragraph style={{fontSize: 18}}>
              {dialogType === 'completed'
                ? 'Tem certeza que deseja concluir essa consulta?'
                : `Tem certeza que deseja ${
                    dialogType === 'delete' ? 'excluir' : 'desmarcar'
                  } essa consulta?`}
            </Paragraph>
            <View>
              <Title>
                {`${appointment ? appointment.costumer.name : ''} - ${
                  appointment ? appointment.pet.name : ''
                }`}
              </Title>
              <Subheading>
                {`${
                  appointment
                    ? appointment.date
                        .split('-')
                        .reverse()
                        .join('/')
                    : ''
                } ${appointment ? appointment.time : ''}h`}
              </Subheading>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() =>
                dispatch(AppointmentsActions.setConfirmDeleteDialogVisible())
              }>
              Não
            </Button>
            <Button
              onPress={async () => {
                if (dialogType === 'completed') {
                  await dispatch(
                    AppointmentsActions.completedAppointment({
                      id: appointment ? appointment.id : '',
                      activeFilterDate,
                    }),
                  );
                } else if (dialogType === 'delete' || dialogType === 'unschedule') {
                  await dispatch(
                    AppointmentsActions.deleteAppointment({
                      id: appointment ? appointment.id : '',
                      activeFilterDate,
                    }),
                  );
                }
                dispatch(AppointmentsActions.setConfirmDeleteDialogVisible());
                setAlertVisible(true);
              }}>
              Sim
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
