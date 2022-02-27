// Do this instead of "this.setState(...)" inside "componentDidMount" of App.js
export const setCurrentUser = user => ({
  // Gotta make sure that we always align the action created type with
  // the reducer's type expectation in order to create the appropriate effects in our reducer.
  type: 'SET_CURRENT_USER',
  payload: user // What we're going to do with that user = payload
}); // With this, we've created our user action, so we have the action that our Components are going
    // to leverage in order to actually update our reducers with the appropriate values.