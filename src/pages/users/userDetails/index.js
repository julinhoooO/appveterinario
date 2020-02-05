import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {List, Avatar, FAB, Dialog, Paragraph, Button} from 'react-native-paper';
import config from '~/config/api';
import LottieView from 'lottie-react-native';

import * as NavigationActions from '~/store/actions/navigation.actions';
import * as PetsActions from '~/store/actions/pets.actions';
import * as UsersActions from '~/store/actions/users.actions';
import * as RemindersActions from '~/store/actions/reminders.actions';

import Header from '~/components/header';
import Reminders from '~/components/remindersDialog';
import {
  Container,
  ScrollContainer,
  Accordion,
  AccordionSection,
  AccordionItem,
} from './styles';

export default function details({route, navigation}) {
  const {user, successVisible, confirmationVisible} = useSelector(
    state => state.users,
  );
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_DEEP_FOCUSED});
    }, []),
  );
  useEffect(() => {
    dispatch(RemindersActions.getCostumerReminders(user.id));
  }, [user]);
  useEffect(() => {
    if (!user.id) {
      if (route.params) {
        console.log(route.params);
        dispatch(UsersActions.getCostumer(route.params.id));
      }
    }
  }, []);
  return (
    <Container>
      <Header
        navigation={navigation}
        backProps={{
          screen: 'MainUsers',
        }}
        title={user.name ? user.name : ''}
        menuItems={[
          {
            onPress: () => {
              dispatch(RemindersActions.getCostumerReminders(user.id));
              dispatch(RemindersActions.setBackdropVisible(true));
            },
            title: 'Lembretes',
            icon: 'clock-outline',
          },
          {
            onPress: function() {
              navigation.navigate('EditUsers');
            },
            title: 'Editar',
            icon: 'pencil',
          },
          {
            onPress: () => dispatch(UsersActions.setConfirmationVisible(true)),
            title: 'Excluir',
            icon: 'delete-outline',
          },
        ]}
      />
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Accordion>
          <AccordionSection
            id={1}
            title="Dados Pessoais"
            left={props => <List.Icon {...props} icon="account-circle" />}>
            {user.email && (
              <AccordionItem
                title={user.email}
                left={props => <List.Icon {...props} icon="at" />}
              />
            )}
            {user.cellphone && (
              <AccordionItem
                title={user.cellphone}
                left={props => <List.Icon {...props} icon="cellphone" />}
              />
            )}
            {user.tellphone && (
              <AccordionItem
                title={user.tellphone}
                left={props => <List.Icon {...props} icon="phone" />}
              />
            )}
            {user.birthday && (
              <AccordionItem
                title={user.birthday
                  .split('-')
                  .reverse()
                  .join('/')}
                left={props => <List.Icon {...props} icon="calendar-outline" />}
              />
            )}
          </AccordionSection>
          <AccordionSection
            id={2}
            title="Documentos Pessoais"
            left={props => (
              <List.Icon {...props} icon="account-card-details-outline" />
            )}>
            {user.street && user.city && user.state ? (
              <>
                {user.cpf && (
                  <AccordionItem
                    title={user.cpf}
                    left={props => <List.Icon {...props} icon="book-open" />}
                  />
                )}
                {user.rg && (
                  <AccordionItem
                    title={user.rg}
                    left={props => <List.Icon {...props} icon="book-open" />}
                  />
                )}
              </>
            ) : (
              <AccordionItem title="Sem dados de pessoais =(" />
            )}
          </AccordionSection>
          <AccordionSection
            id={3}
            title="Endereço"
            left={props => <List.Icon {...props} icon="map-marker-outline" />}>
            {user.street && user.city && user.state ? (
              <>
                {user.street && (
                  <AccordionItem
                    title={`${user.street} ${user.number &&
                      ', ' + user.number} ${user.neighborhood &&
                      ', ' + user.neighborhood}`}
                    left={props => <List.Icon {...props} icon="home-outline" />}
                  />
                )}
                {user.city && (
                  <AccordionItem
                    title={user.city}
                    left={props => (
                      <List.Icon {...props} icon="city-variant-outline" />
                    )}
                  />
                )}
                {user.state && (
                  <AccordionItem
                    title={user.state}
                    left={props => <List.Icon {...props} icon="book-open" />}
                  />
                )}
              </>
            ) : (
              <AccordionItem title="Sem dados de endereço =(" />
            )}
          </AccordionSection>
          <AccordionSection
            id={4}
            title="Animais"
            left={props => <List.Icon {...props} icon="paw" />}>
            {user.pets && user.pets.length ? (
              <>
                {user.pets.map(animal => (
                  <AccordionItem
                    key={animal.id}
                    title={animal.name}
                    left={props => (
                      <Avatar.Image
                        size={48}
                        source={{
                          uri: `${config.imageUrl}/${
                            animal.avatar_url
                              ? animal.avatar_url
                              : 'default_avatar_pet.png'
                          }`,
                        }}
                      />
                    )}
                    onPress={async () => {
                      await dispatch(PetsActions.getPet(animal.id));
                      navigation.navigate('PetDetails');
                    }}
                  />
                ))}
              </>
            ) : (
              <AccordionItem title="Sem nenhum animal cadastrado =(" />
            )}
          </AccordionSection>
        </Accordion>
      </ScrollContainer>
      <FAB
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          margin: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        loading={false}
        icon="plus"
        onPress={() => {
          navigation.navigate('NewPets');
        }}
      />

      <Dialog
        visible={successVisible}
        onDismiss={() => dispatch(UsersActions.setSuccessVisible(false))}>
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
            Cliente excluído com sucesso
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              dispatch(UsersActions.setSuccessVisible(false));
              await dispatch(UsersActions.getCostumers());
              navigation.navigate('MainUsers');
            }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={confirmationVisible}
        onDismiss={() => dispatch(UsersActions.setConfirmationVisible(false))}>
        <Dialog.Title>Excluir</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{fontSize: 18}}>
            Tem certeza que deseja excluir o cliente {user.name}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              dispatch(UsersActions.setConfirmationVisible(false));
            }}>
            Não
          </Button>
          <Button
            onPress={async () => {
              await dispatch(UsersActions.deleteCostumer({id: user.id}));
              dispatch(UsersActions.setConfirmationVisible(false));
              dispatch(UsersActions.setSuccessVisible(true));
            }}>
            Sim
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Reminders backdropType="costumer" />
    </Container>
  );
}
