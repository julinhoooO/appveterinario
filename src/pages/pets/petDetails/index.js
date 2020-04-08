import React, {useCallback, useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  List,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  Button,
  Paragraph,
  Portal,
  Chip,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import config from '~/config/api';
import LottieView from 'lottie-react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Backdrop} from 'react-native-backdrop';

//BackdropContent
import BottomSheetMenuContent from '~/components/BottomSheetContent/Vaccines/Menu';
import BottomSheetVaccinesFormContent from '~/components/BottomSheetContent/Vaccines/Form';
import BottomSheetObservationContent from '~/components/BottomSheetContent/Appointment/Observation';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as PetsActions from '~/store/actions/pets.actions';
import * as UsersActions from '~/store/actions/users.actions';
import * as RemindersActions from '~/store/actions/reminders.actions';
import * as AppointmentsActions from '~/store/actions/appointments.actions';

import Header from '~/components/header';
import {
  Container,
  PetAvatar,
  PetAvatarFrame,
  PetAvatarFrameRipple,
  SectionTitle,
  SectionParagraph,
  VerticalSpacer,
  GroupPadded,
  InvisibleMargedDivider,
  RowAlignedView,
  InfoItem,
  InfoIcon,
  ObsItem,
  ObsTitle,
  ObsTitleIcon,
  FormTextInput,
  InfoAppointmentItem,
  Select,
} from './styles';

export default function details({route, navigation}) {
  const {
    pet,
    successVisible,
    confirmationVisible,
    datepickerVisible,
    dropdown,
    message,
    alertDialogVisible,
  } = useSelector(state => state.pets);
  const appointments = useSelector(state => state.appointments);
  const {user} = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [backdropType, setBackdropType] = useState('menu');
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [activeVaccine, setActiveVaccine] = useState(null);
  const [vaccinesSelected, setVaccinesSeleted] = useState([]);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [vaccineObs, setVaccineObs] = useState('');
  const handleBackdrop = (backdropType = 'menu') => {
    setBackdropType(backdropType);
    setBackdropVisible(!backdropVisible);
  };
  function avatarPet() {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Selecione uma foto do animal =)',
      takePhotoButtonTitle: 'Tire uma foto do animal',
      chooseFromLibraryButtonTitle: 'Escolha uma foto do seu animal da galeria',
      cancelButtonTitle: 'Cancelar',
      mediaType: 'photo',
      cameraType: 'back',
      permissionDenied: {
        title: 'Permissão Negada',
        text:
          'Preciso da sua permissão para usar a camêra e acessar sua galeria',
        reTryTitle: 'Tentar novamente',
        okTitle: 'Ok',
      },
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        dispatch(
          PetsActions.saveAvatar({
            image: 'data:image/png;base64,' + response.data,
            id: pet.id,
          }),
        );
      }
    });
  }

  function multiVaccineHandle(id, index) {
    const {vaccines} = dropdown;
    if (index) {
      const selectVaccine = vaccines.filter(vaccine => vaccine.id === id)[0];
      setVaccinesSeleted([...vaccinesSelected, selectVaccine]);
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
  useEffect(() => {
    if (!pet.id) {
      if (route.params) {
        dispatch(PetsActions.getPet(route.params.id));
      }
    }
  }, []);
  useEffect(() => {
    dispatch(PetsActions.getVacinesDropdown({specie: pet.specie}));
    dispatch(RemindersActions.getPetReminders(pet.id));
  }, [pet]);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_DEEP_FOCUSED});
    }, []),
  );
  return (
    <>
      <Header
        navigation={navigation}
        backProps={{
          screen: 'UserDetails',
          screenProps: {
            id: pet && pet.pet_owner ? pet.pet_owner.id : 0,
          },
        }}
        title={pet.name ? pet.name : ''}
        menuItems={[
          {
            onPress: function() {
              navigation.navigate('EditPets');
            },
            title: 'Editar',
            icon: 'pencil',
          },
          {
            onPress: () => dispatch(PetsActions.setConfirmationVisible(true)),
            title: 'Excluir',
            icon: 'delete-outline',
          },
          {
            onPress: () => {
              dispatch(PetsActions.setDatePickerVisible(true));
              dispatch(PetsActions.getVacinesDropdown({specie: pet.specie}));
              setActiveVaccine(null);
            },
            title: 'Vacinação',
            icon: 'needle',
          },
          {
            onPress: () => {
              navigation.navigate('NewAppointments', {
                costumer_id: pet.pet_owner.id,
                animal_id: pet.id,
              });
            },
            title: 'Agendar Consulta',
            icon: 'calendar-plus',
          },
          {
            onPress: () => {
              handleBackdrop('scheduleVaccine')
            },
            title: 'Agendar Vacinação',
            icon: 'calendar-plus',
          },
        ]}
      />
      <Container showsVerticalScrollIndicator={false}>
        <GroupPadded
          paddingLeft={30}
          paddingRight={30}
          paddingTop={30}
          paddingBottom={0}>
          <RowAlignedView>
            <PetAvatarFrame size={254}>
              <PetAvatar
                size={244}
                source={{
                  uri: `${config.imageUrl}/${
                    pet.avatar_url ? pet.avatar_url : 'default_avatar_pet.png'
                  }`,
                }}
              />
              <PetAvatarFrame
                size={94}
                style={{
                  position: 'relative',
                  bottom: -40,
                  right: -84,
                  marginTop: -94,
                }}>
                <IconButton
                  icon="image-plus"
                  color="#666"
                  size={64}
                  onPress={() => avatarPet()}
                />
              </PetAvatarFrame>
            </PetAvatarFrame>
          </RowAlignedView>
          <VerticalSpacer size={15} />
          <Divider />
          <GroupPadded paddingTop={30} paddingBottom={25}>
            {pet.pet_specie && pet.pet_specie.name ? (
              <InfoItem
                title={`${pet.pet_specie.name}${pet.pet_race &&
                  pet.pet_race.name &&
                  `, ${pet.pet_race.name}`}`}
                left={props => (
                  <InfoIcon
                    {...props}
                    icon={
                      pet.pet_specie.name === 'Cachorro'
                        ? 'dog'
                        : pet.pet_specie.name === 'Gato'
                        ? 'cat'
                        : 'paw'
                    }
                  />
                )}
              />
            ) : (
              <></>
            )}
            {pet.birthday ? (
              <InfoItem
                title={pet.birthday
                  .split('-')
                  .reverse()
                  .join('/')}
                left={props => (
                  <InfoIcon {...props} icon="calendar-month-outline" />
                )}
              />
            ) : (
              <></>
            )}
            {pet.sex && (
              <InfoItem
                title={pet.sex === 'M' ? 'Macho' : 'Fêmea'}
                left={props => (
                  <InfoIcon
                    {...props}
                    icon={pet.sex === 'M' ? 'gender-male' : 'gender-female'}
                  />
                )}
              />
            )}
            {pet.castrated ? (
              <InfoItem
                title="Castrado"
                left={props => <InfoIcon {...props} icon="check-decagram" />}
              />
            ) : (
              <InfoItem
                title="Não Castrado"
                left={props => (
                  <InfoIcon {...props} icon="alert-decagram-outline" />
                )}
              />
            )}
          </GroupPadded>
          {pet.obs ? (
            <>
              <ObsTitle
                title="Observações"
                left={props => (
                  <ObsTitleIcon {...props} icon="tooltip-text-outline" />
                )}
              />
              <ObsItem title={pet.obs} titleNumberOfLines={1000} />
            </>
          ) : (
            <></>
          )}
          {pet.pet_appointments && pet.pet_appointments.length ? (
            <>
              <SectionTitle paddingBottom={15} paddingTop={15}>
                Histórico
              </SectionTitle>
              <>
                {pet.pet_appointments
                  .filter(item => item.obs)
                  .map(item => (
                    <InfoAppointmentItem
                      key={item.obs}
                      titleNumberOfLines={1000}
                      title={item.obs}
                      left={props => (
                        <InfoIcon {...props} icon="tooltip-text-outline" />
                      )}
                      right={props => (
                        <IconButton
                          {...props}
                          icon="tooltip-edit"
                          size={24}
                          onPress={() => {
                            setActiveAppointment({
                              ...item,
                              costumer: pet.pet_owner,
                              pet: {
                                id: pet.id,
                                name: pet.name,
                              },
                            });
                            handleBackdrop('observation');
                          }}
                        />
                      )}
                    />
                  ))}
              </>
            </>
          ) : (
            <></>
          )}
          {pet.pet_vaccines && pet.pet_vaccines.length ? (
            <>
              <SectionTitle paddingBottom={15} paddingTop={15}>
                Vacinas
              </SectionTitle>
              <>
                {pet.pet_vaccines.map(item => (
                  <InfoAppointmentItem
                    key={item.id}
                    title={`${item.date
                      .split('-')
                      .reverse()
                      .join('/')} ${item.vaccines.slice(0, -1)}`}
                    description={item.obs ? item.obs : ''}
                    descriptionNumberOfLines={1000}
                    left={props => (
                      <InfoIcon {...props} icon="calendar-outline" />
                    )}
                    right={props => (
                      <IconButton
                        {...props}
                        icon="dots-vertical"
                        size={24}
                        onPress={() => {
                          setActiveVaccine(item);
                          handleBackdrop();
                        }}
                      />
                    )}
                  />
                ))}
              </>
            </>
          ) : (
            <SectionParagraph paddingBottom={15} paddingTop={15}>
              Nenhuma vacina aplicada
            </SectionParagraph>
          )}
          {pet.pet_appointments && pet.pet_appointments.length ? (
            <>
              <SectionTitle paddingBottom={15} paddingTop={15}>
                Consultas Concluídas
              </SectionTitle>
              <>
                {pet.pet_appointments
                  .filter(item => item.completed)
                  .map(item => (
                    <InfoAppointmentItem
                      key={item.id}
                      title={`${item.date
                        .split('-')
                        .reverse()
                        .join('/')} ${item.time}`}
                      left={props => (
                        <InfoIcon {...props} icon="calendar-outline" />
                      )}
                    />
                  ))}
              </>
              <SectionTitle paddingBottom={15} paddingTop={15}>
                Consultas Agendadas
              </SectionTitle>
              <>
                {pet.pet_appointments
                  .filter(item => !item.completed && item.type_id === 'appointment')
                  .map(item => (
                    <InfoAppointmentItem
                      key={item.id}
                      title={`${item.date
                        .split('-')
                        .reverse()
                        .join('/')} ${item.time}`}
                      left={props => (
                        <InfoIcon {...props} icon="calendar-outline" />
                      )}
                    />
                  ))}
              </>
              <SectionTitle paddingBottom={15} paddingTop={15}>
                Vacinas Agendadas
              </SectionTitle>
              <>
                {pet.pet_appointments
                  .filter(item => !item.completed && item.type_id === 'vaccine')
                  .map(item => (
                    <InfoAppointmentItem
                      key={item.id}
                      title={`${item.date
                        .split('-')
                        .reverse()
                        .join('/')} ${item.time}`}
                      description={item.vaccines.slice(0, -1)}
                      left={props => (
                        <InfoIcon {...props} icon="calendar-outline" />
                      )}
                    />
                  ))}
              </>
            </>
          ) : (
            <SectionParagraph paddingBottom={15} paddingTop={15}>
              Nenhuma consulta encontrada
            </SectionParagraph>
          )}
        </GroupPadded>
      </Container>
      <Dialog
        visible={successVisible}
        onDismiss={() => dispatch(PetsActions.setSuccessVisible(false))}>
        <Dialog.Content
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../../assets/lottie/success_delete.json')}
            loop={false}
            resizeMode="cover"
            autoPlay
            style={{width: 48, height: 48, marginBottom: 30, marginTop: 15}}
          />
          <Paragraph style={{fontSize: 18}}>
            Animal excluído com sucesso
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              dispatch(PetsActions.setSuccessVisible(false));
              await dispatch(UsersActions.getCostumer(user.id));
              navigation.navigate('UserDetails');
            }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={confirmationVisible}
        onDismiss={() => dispatch(PetsActions.setConfirmationVisible(false))}>
        <Dialog.Title>Excluir</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{fontSize: 18}}>
            Tem certeza que deseja excluir o animal {pet.name}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              dispatch(PetsActions.setConfirmationVisible(false));
            }}>
            Não
          </Button>
          <Button
            onPress={async () => {
              await dispatch(PetsActions.deletePet({id: pet.id}));
              dispatch(PetsActions.setConfirmationVisible(false));
              dispatch(PetsActions.setSuccessVisible(true));
            }}>
            Sim
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Portal>
        <Dialog
          visible={datepickerVisible}
          onDismiss={() => {
            dispatch(PetsActions.setDatePickerVisible(false));
            setActiveVaccine(null);
            setDate('');
            setVaccinesSeleted([]);
          }}>
          <Dialog.Title>
            {!activeVaccine ? 'Adicionar' : 'Editar'} Vacina
          </Dialog.Title>
          <Dialog.Content>
            <FormTextInput
              label="Data"
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
            <FormTextInput
              label="Observação"
              mode="flat"
              value={vaccineObs}
              onChangeText={setVaccineObs}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                if (!activeVaccine) {
                  await dispatch(
                    PetsActions.setVacine({
                      costumer_id: user.id,
                      animal_id: pet.id,
                      date,
                      obs: vaccineObs,
                      vaccines: multiVaccineStringReturn(vaccinesSelected),
                    }),
                  );
                } else {
                  await dispatch(
                    PetsActions.updateVacine({
                      id: activeVaccine.id,
                      costumer_id: user.id,
                      animal_id: pet.id,
                      date,
                      obs: vaccineObs,
                      vaccines: multiVaccineStringReturn(vaccinesSelected),
                    }),
                  );
                }
                dispatch(PetsActions.setDatePickerVisible(false));
                setActiveVaccine(null);
                setDate('');
                setVaccineObs('');
                setVaccinesSeleted([]);
                setBackdropVisible(false);
                dispatch(PetsActions.setAlertDialogVisible());
              }}>
              {!activeVaccine ? 'Inserir' : 'Salvar'}
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={alertDialogVisible}
          onDismiss={() => dispatch(PetsActions.setAlertDialogVisible())}>
          <Dialog.Content
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../../../assets/lottie/success.json')}
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
              onPress={() => dispatch(PetsActions.setAlertDialogVisible())}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={appointments.alertDialogVisible}
          onDismiss={() =>
            dispatch(AppointmentsActions.setAlertDialogVisible())
          }>
          <Dialog.Content
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../../../assets/lottie/success.json')}
              loop={false}
              autoPlay
              style={{
                width: 300,
                height: 300,
                marginBottom: -140,
                marginTop: -40,
              }}
            />
            <Paragraph style={{fontSize: 18}}>{appointments.message}</Paragraph>
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
      </Portal>
      <Backdrop
        visible={backdropVisible}
        handleOpen={handleBackdrop}
        handleClose={handleBackdrop}
        onClose={() => {
          setActiveVaccine(null);
          setDate('');
          setVaccinesSeleted([]);
        }}
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
          backgroundColor: '#fff'
        }}>
        {backdropType === 'menu' && (
          <BottomSheetMenuContent
            vaccine={activeVaccine}
            handleClose={handleBackdrop}
            setBackdropType={setBackdropType}
          />
        )}
        {backdropType === 'observation' && (
          <BottomSheetObservationContent
            appointment={activeAppointment}
            handleClose={handleBackdrop}
            location="pet"
          />
        )}
        {backdropType === 'scheduleVaccine' && (
          <BottomSheetVaccinesFormContent
            pet={pet}
            handleClose={handleBackdrop}
          />
        )}
      </Backdrop>
    </>
  );
}
