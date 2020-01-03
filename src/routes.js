import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from '~/pages/login';
import Main from '~/pages/main';
import Config from '~/pages/config';

const BottomTabNavigator = createBottomTabNavigator({
    Main: {
        screen: Main,
    },
    Config: {
        screen: Config,
    },
});

const AppNavigator = createSwitchNavigator({
    Login: {
        screen: Login,
    },
    Main: {
        screen: BottomTabNavigator,
    },
});

export default createAppContainer(AppNavigator);
