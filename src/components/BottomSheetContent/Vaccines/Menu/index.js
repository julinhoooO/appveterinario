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

import * as PetsActions from '~/store/actions/pets.actions';

export default function BottomSheetMenuContent({
  setBackdropType,
  vaccine,
  handleClose,
}) {
  const [dialogType, setDialogType] = useState('completed');
  const [alertVisible, setAlertVisible] = useState(false);
  const {confirmDeleteDialogVisible, message, pet} = useSelector(
    state => state.pets,
  );
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: '#FFF',
      }}>
      <List.Item
        title="Alterar Vacina"
        onPress={() => {
          dispatch(PetsActions.setDatePickerVisible(true));
        }}
        left={props => <List.Icon {...props} icon="square-edit-outline" />}
      />
      <List.Item
        title="Excluir Vacina"
        onPress={() => {
          dispatch(PetsActions.setConfirmDeleteDialogVisible());
        }}
        left={props => <List.Icon {...props} icon="minus-box-outline" />}
      />
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
            dispatch(PetsActions.setConfirmDeleteDialogVisible())
          }>
          <Dialog.Content>
            <Paragraph style={{fontSize: 18}}>
              Tem certeza que deseja excluir essa Vacina?
            </Paragraph>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Title>{pet ? pet.name : ''}</Title>
              <Subheading>
                {vaccine
                  ? vaccine.date
                      .split('-')
                      .reverse()
                      .join('/')
                  : ''}{' '}
                {vaccine ? vaccine.vaccines : ''}
              </Subheading>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() =>
                dispatch(PetsActions.setConfirmDeleteDialogVisible())
              }>
              Não
            </Button>
            <Button
              onPress={async () => {
                await dispatch(
                  PetsActions.deleteVacine({
                    id: vaccine ? vaccine.id : '',
                  }),
                );
                dispatch(PetsActions.setConfirmDeleteDialogVisible());
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
