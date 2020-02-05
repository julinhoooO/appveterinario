import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';

export const Container = styled.View`
  margin-bottom: 30px;
  min-height: 100%;
`;
export const Appointments = styled.FlatList`
  min-height: 100%;
`;
export const Footer = styled.View`
  width: 100%;
  height: 54px;
  background-color: transparent;
`;
export const FormTextInput = styled(TextInput)`
  background-color: transparent;
`;
