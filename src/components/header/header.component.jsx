import React from 'react'
import './header.styles.scss'
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import CartIcon from '../cart-icon/cart-icon.component'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {connect} from 'react-redux';
import {signOutStart} from '../../redux/user/user.actions'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {HeaderContainer,LogoContainer,OptionLink,OptionsContainer} from './header.styles'
const Header = ({currentUser,hidden,signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to= "/">
            <Logo className="logo"/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop" >
                SHOP
            </OptionLink>
            <OptionLink to="/contact" >
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin' className="option">SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {hidden ? null :
        <CartDropdown/>}
    </HeaderContainer>
); 
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden: selectCartHidden
})
const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})
export default connect(mapStateToProps,mapDispatchToProps)(Header)