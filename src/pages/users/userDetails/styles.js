import styled from 'styled-components/native';
import { List } from 'react-native-paper';

export const Container = styled.View`
    min-height: 100%;
`;
export const ScrollContainer = styled.ScrollView``;

export const Accordion = styled(List.AccordionGroup)`
    padding: 5px;
`;

export const AccordionSection = styled(List.Accordion)``;

export const AccordionItem = styled(List.Item)`
    padding-left: 45px;
    padding-right: 15px;
`;