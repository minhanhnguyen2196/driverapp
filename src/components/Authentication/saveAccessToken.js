import { AsyncStorage } from 'react-native';

const saveAccessToken = async (token) => {
	try {
		await AsyncStorage.setItem('@accessToken', token);
	} catch (error) {
		console.log(error);
	}
};

export default saveAccessToken;