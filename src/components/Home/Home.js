import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import ToggleSwitch from 'toggle-switch-react-native';
import CountdownCircleScreen from '../RiderRequestScreen/CountdownCircle';
import EndTripButton from './EndTripButton';
import BeginTripButton from './BeginTripButton';
import Header from './Header';
import RiderProfile from './RiderProfile';
import { getCurrentLocation, updateTripStatus, clearState, getCurrentData } from '../../redux/actionCreators';
import getAccessToken from '../Authentication/getAccessToken';

const { width } = Dimensions.get('window');
const carMarker = require('../../img/carMarker.png');
const human = require('../../img/human.png');

console.disableYellowBox = true;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
    this.getCurrentLatLng = this.getCurrentLatLng.bind(this);
    this.updateCurrentStatus = this.updateCurrentStatus.bind(this);
    this.state = { 
      available: false,
      rotationAngle: null,
      coordinate: new AnimatedRegion({
        latitude: this.props.region.latitude,
        longitude: this.props.region.longitude,
      }),
     };
  }

  componentDidMount() {
    this.getCurrentLatLng();
  }
  
  
  componentWillReceiveProps(nextProps) {
    if (this.props.region.latitude !== nextProps.region.latitude) {
      const { coordinate } = this.state;
      const newCoordinate = {
        latitude: nextProps.region.latitude,
        longitude: nextProps.region.longitude
      };
      if (this.marker) {
        const newRotationAngle = this.getRotationAngle(
        this.props.region,
        nextProps.region);
        this.setState({ rotationAngle: newRotationAngle });
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 4000);
        //this.marker._component.showCallout();
      } else {
      coordinate.timing(newCoordinate).start();
      } 
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.booking);
  }
 
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getCurrentLatLng = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.getCurrentLocation(position);
    },
    (error) => console.log(JSON.stringify(error)),
    { enableHighAccuracy: false, timeout: 20000 }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.props.getCurrentLocation(position);
    }, (error) => console.log(JSON.stringify(error)), 
    );
  }

   getRotationAngle = (previousPosition, currentPosition) => {
    const x1 = previousPosition.latitude;
    const y1 = previousPosition.longitude;
    const x2 = currentPosition.latitude;
    const y2 = currentPosition.longitude;

    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  };

  updateCurrentLocation = () => {
    const currentLocation = {
      locationId: '5a965393734d1d3655e960fd',
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude, 
  };

    getAccessToken()
    .then((token) => {
      fetch('https://gettaxiapp.herokuapp.com/api/driverCurrentLocation/' + currentLocation.locationId, 
    {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token  
    },
      body: JSON.stringify(currentLocation)
    })
    .then(res => {
      if (res !== '') console.log('updated');
    });
    }) 
    .catch(err => console.log(err));
  }

  updateCurrentStatus = (available) => {
    const currentLocation = {
      locationId: '5a965393734d1d3655e960fd',
      status: available ? 'available' : 'not available'
  };

    getAccessToken()
    .then((token) => {
       fetch('https://gettaxiapp.herokuapp.com/api/driverCurrentStatus/' + currentLocation.locationId, 
      {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-access-token': token
      },
        body: JSON.stringify(currentLocation)
      })
      .then(res => {
        if (res !== '') console.log('updated');
      });
    })
    .catch(err => console.log(err));
  }

  updateLocationToServer = () => {
      this.getCurrentLatLng();
      this.updateCurrentLocation();
  }


  render() {
    const { region, booking } = this.props;
    const { status, pickUp, dropOff } = booking;

    const GOOGLE_MAPS_APIKEY = 'AIzaSyBRlREWElXlDbqKEBhlSJ8PY9a9lBQONqQ';
    const origin = { 
        latitude: parseFloat(pickUp.latitude), 
        longitude: parseFloat(pickUp.longitude)
    };

    const destination = {
        latitude: parseFloat(dropOff.latitude), 
        longitude: parseFloat(dropOff.longitude)
    };

    return (
      <View style={{ flex: 1 }}>
      {
        (status !== 'pending') ? 
        (
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            region={region}
          >
            <Marker.Animated
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude
              }}
              image={carMarker}
              ref={marker => { this.marker = marker; }}
              rotation={this.state.rotationAngle}
            />
          {
            pickUp.latitude && 
            <Marker 
              coordinate={{
                  latitude: parseFloat(pickUp.latitude),
                  longitude: parseFloat(pickUp.longitude)
              }}
              pinColor='green'
            />
          }

          {
            dropOff.latitude && 
            <Marker 
              coordinate={{
                  latitude: parseFloat(dropOff.latitude),
                  longitude: parseFloat(dropOff.longitude)
              }}
              pinColor='red'
            />
          }    
          {
            (pickUp.latitude && dropOff.latitude) &&
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="black"
              mode='driving'
            />
          }
          </MapView>
          <Header />
           {
              (status !== 'confirmed') && 

              <View style={{ width, height: 50, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ justifyContent: 'flex-start', margin: 10, paddingRight: 190 }}>
                  <Text style={{ color: '#18722a' }}> Available </Text>
              </View>

              <View style={{ margin: 10, justifyContent: 'flex-end' }}>
                <ToggleSwitch 
                  isOn={this.state.available}
                  onColor='green'
                  offColor='grey'
                  size='small'
                  onToggle={(isOn) => {
                    this.setState({ available: isOn });
                    this.updateCurrentStatus(isOn);
                    if (isOn) {
                      this.updateLocationToServer();
                     } 
                  }}
                />
              </View>
          </View>
          } 
          
          {
            (status === 'confirmed' || status === 'started') &&  <RiderProfile />
          }
         
          </View>
        ) : 
          <CountdownCircleScreen 
            booking={this.props.booking} 
            updateTripStatus={this.props.updateTripStatus}
            clearState={this.props.clearState}
          />
      }
      </View> 
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
  { 
    getCurrentLocation, updateTripStatus, clearState, getCurrentData
  })(Home);


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center' 
  },
  map: {
  ...StyleSheet.absoluteFillObject
  }
});

   // {
   //            (status === 'confirmed') && 
   //        }

    // {
    //         (status === 'confirmed' || status === 'started') &&  
    //       }