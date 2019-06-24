import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';

// import { Container } from './styles';

export default class New extends Component {

  static navigationOptions = {
    headerTitle: 'Nova Publicação'
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.selectButton} onPress={()=>{}}>
            <Text style={styles.selectButtonTexte}>Selecionar Imagem</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});