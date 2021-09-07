import getAccessToken from '../components/Authentication/getAccessToken';

export function getCurrentLocation(position) {
	return { type: 'GET_CURRENT_LOCATION', position };
} 

export function saveBooking(booking) {
	return { type: 'SAVE_BOOKING', booking };
}


export function updateTripStatus(status) {
    return (dispatch, getState) => {
        var updateData = {
            id: getState().booking._id,
            status,
            socketID: getState().driverInfo.socketID,
            driverID: 'A2321312'
        };

        getAccessToken()
        .then((token) => {
            fetch('https://gettaxiapp.herokuapp.com/api/bookings/' + updateData.id, 
            {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': token  
            },
                body: JSON.stringify(updateData)
            })
            .then(res => {
                if (res !== '') console.log('Success');
            });
        })
        .catch(err => console.log(err));
    };
}

export function clearState() {
    return { type: 'CLEAR_STATE' };
}
