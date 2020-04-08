import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Title, TextInput, Text, Divider, Avatar, TouchableRipple, Surface} from 'react-native-paper';


export const Form = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
`;

export const FormContainer = styled.View`
`;

export const SectionFormTitle= styled(Title)`
  font-size: 24px;
`;

export const FormTextInput = styled(TextInput)`
  background-color: transparent;
`;

export const Select = styled.Picker`
  height: 54px;
`;

export const FormText = styled(Text)`
  font-size: 16px;
  margin-right: ${props => props.marginRight ? props.marginRight : 0}px;
  margin-left: 10px;
`;

export const FormDivider = styled(Divider)`
  border-bottom-color: #aaa;
  border-bottom-width: 1px;
`;

export const FormRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 0 10px;
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

export const PetAvatar = styled(Avatar.Image)``;
export const PetAvatarFrame = styled(Surface)`
    height: ${props => props.size ? props.size : 0}px;
    width: ${props => props.size ? props.size : 0}px;
    border-radius: ${props => props.size ? props.size/2 : 0}px;
    align-items: center;
    justify-content: center;
    elevation: ${props => props.elevation ? props.elevation : 4};
`;
export const PetAvatarFrameRipple = styled(TouchableRipple)`
    height: ${props => props.size ? props.size/2 : 0}px;
    width: ${props => props.size ? props.size : 0}px;
    border-bottom-left-radius: ${props => props.size ? props.size/2 : 0}px;
    border-bottom-right-radius: ${props => props.size ? props.size/2 : 0}px;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    margin-top: -${props => props.size ? props.size/2 : 0}px;
`;
export const RowAlignedView = styled.View`
    flex-direction: row;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
`;

