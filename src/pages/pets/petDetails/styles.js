import styled from 'styled-components/native';
import {
  List,
  Title,
  Avatar,
  Headline,
  Surface,
  TouchableRipple,
  TextInput,
} from 'react-native-paper';

export const Container = styled.ScrollView``;

export const Accordion = styled(List.AccordionGroup)`
  padding: 5px;
`;

export const AccordionSection = styled(List.Accordion)``;

export const AccordionItem = styled(List.Item)`
  padding-left: 45px;
  padding-right: 15px;
`;

export const InfoItem = styled(List.Item).attrs({
  titleStyle: {
    fontSize: 20,
  },
})``;

export const ObsTitle = styled(List.Item).attrs({
  titleStyle: {
    fontSize: 28,
  },
})``;

export const ObsItem = styled(List.Item).attrs({
  titleStyle: {
    fontSize: 18,
  },
})``;

export const InfoIcon = styled(List.Icon)``;

export const ObsTitleIcon = styled(List.Icon)`
  margin-top: 5px;
`;

export const PetAvatar = styled(Avatar.Image)``;
export const PetAvatarFrame = styled(Surface)`
  height: ${props => (props.size ? props.size : 0)}px;
  width: ${props => (props.size ? props.size : 0)}px;
  border-radius: ${props => (props.size ? props.size / 2 : 0)}px;
  align-items: center;
  justify-content: center;
  elevation: ${props => (props.elevation ? props.elevation : 4)};
`;
export const PetAvatarFrameRipple = styled(TouchableRipple)`
  height: ${props => (props.size ? props.size : 0)}px;
  width: ${props => (props.size ? props.size : 0)}px;
  border-radius: ${props => (props.size ? props.size / 2 : 0)}px;
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled(Headline)`
  font-size: 24px;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  padding-right: ${props => (props.paddingRight ? props.paddingRight : 0)}px;
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 0)}px;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : 0)}px;
`;

export const SectionParagraph = styled(Title)`
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 5px;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  padding-right: ${props => (props.paddingRight ? props.paddingRight : 0)}px;
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 0)}px;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : 0)}px;
`;

export const VerticalSpacer = styled.View`
  width: 100%;
  height: ${props => (props.size ? props.size : 0)}px;
`;

export const GroupPadded = styled.View`
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  padding-right: ${props => (props.paddingRight ? props.paddingRight : 0)}px;
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 0)}px;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : 0)}px;
`;

export const InvisibleMargedDivider = styled.View`
  width: 100%;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
  margin-right: ${props => (props.marginRight ? props.marginRight : 0)}px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)}px;
`;

export const RowAlignedView = styled.View`
  flex-direction: row;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
`;

export const FormTextInput = styled(TextInput)`
  background-color: transparent;
`;

export const InfoAppointmentItem = styled(List.Item).attrs({
  titleStyle: {
    fontSize: 16,
  },
})``;

export const Select = styled.Picker`
  height: 54px;
`;
