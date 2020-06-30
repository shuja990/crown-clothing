import React,{useEffect} from 'react';
import './App.css';
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Checkout from './pages/checkout/checkout.component'
import Header from './components/header/header.component';
import {checkUserSession} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCollectionsForPreview} from './redux/shop/shop.selectors'
const App = ({checkUserSession,currentUser})  => {
  
  useEffect(() => {
    checkUserSession();
  },[checkUserSession]); 
  // unsubscriberFromAuth = null
 // componentDidMount(){
  // useEffect(()=>{ Unmount
  //   const unsubscriberFromCollection = firestore
  //   .collection('collections')
  //   .onSnapshot(onSnapshot => console.log(snapshot))
  //   return  () => {
  //     unsubscriberFromCollection();
  //   }
  // })
   
  //  const {setCurrentUser} = this.props
    // this.unsubscriberFromAuth = auth.onAuthStateChanged(async userAuth=>{
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot =>{
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         });
    //     });
    //   }
    //   setCurrentUser(userAuth)
    //   
    // });
 // }
  // componentWillUnmount(){
  //   this.unsubscriberFromAuth();
  // }
  // addCollectionAndDocuments
    //   // ('collections',
    //   // collectionsArray.map(({title,items})=> ({title,items})));
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route  exact path='/signin' render={() => currentUser ? (<Redirect to='/'/>) : (<SingInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
