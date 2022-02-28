import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

// Update App Component so that it can update the reducer value with the new setCurrentUser action that we made.
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {
  unsubscribeFromAuth = null;
  /*
   *   Once the code calls fetch, it won't come back again till componentDidMount() gets called again.
   *   But, we don't wanna remount the app (just wanna know when Firebase has realized the Auth state has changed).
   *   EX: Whenever somebody signs in/signs out, we want to be aware of that change without having to fetch manually.
   */
  componentDidMount() {
    const { setCurrentUser } = this.props;

    // Firing a fetch to the backend to fetch Data
    // onAuthStateChanged: method on 'auth' with the 'user state' as param
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // If there's a Document there, get back to userRef

        // To check if our DB has updated at that reference with any new data?
        // Listen/subscribe to this userRef for any changes to that data, 
        //  but will also get back the 'first State' of that data
        userRef.onSnapshot(snapShot => { 
          setCurrentUser({ // this line of code was replaced to our currentUser action code.
              id: snapShot.id,
              ...snapShot.data()
            }
          //, () => {console.log(this.state);}
          );
          // console.log(this.state);
        });
      }
      setCurrentUser(userAuth); // Set the user to 'null'(if the userAuth doesn't exist)
    }); 
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // Close the subscription
  }

  render() {
    return (
      <div>
        <Header /> {/* currentUser={this.state.currentUser} />*/}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='signin' element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  };
}

/*  A function that gets this 'dispatch' property then similarily will return an object where 
 *  the prop name will be whatever prop we want to pass in which dispatches the new action 
 *  that we're trying to pass, which is setCurrentUser in this case.
 */ 
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) // Invoke setCurrentUser with the user that will then be used as the payload
});

/* Connect App to the outcome of initial connect call using the second argument of connect (mapDispatchToProps)
 * The first arg = null: 
 *    - Because App doesn't need currentUser anymore (don't need any stateToProps from our reducer).
 *    - Because outside of passing it into a header, it only sets it, but it doesn't do anything with the
 *      currentUser value in its Component itself
 */
export default connect(null, mapDispatchToProps)(App); 