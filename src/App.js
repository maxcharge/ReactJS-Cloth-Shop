import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'

import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component'
import Header from './components/header/header.component'

import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import "./App.css";

const App = (props) =>{
  useEffect(() => {
    const {setCurrentUser} = props
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth)
    })
    return () => {
      unsubscribeFromAuth()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
          exact
          path="/signin" 
          render={() => 
            props.currentUser ? (

              <Redirect to='/' />
              ) : (
                <SignInAndSignUp/>
                )
              } 
            />
        </Switch>
      </div>
    ) 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
