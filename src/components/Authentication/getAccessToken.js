import { AsyncStorage } from 'react-native';

const getAccessToken = async () => {
	try {
		const value = await AsyncStorage.getItem('@accessToken');
		if (value !== null) {
			return value;
		}
		return null;
	} catch (error) {
		console.log(error);
	}	
};

export default getAccessToken;