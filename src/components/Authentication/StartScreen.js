import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

const taxi = require('../../img/taxi-128.png');
const { width, height } = Dimensions.get('window');

export default class StartScreen extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<View style={{ paddingBottom: 80, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={taxi} />
					<Text style={styles.text}>Taxi App </Text>
				</View>
				<View style={{ paddingBottom: 20 }}>
				<TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('LoginForm')}>
					<Text style={styles.btnText}> Sign In </Text> 
				</TouchableOpacity>
				</View>
				<View>
				<TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Authentication')}>
					<Text style={styles.btnText}> Register </Text> 
				</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2c3e50'
	},
	wrapper: {
		margin: 40,
		padding: 20,
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		paddingTop: 150
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		height: height * 0.06, 
		width: width * 0.8,
		padding: 20,
		paddingBottom: 20,
		borderRadius: 20,
		backgroundColor: '#fff',

	},
	btnText: {
		fontSize: 20,
		fontFamily: 'italic',
		color: 'black'
	},
	text: {
		fontSize: 30, 
		color: '#fff', 
		fontWeight: 'bold', 
		fontFamily: 'italic', 
	}
});