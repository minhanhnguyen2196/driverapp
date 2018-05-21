import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import getCurrentLocationReducer from './getCurrentLocationReducer';
import updateBookingReducer from './updateBookingReducer';
import driverInfoReducer from './driverInfoReducer';

const rootReducer = combineReducers({
    location: getCurrentLocationReducer,
    booking: updateBookingReducer,
    driverInfo: driverInfoReducer,
    form: formReducer,
});

export default rootReducer;