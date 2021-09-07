import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Header, Left, Body, Button, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { headerText: 'Book Your Ride' };
	}
	render() {
		return (
			<Header style={styles.header} >
				<Left> 
					<Button onPress={() => this.props.navigation.navigate('DrawerOpen')} transparent >
						<Icon name='bars' style={styles.icon} />
					</Button>
				</Left>
				<Body style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
					<Icon name="taxi" style={styles.icon1} />
					<Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}> 
						Driver App 
					</Text>
				</Body>
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	icon: {
		color: '#FFF',
		fontSize: 28,
	},
	icon1: {
		color: '#FFF',
		fontSize: 28,
		padding: 10
	},
	headerText: {
		color: 'white',
		fontSize: 14
	},
	logo: {
		width: 58,
		height: 20
	},
	header: {
		backgroundColor: '#18722a', 
		justifyContent: 'space-between', 
		alignItems: 'center' 
	}
});