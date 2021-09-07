const currentData = {
	latitude: 0,
	longitude: 0,
	latitudeDelta: 0.005,
	longitudeDelta: 0.005
 };
const getCurrentLocationReducer = (state = currentData, action) => {
  if (action.type === 'GET_CURRENT_LOCATION') {
    console.log('OK');
    return {
      latitude: action.position.coords.latitude,
      longitude: action.position.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
  };
  }
  if (action.type === 'FAKE_LOCATION') {
    return {
      latitude: action.payload.latitude,
      longitude: action.payload.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  }
  return state; 	
};

export default getCurrentLocationReducer;
