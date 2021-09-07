import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class EndTripButton extends React.Component {
	render() {
		return (
		<View style={styles.container} >
			<TouchableOpacity 
				style={styles.confirmBtn}
				onPress={() => this.props.updateTripStatus('completed')}
			>
				<Text style={styles.confirmTxt}>End Trip</Text>
			</TouchableOpacity>
		</View>

	);
	}
}

//{this.props.booking.pickUp.name} //{this.props.booking.dropOff.name}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    confirmTxt: {
        color: 'white', 
        textAlign: 'center', 
        padding: 10, 
        fontWeight: 'bold',
        fontSize: 16
    },
    confirmBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#18722a', 
    }
});