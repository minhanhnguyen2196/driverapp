import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Interactable from 'react-native-interactable';
import BeginTripButton from './BeginTripButton';
import EndTripButton from './EndTripButton';

import { getCurrentLocation, updateTripStatus, clearState, getCurrentData } from '../../redux/actionCreators';

class RiderProfile extends React.PureComponent {
	render() {
        const { booking } = this.props;
        const { username, status, fare } = booking;
		return (
		<Interactable.View
            style={styles.container}
            verticalOnly={true}
            snapPoints={[{ y: 530 }, { y: 300 }]}
            initialPosition={{ x: 0, y: 530 }}
            onSnap={this.onDrawerSnap}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="window-minimize" size={15} />
            </View>
            <View style={styles.frontView}>
                <Icon name="user" size={30} style={styles.iconUser} /> 
                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 16, color: 'green' }}>
                        {(status === 'confirmed') ? 'Picking Up' : 'Heading To Destination' }
                    </Text>
                    <Text style={{ fontSize: 14, color: 'black' }}>{username}</Text> 
                </View>
                <Text style={{ paddingLeft: 40, fontSize: 16, color: 'steelblue' }}> {fare}.000 VND </Text>
            </View>
            <View style={styles.belowView}>
                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.3, backgroundColor: '#f4f6f7' }}>
                    <TouchableOpacity 
                        style={styles.iconContainer}  
                    >
                        <View style={{ alignItems: 'center', borderRightWidth: 0.5, justifyContent: 'center', flex: 1 }} >
                            <Text style={{ color: 'steelblue' }}> CONTACT </Text>
                            <Icon name="phone" size={30} style={styles.icon} />
                        </View>
                    </TouchableOpacity>
               
                     <TouchableOpacity 
                        style={styles.iconContainer}  
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'red' }}> CANCEL </Text>
                            <Icon name="ban" size={30} style={styles.iconCancel} />
                        </View>
                
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        (status === 'confirmed') &&
                        <BeginTripButton updateTripStatus={this.props.updateTripStatus} />
                    }
                    {
                        (status === 'started') &&
                        <EndTripButton updateTripStatus={this.props.updateTripStatus}/>
                    }
                </View>
            </View>
		</Interactable.View>
	);
	}
}

function mapStateToProps(state) {
  return { 
    region: state.location, 
    booking: state.booking,
    currentData: state.currentData
  };
}

export default connect(mapStateToProps, 
  { updateTripStatus })(RiderProfile);


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        width,
        height: height * 0.36,
    },
    frontView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 0.3,
        padding: 10
    },
    belowView: {
        flex: 2
    },
    iconContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 0.5
    },
    icon: {
        color: 'steelblue',
        fontSize: 30,
        padding: 0
    },
    iconUser: {
        color: 'black',
        fontSize: 30,
        padding: 5
    },
    iconCancel: {
        color: 'red',
        padding: 0
    },
});

