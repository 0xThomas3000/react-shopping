import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  /*
   *   Once the code calls fetch, it won't come back again till componentDidMount() gets called again.
   *   But, we don't wanna remount the app (just wanna know when Firebase has realized the Auth state has changed).
   *   EX: Whenever somebody signs in/signs out, we want to be aware of that change without having to fetch manually.
   */
  componentDidMount() {
    // Firing a fetch to the backend to fetch Data
    // onAuthStateChanged: method on 'auth' with the 'user state' as param
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => { 
      createUserProfileDocument(user);
    }); 
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // Close the subscription
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='signin' element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  };
}

export default App;