import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class BeginTripButton extends React.Component {
	render() {
		return (
		<View style={styles.container} >
			<TouchableOpacity 
				style={styles.confirmBtn}
				onPress={() => this.props.updateTripStatus('started')}
			>
				<Text style={styles.confirmTxt}>START YOUR TRIP</Text>
			</TouchableOpacity>
		</View>

	);
	}
}


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