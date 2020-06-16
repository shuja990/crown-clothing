import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscriberFromAuth = null
  componentDidMount(){
    this.unsubscriberFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          },() => {console.log(this.state)})
        });
      }
      this.setState({currentUser: userAuth})
    });
  }
  componentWillUnmount(){
    this.unsubscriberFromAuth();
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SingInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
