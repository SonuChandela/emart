import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Banner1 from '../../assets/img/banner/shoe-1.jpg'
import Banner2 from '../../assets/img/banner/shoe-2.jpg'

function DisocuntBanner() {
  return (
  <>
             {/* banner start  */}
            <div className="banner-section mt-100 overflow-hidden">
                <div className="banner-section-inner">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} md={6} xs={12} data-aos="fade-right" data-aos-duration="1200">
                                <Link className="banner-item position-relative rounded" to="/">
                                    <img className="banner-img" src={Banner1} alt="banner-1"/>
                                    <div className="content-absolute content-slide">
                                            <Container className="height-inherit d-flex align-items-center">
                                            <div className="content-box banner-content p-4">
                                                <p className="heading_18 mb-3 text-white">Sports Shoes</p>
                                                <h2 className="heading_34 text-white">25% off for <br/> sports men</h2>
                                            </div>
                                        </Container>
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={6} md={6} xs={12} data-aos="fade-left" data-aos-duration="1200">
                                <Link className="banner-item position-relative rounded" to="/">
                                    <img className="banner-img" src={Banner2} alt="banner-2"/>
                                    <div className="content-absolute content-slide">
                                        <Container className="height-inherit d-flex align-items-center">
                                            <div className="content-box banner-content p-4">
                                                <p className="heading_18 mb-3 text-white">Sports Shoes</p>
                                                <h2 className="heading_34 text-white">25% off for <br/>sports women</h2>
                                            </div>
                                        </Container>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
             {/* banner end  */}
  </>
  )
}

export default DisocuntBanner