import React from 'react';
import { StyleSheet, Text, Dimensions, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ValidationCode extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ color: '#fff', fontSize: 18 }}> Enter your validation code </Text>
				<View style={{ flexDirection: 'row' }}>
					<TextInput
						style={styles.inputStyle}
						keyboardType='numeric'
						returnKeyLabel='Next'
						maxLength={1}
						underlineColorAndroid='#fff'
						ref={(input) => this.number1 = input}
						onSubmitEditing={() => this.number2.focus()}
					/>
					<TextInput
						style={styles.inputStyle}
						keyboardType='numeric'
						returnKeyLabel='Next'
						maxLength={1}
						underlineColorAndroid='#fff'
						ref={(input) => this.number2 = input}
						onSubmitEditing={() => this.number3.focus()}
					/>
					<TextInput
						style={styles.inputStyle}
						keyboardType='numeric'
						returnKeyLabel='Next'
						maxLength={1}
						underlineColorAndroid='#fff'
						ref={(input) => this.number3 = input}
						onSubmitEditing={() => this.number4.focus()}
					/>
					<TextInput
						style={styles.inputStyle}
						keyboardType='numeric'
						returnKeyLabel='Go'
						maxLength={1}
						underlineColorAndroid='#fff'
						ref={(input) => this.number4 = input}	
					/>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('App')}
						style={styles.btnSubmit}			
					>
						<Text 
							style={styles.txtStyle}
						>	Submit
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2c3e50',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center' 
	},
	btnSubmit: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40, 
		width: 200,
		backgroundColor: '#2980b9',
		borderRadius: 20,
		margin: 20
	},
	txtStyle: {
		color: 'white', 
		fontSize: 18, 
		textAlign: 'center', 
		fontWeight: 'bold' 
	},
	inputStyle: {
		width: 50, 
		color: '#fff', 
		fontSize: 18, 
		textAlign: 'center'
	}
});