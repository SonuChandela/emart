import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import s1 from '../../assets/img/slideshow/s1.jpg'
import ms1 from '../../assets/img/slideshow/s1-m.jpg'
import s2 from '../../assets/img/slideshow/s2.jpg'  
import ms2 from '../../assets/img/slideshow/s2-m.jpg'
import s3 from '../../assets/img/slideshow/s3.jpg'
import ms3 from '../../assets/img/slideshow/s3-m.jpg'

const arrowStyle = {
    width: 'auto',
    height: 'auto', 
    zIndex: 89,
};
// custom slide arrow icon
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,...arrowStyle,right:"0"}}
      onClick={onClick}
    >
       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="icon-arrow-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left:'0', ...arrowStyle}}
      onClick={onClick}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="icon-arrow-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </div>
  );
}

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows:false
          }
        }]
  };
  return (
    <div className="slideshow-section position-relative">
      <Slider {...settings} className="slideshow-active activate-slider">
        <div>
        <div className="slide-item slide-item-bag position-relative">
                <img className="slide-img d-none d-md-block" src={s1} alt="slide-1" /> 
                <img className="slide-img d-md-none" src={ms1} alt="slide-1" />
            <div className="content-absolute content-slide">
                    <div className="container height-inherit d-flex align-items-center">
                     <div className="content-box slide-content py-4">
                         <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                             data-animation="animate__animated animate__fadeInUp">
                             ZEN VIVID 16
                         </h2>
                         <p className="slide-subheading heading_18 animate__animated animate__fadeInUp"
                             data-animation="animate__animated animate__fadeInUp">
                             Look for your inspiration here
                         </p>
                         <a className="btn-primary slide-btn animate__animated animate__fadeInUp"
                             href="collection-left-sidebar.html"
                             data-animation="animate__animated animate__fadeInUp">SHOP
                             NOW
                        </a>
                     </div>
                 </div>
             </div>
        </div>
        </div>
        <div>
        <div className="slide-item slide-item-bag position-relative">
             <img className="slide-img d-none d-md-block" src={s2} alt="slide-2" />
             <img className="slide-img d-md-none" src={ms2} alt="slide-2" />
             <div className="content-absolute content-slide">
                 <div className="container height-inherit d-flex align-items-center">
                     <div className="content-box slide-content py-4">
                         <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                             data-animation="animate__animated animate__fadeInUp">
                             PLEATED HEEL
                         </h2>
                         <p className="slide-subheading heading_18 animate__animated animate__fadeInUp"
                             data-animation="animate__animated animate__fadeInUp">
                             Look for your inspiration here
                         </p>
                         <a className="btn-primary slide-btn animate__animated animate__fadeInUp"
                             href="collection-left-sidebar.html"
                             data-animation="animate__animated animate__fadeInUp">SHOP
                             NOW
                             </a>
                     </div>
                 </div>
             </div>
        </div>
        </div>
        <div>
        <div className="slide-item slide-item-bag position-relative">
             <img className="slide-img d-none d-md-block" src={s3} alt="slide-3" />
             <img className="slide-img d-md-none" src={ms3} alt="slide-3" />
             <div className="content-absolute content-slide">
                 <div className="container height-inherit d-flex align-items-center">
                     <div className="content-box slide-content py-4">
                         <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                             data-animation="animate__animated animate__fadeInUp">
                             MEN'S SHOES
                         </h2>
                         <p className="slide-subheading heading_18 animate__animated animate__fadeInUp"
                             data-animation="animate__animated animate__fadeInUp">
                             Look for your inspiration here
                         </p>
                         <a className="btn-primary slide-btn animate__animated animate__fadeInUp"
                             href="collection-left-sidebar.html"
                             data-animation="animate__animated animate__fadeInUp">SHOP
                             NOW</a>
                     </div>
                 </div>
             </div>
         </div>
         </div>
       
      </Slider>
    </div>
  );
}

export default SimpleSlider;