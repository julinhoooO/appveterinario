import React, {useEffect, useState} from 'react';
import {Text, Dimensions} from 'react-native';
import {NavigationNativeContainer, useLinking} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {Badge} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as themes from '~/themes';

import Login from '~/pages/login';
import SplashScreen from '~/pages/splashScreen';
import Main from '~/pages/appointments';
import newAppoinments from '~/pages/appointments/newAppointments';

import Config from '~/pages/config';

import Users from '~/pages/users';
import newUsers from '~/pages/users/newUsers';
import userDetails from '~/pages/users/userDetails';
import editUsers from '~/pages/users/editUsers';

import newPets from '~/pages/pets/newPets';
import petDetails from '~/pages/pets/petDetails';
import editPets from '~/pages/pets/editPets';

import notifications from '~/pages/notifications';

const BottomTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const AppointmentStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Appointments" component={Main} />
      <Stack.Screen
        name="NewAppointments"
        component={newAppoinments}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UsersStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainUsers" component={Users} />
      <Stack.Screen
        name="NewUsers"
        component={newUsers}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name="UserDetails"
        component={userDetails}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name="EditUsers"
        component={editUsers}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name="PetDetails"
        component={petDetails}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name="NewPets"
        component={newPets}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name="EditPets"
        component={editPets}
        options={{
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.ScaleFromCenterAndroidSpec,
          },
        }}
      />
    </Stack.Navigator>
  );
};

function AppNavigator() {
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [height, setHeight] = useState(54);
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  const navigatorState = useSelector(state => state.navigation);
  const notificationCount = useSelector(
    state => state.notifications.unreadCount,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setHeight(navigatorState.height);
    setSwipeEnabled(navigatorState.swipeEnabled);
  }, [navigatorState]);
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString);
        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const initialLayout = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  };
  const tabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: themes.light.tab.activeTintColor,
    inactiveTintColor: themes.light.tab.inactiveTintColor,
    labelStyle: {
      justifyContent: 'center',
      alignContent: 'center',
    },
    style: {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: themes.light.tab.backgroundColor,
      borderTopColor: themes.light.tab.borderTopColor,
      height: height,
      elevation: themes.light.tab.elevation,
    },
    indicatorStyle: {
      position: 'absolute',
      top: 0,
      backgroundColor: themes.light.tab.indicatorStyle.backgroundColor,
      height: themes.light.tab.indicatorStyle.heigth,
    },
    pressColor: themes.light.tab.pressColor,
    pressOpacity: themes.light.tab.pressOpacity,
    showIcon: true,
    showLabel: false,
  };
  return (
    <BottomTab.Navigator
      initialRouteName={'Main'}
      tabBarPosition="bottom"
      initialLayout={initialLayout}
      tabBarOptions={tabBarOptions}
      lazy={false}
      swipeEnabled={swipeEnabled}>
      <BottomTab.Screen
        name="Main"
        component={AppointmentStack}
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            const iconName = `calendar${focused ? '' : '-outline'}`;
            return <Icon name={iconName} size={22} color={tintColor} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Users"
        component={UsersStack}
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            const iconName = `account-circle${focused ? '' : '-outline'}`;
            return <Icon name={iconName} size={22} color={tintColor} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Notify"
        component={notifications}
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            const iconName = `bell${focused ? '' : '-outline'}`;
            return (
              <>
                {notificationCount ? (
                  <Badge
                    style={{
                      position: 'absolute',
                      bottom: 15,
                      right: -5,
                      fontSize: notificationCount <= 99 ? 10 : 8,
                      zIndex: 10000,
                    }}
                    size={20}>
                    {notificationCount <= 99 ? notificationCount : '99+'}
                  </Badge>
                ) : (
                  <></>
                )}
                <Icon name={iconName} size={22} color={tintColor} />
              </>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            const iconName = `menu`;
            return <Icon name={iconName} size={22} color={tintColor} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Navigator() {
  const ref = React.useRef();

  const {getInitialState} = useLinking(ref, {
    prefixes: ['jeronymopet://jeronymopet/'],
    config: {
      App: {
        Users: {
          PetDetails: 'pet/:id',
        },
      },
    },
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }
  return (
    <NavigationNativeContainer initialState={initialState} ref={ref}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="App" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
