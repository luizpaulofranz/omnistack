import React, { Component } from 'react';

// gives access to upload imgs and to the camera
// needs linking to and editing native codes, see documentation to do it: https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Install.md
import ImagePicker from 'react-native-image-picker';

import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';

import api from '../services/api';

export default class New extends Component {

  static navigationOptions = {
    headerTitle: 'Nova Publicação'
  }

  state = {
    preview: null,
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  }

  handleSubmit = async () => {

    const data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    //console.log(this.state);
    await api.post('posts', data);
    
    this.props.navigation.navigate('Feed');
  }

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecionar Imagem'
    }, uploadedImage => {
      if (uploadedImage.error) {
        console.log('Error')
      } else if (uploadedImage.didCancel) {
        console.log('user canceled')
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${uploadedImage.data}`
        }

        // treatments for ios
        let prefix;
        let ext;
        // only if is a uploaded photo it has a name 
        if (uploadedImage.fileName) {
          //JPG images are HEIC in IOS .. ?????????????????
          [prefix, ext] = uploadedImage.fileName.split('.');
          ext = ext.toLowerCase == 'heic' ? 'jpg' : ext;
        } else {
          // if this are taken photo, it has no name and we set ir manually
          prefix = new Date().getTime();
          ext = 'jpg'
        }

        const image = {
          uri: uploadedImage.uri,
          type: uploadedImage.type,
          name: `${prefix}.${ext}`
        }
        // to be possible to store img we parse it in base 64
        // we have the same image as an JS obj and as base 64
        this.setState({preview, image});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
            <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
          </TouchableOpacity>

          { this.state.preview && <Image style={styles.preview} source={this.state.preview} /> }

          <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do autor"
            placeholderTextColor="#999"
            value={this.state.author}
            onChangeText={author => this.setState({author})} //onChangeText receives as argument the typed text
          />

          <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Local"
            placeholderTextColor="#999"
            value={this.state.place}
            onChangeText={place => this.setState({place})}
          />

          <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Descrição"
            placeholderTextColor="#999"
            value={this.state.description}
            onChangeText={description => this.setState({description})}
          />

          <TextInput 
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Hashtags"
            placeholderTextColor="#999"
            value={this.state.hashtags}
            onChangeText={hashtags => this.setState({hashtags})}
          />

          <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
            <Text style={styles.shareButtonText}>Compartilhar</Text>
          </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});