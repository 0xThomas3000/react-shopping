import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; // catches the action, console.log it out for us(to debug redux code).
import rootReducer from "./root-reducer";

/*
  Middleware:
    - Is an array that the "store" is expecting from Redux.
    Whenever actions get fired or dispatched, we can catch them and then display them.
    And the "middleware", which is the piece in the middle between our "Actions firing" and our "Root Reducer",
    are just functions that receive "Actions" in and then do something with them and then pass
    them out into the "root reducer".
*/

const middlewares = [logger]; // Add to this array if we ever needed to add more things to the middleware.

// ...middlewares: spread in all of the methods or all of the values in [logger] array into applyMiddleware()
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;