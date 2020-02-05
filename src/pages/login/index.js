import React, {useState, useEffect} from 'react';
import {Alert, Animated, Keyboard} from 'react-native';
import api from '~/services/api';
import LottieView from 'lottie-react-native';

import {
  Container,
  InnerContainer,
  Logo,
  TextInput,
  LoginButton,
  LoginButtonText,
} from './styles';

import AsyncStorage from '@react-native-community/async-storage';

export default function login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [animationTime, setAnimationTime] = useState(100);
  const [loading, setLoading] = useState(false);
  const scaleTransform = new Animated.Value(1);
  const fontOpacity = new Animated.Value(1);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(fontOpacity, {
          toValue: 0,
          duration: animationTime,
        }).start();
        Animated.timing(scaleTransform, {
          toValue: 0.5,
          duration: animationTime,
        }).start();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(fontOpacity, {
          toValue: 1,
          duration: animationTime,
        }).start();
        Animated.timing(scaleTransform, {
          toValue: 1,
          duration: animationTime,
        }).start();
      },
    );
  }, []);
  async function login() {
    setLoading(true);
    const response = await api.post('login', {username, password});
    if (response.data.error) {
      setLoading(false);
      Alert.alert(
        'Error',
        response.data.error,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else if (response.data.success) {
      AsyncStorage.setItem('token', response.data.success);
      navigation.replace('App');
    }
  }
  return (
    <Container>
      <InnerContainer>
        <Animated.View
          style={{
            marginTop: 48,
            transform: [
              {
                scale: scaleTransform,
              },
            ],
          }}>
          <LottieView
            source={require('../../assets/lottie/dog_logo.json')}
            resizeMode="cover"
            loop={false}
            autoPlay
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Animated.View>
        <Animated.Text
          style={{
            opacity: fontOpacity,
            fontSize: 48,
          }}>
          Jeronymo Pet
        </Animated.Text>
      </InnerContainer>
      {!loading ? (
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
          <LoginButton rippleColor="#FFF" underlayColor="#FFF" onPress={login}>
            <LoginButtonText>Entrar</LoginButtonText>
          </LoginButton>
        </InnerContainer>
      ) : (
        <InnerContainer>
          <LottieView
            source={require('../../assets/lottie/loading_ball.json')}
            resizeMode="cover"
            autoPlay
            style={{width: 400, height: 300}}
          />
        </InnerContainer>
      )}
    </Container>
  );
}
