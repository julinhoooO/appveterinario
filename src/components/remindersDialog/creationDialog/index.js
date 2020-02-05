import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dialog, Button, Portal} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import api from '~/services/api';

import {FormTextInput, Select} from './styles';

import * as RemindersActions from '~/store/actions/reminders.actions';

export default function creationDialog({location}) {
  const {creationDialogVisible} = useSelector(state => state.reminders);
  const {user} = useSelector(state => state.users);
  const {pet} = useSelector(state => state.pets);
  const [animal_id, setAnimalId] = useState(pet.id ? pet.id : '');
  const [date, setDate] = useState('');
  const [animalsSelect, setAnimalsSelect] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getAnimalsSelectData() {
      const response = await api.get(
        `appointments/dropdown/animals/${user.id}`,
      );
      setAnimalsSelect(response.data.animals);
    }
    getAnimalsSelectData();
  }, [user]);
  return (
    <Portal>
      <Dialog
        visible={creationDialogVisible}
        onDismiss={() => {
          dispatch(RemindersActions.setCreationDialogVisible(false));
        }}>
        <Dialog.Title>Criar lembrete de vacinação</Dialog.Title>
        <Dialog.Content>
          {animalsSelect.length ? (
            <>
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
              {location !== 'pet' && (
                <Select
                  onValueChange={(itemValue, itemIndex) => {
                    setAnimalId(itemValue);
                  }}
                  selectedValue={animal_id}
                  prompt="Animal"
                  mode="dropdown">
                  <Select.Item label="Selecione uma animal" value="" />
                  {animalsSelect &&
                    animalsSelect.map(item => (
                      <Select.Item
                        key={item.id}
                        label={item.name}
                        value={item.id}
                      />
                    ))}
                </Select>
              )}
            </>
          ) : (
            <></>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              dispatch(
                RemindersActions.createReminder({
                  animal_id,
                  costumer_id: user.id,
                  date,
                  location,
                }),
              );
              dispatch(RemindersActions.setAlertDialogVisible(true));
            }}>
            Salvar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
