import React from 'react'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import {connect} from 'react-redux'
import { createStructuredSelector } from "reselect";
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from "../../redux/cart/cart.actions";
const CartIcon = ({toggleCartHidden,itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
);
const mapDispatachToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})
const mapStateToProps = createStructuredSelector ({
    itemCount : selectCartItemsCount
})
export default connect(mapStateToProps,mapDispatachToProps)(CartIcon);