import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dialog, Button, Portal, Paragraph} from 'react-native-paper';

import * as RemindersActions from '~/store/actions/reminders.actions';

export default function confirmationDialog({location}) {
  const {confirmationDialogVisible, activeReminder} = useSelector(
    state => state.reminders,
  );
  const dispatch = useDispatch();
  return (
    <Portal>
      <Dialog
        visible={confirmationDialogVisible}
        onDismiss={() => {
          dispatch(RemindersActions.setConfirmationDialogVisible(false));
        }}>
        <Dialog.Content>
          <Paragraph style={{fontSize: 18}}>
            Tem certeza que deseja excluir esse lembrete?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              dispatch(
                RemindersActions.deleteReminder({
                  id: activeReminder.id,
                  animal_id: activeReminder.animal_id,
                  costumer_id: activeReminder.costumer_id,
                  location,
                }),
              );
              dispatch(RemindersActions.setConfirmationDialogVisible(false));
              dispatch(RemindersActions.setAlertDialogVisible(true));
            }}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
