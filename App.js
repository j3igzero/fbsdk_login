/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ActivityIndicator, Button} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
		// Facebook login
		fb_user_id: 0,
		fb_user_name: 'Guest',
		fb_user_photo_url: '',

		// Google signin
		isSigninInProgress: false,
		isUserSignedIn: false,
    loggedInUser: null,
    checkingSignedInStatus: true
	};
	constructor() {
		super();
		GoogleSignin.configure();
	}

  render() {
		const { 
			fb_user_photo_url, fb_user_name, 
			isSigninInProgress, checkingSignedInStatus, isUserSignedIn, loggedInUser 
		} = this.state;
		
    if (checkingSignedInStatus) {
      return (
        <View style={styles.container}>
					<Text>Chờ tí...</Text>
          <ActivityIndicator size='large' color='#00ff00' />
        </View>
      );
    }

    if (isUserSignedIn && loggedInUser) {
			console.log(loggedInUser);
			
      return (
        <View style={styles.container}>
					<Image source={{uri: loggedInUser.user.photo}}
						style={styles.fbAva}
					/> 
					<Text>{loggedInUser.user.email}</Text>
          <Text style={styles.welcome}>Welcome {loggedInUser.user.name}!</Text>
					
          <Button title='Log out' onPress={this.signOut} />
        </View>
      );
		}
		

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
				<GoogleSigninButton
					style={styles.ggleButton}
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Dark}
					onPress={this.onPressGoogleSignin}
					disabled={isSigninInProgress} 
				/>
      </View>
    );
	}
	componentDidMount() {
    this.isUserSignedIn();
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

	/** GOOGLE SIGNIN **/

	onPressGoogleSignin = async () => {
		try {
			this.setState({ isSigninInProgress: true });

			await GoogleSignin.hasPlayServices();
			const loggedInUser = await GoogleSignin.signIn();
			this.setState({ loggedInUser, isUserSignedIn: true, isSigninInProgress: false });
		} 
		catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				this.setState({ isSigninInProgress: false });
			} 
			else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};

	isUserSignedIn = async () => {
    this.setState({ isUserSignedIn: false, checkingSignedInStatus: true });
    const isUserSignedIn = await GoogleSignin.isSignedIn();
    if (isUserSignedIn) {
      await this.getCurrentUserInfo();
    }
    this.setState({ isUserSignedIn, checkingSignedInStatus: false });
	};
	
	getCurrentUserInfo = async () => {
    try {
      const loggedInUser = await GoogleSignin.signInSilently();
      this.setState({ loggedInUser });
    } catch (error) {
      this.setState({ loggedInUser: null });
    }
  };

	signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ isUserSignedIn: false, loggedInUser: null });
    } catch (error) {
			// this.handleSignInError(error);
			alert('Error!!!');
    }
	};
	
	// handleSignInError = async error => {
  //   if (error.code) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       this.showSignInError('User cancelled the login flow.');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       this.showSignInError('Sign in is in progress.');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       await this.getGooglePlayServices();
  //     } else {
  //       this.showSignInError(JSON.stringify(error));
  //     }
  //   } else {
  //     this.showSignInError(JSON.stringify(error));
  //   }
  //   this.setState({ isSigninInProgress: false });
  // };

	
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
	},
	ggleButton: {
		width: 192, height: 48
	}
});
