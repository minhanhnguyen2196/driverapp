const booking = {
	pickUp: { latitude: null, longitude: null },
	dropOff: { latitude: null, longitude: null },
	status: null,
};

const updateBookingReducer = (state = booking, action) => {
	if (action.type === 'SAVE_BOOKING') {
		return action.payload;
	}
	if (action.type === 'UPDATE_BOOKING') {
		return action.payload;
	}
	if (action.type === 'CANCEL_BOOKING') {
		return { ...state, status: 'canceled' };
	}
	if (action.type === 'CLEAR_STATE') {
		return { 
			pickUp: { latitude: null, longitude: null },
			dropOff: { latitude: null, longitude: null },
			status: null,
		};
	}
	return state; 	
};

export default updateBookingReducer;
