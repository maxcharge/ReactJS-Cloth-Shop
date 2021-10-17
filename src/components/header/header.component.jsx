import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {auth} from '../../firebase/firebase.utils.js';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import styles from './header.module.css';
import { IconButton } from '@mui/material';
import { Home, ShoppingCart } from '@mui/icons-material';

const Header = ({ currentUser, hidden }) => (
  <div className={styles.header}>
    <Link to="/shop">
        <IconButton style={{margin:"10px"}}>
          <Home fontSize="large" style={{color:"#FF7878"}}/>
        </IconButton>
    </Link>

    <div className={styles.options}>
      <Link className={styles.option} to="/shop">
        <h2>
          SHOP
        </h2>
      </Link>
      {currentUser ? (
        <div className={styles.option} onClick={() => auth.signOut()}>
          <h2>
            SIGN OUT
          </h2>
        </div>
      ) : (
        <Link className={styles.option} to="/signin">
          <h2>
            SIGN IN
          </h2>
        </Link>
      )}
      <Link to="/checkout">
        <IconButton>
          <ShoppingCart fontSize="large" style={{color:"#FF7878"}}/>
        </IconButton>
      </Link>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
