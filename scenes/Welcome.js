import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NavigationEvents } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Welcome extends Component {
  componentDidMount() {
    console.view.log('thang Kun la mot thang ngu!');
    
  }

  componentWillUnmount() {

  }

  handleBackPress = () => {
    this.showMessageExit();
    return true;
  }

  showMessageExit() {
    Alert.alert("THÔNG BÁO", "Bạn có muốn đóng ứng dụng không?",
      [{ text: "Huỷ" }, { text: "Đồng ý", onPress: BackHandler.exitApp }],
      { cancelable: false }
    );
  }

  onMain = () => {
    Actions.Main();
  };

  onDidFocus = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  onWillBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.onDidFocus} onWillBlur={this.onWillBlur} />
        <TouchableOpacity style={styles.view} onPress={this.onMain}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
