import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import LottieView from 'lottie-react-native';

import config from '~/config/api';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as PetsActions from '~/store/actions/pets.actions';
import * as UsersActions from '~/store/actions/users.actions';
import * as AppointmentsActions from '~/store/actions/appointments.actions';

import {
  FAB,
  Chip,
  HelperText,
  Switch,
  TouchableRipple,
  IconButton,
  Paragraph,
  Dialog,
  Button,
} from 'react-native-paper';
import {
  Form,
  FormContainer,
  InvisibleMargedDivider,
  FormTextInput,
  SectionFormTitle,
  GroupInputForm,
  Select,
  FormDivider,
} from './styles';

import Header from '~/components/header';

export default function newAppointments({navigation, route}) {
  const dispatch = useDispatch();
  const {dropdown, activeFilterDate} = useSelector(state => state.appointments);
  const {vaccines}  = useSelector(state => state.pets.dropdown);
  async function createAppointment() {
    Keyboard.dismiss();
    setLoadingFabButton(true);
    await dispatch(
      AppointmentsActions.createAppointment({
        type_id,
        costumer_id,
        animal_id,
        date,
        time,
        vaccines: multiVaccineStringReturn(vaccinesSelected),
        activeFilterDate,
      }),
    );
    setFabButtonIcon('check-bold');
    setLoadingFabButton(false);
    setSuccess(true);
    setDialogVisible(true);
    setVaccinesSeleted([]);
  }
  //UseState
  const [type_id, setTypeId] = useState('');
  const [costumer_id, setCostumerId] = useState('');
  const [animal_id, setAnimalId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loadingFabButton, setLoadingFabButton] = useState(false);
  const [fabButtonIcon, setFabButtonIcon] = useState('content-save');
  const [fabButtonVisible, setFabButtonVisible] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vaccinesSelected, setVaccinesSeleted] = useState([]);

  //UseRef
  const refCostumer = useRef(null);
  const refPet = useRef(null);
  const refDate = useRef(null);
  const refTime = useRef(null);
  const refAppointmentType = useRef(null);

  function keyboardDidShow() {
    setFabButtonVisible(false);
  }

  function keyboardDidHide() {
    setFabButtonVisible(true);
  }

  useEffect(() => {
    dispatch(AppointmentsActions.getCostumersDropdown());
    if (route.params) {
      if (route.params.costumer_id) {
        setCostumerId(route.params.costumer_id);
      }
      if (route.params.animal_id) {
        dispatch(
          AppointmentsActions.getAnimalsDropdown(route.params.costumer_id),
        );
        setAnimalId(route.params.animal_id);
      }
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_DEEP_FOCUSED});
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        keyboardDidShow,
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        keyboardDidHide,
      );
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []),
  );
  function multiVaccineHandle(id, index) {
    if (index) {
      const selectVaccine = vaccines.filter(vaccine => vaccine.id === id)[0];
      setVaccinesSeleted([...vaccinesSelected, selectVaccine]);
      multiVaccineStringReturn(vaccinesSelected);
    }
  }
  function multiVaccineStringReturn(vaccines) {
    let str = '';
    vaccines.map((vaccine, index) => {
      str += `${vaccine.name}${vaccines.length > index ? ', ' : ''}`;
      return str;
    });
    return str;
  }
  function deselectVaccine(id) {
    const selectVaccine = vaccinesSelected.filter(vaccine => vaccine.id !== id);
    setVaccinesSeleted(selectVaccine);
  }
  return (
    <>
      <Header navigation={navigation} title={`Agendar nova consulta`} />
      <FormContainer>
        <Form showsVerticalScrollIndicator={false}>
          <SectionFormTitle>Dados da Consulta</SectionFormTitle>
          <GroupInputForm paddingLeft={12}>
            <Select
              selectedValue={type_id}
              onValueChange={(itemValue, itemIndex) => {
                setTypeId(itemValue);
              }}
              ref={refAppointmentType}
              prompt="Tipo"
              mode="dropdown">
              <Select.Item label="Selecione o tipo da consulta" value="" />
              <Select.Item label="Consulta" value="appointment" />
              <Select.Item label="Vacinação" value="vaccine" />
            </Select>
            <FormDivider />
            <Select
              selectedValue={costumer_id}
              onValueChange={(itemValue, itemIndex) => {
                setCostumerId(itemValue);
                if (itemValue) {
                  dispatch(AppointmentsActions.getAnimalsDropdown(itemValue));
                }
              }}
              ref={refCostumer}
              prompt="Cliente"
              mode="dropdown">
              <Select.Item label="Selecione o cliente" value="" />
              {dropdown.costumers.map(item => (
                <Select.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Select>
            <FormDivider />
            {costumer_id ? (
              <>
                <Select
                  selectedValue={animal_id}
                  onValueChange={(itemValue, itemIndex) => {
                    setAnimalId(itemValue);
                    if(itemValue){
                      dispatch(PetsActions.getVacinesDropdown({pet: itemValue}));
                    }
                  }}
                  ref={refPet}
                  prompt="Animal"
                  mode="dropdown">
                  {dropdown.animals.map(item => (
                    <Select.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Select>
                <FormDivider />
              </>
            ) : (
              <></>
            )}
            <>
            {type_id === 'vaccine' && animal_id && vaccines.length ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                  }}>
                  {vaccinesSelected.map(vaccine => (
                    <Chip
                      style={{marginRight: 10}}
                      onClose={() => deselectVaccine(vaccine.id)}>
                      {vaccine.name}
                    </Chip>
                  ))}
                </View>
                <Select
                selectedValue=""
                onValueChange={(itemValue, itemIndex) => {
                    multiVaccineHandle(itemValue, itemIndex);
                }}
                prompt="Vacinas"
                mode="dropdown">
                <Select.Item label="Selecione uma vacina" value="" />
                {vaccines &&
                    vaccines.map(item => (
                    <Select.Item
                        key={item.name}
                        label={item.name}
                        value={item.id}
                    />
                    ))}
                </Select>
              </>
            ) : <></>}
            </>
            <FormTextInput
              label="Data da consulta"
              mode="flat"
              value={date}
              keyboardType="number-pad"
              onChangeText={setDate}
              render={props => (
                <TextInputMask
                  {...props}
                  ref={refDate}
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
            <FormTextInput
              label="horario"
              mode="flat"
              value={time}
              keyboardType="number-pad"
              onChangeText={setTime}
              render={props => (
                <TextInputMask
                  {...props}
                  ref={refTime}
                  type="custom"
                  options={{
                    mask: '99:99',
                  }}
                />
              )}
            />
            
          </GroupInputForm>
          <InvisibleMargedDivider marginTop={24} />
        </Form>
      </FormContainer>
      <FAB
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          margin: 16,
        }}
        loading={loadingFabButton}
        icon={fabButtonIcon}
        onPress={() => {
          createAppointment();
        }}
        visible={fabButtonVisible}
      />
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Sucesso</Dialog.Title>
        <Dialog.Content
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../../assets/lottie/success.json')}
            loop={false}
            autoPlay
            style={{width: 160, height: 160, marginBottom: -70, marginTop: -30}}
          />
          <Paragraph style={{fontSize: 18}}>
            Consulta agendada com sucesso
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              success && navigation.goBack();
            }}>
            Voltar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
