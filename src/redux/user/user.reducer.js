import { UserActionTypes } from './user.types';

/*  Reducer:
     - A reducer is actually just a function that gets two properties.
     - It gets a "State Object" which represents the last state or an initial state (an obj that represents what it is)
     - That we're trying to store and then it receives an "Action".
    Action: { type: ..., payload: ... }
     - an object having a "type"(a string value, it's just the name that tells us what specific actions).
     - Might have a "payload" object. It can be anything because with it, we can do things like:
       i.e. Update our State, we might pass an object that we literally set as the value in our State, 
            or might use this value to make some transformations on our State.
*/
const INITIAL_STATE = {
  // When an action gets fired, there's going to be no state.
  // So we want to make sure to set an initial state.
  currentUser: null
};

/*
    - state: sth that the Redux "store" is gonna pass to this "reducer" whenever an action fires
    - action: will be whatever the state it is currently when that action gets fired.
    - When we actually fire the "state" for the first time, it's going to be nothing
      (Because Redux doesn't know that we have any state when the app initializes).
*/
// - Set default State = INITIAL_STATE if State is 'undefined'
// - But it won't fall back on this default value because it will still pass 'null' in as 
//   the State value and consider it an actual valid value.
//   => How do we return the actual State we want based on the action?
const userReducer = (state = INITIAL_STATE, action) => { 
  // Note: every single reducer gets every single action that ever gets fired, 
  //       even if those actions are not related to this reducer.
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER: // Whenever SET_CURRENT_USER is the action type that gets fired.
      // Return a new object which represents the new State that our user reducer is going to transform into.
      return {
        ...state, // Everything else on the State we wanna spread, as we only want to modify values we care about
        currentUser: action.payload // The value that we care set in our currentUser which is the 'payload'
      };
    default:
      return state; // Default to return the current state of what the currentUser is 
  }
};

export default userReducer;
