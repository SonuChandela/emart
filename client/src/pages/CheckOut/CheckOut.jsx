import React from 'react'
import BreadCrumb from '../../components/Breadcrumb/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'
import UserProfile from '../../assets/img/checkout/user.jpg'
import Product from '../../assets/img/products/furniture/1.jpg'

function CheckOut() {
    return (
        <>
            <Layout>
                <BreadCrumb />

                {/* checkout */}
                <div className="checkout-page mt-100">
                    <Container>
                        <div className="checkout-page-wrapper">
                            <Row>
                                <Col xl={9} lg={8} md={12} xs={12}>
                                    <div className="section-header mb-3">
                                        <h2 className="section-heading">Check out</h2>
                                    </div>

                                    <div className="checkout-progress overflow-hidden">
                                        <ol className="checkout-bar px-0">
                                            <li className="progress-step step-done"><a href="cart.html">Cart</a></li>
                                            <li className="progress-step step-active"><a href="checkout.html">Your Details</a>
                                            </li>
                                            <li className="progress-step step-todo"><a href="checkout.html">Shipping</a></li>
                                            <li className="progress-step step-todo"><a href="checkout.html">Payment</a></li>
                                            <li className="progress-step step-todo"><a href="checkout.html">Review</a></li>
                                        </ol>
                                    </div>

                                    <div className="checkout-user-area overflow-hidden d-flex align-items-center">
                                        <div className="checkout-user-img me-4">
                                            <img src={UserProfile} alt="img" />
                                        </div>
                                        <div
                                            className="checkout-user-details d-flex align-items-center justify-content-between w-100">
                                            <div className="checkout-user-info">
                                                <h2 className="checkout-user-name">Susan Gardner</h2>
                                                <p className="checkout-user-address mb-0">2752 avenue Royale, Quebec, G1R 2B2,
                                                    Canada</p>
                                            </div>

                                            <a href="#" className="edit-user btn-secondary text-white">EDIT PROFILE</a>
                                        </div>
                                    </div>

                                    <div className="shipping-address-area">
                                        <h2 className="shipping-address-heading pb-1">Shipping address</h2>
                                        <div className="shipping-address-form-wrapper">
                                            <form action="#" className="shipping-address-form common-form">
                                                <Row>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">First name</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Last name</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Email address</label>
                                                            <input type="email" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Phone number</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Company</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Country</label>
                                                            <select className="form-select">
                                                                <option selected="ca">Canada</option>
                                                                <option value="us">USA</option>
                                                                <option value="au">Australia</option>
                                                                <option value="me">Mexico</option>
                                                            </select>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">City</label>
                                                            <select className="form-select">
                                                                <option selected="ca">Toronto</option>
                                                                <option value="us">Quebec</option>
                                                                <option value="au">Windsor</option>
                                                                <option value="me">Calgary</option>
                                                            </select>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Zip code</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Address 1</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-12">
                                                        <fieldset>
                                                            <label className="label">Address 2</label>
                                                            <input type="text" />
                                                        </fieldset>
                                                    </div>
                                                </Row>

                                            </form>
                                        </div>
                                    </div>

                                    <div className="shipping-address-area billing-area">
                                        <h2 className="shipping-address-heading pb-1">Billing address</h2>
                                        <div className="form-checkbox d-flex align-items-center mt-4">
                                            <input className="form-check-input mt-0" type="checkbox" />
                                            <label className="form-check-label ms-2">
                                                Same as shipping address
                                            </label>
                                        </div>
                                    </div>
                                    <div className="shipping-address-area billing-area">
                                        <div
                                            className="minicart-btn-area d-flex align-items-center justify-content-between flex-wrap">
                                            <Link to="/" className="checkout-page-btn minicart-btn btn-secondary">BACK TO
                                                CART</Link>
                                            <Link to="/"
                                                className="checkout-page-btn minicart-btn btn-primary">PROCEED TO SHIPPING</Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} md={12} xs={12}>
                                    <div className="cart-total-area checkout-summary-area">
                                        <h3 className="d-none d-lg-block mb-0 text-center heading_24 mb-4">Order summary</h3>

                                        <div className="minicart-item d-flex">
                                            <div className="mini-img-wrapper">
                                                <img className="mini-img" src={Product} alt="img" />
                                            </div>
                                            <div className="product-info">
                                                <h2 className="product-title"><a href="#">Eliot Reversible Sectional</a>
                                                </h2>
                                                <p className="product-vendor">$150 x 1</p>
                                            </div>
                                        </div>
                                        <div className="minicart-item d-flex">
                                            <div className="mini-img-wrapper">
                                                <img className="mini-img" src={Product}
                                                    alt="img" />
                                            </div>
                                            <div className="product-info">
                                                <h2 className="product-title"><a href="#">Eliot Reversible Sectional</a>
                                                </h2>
                                                <p className="product-vendor">$150 x 1</p>
                                            </div>
                                        </div>
                                        <div className="minicart-item d-flex">
                                            <div className="mini-img-wrapper">
                                                <img className="mini-img" src={Product}
                                                    alt="img" />
                                            </div>
                                            <div className="product-info">
                                                <h2 className="product-title"><a href="#">Eliot Reversible Sectional</a>
                                                </h2>
                                                <p className="product-vendor">$150 x 1</p>
                                            </div>
                                        </div>
                                        <div className="minicart-item d-flex">
                                            <div className="mini-img-wrapper">
                                                <img className="mini-img" src={Product}
                                                    alt="img" />
                                            </div>
                                            <div className="product-info">
                                                <h2 className="product-title"><a href="#">Eliot Reversible Sectional</a>
                                                </h2>
                                                <p className="product-vendor">$150 x 1</p>
                                            </div>
                                        </div>

                                        <div className="cart-total-box mt-4 bg-transparent p-0">
                                            <div className="subtotal-item subtotal-box">
                                                <h4 className="subtotal-title">Subtotals:</h4>
                                                <p className="subtotal-value">$465.00</p>
                                            </div>
                                            <div className="subtotal-item shipping-box">
                                                <h4 className="subtotal-title">Shipping:</h4>
                                                <p className="subtotal-value">$10.00</p>
                                            </div>
                                            <div className="subtotal-item discount-box">
                                                <h4 className="subtotal-title">Discount:</h4>
                                                <p className="subtotal-value">$100.00</p>
                                            </div>
                                            <hr />
                                            <div className="subtotal-item discount-box">
                                                <h4 className="subtotal-title">Total:</h4>
                                                <p className="subtotal-value">$1000.00</p>
                                            </div>


                                            <div className="mt-4 checkout-promo-code">
                                                <input className="input-promo-code" type="text" placeholder="Promo code" />
                                                <Link to="checkout.html"
                                                    className="btn-apply-code position-relative btn-secondary text-uppercase mt-3">
                                                    Apply Promo Code
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </Layout>
        </>
    )
}

export default CheckOut