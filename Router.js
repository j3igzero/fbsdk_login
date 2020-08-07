import React from "react";
import { Router, Scene } from "react-native-router-flux";

// scenes
import Main from "./scenes/Main";
import Welcome from "./scenes/Welcome";


export default class Navigation extends React.Component {
	unsubscribeNetInfo = undefined;
	
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="Main" component={Main} />
					<Scene key="Welcome" component={Welcome} hideNavBar initial />
				</Scene>
			</Router>
		);
	}
}