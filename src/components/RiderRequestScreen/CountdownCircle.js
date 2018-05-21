import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountdownCircle from 'react-native-countdown-circle';

export default class CountdownCircleScreen extends React.PureComponent {
	render() {
		return (
		<View style={styles.container}>
            <View style={{ width, height: height * 0.1, backgroundColor: '#487eb0', alignItems: 'center', justifyContent: 'center' }}>  
                <Text style={styles.text}> Rider Notification </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 15 }}> Tap on the circle to accept the ride </Text>
            </View>
			<View style={styles.circle} >
				<TouchableOpacity onPress={() => this.props.updateTripStatus('confirmed')} >
					<CountdownCircle
						seconds={30}
						radius={120}
						borderWidth={8}
						color="#0984e3"
						bgColor="#fff"
						textStyle={{ fontSize: 20, color: 'black' }}
						onTimeElapsed={() => {
                            this.props.updateTripStatus('pending');
                            this.props.clearState();
                        }}
					/>
				</TouchableOpacity>
			</View>
           
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<View style={styles.pickup}>
					<Icon style={styles.locationIcon} name="map-marker" />
					<Text style={styles.text}>{this.props.booking.pickUp.address}</Text>
				</View>
                <View style={styles.dropoff}>
                    <Icon style={styles.locationIcon} name="flag" />
                    <Text style={styles.text}>{this.props.booking.dropOff.address}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.cancelBtn} 
                    onPress={() => {
                        this.props.updateTripStatus('pending');
                        this.props.clearState();
                    }} 
                >
                    <Text style={styles.cancelBtnText}>Reject</Text>
                </TouchableOpacity>
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
        backgroundColor: '#273c75',
        alignItems: 'center'
    },
    circle: {
		paddingVertical: 50, 
		margin: 10, 
		height: 270, 
		width: 270, 
		borderRadius: 135, 
		backgroundColor: '#2c3e50', 
		justifyContent: 'center', 
		alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 14,
		margin: 5
    },
    locationIcon: {
        color: 'black',
        fontSize: 20,
        margin: 10
    },
    content: {
		margin: 10
    },
    pickup: {
        width,
        borderRadius: 7,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',

    },
    toArrow: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    dropoff: {
        width: width * 0.9,
        borderRadius: 7,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',

    },
    acceptBtnWrapper: {
        marginTop: 5,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptlBtn: {
        width: width * 0.8,
        height: height * 0.065,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent'
    },
    cancelBtn: {
        width: width * 0.7,
        height: height * 0.055,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red',
        margin: 20
    },
    acceptBtnText: {
        color: '#fff',
    },
    cancelBtnText: {
        color: '#fff',
        fontSize: 16,
    },
});

 // <View style={styles.content}>
 //                    <Text style={{ color: 'yellow', fontSize: 16 }}>DROP OFF LOCATION </Text>
 //                </View>
 //                <View style={styles.dropoff}>
 //                    <Icon style={styles.locationIcon} name="flag" />
 //                    <Text style={styles.text}>6 Dinh Liet</Text>
 //                </View>