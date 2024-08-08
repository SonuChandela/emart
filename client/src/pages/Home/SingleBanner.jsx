import React from 'react'
import {Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Banner1 from '../../assets/img/banner/single-banner.jpg'

function SingleBanner() {
  return (
 <>
             {/* single banner start */}
            <div className="single-banner-section mt-100 overflow-hidden">
                <div className="position-relative overlay">
                    <img className="single-banner-img" src={Banner1} alt="slide-1"/>
                    <div className="content-absolute content-slide">
                        <Container className="height-inherit d-flex align-items-center">
                            <div className="content-box single-banner-content py-4">
                                <h2 className="single-banner-heading heading_42 text-white animate__animated animate__fadeInUp"
                                    data-animation="animate__animated animate__fadeInUp">
                                    Climb up to the mountain with NIK
                                </h2>
                                <p className="single-banner-text text_16 text-white animate__animated animate__fadeInUp"
                                    data-animation="animate__animated animate__fadeInUp">
                                    Free shipping, and no hassle returns. NIK Running shoes for men & women
                                </p>
                                <Link to="collection-left-sidebar.html" className="btn btn-primary text-white single-banner-btn animate__animated animate__fadeInUp"  data-animation="animate__animated animate__fadeInUp">
                                    SHOP NOW
                                </Link>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
             {/* single banner end  */}
 </>
  )
}

export default SingleBanner