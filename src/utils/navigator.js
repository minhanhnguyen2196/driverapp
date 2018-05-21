import { StackNavigator, SwitchNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Authentication from '../components/Authentication/Authentication';
import RegisterForm from '../components/Authentication/RegisterForm';
import LoginForm from '../components/Authentication/LoginForm';
import StartScreen from '../components/Authentication/StartScreen';
import ValidationCode from '../components/Authentication/ValidationCode';
import AuthLoadingScreen from '../components/Authentication/AuthLoadingScreen';
import Home from '../components/Home/Home';


export const AppStack = StackNavigator({ 
  Home,
}, {
	navigationOptions: ({ navigation }) => ({
      header: null
  })
});

export const AuthStack = StackNavigator({
  StartScreen,
  Authentication,
  RegisterForm,
  LoginForm,
  ValidationCode
},
{
   transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
   }),
    navigationOptions: ({ navigation }) => ({
      header: null
  })
});

export const App = SwitchNavigator({
  	AuthLoading: AuthLoadingScreen,
	Auth: AuthStack,
	App: AppStack 
},
  {
    initialRouteName: 'AuthLoading'
  });

