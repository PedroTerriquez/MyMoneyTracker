import React, {Component} from 'react';
import { Button, View } from 'react-native';

export default class Links extends React.Component {
	render(){
		return(
			<View>
				<Button title="Home" onPress={() => this.props.navigation.navigate('Home')} />
				<Button title="Contacts" onPress={() => this.props.navigation.navigate('Contacts')} />
			</View>
		)
	}
}
