import React, {useCallback} from 'react';
import {connect, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {Container, ListContainer, ListItem, ListIcon} from './styles';
import SearchHeader from '~/components/searchHeader';
import * as NavigationActions from '~/store/actions/navigation.actions';
import AsyncStorage from '@react-native-community/async-storage';

export default function main({navigation}) {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_MAIN_FOCUSED});
    }, []),
  );
  return (
    <Container>
      <ListContainer>
        <ListItem
          title="Sair"
          left={props => <ListIcon {...props} icon="logout" />}
          onPress={() => {
            AsyncStorage.removeItem('token');
            navigation.navigate('Login');
          }}
        />
      </ListContainer>
    </Container>
  );
}
