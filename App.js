import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, Linking } from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
	state = {
		// Deep link
		link: 'fb://profile/4',
		// link: 'https://itunes.apple.com/us/app/expo-client/id982107779?mt=8',		// also try using the itms:// scheme rather than https in the url.
	};

	render() {


		return (
			<View style={styles.container}>
				<View style={styles.dlink}>
					<TextInput
						style={styles.input_link}
						onChangeText={this.onChangeDeepLink}
						value={this.state.link}
					/>
					<Button title='Go' onPress={this.linkToUrl} />
				</View>

				<Text style={styles.welcome}>
					Welcome to React Native!
        </Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
			</View>
		);
	}

	onChangeDeepLink = (link) => this.setState({ link });

	linkToUrl = () => {
		const { link } = this.state;
		Linking.openURL(link).catch((err) => {
			alert("Can't handle url: " + link);
			console.log(err)
		});

		// Linking.canOpenURL(link)
		// .then((supported) => {
		// 	if (!supported) {
		// 		console.log("Can't handle url: " + link);
		// 		alert("Can't handle url: " + link);
		// 	} else {
		// 		return Linking.openURL(link);
		// 	}
		// })
		// .catch((err) => console.error('An error occurred', err));
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
	dlink: {
		flexDirection: 'row',
	},
	input_link: {
		height: 40, width: 240, borderColor: 'gray', borderWidth: 1
	}
});
