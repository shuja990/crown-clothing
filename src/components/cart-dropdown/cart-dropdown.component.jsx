import React from 'react'
import {connect} from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import {withRouter} from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component'
import { createStructuredSelector } from 'reselect';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
const CartDropdown = ({cartItems,history,dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.map(cartItem => 
                <CartItem key={cartItem.id} item={cartItem}/>
                )
                : <span className="empty-message">Your Cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
            }}>GO TO CHECKOUT</CustomButton>
    </div>
)
const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdown));