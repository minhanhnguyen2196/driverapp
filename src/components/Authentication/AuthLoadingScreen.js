import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import getAccessToken from './getAccessToken';
import checkLogin from './checkLogin';


const background = require('../.././img/background.jpg');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
	sleep(1000)
	.then(() => getAccessToken())
	.then((token) => checkLogin(token))
  .then((res) => {
    if (res.error) {
      this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate('App');
    }
  })
  .catch(err => console.log(err));
	//this._signOutAsync();
  }

  _signOutAsync = async () => {
    //removeItem('@accessToken')
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <ImageBackground source={background} style={styles.container}>
        <ActivityIndicator size="large" color='white' />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	},
  backgroundImage: {
    
  }
});

function mapStateToProps(state) {
  return { 
    userInfo: state.userInfo
  };
}
export default connect(mapStateToProps)(AuthLoadingScreen);
