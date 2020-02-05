import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import ImagePicker from 'react-native-image-picker';
import LottieView from 'lottie-react-native';

import config from '~/config/api';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as PetsActions from '~/store/actions/pets.actions';
import * as UsersActions from '~/store/actions/users.actions';

import {
  FAB,
  RadioButton,
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
  FormRow,
  Select,
  FormText,
  FormDivider,
  RowAlignedView,
  PetAvatarFrame,
  PetAvatar,
  PetAvatarFrameRipple,
} from './styles';

import Header from '~/components/header';

export default function newPets({navigation}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users);
  const {pet} = useSelector(state => state.pets);
  const {dropdown} = useSelector(state => state.pets);
  async function createPet() {
    Keyboard.dismiss();
    setLoadingFabButton(true);
    await dispatch(
      PetsActions.savePet({
        id: pet.id,
        costumer_id: user.id,
        name,
        sex,
        birthday,
        race,
        specie,
        castrated,
        obs,
      }),
    );
    setFabButtonIcon('check-bold');
    setLoadingFabButton(false);
    await dispatch(UsersActions.getCostumer(user.id));
    setSuccess(true);
    setDialogVisible(true);
  }
  //UseState
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [race, setRace] = useState('');
  const [specie, setSpecie] = useState('');
  const [castrated, setCastrated] = useState('');
  const [obs, setObs] = useState('');
  const [loadingFabButton, setLoadingFabButton] = useState(false);
  const [fabButtonIcon, setFabButtonIcon] = useState('content-save');
  const [fabButtonVisible, setFabButtonVisible] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  //UseRef
  const refName = useRef(null);
  const refSex = useRef(null);
  const refBirthday = useRef(null);
  const refRace = useRef(null);
  const refSpecie = useRef(null);
  const refPickerSpecie = useRef(null);
  const refCastrated = useRef(null);
  const refObs = useRef(null);

  function keyboardDidShow() {
    setFabButtonVisible(false);
  }

  function keyboardDidHide() {
    setFabButtonVisible(true);
  }
  useEffect(() => {
    dispatch(PetsActions.getSpeciesDropdown());
    setName(pet.name);
    setRace(pet.race);
    setBirthday(pet.birthday);
    setCastrated(pet.castrated);
    setObs(pet.obs);
    setSex(pet.sex);
    setSpecie(pet.specie);
    if (pet.specie) {
      dispatch(PetsActions.getRacesDropdown(pet.specie));
    }
  }, [pet]);
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
  return (
    <>
      <Header navigation={navigation} title={`Editar Animal ${pet.name}`} />
      <FormContainer>
        <Form showsVerticalScrollIndicator={false}>
          <SectionFormTitle>Dados do Animal</SectionFormTitle>
          <GroupInputForm paddingLeft={12}>
            <FormTextInput
              label="Nome"
              mode="flat"
              value={name}
              onChangeText={setName}
              ref={refName}
              returnKeyType={!sex ? 'next' : 'done'}
              onSubmitEditing={() => !sex && refSex.current.focus()}
            />
            <RadioButton.Group
              onValueChange={value => setSex(value)}
              value={sex}>
              <FormRow>
                <FormText onPress={() => setSex('M')}>Macho</FormText>
                <RadioButton value="M" />
                <FormText onPress={() => setSex('F')}>Fêmea</FormText>
                <RadioButton value="F" />
              </FormRow>
            </RadioButton.Group>
            <FormDivider />
            {dropdown && dropdown.species ? (
              <Select
                selectedValue={specie}
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue && itemValue !== pet.specie) {
                    setSpecie(itemValue);
                    dispatch(PetsActions.getRacesDropdown(itemValue));
                  }
                }}
                ref={refPickerSpecie}
                prompt="Espécie"
                mode="dropdown">
                {dropdown.species.map(item => (
                  <Select.Item
                    label={item.name ? item.name : ''}
                    value={item.id ? item.id : ''}
                  />
                ))}
              </Select>
            ) : (
              <></>
            )}
            <FormDivider />
            {specie && dropdown && dropdown.races ? (
              <>
                <Select
                  selectedValue={race}
                  onValueChange={(itemValue, itemIndex) => setRace(itemValue)}
                  ref={refRace}
                  prompt="Espécie"
                  mode="dropdown">
                  {dropdown.races.map(item => (
                    <Select.Item
                      label={item.name ? item.name : ''}
                      value={item.id ? item.id : ''}
                    />
                  ))}
                </Select>
                <FormDivider />
              </>
            ) : (
              <></>
            )}
            <FormTextInput
              label="Data de nascimento"
              mode="flat"
              value={
                birthday
                  ? birthday
                      .split('-')
                      .reverse()
                      .join('/')
                  : ''
              }
              onChangeText={setBirthday}
              keyboardType="number-pad"
              render={props => (
                <TextInputMask
                  {...props}
                  ref={refBirthday}
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
          </GroupInputForm>
          <InvisibleMargedDivider marginTop={24} />
          <SectionFormTitle>Saúde</SectionFormTitle>
          <GroupInputForm paddingLeft={12}>
            <TouchableRipple onPress={() => setCastrated(!castrated)}>
              <FormRow>
                <FormText
                  marginRight={10}
                  onPress={() => setCastrated(!castrated)}>
                  Castrado
                </FormText>
                <Switch
                  value={castrated}
                  onValueChange={() => setCastrated(!castrated)}
                />
              </FormRow>
            </TouchableRipple>
            <FormDivider />
            <FormTextInput
              label="Observações"
              multiline
              mode="flat"
              value={obs}
              onChangeText={setObs}
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
          createPet();
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
            Animal {name} salvo com sucesso
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              success && navigation.goBack();
            }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
