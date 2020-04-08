import React, {useState} from 'react';
import {
  Title,
  Paragraph,
  Dialog,
  Button,
  List,
  Portal,
  IconButton,
  Subheading,
  Avatar,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';

import {
  AppointmentCard,
  AppointmentCardContent,
  AppointmentCardTitle,
  DateContainer,
  DateText,
  HourContainer,
  HourText,
  AppointmentDescription,
  Content,
  Ripple,
} from './styles';

import * as AppointmentsActions from '~/store/actions/appointments.actions';

export default function appointmentCard({data, onIconButtonPress}) {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const date = data.date.split('-').reverse();
  const stringMonth = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];
  return (
    <>
      <AppointmentCard elevation={0} completed={data.completed}>
        <Ripple
          rippleColor="#999999DD"
          onPress={() => {}}
          onLongPress={onIconButtonPress}>
          <>
            <AppointmentCardTitle
              title={`${data.costumer ? data.costumer.name : ''} - ${
                data.pet ? data.pet.name : ''
              }`}
              left={props => (
                <HourContainer>
                  <HourText>{data.time ? data.time : ''}</HourText>
                </HourContainer>
              )}
              right={props => (
                <IconButton
                  icon="dots-vertical"
                  color="#333"
                  size={24}
                  onPress={onIconButtonPress}
                />
              )}
            />
            <AppointmentCardContent>
              <AppointmentDescription>
                <Content>
                  <DateContainer>
                    <DateText fontSize="20">{date[0]}</DateText>
                    <DateText fontSize="18">
                      {stringMonth[parseInt(date[1]) - 1]}
                    </DateText>
                    <DateText>{date[2]}</DateText>
                  </DateContainer>
                </Content>
                <Content
                  paddingRight={data.obs ? 90 : 0}
                  paddingBottom={data.obs ? 30 : 0}>
                  <Subheading>{data.obs ? data.obs : ''}</Subheading>
                  {data.vaccines && <Subheading>{data.vaccines.slice(0, -1)}</Subheading>}
                </Content>
              </AppointmentDescription>
            </AppointmentCardContent>
          </>
        </Ripple>
        {data.completed ? (
          <Avatar.Icon
            size={304}
            color="white"
            icon="alarm-check"
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              right: -100,
              bottom: -100,
              opacity: 0.5,
            }}
          />
        ) : data.type_id === 'appointment' ? (
          <Avatar.Icon
            size={304}
            color="black"
            icon="alarm"
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              right: -100,
              bottom: -100,
              opacity: 0.1,
            }}
          />
        ) : (<Avatar.Icon
          size={304}
          color="black"
          icon="needle"
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            right: -80,
            bottom: -90,
            opacity: 0.1,
          }}
        />)}
      </AppointmentCard>
    </>
  );
}
