import React, {useEffect} from 'react';
import { View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import { Container } from './styles';

export default function spalshScreen({navigation}) {
    useEffect(() => {
        async function getRoute(){
            const userLogged = await AsyncStorage.getItem('token');
            return userLogged ? "App" : "Login";
        }
        setTimeout(async () => navigation.replace(await getRoute()), Math.floor(Math.random() * 4000 ) + 1000);
    }, []);
  return (
    <View
        style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <LottieView source={require('../../assets/lottie/loading_dog.json')} resizeMode="cover" autoPlay style={{width:280, height:240}}/>
    </View>
  );
}
