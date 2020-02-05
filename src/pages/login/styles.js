import styled from 'styled-components/native';
import {TouchableRipple} from 'react-native-paper';
import {Dimensions} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 30px 0;
`;

export const InnerContainer = styled.View`
  flex: 1;
  padding: 0 30px;
  width: ${Dimensions.get('window').width}px;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  overflow: visible;
`;

export const Logo = styled.Image``;

export const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  background-color: #eee;
  color: #555;
  font-size: 14px;
`;

export const LoginButton = styled(TouchableRipple)`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #001523;
  align-items: center;
`;

export const LoginButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 4.6px;
`;
