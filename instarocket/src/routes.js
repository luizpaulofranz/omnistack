import React from 'react';
// createStackNavigator show pages with a fixed header
// besides createStackNavigator we have others like createBottomNavigator, which shows tabs in the bottom, and createSwitchNavigator, which shows only the page, nothing more
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

// that's how we define our routes with react native
export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    }, {
        defaultNavigationOptions: {
            headerTitle: <Image style={{marginHorizontal: 20}} source={logo} />,
            headerBackTitle: null,
            headerTintColor: '#000'
        },
        mode: "modal", // concerns about how will be page transitions
    })
);
