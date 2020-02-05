import styled from 'styled-components/native';

import {Appbar} from 'react-native-paper';

export const Header = styled(Appbar)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    padding: 10px;
    width: 100%;
    elevation: 2;
`;

export const Container = styled.View`
    margin-bottom: 54px;
`;
