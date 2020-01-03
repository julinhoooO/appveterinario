import React, {useState} from 'react';

import { Container, InnerContainer, Logo, TextInput, LoginButton, LoginButtonText } from './styles';

import LogoImage from '~/assets/VetCare.png';

export default function login({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    <Container>
      <InnerContainer>
        <Logo source={LogoImage}/>
      </InnerContainer>
      <InnerContainer>
        <TextInput
          value={username} 
          placeholder="Usuário"
          onChangeText={text => setUsername(text)}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
        />
        <TextInput
          value={password} 
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!visiblePassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <LoginButton onPress={() => navigation.navigate("Main")}>
          <LoginButtonText>Entrar</LoginButtonText>
        </LoginButton>
      </InnerContainer>
    </Container>
  );
}
