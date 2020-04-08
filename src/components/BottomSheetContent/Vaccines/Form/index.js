import React, {useState, useEffect, useRef} from 'react';
import { View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import LottieView from 'lottie-react-native';
import {
    HelperText,
    Button,
    Chip,
    Dialog,
    Paragraph,
    Portal
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


import * as PetsActions from '~/store/actions/pets.actions';
import * as AppointmentsActions from '~/store/actions/appointments.actions';

export default function VaccineScheduleForm({pet, handleClose, edit, appointment}) {
    const dispatch = useDispatch();
    const [costumer_id, setCostumerId] = useState(!edit ? pet.pet_owner ? pet.pet_owner.id : null : appointment.costumer.id);
    const [animal_id, setAnimalId] = useState(!edit ? pet ? pet.id : null : appointment.pet.id);
    const [date, setDate] = useState(appointment ? appointment.date : '');
    const [time, setTime] = useState(appointment ? appointment.time : '');
    const [vaccinesSelected, setVaccinesSeleted] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const refDate = useRef(null);
    const refTime = useRef(null);
    const {
        dropdown,
    } = useSelector(state => state.pets);
    const {activeFilterDate} = useSelector(
      state => state.appointments,
    );
    useEffect(() => {
      if(!edit){
        dispatch(PetsActions.getVacinesDropdown({specie: pet.specie}));
      }else{
        dispatch(PetsActions.getVacinesDropdown({pet: appointment.pet.id}));
      }
    }, [pet]);

    function multiVaccineHandle(id, index) {
        const {vaccines} = dropdown;
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
        <FormContainer>
            <Form showsVerticalScrollIndicator={false}>
            <SectionFormTitle>{!edit ? "Agendar" : "Alterar"} Vacinaçao</SectionFormTitle>
            <GroupInputForm paddingLeft={12}>
              {!edit && (
                <>
                  <FormTextInput
                  label="Data da vacinação"
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
                </>
              )}
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
                onValueChange={(itemValue, itemIndex) => {
                    multiVaccineHandle(itemValue, itemIndex);
                }}
                prompt="Vacinas"
                mode="dropdown">
                <Select.Item label="Selecione uma vacina" value="" />
                {dropdown.vaccines &&
                    dropdown.vaccines.map(item => (
                    <Select.Item
                        key={item.name}
                        label={item.name}
                        value={item.id}
                    />
                    ))}
                </Select>
            </GroupInputForm>
            <InvisibleMargedDivider marginTop={24} />
            </Form>
            <Button
              mode="text"
              onPress={async () => {
                if(!edit){
                  await dispatch(
                    AppointmentsActions.createAppointment({
                      type_id: 'vaccine',
                      costumer_id,
                      animal_id,
                      date,
                      time,
                      vaccines: multiVaccineStringReturn(vaccinesSelected)
                    }),
                  );
                }else{
                  await dispatch(
                    AppointmentsActions.editVaccine({
                      id: appointment.id,
                      vaccines: multiVaccineStringReturn(vaccinesSelected),
                      activeFilterDate
                    }),
                  );
                }
                setSuccess(true);
                setDialogVisible(true);
              }}>
              {!edit ? "Agendar" : "Salvar"}
            </Button>
            <Portal>
              <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                <Dialog.Title>Sucesso</Dialog.Title>
                <Dialog.Content
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <LottieView
                    source={require('../../../../assets/lottie/success.json')}
                    loop={false}
                    autoPlay
                    style={{width: 160, height: 160, marginBottom: -70, marginTop: -30}}
                  />
                  <Paragraph style={{fontSize: 18}}>
                    Vacinação {!edit ? "agendada" : "salva"} com sucesso
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      setDialogVisible(false);
                      handleClose();
                    }}>
                    Voltar
                  </Button>
                </Dialog.Actions>
              </Dialog>
          </Portal>
        </FormContainer>
    );
}
