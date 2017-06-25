import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Platform, Image } from 'react-native';

import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

import styles from './addexpenseForm.style';

import { expenditureRef, storageRef } from '../../store/firebase.confidential';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storageRef.ref('images').child(`${sessionId}`);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

class AddExpenseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  addExpense() {
    uploadImage(this.state.imageUri)
      .then(url => {
        return expenditureRef.push().set({
          amount: this.state.amount,
          itemName: this.state.itemName,
          imageUrl: url ? url : '',
        }).then(() => {
          this.setState({
            amount: '',
            itemName: '',
            imageUrl: '',
          })
        });
      })
      .catch(error => console.log(error));
  }

  pickImage() {
    this.setState({ uploadURL: '' });

    ImagePicker.showImagePicker({}, response => {
      this.showImage(response.uri);
    })
  }

  showImage(uri) {
    this.setState({
      imageUri: uri.replace('file://', '')
    })
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Item"
          style={styles.TextInput}
          onChangeText={(itemName) => this.setState({ itemName })}
        />
        <TextInput
          placeholder="amount"
          keyboardType="numeric"
          style={styles.TextInput}
          onChangeText={(amount) => this.setState({ amount })}
        />
        {
          (() => {
            switch (this.state.imageUri) {
              case null:
                return null
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: this.state.imageUri }}
                      style={styles.image}
                    />
                  </View>
                )
            }
          })()
        }
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => this.pickImage()}
        >
          <Text>Add Image</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => this.addExpense()}
        >
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default AddExpenseForm;
