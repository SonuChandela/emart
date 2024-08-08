import React from 'react'
import Layout from '../../components/Layouts/Layout'
import BreadCrumb from '../../components/Breadcrumb/BreadCrumb'
import ProductImage from '../../assets/img/products/furniture/1.jpg'
import Plus from '../../assets/img/icon/plus.svg'
import Minus from '../../assets/img/icon/minus.svg'
import { Link } from 'react-router-dom'
import { addItem, removeItem, substrackQuantity, selectSubtotal } from "../../store/Features/CartSlice"
import { useSelector, useDispatch } from 'react-redux'

function Cart() {
    const cartdata = useSelector((state) => state.cart.items);
    // subtotal of prosuct amount 
    const subtotal = useSelector(selectSubtotal);
    const dispatch = useDispatch();

    // remove item from cart 
    const removeItem = (e, itemId) => {
        e.preventDefault();
        dispatch(removeItem(itemId));
    }

    // increase item quantity 
    const addToCart = (item) => {
        dispatch(addItem(item))
    }
    return (
        <>
            <Layout>
                {/* BreadCrumb */}
                <BreadCrumb />

                <div className="cart-page mt-100">
                    <div className="container">
                        <div className="cart-page-wrapper">
                            <div className="row">
                                <div className="col-lg-7 col-md-12 col-12">
                                    <table className="cart-table w-100">
                                        <thead>
                                            <tr>
                                                <th className="cart-caption heading_18">Product</th>
                                                <th className="cart-caption heading_18"></th>
                                                <th className="cart-caption text-center heading_18 d-none d-md-table-cell">
                                                    Quantity</th>
                                                <th className="cart-caption text-end heading_18">Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartdata.map((item) => (
                                                    < tr className="cart-item" key={item.id} >
                                                        <td className="cart-item-media">
                                                            <div className="mini-img-wrapper">
                                                                <img className="mini-img" src={item.thumbnail} alt={item.title} />
                                                            </div>
                                                        </td>
                                                        <td className="cart-item-details">
                                                            <h2 className="product-title"><Link to={`/products/${item.id}`}>{item.title}</Link>
                                                            </h2>
                                                            <p className="product-vendor">{item.brand}</p>
                                                        </td>
                                                        <td className="cart-item-quantity">
                                                            <div className="quantity d-flex align-items-center justify-content-between">
                                                                <button className="qty-btn dec-qty" onClick={() => dispatch(substrackQuantity(item.id))}><img src={Minus}
                                                                    alt="minus" /></button>
                                                                <span className="qty-input">{item.quantity}</span>
                                                                <button className="qty-btn inc-qty" onClick={() => addToCart(item)}><img src={Plus}
                                                                    alt="plus" /></button>
                                                            </div>
                                                            <Link to="#" className="product-remove mt-2" onClick={(e) => removeCartItem(e, item.id)}>Remove</Link>
                                                        </td>
                                                        <td className="cart-item-price text-end">
                                                            <div className="product-price">&#x20b9;{item.price}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-lg-5 col-md-12 col-12">
                                    <div className="cart-total-area">
                                        <h3 className="cart-total-title d-none d-lg-block mb-0">Cart Totals</h3>
                                        <div className="cart-total-box mt-4">
                                            <div className="subtotal-item subtotal-box">
                                                <h4 className="subtotal-title">Subtotals:</h4>
                                                <p className="subtotal-value">&#x20b9;{subtotal.toFixed(2)}</p>
                                            </div>
                                            <div className="subtotal-item shipping-box">
                                                <h4 className="subtotal-title">Shipping:</h4>
                                                <p className="subtotal-value">&#x20b9;10.00</p>
                                            </div>
                                            <div className="subtotal-item discount-box">
                                                <h4 className="subtotal-title">Discount:</h4>
                                                <p className="subtotal-value">&#x20b9;100.00</p>
                                            </div>
                                            <hr />
                                            <div className="subtotal-item discount-box">
                                                <h4 className="subtotal-title">Total:</h4>
                                                <p className="subtotal-value">&#x20b9;1000.00</p>
                                            </div>
                                            <p className="shipping_text">Shipping & taxes calculated at checkout</p>
                                            <div className="d-flex justify-content-center mt-4">
                                                <Link to="checkout.html"
                                                    className="position-relative btn btn-primary text-white text-uppercase">
                                                    Procced to checkout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </>
    )
}

export default Cart