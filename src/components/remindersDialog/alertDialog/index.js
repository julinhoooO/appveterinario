import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dialog, Button, Portal, Paragraph} from 'react-native-paper';
import LottieView from 'lottie-react-native';

import * as RemindersActions from '~/store/actions/reminders.actions';

const succesLottie = require('../../../assets/lottie/success.json');
const errorLottie = require('../../../assets/lottie/error.json');

export default function alertDialog({type}) {
  const {alertDialogVisible, message} = useSelector(state => state.reminders);
  const dispatch = useDispatch();
  return (
    <Portal>
      <Dialog
        visible={alertDialogVisible}
        onDismiss={() => {
          dispatch(RemindersActions.setAlertDialogVisible(false));
        }}>
        <Dialog.Content
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={type === 'success' ? succesLottie : errorLotie}
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
            onPress={() => {
              dispatch(RemindersActions.setAlertDialogVisible(false));
              dispatch(RemindersActions.setCreationDialogVisible(false));
              dispatch(RemindersActions.setConfirmationDialogVisible(false));
            }}>
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
