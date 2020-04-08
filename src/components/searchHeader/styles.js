import styled from 'styled-components/native';

import {Appbar, Searchbar} from 'react-native-paper';

export const Header = styled(Appbar)`
    padding: 10px;
    width: 100%;
    z-index: 1001;
    background-color: #f1f1f1;
    elevation: 0;
`;
export const Content = styled.View`
    padding-top: 10px;
    width: 100%;
`;

export const SearchbarHeader = styled(Searchbar)`
    width: 100%;
    border-radius: 8px;
`;
