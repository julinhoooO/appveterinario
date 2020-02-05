import styled from 'styled-components/native';

import {TouchableRipple, Card} from 'react-native-paper';

export const DateContainer = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 0 16px 16px 0;
`;
export const DateText = styled.Text`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;
export const HourContainer = styled.View``;
export const HourText = styled.Text``;
export const Content = styled.View`
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: ${props => (props.aligntItems ? props.alignItems : 'center')};
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  padding-right: ${props => (props.paddingRight ? props.paddingRight : 0)}px;
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 0)}px;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : 0)}px;
`;
export const AppointmentDescription = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Ripple = styled(TouchableRipple)`
  z-index: 1001;
`;

export const AppointmentCard = styled(Card)`
  margin: 5px 0 0 0;
  border-radius: 0;
  background-color: ${props =>
    props.completed ? 'rgba(66,245,117,0.32)' : 'white'};
  overflow: hidden;
`;

export const AppointmentCardContent = styled(Card.Content)``;

export const AppointmentCardTitle = styled(Card.Title)``;
