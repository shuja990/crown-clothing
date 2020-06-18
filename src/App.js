import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
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
          <Route path='/signin' component={SingInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default connect(null,mapDispatchToProps)(App);
