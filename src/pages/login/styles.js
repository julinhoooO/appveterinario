import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFF;
  padding: 30px;
`;

export const InnerContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`

export const Logo = styled.Image`
`;

export const TextInput = styled.TextInput`
    width: 100%;
    padding: 20px 10px;
    margin: 10px 0;
    border-radius: 4px;
    background-color: #EEE;
    color: #555;
    font-size: 16px;
`;

export const LoginButton = styled.TouchableOpacity`
    width: 100%;
    padding: 20px 10px;
    margin: 10px 0;
    border-radius: 4px;
    background-color: #FDD51f;
    align-items: center;
`;

export const LoginButtonText = styled.Text`
    color: #555;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 4.6px;
`;
