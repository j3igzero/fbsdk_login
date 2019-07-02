/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
		fb_user_id: 0,
		fb_user_name: 'Guest',
		fb_user_photo_url: '',
  };
  render() {
    const { fb_user_photo_url, fb_user_name } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {fb_user_name != 'Guest' && <Text>Hi {fb_user_name}! </Text>}
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        { !!fb_user_photo_url && 
					<Image source={{uri: fb_user_photo_url}}
						style={styles.fbAva}
					/> 
        }

        <LoginButton
          publishPermissions={["public_profile", "email"]}
          onLoginFinished={this.onLoginFinished}
          onLogoutFinished={this.onLogoutFinished}
				/>
      </View>
    );
  }

  onLoginFinished = async (error, result) => {
		if (error) {
			alert("Login failed with error: " + error.message);
		} 
		else if (result.isCancelled) {
		} 
		else {
			try {
				const { accessToken } = await AccessToken.getCurrentAccessToken();
				console.log('Kun Token: ' + accessToken);
				this.initUser(accessToken);
			}
			catch (e) {
				console.log(error)
			}
		}
	};

	onLogoutFinished = () => {};

	initUser = async (token) => {
		const url = `https://graph.facebook.com/me?access_token=${token}`;
    // const { data } = await AxiosBase.getInstance().get(url);
    const response = await fetch(url);
    const data = await response.json();
		console.log(data);

		this.setState({
			fb_user_id: data.id,
			fb_user_name: data.name,
			fb_user_photo_url: `https://graph.facebook.com/${data.id}/picture?type=large`
		});


		// const responseInfoCallback = (error, result) => {
		// 	if (error) {
		// 		console.log(error)
		// 		alert('Error fetching data: ' + JSON.stringify(error));
		// 	} else {
		// 		console.log(result)
		// 		alert('Success fetching data: ' + JSON.stringify(result));

		// 		const profile = result;
		//     profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
		// 	}
		// }
		// const infoRequest = new GraphRequest(
		// 	'/me', {
		// 		accessToken: accessToken,
		// 		parameters: {
		// 			fields: {
		// 				string: 'email,name,first_name,middle_name,last_name'
		// 			}
		// 		}
		// 	},
		// 	responseInfoCallback
		// );
		// // Start the graph request.
		// new GraphRequestManager().addRequest(infoRequest).start()

	};
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
  fbAva: {
		width: 200, height: 200,
		marginTop: 20,
		marginBottom: 20
	}
});
