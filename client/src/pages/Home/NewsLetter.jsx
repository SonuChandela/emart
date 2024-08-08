import React from 'react'
import {Container,Button} from 'react-bootstrap'
import News from '../../assets/img/newsletter/1.jpg'


function NewsLetter() {
  return (
    <>
     {/* newsletter start */}
            <div className="newsletter-section mt-100 overflow-hidden">
                <div className="newsletter-inner">
                    <div className="position-relative">
                        <img className="single-banner-img" src={News} alt="slide-1"/>

                        <div className="content-absolute">
                            <Container className="height-inherit d-flex align-items-center justify-content-center">
                                <div className="content-box py-4">
                                    <div className="newsletter-content newsletter-content-2 text-center">
                                        <div className="newsletter-header">
                                            <p className="newsletter-subheading heading_24">News Letter</p>
                                            <h2 className="newsletter-heading heading_42">Subscribe to our newsletter</h2>
                                        </div>
                                        <div className="newsletter-form-wrapper">
                                            <form action="#" className="newsletter-form d-flex align-items-center rounded">
                                                <input className="newsletter-input bg-transparent border-0" type="email"
                                                    placeholder="Enter your e-mail" autoComplete="off" />
                                                <Button className="btn newsletter-btn rounded" type="submit">
                                                    <svg width="17" height="14" viewBox="0 0 17 14" fill="#fff"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.11539 -0.000488604L7.50417 1.99951L11.5769 5.59951L0.500001 5.59951L0.500001 8.19951L11.7049 8.19951L7.50417 11.4995L8.70513 13.9995L16.5 7.19951L9.11539 -0.000488604Z"
                                                            fill="#FEFEFE" />
                                                    </svg>
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
             {/* newsletter end  */}
    </>
  )
}

export default NewsLetter