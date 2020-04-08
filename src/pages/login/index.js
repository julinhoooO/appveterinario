import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import api from '~/services/api';
import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';

import {
  Container,
  InnerContainer,
  FormTextContainer,
  FormTextInput,
  LoginButton,
  LoginButtonText,
} from './styles';

import {IconButton} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

export default function login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [animationTime, setAnimationTime] = useState(100);
  const [loading, setLoading] = useState(false);
  const scaleTransform = new Animated.Value(1);
  const fontOpacity = new Animated.Value(1);

  //UseRef
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  useFocusEffect(
    useCallback(() => {
      let exit = false;
      const onBackPress = () => {
        if (exit) {
          BackHandler.exitApp();
        }
        if (!exit) {
          ToastAndroid.showWithGravityAndOffset(
            'Pressione voltar novamente para sair',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        exit = true;
        setTimeout(() => {
          exit = false;
        }, 3000);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
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
          <FormTextInput
            label="Usuário"
            mode="flat"
            value={username}
            onChangeText={text => setUsername(text)}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            ref={refUsername}
            returnKeyType="next"
            onSubmitEditing={() => refPassword.current.focus()}
          />
          <FormTextContainer>
            <FormTextInput
              label="Senha"
              mode="flat"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!visiblePassword}
              autoCapitalize="none"
              autoCorrect={false}
              ref={refPassword}
              returnKeyType="done"
              onSubmitEditing={() => login()}
            />
            <IconButton
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}
              color="#999"
              icon={!visiblePassword ? 'eye' : 'eye-off'}
              onPress={() => setVisiblePassword(!visiblePassword)}
            />
          </FormTextContainer>
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
