import { Add, Close, Remove } from '@mui/icons-material';
import { Fab } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions.js'

import styles from './checkout-item.module.css';
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className={styles.cartItem}>
      
      <img
        className={styles.cartItem__image}
        src={imageUrl}
        alt={name}
      />

      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{name}</p>
        <p className={styles.details__price}>Rs. {price}</p>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <Fab style={{backgroundColor:"#E0C097",marginRight:"10px",color:"white"}} onClick={()=>{addItem(cartItem)}} size="small" color="inherit">
            <Add />
          </Fab>
            <h2 >{quantity}</h2>
          <Fab style={{backgroundColor:"#FF7878",marginLeft:"10px",color:"white"}} onClick={()=>{removeItem(cartItem)}} size="small" color="default">
            <Remove />
          </Fab>
        </div>
        
      </div>

    </div>

      <div className={styles.btn__holder}>
      
      <Fab style={{backgroundColor:"#FF7878",marginLeft:"10px",color:"white"}} onClick={()=>{clearItem(cartItem)}} size="small" color="default">
        <Close />
      </Fab>
      
      </div>

  </div>
  );
}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem:  item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)