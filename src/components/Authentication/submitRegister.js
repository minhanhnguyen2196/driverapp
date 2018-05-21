import { Alert } from 'react-native';
import request from '../.././utils/request';
import saveAccessToken from './saveAccessToken';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const submit = (values, dispatch, props) => {
	return sleep(1000).then(() => {
		const register = {
			data: {
				username: values.username,
				email: values.email,
				password: values.password,
				phone: values.phone_number
			}	
		};
		request.post('https://gettaxiapp.herokuapp.com/api/register')
		.send(register)
		.then((res) => {
			console.log(res.body);
			if (res.body.error) {
				Alert.alert(
				'Error',
				'Register failed! Phone number already used',
				[
					{ text: 'Register again', onPress: () => console.log('OK pressed') }  
				],
				{ cancelable: false }
			);
				return Promise.reject(new Error('Fail!'));
			}
			saveAccessToken(res.body.token);
			dispatch({
				type: 'STORE_USER_INFO',
				payload: res.body.user
			});
		})
		.then(() => {
			Alert.alert(
				'Thank you',
				'Register successfully',
				[
					{ text: 'OK', onPress: () => props.navigation.navigate('Home') } 
				],
				{ cancelable: false }
			);
		})
		.catch(err => console.log(err));
	});
};

export default submit;
