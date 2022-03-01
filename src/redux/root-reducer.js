import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

/*  - Base reducer object that represents all of the State of our app 
 *  - Is the actual code that combines all of other States together.
 *  - Represents the overall reducer based on all of the reducers that it pulls in.
 */

// Export out this as the default value which gets returned from combineReducers passing in an object.
export default combineReducers({
  user: userReducer, // an object where the key goes to the actual reducer(userReducer) that we want.
  cart: cartReducer
  /*
      Note: all full state in Redux is just one big JSON object. 
            The keys that represent the individual slices of state
            (i.e. the actual reducers is the actual individual reducer that we wrote)
  */
});

/* 
    In sum: 
    that userReducer is just currently that object with a userReducer value that will get set whenever
    the current user action fires. We are then pulling that into this combined reducers, which over turn it 
    into one giant object that is appropriately bound with all the redux functionality that we want.
*/