import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client/dist/socket.io';
import rootReducer from './reducers/rootReducer';
import request from '../utils/request';
import getAccessToken from '../components/Authentication/getAccessToken';

let socket = io('https://gettaxiapp.herokuapp.com', { jsonp: false });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(rootReducer);

socket.on('confirm connection', (data) => {
	console.log(data);
	console.log(socket.id);
    var driverCurrentData = {
        socketId: socket.id,
        locationId: '5a965393734d1d3655e960fd'
    };

    getAccessToken()
    .then((token) => {
        fetch('https://gettaxiapp.herokuapp.com/api/driverLocationSocket/' + driverCurrentData.locationId, 
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-access-token': token  
        },
            body: JSON.stringify(driverCurrentData)
        })
        .then(res => {
            if (res !== '') console.log('Success'); else console.log('Not connected');
            store.dispatch({ type: 'SAVE_SOCKET_ID', payload: socket.id });
        });
    }) 
	.catch(err => console.log(err));

	socket.on('driver request', (booking) => {
		if (booking) {
			store.dispatch({ type: 'SAVE_BOOKING', payload: booking });
            socket.emit('room', booking.userSocketID);
            socket.on('leave room', () => {
                socket.emit('left room', booking.userSocketID);
                store.dispatch({ type: 'CLEAR_STATE' });
            });
		} else console.log('Something is wrong');
	});
	

	socket.on('trackDriver', (location) => {
		var pickUpLatitude = String(store.getState().booking.pickUp.latitude);
        var pickUpLongitude = String(store.getState().booking.pickUp.longitude);
        var currentLatitude = String(store.getState().location.latitude);
        var currentLongitude = String(store.getState().location.longitude);
        request.get('https://maps.googleapis.com/maps/api/directions/json')
        .query({
            origin: currentLatitude.concat(',', currentLongitude),
            destination: pickUpLatitude.concat(',', pickUpLongitude),
            key: 'AIzaSyB0MeIPhayVTnc0MOJqk0Cw6f3YIkPh2O0'
        })
        .finish((err, res) => {
            //console.log(res.body);
            var index = 0;
            var count = 0;
            var driverMovement = [];
            var routes = res.body.routes[0].legs[0].steps;
            while (index < routes.length) {
                driverMovement[index] = routes[index].end_location;
                index++;
            }
            //console.log(driverMovement[4]);

            var interval = setInterval(() => {
                var movementObj = driverMovement[count++];
                if (count === driverMovement.length) {
                    clearInterval(interval);
                }          
                var driverCurrentLocation = {
                    locationId: location._id,
                    latitude: movementObj.lat,
                    longitude: movementObj.lng,
                    userSocketID: store.getState().booking.userSocketID
                };
                var payload = {
                    latitude: movementObj.lat,
                    longitude: movementObj.lng,
                };
            getAccessToken()
            .then((token) => {
                fetch('https://gettaxiapp.herokuapp.com/api/driverCurrentLocation/' + location._id, 
                {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token
                },
                    body: JSON.stringify(driverCurrentLocation)
                })
                .then((response) => {
                    // Check for a successful (blank) response
                    if (response !== '') {
                        console.log('Driver Location updated');
                        store.dispatch({ type: 'FAKE_LOCATION', payload });
                    }
                });
            })
            .catch(err => console.log(err));
        }, 5000);
    });     
    });
    });   

    socket.on('started', () => {
        var pickUpLatitude = String(store.getState().booking.pickUp.latitude);
        var pickUpLongitude = String(store.getState().booking.pickUp.longitude);
        var dropOffLatitude = String(store.getState().booking.dropOff.latitude);
        var dropOffLongitude = String(store.getState().booking.dropOff.longitude);
        request.get('https://maps.googleapis.com/maps/api/directions/json')
        .query({
            origin: pickUpLatitude.concat(',', pickUpLongitude),
            destination: dropOffLatitude.concat(',', dropOffLongitude),
            key: 'AIzaSyB0MeIPhayVTnc0MOJqk0Cw6f3YIkPh2O0'
        })
        .finish((err, res) => {
            //console.log(res.body);
            var index = 0;
            var count = 0;
            var driverMovement = [];
            var routes = res.body.routes[0].legs[0].steps;
            while (index < routes.length) {
                driverMovement[index] = routes[index].end_location;
                index++;
            }
            //console.log(driverMovement[4]);

            var interval = setInterval(() => {
                var movementObj = driverMovement[count++];
                if (count === driverMovement.length) {
                    clearInterval(interval);
                }          
                var driverCurrentLocation = {
                    locationId: '5a965393734d1d3655e960fd',
                    latitude: movementObj.lat,
                    longitude: movementObj.lng,
                    userSocketID: store.getState().booking.userSocketID
                };
                var payload = {
                    latitude: movementObj.lat,
                    longitude: movementObj.lng,
                };
            getAccessToken()
            .then((token) => {
                fetch('https://gettaxiapp.herokuapp.com/api/driverCurrentLocation/' + driverCurrentLocation.locationId, 
                {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token
                },
                    body: JSON.stringify(driverCurrentLocation)
                })
                .then((response) => {
                    // Check for a successful (blank) response
                    if (response !== '') {
                        console.log('Driver Location updated');
                        store.dispatch({ type: 'FAKE_LOCATION', payload });
                    }
                });
            })
            .catch(err => console.log(err));
        }, 5000);
    });     
    });


export default store; 


            // var interval = setInterval(() => {
            // var driverCurrentLocation = {
            //     locationId: location._id,
            //     latitude: store.getState().location.latitude,
            //     longitude: store.getState().location.longitude,
            //     userSocketID: store.getState().booking.userSocketID
            // };