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
				<Text style={styles.confirmTxt}>Begin Trip</Text>
			</TouchableOpacity>
		</View>

	);
	}
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        
    },
    confirmTxt: {
        color: 'white', 
        textAlign: 'center', 
        padding: 10, 
        borderRadius: 6, 
        fontWeight: 'bold'
    },
    confirmBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 20,
        width: 300, 
        height: 40, 
        backgroundColor: 'black', 
    }
});