import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import api from '~/services/api';
import {TextInputMask} from 'react-native-masked-text';
import LottieView from 'lottie-react-native';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as UsersActions from '~/store/actions/users.actions';

import {FAB, Paragraph, Dialog, Button} from 'react-native-paper';
import {
  Form,
  FormContainer,
  InvisibleMargedDivider,
  FormTextInput,
  SectionFormTitle,
  GroupInputForm,
} from './styles';

import Header from '~/components/header';

const cepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export default function editUsers({navigation}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users);
  async function saveCostumer() {
    Keyboard.dismiss();
    setLoadingFabButton(true);
    await dispatch(
      UsersActions.saveCostumer({
        id: user.id,
        name,
        email,
        birthday,
        tellphone,
        cellphone,
        cpf,
        rg,
        street,
        number,
        neighborhood,
        city,
        state,
      }),
    );

    setFabButtonIcon('check-bold');
    setLoadingFabButton(false);
    await dispatch(UsersActions.getCostumer(user.id));
    setSuccess(true);
    setDialogVisible(true);
  }
  //UseState
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [tellphone, setTellphone] = useState(user.tellphone);
  const [cellphone, setCellphone] = useState(user.cellphone);
  const [cpf, setCpf] = useState(user.cpf);
  const [rg, setRg] = useState(user.rg);
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState(user.street);
  const [number, setNumber] = useState(user.number);
  const [neighborhood, setNeighborhood] = useState(user.neighborhood);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [loadingFabButton, setLoadingFabButton] = useState(false);
  const [fabButtonIcon, setFabButtonIcon] = useState('content-save');
  const [fabButtonVisible, setFabButtonVisible] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  //UseRef

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refBirthday = useRef(null);
  const refTellphone = useRef(null);
  const refCellphone = useRef(null);
  const refCpf = useRef(null);
  const refRg = useRef(null);
  const refCep = useRef(null);
  const refStreet = useRef(null);
  const refNumber = useRef(null);
  const refNeighborhood = useRef(null);
  const refCity = useRef(null);
  const refState = useRef(null);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_DEEP_FOCUSED});
    }, []),
  );
  async function getAddressData(cep) {
    const response = await cepApi.get(`/${cep}/json/`);
    if (response.status === 200) {
      const {data} = response;
      setStreet(data.logradouro);
      setNeighborhood(data.bairro);
      setCity(data.localidade);
      setState(data.uf);
      if (data.logradouro) {
        refNumber.current.focus();
      } else {
        refStreet.current.focus();
      }
    } else {
      alert(`Error: ${response.status}, ${response.statusText}`);
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <Header navigation={navigation} title={`Editar ${name}`} />
      <FormContainer>
        <Form showsVerticalScrollIndicator={false}>
          <SectionFormTitle>Dados Pessoais</SectionFormTitle>
          <GroupInputForm paddingLeft={12}>
            <FormTextInput
              label="Nome"
              mode="flat"
              value={name}
              onChangeText={setName}
              ref={refName}
              returnKeyType={!email ? 'next' : 'done'}
              onSubmitEditing={() => !email && refEmail.current.focus()}
            />
            <FormTextInput
              label="Email"
              mode="flat"
              value={email}
              onChangeText={setEmail}
              ref={refEmail}
              returnKeyType={!birthday ? 'next' : 'done'}
              onSubmitEditing={() =>
                !birthday && refBirthday.current._inputElement.focus()
              }
            />
            <FormTextInput
              label="Data de nascimento"
              mode="flat"
              keyboardType="number-pad"
              value={
                birthday
                  ? birthday
                      .split('-')
                      .reverse()
                      .join('/')
                  : ''
              }
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
              returnKeyType={!tellphone ? 'next' : 'done'}
              onSubmitEditing={() =>
                !tellphone && refTellphone.current._inputElement.focus()
              }
            />
          </GroupInputForm>
          <InvisibleMargedDivider marginTop={24} />
          <SectionFormTitle>Contato</SectionFormTitle>
          <GroupInputForm paddingLeft={12}>
            <FormTextInput
              label="Telefone"
              keyboardType="number-pad"
              mode="flat"
              value={tellphone}
              onChangeText={setTellphone}
              render={props => (
                <TextInputMask
                  {...props}
                  type="custom"
                  ref={refTellphone}
                  options={{
                    mask: '(99) 9999-9999',
                  }}
                />
              )}
              returnKeyType={!cellphone ? 'next' : 'done'}
              onSubmitEditing={() =>
                !cellphone && refCellphone.current._inputElement.focus()
              }
            />
            <FormTextInput
              label="Celular"
              mode="flat"
              value={cellphone}
              onChangeText={setCellphone}
              render={props => (
                <TextInputMask
                  {...props}
                  type="cel-phone"
                  ref={refCellphone}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                />
              )}
              returnKeyType={!cpf ? 'next' : 'done'}
              onSubmitEditing={() =>
                !cpf && refCpf.current._inputElement.focus()
              }
            />
          </GroupInputForm>
          <InvisibleMargedDivider marginTop={24} />
          <SectionFormTitle>Documentos</SectionFormTitle>
          <GroupInputForm paddingLeft={12}>
            <FormTextInput
              label="CPF"
              mode="flat"
              value={cpf}
              onChangeText={setCpf}
              render={props => (
                <TextInputMask {...props} type="cpf" ref={refCpf} />
              )}
              onSubmitEditing={() => !rg && refRg.current._inputElement.focus()}
              returnKeyType={!rg ? 'next' : 'done'}
            />
            <FormTextInput
              label="RG"
              mode="flat"
              keyboardType="number-pad"
              value={rg}
              onChangeText={setRg}
              render={props => (
                <TextInputMask
                  {...props}
                  type="custom"
                  ref={refRg}
                  options={{
                    mask: '99.999.999-9',
                  }}
                />
              )}
              onSubmitEditing={() =>
                !cep && refCep.current._inputElement.focus()
              }
              returnKeyType={!cep ? 'next' : 'done'}
            />
          </GroupInputForm>
          <InvisibleMargedDivider marginTop={24} />
          <SectionFormTitle>Endereço</SectionFormTitle>
          <GroupInputForm paddingLeft={12} paddingBottom={86}>
            <FormTextInput
              label="CEP"
              keyboardType="number-pad"
              mode="flat"
              value={cep}
              onChangeText={setCep}
              onBlur={() => {
                getAddressData(cep);
              }}
              render={props => (
                <TextInputMask
                  {...props}
                  type="custom"
                  ref={refCep}
                  options={{
                    mask: '99999-999',
                  }}
                />
              )}
              returnKeyType={!street ? 'next' : 'done'}
            />
            <FormTextInput
              label="Rua"
              mode="flat"
              value={street}
              onChangeText={setStreet}
              ref={refStreet}
              returnKeyType={!number ? 'next' : 'done'}
              onSubmitEditing={() => !number && refNumber.current.focus()}
            />
            <FormTextInput
              label="Número"
              mode="flat"
              value={number}
              onChangeText={setNumber}
              ref={refNumber}
              returnKeyType={!neighborhood ? 'next' : 'done'}
              onSubmitEditing={() =>
                !neighborhood && refNeighborhood.current.focus()
              }
            />
            <FormTextInput
              label="Bairro"
              mode="flat"
              value={neighborhood}
              onChangeText={setNeighborhood}
              ref={refNeighborhood}
              returnKeyType={!city ? 'next' : 'done'}
              onSubmitEditing={() => !city && refCity.current.focus()}
            />
            <FormTextInput
              label="Cidade"
              mode="flat"
              value={city}
              onChangeText={setCity}
              ref={refCity}
              returnKeyType={!state ? 'next' : 'done'}
              onSubmitEditing={() =>
                !state && refState.current._inputElement.focus()
              }
            />
            <FormTextInput
              label="Estado"
              mode="flat"
              value={state}
              onChangeText={setState}
              render={props => (
                <TextInputMask
                  {...props}
                  type="custom"
                  ref={refState}
                  options={{
                    mask: 'AA',
                  }}
                />
              )}
              returnKeyType="done"
              onSubmitEditing={() => {
                saveCostumer();
              }}
            />
          </GroupInputForm>
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
          saveCostumer();
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
            Usuário {user.name} salvo com sucesso
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              success && navigation.goBack();
            }}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
