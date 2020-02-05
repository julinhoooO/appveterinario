import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import LottieView from 'lottie-react-native';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as PetsActions from '~/store/actions/pets.actions';
import * as UsersActions from '~/store/actions/users.actions';

import {
  FAB,
  RadioButton,
  HelperText,
  Switch,
  TouchableRipple,
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
} from './styles';

import Header from '~/components/header';

export default function newPets({navigation}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users);
  const {dropdown} = useSelector(state => state.pets);
  async function createPet() {
    Keyboard.dismiss();
    setLoadingFabButton(true);
    await dispatch(
      PetsActions.createPet({
        costumer_id: user.id,
        name,
        sex,
        birthday,
        race,
        specie,
        castrated,
        obs,
        costumer_id,
      }),
    );
    setFabButtonIcon('check-bold');
    setLoadingFabButton(false);
    await dispatch(UsersActions.getCostumer(user.id));
    setSuccess(true);
    setDialogVisible(true);
  }
  //UseStatex
  const [costumer_id, setCostumerId] = useState(user.id);
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

  function keyboardDidShow() {
    setFabButtonVisible(false);
  }

  function keyboardDidHide() {
    setFabButtonVisible(true);
  }

  useEffect(() => {
    dispatch(PetsActions.getSpeciesDropdown());
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
  return (
    <>
      <Header
        navigation={navigation}
        title={`Cadastrar Novo Animal para ${user.name}`}
      />
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
            <FormDivider />
            {dropdown && dropdown.species ? (
              <Select
                selectedValue={specie}
                onValueChange={(itemValue, itemIndex) => {
                  setSpecie(itemValue);
                  dispatch(PetsActions.getRacesDropdown(itemValue));
                }}
                prompt="Espécie"
                mode="dropdown">
                <Select.Item label="Selecione a espécie" value="" />
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
                  prompt="Espécie"
                  mode="dropdown">
                  <Select.Item label="Selecione a raça" value="" />
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
              value={birthday}
              keyboardType="number-pad"
              onChangeText={setBirthday}
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
            Animal {name} cadastrado com sucesso para o cliente {user.name}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              success && navigation.replace('PetDetails');
            }}>
            Ver Pet
          </Button>
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
