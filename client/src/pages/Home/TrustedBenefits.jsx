import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Shipping from '../../assets/img/trusted/1.png'
import Support from '../../assets/img/trusted/2.png'
import Payment from '../../assets/img/trusted/3.png'

function TrustedBenefits() {
  return (
    <>
     {/* trusted badge start */}
            <div className="trusted-section mt-100 overflow-hidden">
                <div className="trusted-section-inner">
                    <Container >
                        <Row className="justify-content-center trusted-row">
                            <Col lg={4} md={6} xs={12} className="col-lg-4 col-md-6 col-12">
                                <div className="trusted-badge bg-trust-1 rounded">
                                    <div className="trusted-icon">
                                        <img className="icon-trusted" src={Shipping} alt="icon-1"/>
                                    </div>
                                    <div className="trusted-content">
                                        <h2 className="heading_18 trusted-heading">Free Shipping & Return</h2>
                                        <p className="text_16 trusted-subheading trusted-subheading-2">On all order over
                                            $99.00</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6} xs={12} className="col-lg-4 col-md-6 col-12">
                                <div className="trusted-badge bg-trust-2 rounded">
                                    <div className="trusted-icon">
                                        <img className="icon-trusted" src={Support} alt="icon-2"/>
                                    </div>
                                    <div className="trusted-content">
                                        <h2 className="heading_18 trusted-heading">Customer Support 24/7</h2>
                                        <p className="text_16 trusted-subheading trusted-subheading-2">Instant access to
                                            support</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={6} xs={12} className="col-lg-4 col-md-6 col-12">
                                <div className="trusted-badge bg-trust-3 rounded">
                                    <div className="trusted-icon">
                                        <img className="icon-trusted" src={Payment} alt="icon-3"/>
                                    </div>
                                    <div className="trusted-content">
                                        <h2 className="heading_18 trusted-heading">100% Secure Payment</h2>
                                        <p className="text_16 trusted-subheading trusted-subheading-2">We ensure secure
                                            payment!</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
             {/* trusted badge end */}
    </>
  )
}

export default TrustedBenefits