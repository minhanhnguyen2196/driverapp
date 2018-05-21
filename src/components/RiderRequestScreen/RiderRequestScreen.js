import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var Spinner = require('react-native-spinkit');

export default class RiderRequestScreen extends React.PureComponent {
	render() {
		return (
		<View style={styles.container} >

			<Spinner style={{ paddingVertical: 200, margin: 20 }}isVisible size={150} type="Bounce" color="#ffffff" />
			<View style={styles.content}>
				<Text style={styles.text}> Passenger is looking for a driver </Text>
				<Icon style={styles.locationIcon} name="map-marker" />

				<View style={styles.pickup}> 
					<Text>{this.props.booking.pickUp.name}</Text>
				</View>
				<Icon style={styles.toArrow} name="long-arrow-down" />
				<View style={styles.dropoff}>
					<Text>{this.props.booking.dropOff.name}</Text>
				</View>
				<View style={styles.acceptBtnWrapper}>
					<TouchableOpacity style={styles.acceptlBtn} onPress={() => this.props.confirm()}>
						<Text style={styles.acceptBtnText}> Accept </Text>
					</TouchableOpacity>
				</View>	
			</View>	
		</View>

	);
	}
}

//{this.props.booking.pickUp.name} //{this.props.booking.dropOff.name}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16,
  		margin: 10
    },
    locationIcon: {
        color: '#fff',
        fontSize: 40,
        marginTop: 15
    },
    content: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickup: {
        width: width * 0.8,
        borderRadius: 7,
        height: 40,
        backgroundColor: '#fff',
        marginTop: 260,
        justifyContent: 'center',
        alignItems: 'center'

    },
    toArrow: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    dropoff: {
        width: width * 0.8,
        borderRadius: 7,
        height: 40,
        backgroundColor: '#fff',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    acceptBtnWrapper: {
        marginTop: 15,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptlBtn: {
        width: width * 0.8,
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent'
    },
    acceptBtnText: {
        color: '#fff',
    },
});