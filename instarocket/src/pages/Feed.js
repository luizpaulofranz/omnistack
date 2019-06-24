import React, { Component } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import camera from '../assets/camera.png';

// import { Container } from './styles';

export default class Feed extends Component {
  // this is a default var to config the navigation ops of this page
  // we have access to some properties in this function
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      // we pass the route to navigation
      <TouchableOpacity style={{marginRight: 20}} onPress={ () => navigation.navigate('New') } >
        <Image source={camera} />
      </TouchableOpacity>
    )
  })

  render() {
    return <View />;
  }
}
