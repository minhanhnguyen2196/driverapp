import React from 'react';
import { Text, StyleSheet, 
		KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import submit from './submitRegister';
import RenderInput from './RenderInput';

//Validation
const required = value => value ? undefined : 'Required';

const maxLength = max => value =>
value && value.length > max ? `Must be ${max} characters or less` : 'undefined';

const minLength = min => value =>
value && value.length < min ? `Must be ${min} characters or more` : 'undefined';

const email = value =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
? 'Invalid email address'
: undefined;
///^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
const phoneNumber = value =>
value && !/^(01[2689]|09)[0-9]{8}$/i.test(value)
? 'Invalid phone number, must be 10 digits'
: undefined;

class RegisterComponent extends React.Component {
	render() {
		const { handleSubmit } = this.props;
		return (
		<KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
			<Animatable.View 
				style={{ paddingRight: 300 }}
				animation='slideInLeft' iterationCount={1}
			>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
					<Icon name='md-arrow-back' style={{ color: 'black' }} />
				</TouchableOpacity>
			</Animatable.View>
			<Animatable.Text 
				animation='zoomIn' iterationCount={1}
				style={styles.registerText}
			> Create Your Account
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
					validate={[required, minLength(6), maxLength(20)]}
					onSubmit={() => this.email.getRenderedComponent().refs.email.focus()}
					ref={(input) => this.username = input}
				/>
			</View>
			<View style={styles.userInput}>
				<FontAwesome style={{ padding: 10 }} name="envelope" size={16} color="#000" />
				<Field
					withRef
					refField="email"
					keyboardType='email-address'
					placeholder='Email'
					component={RenderInput}
					name='email'
					returnKeyLabel='Next'
					validate={[required, email]}
					ref={(input) => this.email = input}
					onSubmit={() => this.password.getRenderedComponent().refs.password.focus()}
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
					validate={[required, minLength(5)]}
					ref={(input) => this.password = input}
					onSubmit={() => this.phone.getRenderedComponent().refs.phone.focus()}
									
				/>
			</View>
			<View style={styles.userInput}>
			<FontAwesome style={{ padding: 10 }} name="phone" size={16} color="#000" />
			<Field
				withRef
				refField="phone"
				keyboardType='numeric'
				placeholder='Phone number'
				component={RenderInput}
				name='phone_number'
				returnKeyLabel='Go'
				validate={[required, phoneNumber]}
				ref={(input) => this.phone = input}
			/>
			</View>
			<Animatable.View
				animation='bounceIn' iterationCount={1}
			>
			<TouchableOpacity
				onPress={handleSubmit(submit)}
				style={styles.btnSubmit}			
			>
				<Text 
					style={styles.txtStyle}
				>	Sign Up Now
				</Text>
			</TouchableOpacity>
			</Animatable.View>
		</KeyboardAvoidingView>
);
	}
}


const RegisterForm = reduxForm({
  // a unique name for the form
  form: 'form',
})(RegisterComponent);

export default RegisterForm;

const styles = StyleSheet.create({
	formContainer: {
		alignItems: 'center',
		justifyContent: 'center',

	},
	registerText: {
		textAlign: 'center', 
		fontSize: 20, 
		fontWeight: 'bold', 
		margin: 10, 
		color: 'steelblue'
	},
	input: {
		borderColor: 'white',  
		height: 50, 
		width: 300, 
		paddingHorizontal: 20,
		backgroundColor: '#34495e',
		marginVertical: 10,
		borderRadius: 20,
		borderWidth: 1,
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 16,

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
	},
	txtSignUp: {
		color: 'white', 
		fontSize: 14, 
		textAlign: 'center', 
		padding: 10,		
		fontWeight: 'bold' 
	},
	txtAgree: {
		color: 'white', 
		fontSize: 12, 	
		fontWeight: 'bold',
		textAlign: 'center',
	},
	userInput: {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',

	}


});
