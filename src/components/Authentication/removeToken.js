import { AsyncStorage } from 'react-native';

const removeAccessToken = async () => {
	try {
		await AsyncStorage.removeItem('@accessToken');
	} catch (error) {
		console.log(error);
	}	
};

export default removeAccessToken;