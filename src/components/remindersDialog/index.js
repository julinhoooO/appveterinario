import React from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IconButton, Portal, Button} from 'react-native-paper';

import CreationDialog from './creationDialog';
import AlertDialog from './alertDialog';
import ConfirmationDialog from './confirmationDialog';

import {Backdrop} from 'react-native-backdrop';
import * as RemindersActions from '~/store/actions/reminders.actions';

import {Item, ItemIcon} from './styles';

export default function remindersDialog({reminders, backdropType}) {
  const remindersState = useSelector(state => state.reminders);
  const dispatch = useDispatch();
  function handleBackdrop() {
    dispatch(
      RemindersActions.setBackdropVisible(!remindersState.backdropVisible),
    );
  }
  return (
    <>
      <Portal>
        <CreationDialog location={backdropType} />
      </Portal>
      <Portal>
        <ConfirmationDialog location={backdropType} />
      </Portal>
      <Portal>
        <AlertDialog location={backdropType} type="success" />
      </Portal>
      <Portal>
        <Backdrop
          visible={remindersState.backdropVisible}
          handleOpen={handleBackdrop}
          handleClose={handleBackdrop}
          onClose={() => {}}
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
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={remindersState.reminders}
            renderItem={({item}) => (
              <Item
                title={item.date
                  .split('-')
                  .reverse()
                  .join('/')}
                description={item.pet ? item.pet.name : ''}
                left={props => <ItemIcon {...props} icon="calendar-outline" />}
                right={props => (
                  <IconButton
                    {...props}
                    icon="delete-outline"
                    size={24}
                    onPress={() => {
                      dispatch(RemindersActions.setActiveReminder(item));
                      dispatch(
                        RemindersActions.setConfirmationDialogVisible(true),
                      );
                    }}
                  />
                )}
              />
            )}
            ListEmptyComponent={<Item title="Nenhum lembrete cadastrado" />}
            keyExtractor={item => item.id.toString()}
          />
          <Button
            onPress={() =>
              dispatch(RemindersActions.setCreationDialogVisible(true))
            }>
            Adicionar lembrete
          </Button>
        </Backdrop>
      </Portal>
    </>
  );
}
