import React, { useState } from 'react'
import { Col, Accordion } from 'react-bootstrap'
// import { Col, Offcanvas, Accordion } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import CollectionBanner from '../../assets/img/banner/collection.jpg'
import FullStart from '../../assets/img/icon/star.png'
import Product2 from '../../assets/img/products/furniture/21.jpg'

function FilterDrawer({ filter, setFilter }) {
    return (
        <>
            <Col lg={3} md={12} xs={12}>
                <div className={`collection-filter filter-drawer ${filter && 'active'}`}>
                    <div className="filter-widget d-lg-none d-flex align-items-center justify-content-between">
                        <h5 className="heading_24">Filter By</h5>
                        <button type="button"
                            className="btn-close text-reset filter-drawer-trigger d-lg-none" onClick={() => setFilter(false)}></button>
                    </div>

                    {/* <div className="filter-widget d-lg-none">
                        <div className="filter-header faq-heading heading_18 d-flex align-items-center justify-content-between border-bottom"
                            data-bs-toggle="collapse" data-bs-target="#filter-mobile-sort">
                            <span>
                                <span className="sorting-title me-2">Sort by:</span>
                                <span className="active-sorting">Featured</span>
                            </span>
                            <span className="faq-heading-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </div>
                        <div id="filter-mobile-sort" className="accordion-collapse collapse show">
                            <ul className="sorting-lists-mobile list-unstyled m-0">
                                <li><a href="#" className="text_14">Featured</a></li>
                                <li><a href="#" className="text_14">Best Selling</a></li>
                                <li><a href="#" className="text_14">Alphabetically, A-Z</a></li>
                                <li><a href="#" className="text_14">Alphabetically, Z-A</a></li>
                                <li><a href="#" className="text_14">Price, low to high</a></li>
                                <li><a href="#" className="text_14">Price, high to low</a></li>
                                <li><a href="#" className="text_14">Date, old to new</a></li>
                                <li><a href="#" className="text_14">Date, new to old</a></li>
                            </ul>
                        </div>
                    </div> */}
                    <Accordion defaultActiveKey={['0', '1', '2', '3', '4', '5', '6']} >
                        <div className="filter-widget d-lg-none">
                            <Accordion.Item className="filter-widget">
                                <Accordion.Header className="filter-header">
                                    <span>
                                        <span className="sorting-title me-2">Sort by:</span>
                                        <span className="active-sorting">Featured</span>
                                    </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul className="sorting-lists-mobile list-unstyled m-0">
                                        <li><a href="#" className="text_14">Featured</a></li>
                                        <li><a href="#" className="text_14">Best Selling</a></li>
                                        <li><a href="#" className="text_14">Alphabetically, A-Z</a></li>
                                        <li><a href="#" className="text_14">Alphabetically, Z-A</a></li>
                                        <li><a href="#" className="text_14">Price, low to high</a></li>
                                        <li><a href="#" className="text_14">Price, high to low</a></li>
                                        <li><a href="#" className="text_14">Date, old to new</a></li>
                                        <li><a href="#" className="text_14">Date, new to old</a></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                        <Accordion.Item eventKey="0" className="filter-widget">
                            <Accordion.Header className="filter-header">
                                Categories
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="filter-lists list-unstyled mb-0">
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            <span className="filter-text">Womens Bag</span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Bottles
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Men's Shoe
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Toddler Dress
                                        </label>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="filter-widget">
                            <Accordion.Header className="filter-header">
                                Availability
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="filter-lists list-unstyled mb-0">
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            <span className="filter-text">In Stock</span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Out of Stock
                                        </label>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className="filter-widget">
                            <Accordion.Header className="filter-header">
                                Price
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="filter-price d-flex align-items-center justify-content-between">
                                    <div className="filter-field">
                                        <input className="field-input" type="number" placeholder="$0" min="0"
                                            max="2000.00" />
                                    </div>
                                    <div className="filter-separator px-3">To</div>
                                    <div className="filter-field">
                                        <input className="field-input" type="number" min="0" placeholder="$595.00"
                                            max="2000.00" />
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item >
                        <Accordion.Item eventKey="3" className="filter-widget filter-color">
                            <Accordion.Header className="filter-header">
                                Colors
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="filter-lists list-unstyled mb-0">
                                    <li className="filter-item">
                                        <label className="filter-label blue">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label red">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label green">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label purple">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label gold">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label pink">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label orange">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label aqua">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label brown">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label bisque">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label grey">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                        </label>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4" className="filter-widget">
                            <Accordion.Header className="filter-header">
                                Size
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="filter-lists list-unstyled mb-0">
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            <span className="filter-text">XS</span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            S
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            M
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            L
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            XL
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            XXL
                                        </label>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5" className="filter-widget">
                            <Accordion.Header className="filter-header">
                                Vendor
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="filter-lists list-unstyled mb-0">
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            <span className="filter-text">Bynd</span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Huemor
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Jordan Crown
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Hubspot
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Ramotion
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Infosolutions
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Ideo
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Codal
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Salesforce
                                        </label>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6" className="filter-widget">
                            <Accordion.Header className="filter-header">
                                Product Type
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="filter-lists list-unstyled mb-0">
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            <span className="filter-text">Bodysuit</span>
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Hoodie
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Jacket
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Legging
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Short
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Top
                                        </label>
                                    </li>
                                    <li className="filter-item">
                                        <label className="filter-label">
                                            <input type="checkbox" />
                                            <span className="filter-checkbox rounded me-2"></span>
                                            Underwear
                                        </label>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="filter-widget">
                        <div
                            className="filter-header faq-heading heading_18 d-flex align-items-center border-bottom">
                            Related products
                        </div>
                        <div className="filter-related">
                            <div className="related-item d-flex">
                                <div className="related-img-wrapper">
                                    <img className="related-img" src={Product2}
                                        alt="img" />
                                </div>
                                <div className="related-product-info">
                                    <h2 className="related-heading heading_18">
                                        <Link to="product.html">Tea Table</Link>
                                    </h2>
                                    <div
                                        className="related-review-icon product-icon-star d-flex align-items-center">
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                    </div>
                                    <p className="related-price text_16">$2,546</p>
                                </div>
                            </div>
                            <div className="related-item d-flex">
                                <div className="related-img-wrapper">
                                    <img className="related-img" src={Product2}
                                        alt="img" />
                                </div>
                                <div className="related-product-info">
                                    <h2 className="related-heading heading_18">
                                        <Link to='/product'>Comfy Sofa</Link>
                                    </h2>
                                    <div
                                        className="related-review-icon product-icon-star d-flex align-items-center">
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                    </div>
                                    <p className="related-price text_16">$1,526</p>
                                </div>
                            </div>
                            <div className="related-item d-flex">
                                <div className="related-img-wrapper">
                                    <img className="related-img" src={Product2}
                                        alt="img" />
                                </div>
                                <div className="related-product-info">
                                    <h2 className="related-heading heading_18">
                                        <Link to='/product'>Cusion Chair</Link>
                                    </h2>
                                    <div
                                        className="related-review-icon product-icon-star d-flex align-items-center">
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                        <img src={FullStart} alt="img" />
                                    </div>
                                    <p className="related-price text_16">$1,235</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-widget">
                        <Link to='/product'>
                            <img className="rounded" src={CollectionBanner} alt="img" />
                        </Link>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default FilterDrawer