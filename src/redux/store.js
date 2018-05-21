import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client/dist/socket.io';
import rootReducer from './reducers/rootReducer';
import getAccessToken from '../components/Authentication/getAccessToken';

let socket = io('https://gettaxiapp.herokuapp.com', { jsonp: false });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(rootReducer);

socket.on('confirm connection', (data) => {
	console.log(data);
	console.log(socket.id);
    var driverCurrentData = {
        socketId: socket.id,
        locationId: '5a9655d9734d1d3655e9623c'
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
            console.log(booking);
			store.dispatch({ type: 'SAVE_BOOKING', payload: booking });
            socket.emit('room', booking.userSocketID);
            socket.on('leave room', () => {
                socket.emit('left room', booking.userSocketID);
            });
		} else console.log('Something is wrong');
	});
	

	socket.on('trackDriver', (location) => {
		console.log(location);
		var index = 0;
		var driverMovement = [{
                    lat: 21.027764333,
                    long: 105.83416
                },
                {
                    lat: 21.0277644,
                    long: 105.83412

                },
                {
                    lat: 21.0277113,
                    long: 105.8352

                },
                {
                    lat: 21.0275,
                    long: 105.8361
                }, 
                {
                    lat: 21.027767,
                    long: 105.8371
                },
                {
                    lat: 21.02779,
                    long: 105.8374
                },
                {
                    lat: 21.0277091,
                    long: 105.8376
                },
                {
                    lat: 21.02772,
                    long: 105.83478
            }];

		var interval = setInterval(() => {
                var movementObj = driverMovement[index++];
                if (index === driverMovement.length) {
                    clearInterval(interval);
                    console.log(index);
                }          
                var driverCurrentLocation = {
                    locationId: location._id,
                    latitude: movementObj.lat,
                    longitude: movementObj.long,
                    status: 'driving'
                };
                fetch('https://gettaxiapp.herokuapp.com/api/driverCurrentData/' + location._id, 
				{
					method: 'PUT',
					headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
					body: JSON.stringify(driverCurrentLocation)
				})
                .then((response) => {
                    // Check for a successful (blank) response
                    if (response !== '') {
                        console.log('Driver Location updated');
                    } else {
                        console.log('Error: ' + response);
                    }
                });
            }, 5000);
	}); 	
});


export default store; 

