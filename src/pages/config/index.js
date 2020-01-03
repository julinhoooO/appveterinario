import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default function main({navigation}) {
  return (
    <View>
        <Text>configurações</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
          <Text>Sair</Text>
        </TouchableOpacity>
    </View>
  );
}
