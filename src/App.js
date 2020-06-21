import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Checkout from './pages/checkout/checkout.component'
import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCollectionsForPreview} from './redux/shop/shop.selectors'
class App extends React.Component {
  
  unsubscriberFromAuth = null
  componentDidMount(){
    const {setCurrentUser} = this.props
    this.unsubscriberFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }
      setCurrentUser(userAuth)
      // addCollectionAndDocuments
      // ('collections',
      // collectionsArray.map(({title,items})=> ({title,items})));
    });
  }
  componentWillUnmount(){
    this.unsubscriberFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route  exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SingInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
