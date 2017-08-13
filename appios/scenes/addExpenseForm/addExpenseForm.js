import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableHighlight, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

import styles from './addExpenseForm.style';

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
    this.state = {
      imageUri: ''
    };
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
      if(!response.didCancel) {
        this.showImage(response.uri);
      }
    })
  }

  showImage(uri) {
    this.setState({
      imageUri: uri.replace('file://', '')
    })
  }

  getImageView() {
    return (
      this.state.imageUri ?
        <View style={styles.imageBox}>
          <Image
            source={{ uri: this.state.imageUri }}
            style={styles.image}
          />
        </View> :
        <View style={styles.addImageBox}>
          <TouchableHighlight
            style={styles.loginButton}
            onPress={() => this.pickImage()}
          >
            <Icon name="plus" style={styles.addImageIcon} />
          </TouchableHighlight>
        </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.addExpenseForm}>
        <TextInput
          placeholder="Item"
          style={styles.textInput}
          onChangeText={(itemName) => this.setState({ itemName })}
        />
        <TextInput
          placeholder="amount"
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(amount) => this.setState({ amount })}
        />
        {this.getImageView()}

        <TouchableHighlight
          style={styles.addExpenseButton}
          onPress={() => this.addExpense()}
        >
          <Text>Add</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

export default AddExpenseForm;
