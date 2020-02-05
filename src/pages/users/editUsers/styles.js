import styled from 'styled-components/native';
import {Title, TextInput} from 'react-native-paper';


export const Form = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
`;

export const FormContainer = styled.View`
  flex: 1;
`;

export const SectionFormTitle= styled(Title)`
  font-size: 24px;
`;

export const FormTextInput = styled(TextInput)`
  background-color: transparent;
`;

export const VerticalSpacer = styled.View`
  width: 100%;
  height: ${props => props.size ? props.size : 0}px;
`;

export const GroupInputForm = styled.View`
  padding-top: ${props => props.paddingTop ? props.paddingTop : 0}px;
  padding-right: ${props => props.paddingRight ? props.paddingRight : 0}px;
  padding-bottom: ${props => props.paddingBottom ? props.paddingBottom : 0}px;
  padding-left: ${props => props.paddingLeft ? props.paddingLeft : 0}px;
`;

export const InvisibleMargedDivider = styled.View`
  width: 100%;
  margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
  margin-right: ${props => props.marginRight ? props.marginRight : 0}px;
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : 0}px;
`;

