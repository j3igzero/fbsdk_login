import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NavigationEvents } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Welcome extends Component {
  componentDidMount() {
    
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

  onUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false,
        includeBase64: true,
        includeExif: true,
      });
      console.view.log(image);
      const uri = Platform.OS == 'ios' ? image.sourceURL.replace("file://", '') : image.path;

      // // Upload using rn fetch blob
      // const elements = [
      //   { name: '', filename: image.filename || uri.replace(/^.*[\\\/]/, ''), type: image.mime, data: image.data },
      // ];
      // console.view.log('uploadDegree2...');

      // this.props.uploadDegree2(elements, this.formik.setFieldValue);
    }
    catch (err) {
      if (err.code == 'E_PERMISSION_MISSING') {
        alert("Ứng dụng không được cấp quyền vào thư viện hình ảnh. Bạn hãy vào phần Tuỳ chỉnh của thiết bị để cấp lại quyền truy cập.");
      }
      else if (err.code == 'E_PICKER_CANCELLED') {
        //@todo
      }
      else {
        console.view.log(err);
        alert("Không upload được hình ảnh. Bạn có thể tạm BỎ QUA bước này. Nhân viên tư vấn sẽ gọi xác nhận nhà thuốc sau");
      }
    }
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
        
        <TouchableOpacity style={styles.view} onPress={this.onUpload}>
          <Text style={styles.welcome}>Upload File...</Text>
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
