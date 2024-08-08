import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import { Container, Tab, Tabs, Col, Row } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import ProductShortDec from '../../components/Product/ProductShortDec'
import ProductDec from '../../assets/img/product.jpg'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Product() {
    const [viewReview, setViewReview] = useState(false);
    const { productId } = useParams(); // Get product ID from URL params
    const filterProduct = useSelector(state => state.product.data.find(product => product.id == productId));
    return (
        <Layout>
            <div className="product-page mt-100">
                <Container>
                    {/* Short decription */}
                    <ProductShortDec productData={filterProduct} />
                    {/* Short decription */}

                    {/* product tab start */}
                    <Container className='product-tab-section mt-100'>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="Dec" >
                            <Row>
                                <Col lg={12} md={12} sm={12} className="tab-list product-tab-list">
                                    <Nav variant="tab" className="nav product-tab-nav">
                                        <Nav.Item>
                                            <Nav.Link className='product-tab-link tab-link' eventKey="Dec">Description</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='product-tab-link tab-link' eventKey="returns">Shipping &
                                                Returns</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='product-tab-link tab-link' eventKey="style">Style with</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='product-tab-link tab-link' eventKey="review">Reviews</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={12} md={12} sm={12} className="tab-content product-tab-content">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="Dec">
                                            <Row className="mt-4">
                                                <div className="col-lg-7 col-md-12 col-12">
                                                    <div className="desc-content">
                                                        <h4 className="mb-3">{`What is ${filterProduct.title} ?`}</h4>
                                                        <p className="text_16 mb-4">{filterProduct.description}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5 col-md-12 col-12">
                                                    <div className="desc-img">
                                                        <img src={filterProduct.thumbnail} alt={filterProduct.title} />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-12 col-md-12 col-12">
                                                    <div className="desc-content mt-4">
                                                        <p className="text_16">Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed
                                                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                            velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                                    </div>
                                                </div> */}
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="returns">
                                            <div className="tab-pane mt-4">
                                                <div className="desc-content">
                                                    <h4 className=" mb-3">Returns within the European Union</h4>
                                                    <p className="text_16 mb-4">The European law states that when an order is being returned, it
                                                        is mandatory for the company to refund the product price and shipping costs charged
                                                        for the original shipment. Meaning: one shipping fee is paid by us.</p>
                                                    <p className="text_16 mb-4">Standard Shipping: If you placed an order using "standard
                                                        shipping" and you want to return it, you will be refunded the product price and
                                                        initial shipping costs. However, the return shipping costs will be paid by you.</p>
                                                    <p className="text_16">Free Shipping: If you placed an order using "free shipping" and you
                                                        want to return it, you will be refunded the product price, but since we paid for the
                                                        initial shipping, you will pay for the return.</p>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="style" className="tab-pane">
                                            <div className="tab-pane mt-4">
                                                <div className="desc-content">
                                                    <h4 className="mb-3">Style with</h4>
                                                    <p className="text_16 mb-4">Please also bear in mind that shipping goods back and forth
                                                        generates greenhouse gases that are accelerating climate change. We encourage you to
                                                        choose your items carefully to avoid unnecessary return shipments.</p>
                                                    <p className="text_16 mb-4">You have to pay for return shipping if you want to exchange your
                                                        product for another size or the package is returned because it has not been picked
                                                        up at the post office.</p>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="review" className="tab-pane">
                                            <div className='mt-4'>
                                                <div className="review-area accordion-parent">
                                                    <h4 className="mb-3">Customer Reviews</h4>
                                                    <div className="review-header d-flex justify-content-between align-items-center">
                                                        <p className="text_16">No reviews yet.</p>
                                                        <button className="text_14 bg-transparent text-decoration-underline write-btn"
                                                            type="button" onClick={() => setViewReview(!viewReview)}>Write a review</button>
                                                    </div>
                                                    <div className={`review-form-area accordion-child ${viewReview && 'd-block'}`}>
                                                        <form action="#">
                                                            <fieldset>
                                                                <label className="label">Full Name</label>
                                                                <input type="text" placeholder="Enter your name" />
                                                            </fieldset>
                                                            <fieldset>
                                                                <label className="label">Email</label>
                                                                <input type="email" placeholder="john.smith@example.com" />
                                                            </fieldset>
                                                            <fieldset>
                                                                <label className="label">Rating</label>
                                                                <div className="star-rating">
                                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z"
                                                                            fill="#B2B2B2" />
                                                                    </svg>
                                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z"
                                                                            fill="#B2B2B2" />
                                                                    </svg>
                                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z"
                                                                            fill="#B2B2B2" />
                                                                    </svg>
                                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z"
                                                                            fill="#B2B2B2" />
                                                                    </svg>
                                                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.168 5.77344L10.082 5.23633L8 0.566406L5.91797 5.23633L0.832031 5.77344L4.63086 9.19727L3.57031 14.1992L8 11.6445L12.4297 14.1992L11.3691 9.19727L15.168 5.77344Z"
                                                                            fill="#B2B2B2" />
                                                                    </svg>
                                                                </div>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label className="label">Review Title</label>
                                                                <input type="text" placeholder="Give your review a title" />
                                                            </fieldset>
                                                            <fieldset>
                                                                <label className="label">Body of Review (2000)</label>
                                                                <textarea cols="30" rows="10"
                                                                    placeholder="Write your comments here"></textarea>
                                                            </fieldset>

                                                            <button type="submit"
                                                                className="position-relative review-submit-btn">SUBMIT</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                    {/* product tab end  */}



                </Container >
            </div >
        </Layout >
    )
}

export default Product