import React, {useEffect, useCallback, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Animated} from 'react-native';
import {FAB, Avatar} from 'react-native-paper';
import {Container, ListContainer, ListItem, ListIcon} from './styles';
import SearchHeader from '~/components/searchHeader';

import {useFocusEffect} from '@react-navigation/native';

import * as UsersActions from '~/store/actions/users.actions';
import * as NavigationActions from '~/store/actions/navigation.actions';

function Users({
  navigation,
  users,
  getCostumers,
  getCostumer,
  filterCostumers,
}) {
  const dispatch = useDispatch();
  const [fabButtonVisible, setFabButtonVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getCostumers();
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch({type: NavigationActions.STACK_MAIN_FOCUSED});
      setFabButtonVisible(true);
      return () => {
        setFabButtonVisible(false);
      };
    }, []),
  );
  return (
    <Container>
      <ListContainer
        onRefresh={async () => {
          setRefreshing(true);
          await getCostumers();
          setRefreshing(false);
        }}
        refreshing={refreshing}
        data={users.data}
        ListHeaderComponent={<SearchHeader onChangeText={filterCostumers} />}
        renderItem={({item}) => (
          <ListItem
            key={item.id}
            title={item.name}
            description={item.pets.map((pet, index) => {
              return `${pet.name}${index < item.pets.length ? ', ' : ''}`;
            })}
            left={props => <ListIcon {...props} icon="account-details" />}
            onPress={() => {
              getCostumer(item.id);
              navigation.navigate('UserDetails');
            }}
          />
        )}
        ListEmptyComponent={<ListItem title="Nenhum cliente cadastrado" />}
        keyExtractor={item => item.id.toString()}></ListContainer>
      <FAB
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          margin: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        loading={false}
        icon="plus"
        onPress={() => {
          navigation.navigate('NewUsers');
        }}
        visible={fabButtonVisible}
      />
    </Container>
  );
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
