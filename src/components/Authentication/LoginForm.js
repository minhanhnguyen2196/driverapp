import React from 'react';
import { Text, StyleSheet, TouchableOpacity, 
	KeyboardAvoidingView, Dimensions, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import submitLogin from './login';
import RenderInput from './RenderInput';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class LoginComponent extends React.Component {
	render() {
		const { handleSubmit } = this.props;
		return (

		<KeyboardAvoidingView style={styles.formContainer}>
			<Animatable.View 
				style={{ margin: 20, paddingBottom: 20, paddingRight: 300 }}
				animation='slideInLeft' iterationCount={1}
			>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
					<Icon name='md-arrow-back' style={{ color: 'black' }} />
				</TouchableOpacity>
			</Animatable.View>
			<Animatable.Text 
				animation='zoomIn' iterationCount={1}
				style={styles.registerText}
			> Sign In 
			</Animatable.Text>
			<View style={styles.userInput}>
				<FontAwesome style={{ padding: 10 }} name="user" size={16} color="#000" />
				<Field
					focus
					withRef
					refField="username"
					keyboardType='default'
					placeholder='Username'
					component={RenderInput}
					name='username'
					returnKeyLabel='Next'
					onSubmit={() => this.password.getRenderedComponent().refs.password.focus()}
					ref={(input) => this.username = input}
				/>
			</View>
			<View style={styles.userInput}>
				<FontAwesome style={{ padding: 10 }} name="key" size={16} color="#000" />
				<Field
					withRef
					refField="password"
					keyboardType='default'
					placeholder='Password'
					component={RenderInput}
					name='password'
					secureTextEntry
					returnKeyLabel='Next'
					ref={(input) => this.password = input}
				/>
			</View>
			<Animatable.View
				animation='bounceIn' iterationCount={1}
			>
			<TouchableOpacity
				onPress={handleSubmit(submitLogin)}
				style={styles.btnSubmit}			
			>
				<Text 
					style={styles.txtStyle}
				>	Sign In Now
				</Text>
			</TouchableOpacity>
			</Animatable.View>
			<View style={{ flexDirection: 'row', paddingBottom: 100 }}>
				<Text style={styles.txtSignUp}> Not registered?</Text> 
				<TouchableOpacity 
					style={{ alignItems: 'center', justifyContent: 'center' }} 
					onPress={() => this.props.navigation.navigate('RegisterForm')} 
				>
					
					<Text style={{ color: 'steelblue', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}> Create an account</Text>
				</TouchableOpacity>
			</View>
			<View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
				<TouchableOpacity 
					style={styles.wrapperSignUp} 
					onPress={() => this.props.navigation.navigate('GoogleSignUp')} 
				>
					<Text style={{ color: 'steelblue', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}> Or connect with your social account</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
);
	}
}

const LoginForm = reduxForm({
  // a unique name for the form
  form: 'form',
})(LoginComponent);

export default LoginForm;

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center' 
	},
	registerText: {
		textAlign: 'center', 
		fontSize: 20, 
		fontWeight: 'bold', 
		margin: 10,
		color: 'steelblue'
	},
	input: {
		borderColor: 'steelblue', 
		borderWidth: 1, 
		height: height * 0.05, 
		width: width * 0.55, 
		padding: 5,
		backgroundColor: 'transparent',
		marginLeft: 10
	},
	label: {
		fontSize: 15, 
		fontWeight: 'bold', 
		width: 80,
		color: 'white'
	},
	btnSubmit: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40, 
		width: 300,
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
	wrapperSignUp: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	txtSignUp: {
		color: 'grey', 
		fontSize: 13, 
		textAlign: 'center',  
		fontWeight: 'bold'  
	},
	userInput: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}

});
