import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  /* Asynchronous, get an event 
  */
  handleSubmit = async event => {
    event.preventDefault(); // Want to prevent default action of that form submit action

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return; // Don't want to proceed
    }
 
    /* Use a new Auth method that comes with that Auth library */
    try { 
      /*  1. auth.createUserWithEmailAndPassword: creates a new user account associated with a specific email/password
       *  2. Get 'user' obj by destructuring the 'user' off the 'return of the await for auth.createUserWithEmailAndPassword'
       *     once this is successful, the 'user' gets assigned to our application, from the authentication then 
       *     it gives us back a user auth object. But that user off object is on the key 'user'.
       */
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      
      // Once we get that back, we want to run our createUserProfileDocument() with the 'user' and 'displayName' value
      await createUserProfileDocument(user, { displayName });

      this.setState({ // If this succeeds, then want to reset out "State" (Clear out the form)
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) { // Any thing wrong (can't fetch, or can't create...)
      console.error(error);
    }
  };

  /* 
      Destructure off of the 'event' the 'name' and 'value' from 'target'
  */
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }); // dynamically set the 'name' value to the 'value' value
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
