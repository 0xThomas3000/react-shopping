import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';// higher order Component: connects this Component to a Redux "store"
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo'/>
    </Link>
    <div className='options'>
      <Link className='option' to='shop'>
        SHOP
      </Link>
      <Link className='option' to='shop'>
        CONTACT
      </Link>
      {
        currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
        ) : (
          <Link className='option' to='signin'>SIGN IN</Link>
        )
      }
      <CartIcon />
    </div>
    <CartDropdown />
  </div>
);

// state param: actually "root reducer"
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

// - higher order Components: functions that take Components as arguments and then return a new souped up Component.
// - connect: pass it to functions, the second one being optional, 
//            then that'll give us back another higher component that we passed in "Header"
// - First argument of connect: 
//    a function that allows us to access the state which is our root-reducer)
export default connect(mapStateToProps)(Header);