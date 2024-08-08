import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Plus from "../../assets/img/icon/plus.svg"
import Minus from "../../assets/img/icon/minus.svg"
import { addItem, removeItem, substrackQuantity, selectSubtotal } from '../../store/Features/CartSlice'
import { useSelector, useDispatch } from 'react-redux'

// Cart Drawer
const CartDrawer = ({ cartDrawer, setCartDrawer }) => {
    // const [quantity, setQuantity] = useState(0);
    const cartItems = useSelector((state) => state.cart.items);
    const subtotal = useSelector(selectSubtotal);
    const dispatch = useDispatch();

    // add new item and increase cart items 
    const addToCart = (item) => {
        dispatch(addItem({ cartItem: item }))
    }
    // remove Items from cart 
    const removeCartItem = (e, itemId) => {
        e.preventDefault();
        dispatch(removeItem(itemId))
    }
    return (
        <>
            <Offcanvas show={cartDrawer} onHide={() => setCartDrawer(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{`Your Cart Items ${cartItems.length}`}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="cart-content-area d-flex justify-content-between flex-column">
                        <div className="minicart-loop custom-scrollbar">
                            {/*show cart items */}
                            {
                                cartItems?.map((item) => {
                                    return (
                                        <div key={item.id} className="minicart-item d-flex">
                                            <div className="mini-img-wrapper">
                                                <img className="mini-img" src={item.thumbnail} alt={item.title} />
                                            </div>
                                            <div className="product-info">
                                                <h2 className="product-title"><Link to={`/products/${item.id}`}>{item.title}</Link></h2>
                                                <p className="product-vendor">{item.brand}</p>
                                                <div className="misc d-flex align-items-end justify-content-between">
                                                    <div className="quantity d-flex align-items-center justify-content-between">
                                                        <button className="qty-btn dec-qty" onClick={() => dispatch(substrackQuantity({ id: item.id }))}><img src={Minus}
                                                            alt="minus" /></button>
                                                        <span className="qty-input">{item.quantity}</span>
                                                        <button className="qty-btn inc-qty" onClick={() => addToCart(item)}><img src={Plus}
                                                            alt="plus" /></button>
                                                    </div>
                                                    <div className="product-remove-area d-flex flex-column align-items-end">
                                                        <div className="product-price">&#x20b9;{item.price}</div>
                                                        <a href="#" className="product-remove" onClick={(e) => removeCartItem(e, item.id)}>Remove</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                        <div className="minicart-footer">
                            <div className="minicart-calc-area">
                                <div className="minicart-calc d-flex align-items-center justify-content-between">
                                    <span className="cart-subtotal mb-0">Subtotal</span>
                                    <span className="cart-subprice">&#x20b9;{subtotal.toFixed(2)}</span>
                                </div>
                                <p className="cart-taxes text-center my-4">Taxes and shipping will be calculated at checkout.
                                </p>
                            </div>
                            <div className="minicart-btn-area d-flex align-items-center justify-content-between">
                                <Link to="/cart" className="minicart-btn btn outline-secondary btn-secondary">View Cart</Link>
                                <Link to="/checkout" className="minicart-btn btn text-white btn-primary">Checkout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="cart-empty-area text-center py-5 d-none">
                        <div className="cart-empty-icon pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                            </svg>
                        </div>
                        <p className="cart-empty">You have no items in your cart</p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default CartDrawer