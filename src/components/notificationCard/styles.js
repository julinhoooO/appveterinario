import styled from 'styled-components/native';

import {TouchableRipple, Surface, List} from 'react-native-paper';

export const Ripple = styled(TouchableRipple)``;

export const NotificationCard = styled(Surface)`
  background-color: ${props => (props.read ? '#FFFFFF' : '#DDDDDD')};
  margin-top: 5px;
`;

export const NotificationCardTitle = styled(List.Item)``;
export const NotificationCardIcon = styled(List.Icon)``;
