import React from 'react'
import './header.styles.scss'
import {Link} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import CartIcon from '../cart-icon/cart-icon.component'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
const Header = ({currentUser,hidden}) => (
    <div className="header">
        <Link className="logo-container" to= "/">
            <Logo className="logo"/>
        </Link>
        <div className='options'>
            <Link to="/shop" className="option">
                SHOP
            </Link>
            <Link to="/contact" className="option">
                CONTACT
            </Link>
            {
                currentUser ?
                <div className="option" onClick={()=>auth.signOut()}>SIGN OUT</div>
                :
                <Link to='/signin' className="option">SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {hidden ? null :
        <CartDropdown/>}
    </div>
);
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden: selectCartHidden
})
export default connect(mapStateToProps)(Header)