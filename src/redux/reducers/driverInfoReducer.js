const driverInfo = {
	socketID: null
};

const driverInfoReducer = (state = driverInfo, action) => {
	if (action.type === 'SAVE_SOCKET_ID') {
		return { ...state, socketID: action.payload };
	}
	return state; 	
};

export default driverInfoReducer;
