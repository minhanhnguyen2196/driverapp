import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import ToggleSwitch from 'toggle-switch-react-native';
import CountdownCircleScreen from '../RiderRequestScreen/CountdownCircle';
import EndTripButton from './EndTripButton';
import BeginTripButton from './BeginTripButton';
import Header from './Header';
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
        initialPosition: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0
        },
        markerPosition: {
          latitude: 0,
          longitude: 0
        }
       };
      console.disableYellowBox = true;
  }

  componentDidMount() {
    this.getCurrentLatLng();
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getCurrentLatLng = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.getCurrentLocation(position);
        var region = {
          latitude: this.props.region.latitude,
          longitude: this.props.region.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        };
        var markerLocation = {
          latitude: this.props.region.latitude,
          longitude: this.props.region.longitude,
        };
        this.setState({
          initialPosition: region,
          markerPosition: markerLocation
        });
    },
    (error) => console.log(JSON.stringify(error)),
    { enableHighAccuracy: false, timeout: 20000 }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastRegion = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };
      this.setState({ initialPosition: lastRegion, markerPosition: lastRegion });
    }, (error) => console.log(JSON.stringify(error)), 
    );
  }

  
  updateCurrentLocation = () => {
    const currentLocation = {
      locationId: '5a9655d9734d1d3655e9623c',
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
      locationId: '5a9655d9734d1d3655e9623c',
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
    var interval = setInterval(() => {
      if (this.state.available) {
        this.getCurrentLatLng();
        this.updateCurrentLocation();
      } else {
        clearInterval(interval);
      }
    }, 3000); 
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
            region={this.state.initialPosition}
          >
            <Marker
              coordinate={this.state.markerPosition}
              image={carMarker}
            />
          {
            pickUp.latitude && 
            <Marker 
              coordinate={{
                  latitude: parseFloat(pickUp.latitude),
                  longitude: parseFloat(pickUp.longitude)
              }}
              image={human}
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
          <View style={{ width, height: 50, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ justifyContent: 'flex-start', margin: 10, paddingRight: 190 }}>
                  <Text style={{ color: 'black' }}> Available </Text>
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
          <View style={{ position: 'absolute', left: 10, right: 10, bottom: 40 }}>
          {
              (status === 'confirmed') && <BeginTripButton updateTripStatus={this.props.updateTripStatus} />
          }
          
          </View>
            {
              (status === 'started') && 
              <EndTripButton updateTripStatus={this.props.updateTripStatus} />
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
  },
  map: {
  ...StyleSheet.absoluteFillObject
  }
});

