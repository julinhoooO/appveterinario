import React, {useCallback, useState, useEffect, useRef} from 'react';
import {View, Dimensions, Vibration} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {
  FAB,
  Portal,
  Appbar,
  Dialog,
  Button,
  Paragraph,
} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import {Container, Appointments, Footer, FormTextInput} from './styles';
import AppointmentCard from '~/components/appointmentCard';
import {Backdrop} from 'react-native-backdrop';

//BackdropContent
import BottomSheetMenuContent from '~/components/BottomSheetContent/Appointment/Menu';
import BottomSheetRescheduleContent from '~/components/BottomSheetContent/Appointment/Reschedule';
import BottomSheetObservationContent from '~/components/BottomSheetContent/Appointment/Observation';

import {useFocusEffect} from '@react-navigation/native';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as AppointmentsActions from '~/store/actions/appointments.actions';
import * as NotificationActions from '~/store/actions/notifications.actions';

function AppointmentHeader({date}) {
  const dispatch = useDispatch();
  return (
    <Appbar
      style={{
        backgroundColor: 'transparent',
      }}>
      <Appbar.Content title={`Consultas agendadas${date ? ' ' + date : ''}`} />
      <Appbar.Action
        icon="calendar-search"
        onPress={() => dispatch(AppointmentsActions.setDatePickerVisible(true))}
      />
    </Appbar>
  );
}

function Main({navigation, appointmentsState, notificationsState}) {
  const dispatch = useDispatch();
  const {
    appointments,
    datepickerVisible,
    activeFilterDate,
    alertDialogVisible,
    message,
  } = appointmentsState;
  const [backdropType, setBackdropType] = useState('menu');
  const [fabButtonVisible, setFabButtonVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const handleBackdrop = () => {
    setBackdropVisible(!backdropVisible);
    setBackdropType('menu');
  };
  useEffect(() => {
    dispatch(AppointmentsActions.getAppointments());
    dispatch(NotificationActions.getNotifications(0));
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_MAIN_FOCUSED});
      setFabButtonVisible(true);
      return () => {
        setFabButtonVisible(false);
      };
    }, []),
  );
  return (
    <>
      <Container>
        <Appointments
          data={appointments}
          renderItem={({item}) => (
            <AppointmentCard
              onIconButtonPress={() => {
                setActiveAppointment(item);
                handleBackdrop();
                Vibration.vibrate([1, 50, 30, 50]);
              }}
              data={item}
            />
          )}
          keyExtractor={item =>
            item.id
              ? item.id.toString()
              : Math.round(Math.random() * 100000).toString()
          }
          ListFooterComponent={<Footer />}
          ListHeaderComponent={<AppointmentHeader date={activeFilterDate} />}
          onRefresh={async () => {
            setRefreshing(true);
            await dispatch(
              AppointmentsActions.getAppointments(activeFilterDate),
            );
            setRefreshing(false);
          }}
          refreshing={refreshing}
        />
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          icon="calendar"
          onPress={() => {
            navigation.navigate('NewAppointments');
          }}
          visible={fabButtonVisible}
        />
      </Container>
      <Portal>
        <Backdrop
          visible={backdropVisible}
          handleOpen={handleBackdrop}
          handleClose={handleBackdrop}
          onClose={() => {}}
          swipeConfig={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          animationConfig={{
            speed: 14,
            bounciness: 4,
          }}
          overlayColor="rgba(0,0,0,0.32)"
          backdropStyle={{
            backgroundColor: '#fff',
            minHeight: Dimensions.get('window').height / 2,
          }}>
          {backdropType === 'menu' && (
            <BottomSheetMenuContent
              appointment={activeAppointment}
              handleClose={handleBackdrop}
              setBackdropType={setBackdropType}
            />
          )}
          {backdropType === 'reschedule' && (
            <BottomSheetRescheduleContent
              appointment={activeAppointment}
              handleClose={handleBackdrop}
            />
          )}
          {backdropType === 'observation' && (
            <BottomSheetObservationContent
              appointment={activeAppointment}
              handleClose={handleBackdrop}
            />
          )}
        </Backdrop>
      </Portal>
      <Dialog
        visible={datepickerVisible}
        onDismiss={() =>
          dispatch(AppointmentsActions.setDatePickerVisible(false))
        }>
        <Dialog.Title>Filtrar Consultas</Dialog.Title>
        <Dialog.Content>
          <FormTextInput
            label="Data"
            mode="flat"
            value={activeFilterDate}
            keyboardType="number-pad"
            onChangeText={text =>
              dispatch(AppointmentsActions.setFilterDate(text))
            }
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
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              dispatch(
                AppointmentsActions.getAppointments(
                  AppointmentsActions.today(),
                ),
              );
              dispatch(
                AppointmentsActions.setFilterDate(AppointmentsActions.today()),
              );
              dispatch(AppointmentsActions.setDatePickerVisible(false));
            }}>
            Resetar
          </Button>
          <Button
            onPress={async () => {
              await dispatch(
                AppointmentsActions.getAppointments(activeFilterDate),
              );
              dispatch(AppointmentsActions.setDatePickerVisible(false));
            }}>
            Filtrar
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={alertDialogVisible}
        onDismiss={() => dispatch(AppointmentsActions.setAlertDialogVisible())}>
        <Dialog.Content
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../assets/lottie/success.json')}
            loop={false}
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
            onPress={() =>
              dispatch(AppointmentsActions.setAlertDialogVisible())
            }>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

export default connect(state => ({
  appointmentsState: state.appointments,
  notificationsState: state.notifications,
}))(Main);
