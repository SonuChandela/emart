import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Brand1 from "../../assets/img/brand/1.png";
import { Link } from 'react-router-dom'

function Brands() {
  return (
    <>
                 {/* brand logo start  */}
            <div className="brand-logo-section mt-100">
                <div className="brand-logo-inner">
                    <Container>
                        <div className="brand-logo-container overflow-hidden">
                            <div className="scroll-horizontal row align-items-center flex-nowrap">
                                <Col lg={3} md={4} sm={6} xl={2} data-aos="fade-up"
                                    data-aos-duration="700">
                                    <Link to="index-shoe.html" className="brand-logo d-flex align-items-center justify-content-center">
                                        <img src={Brand1} alt="img"/>
                                    </Link>
                                </Col>
                                <Col lg={3} md={4} sm={6} xl={2} data-aos="fade-up"
                                    data-aos-duration="700">
                                    <Link to="index-shoe.html" className="brand-logo d-flex align-items-center justify-content-center">
                                        <img src={Brand1} alt="img"/>
                                    </Link>
                                </Col>
                                <Col lg={3} md={4} sm={6} xl={2} data-aos="fade-up"
                                    data-aos-duration="700">
                                    <Link to="index-shoe.html" className="brand-logo d-flex align-items-center justify-content-center">
                                        <img src={Brand1} alt="img"/>
                                    </Link>
                                </Col>
                                <Col lg={3} md={4} sm={6} xl={2} data-aos="fade-up"
                                    data-aos-duration="700">
                                    <Link to="index-shoe.html" className="brand-logo d-flex align-items-center justify-content-center">
                                        <img src={Brand1} alt="img"/>
                                    </Link>
                                </Col>
                                <Col lg={3} md={4} xs={6} xl={2} data-aos="fade-up"
                                    data-aos-duration="700">
                                    <Link to="index-shoe.html" className="brand-logo d-flex align-items-center justify-content-center">
                                        <img src={Brand1} alt="img"/>
                                    </Link>
                                </Col>
                                <Col lg={3} md={4} xs={6} xl={2} data-aos="fade-up"
                                    data-aos-duration="700">
                                    <Link to="index-shoe.html" className="brand-logo d-flex align-items-center justify-content-center">
                                        <img src={Brand1} alt="img"/>
                                    </Link>
                                </Col>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
             {/* brand logo end  */}
    </>
  )
}

export default Brands