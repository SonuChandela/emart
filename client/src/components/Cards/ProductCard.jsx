import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductPopUp from "../PopUpModels/ProductPopUp";
import { addItem } from '../../store/Features/CartSlice';
import { addToWishlist } from '../../store/Features/WishListSlice';
import { useDispatch } from 'react-redux';

function ProductCard({ productData }) {
    const [productModal, setProductModal] = useState(false);
    const dispatch = useDispatch();
    const { id, title, thumbnail, images, category, discountPercentage, stock, price } = productData;

    // add item to cart
    const addToCart = (e) => {
        e.preventDefault();
        dispatch(addItem({ cartItem: productData }))
    }

    // add item to wishlist
    const addWishlist = (e) => {
        e.preventDefault();
        dispatch(addToWishlist(productData));
    }

    return (
        <div className="product-card">
            <div className="product-card-img">
                <Link className="hover-switch" to={`/products/${id}`}>
                    {/* <Link className="hover-switch" to={`/products/${title.replace(/\s+/g, '-').toLowerCase()}`}> */}
                    <img className="secondary-img" src={thumbnail}
                        alt="product-img" />
                    <img className="primary-img" src={images[1]}
                        alt="product-img" />
                </Link>

                <div className="product-badge">
                    <span className="badge-label badge-new rounded">{category}</span>
                    <span className="badge-label badge-new rounded">New</span>
                    <span className="badge-label badge-percentage rounded">{discountPercentage} %</span>
                </div>

                <div className="product-card-action product-card-action-2 justify-content-center">
                    <button className="action-card action-quickview" onClick={() => setProductModal(!productModal)}>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 0C15.5117 0 20 4.48828 20 10C20 12.3945 19.1602 14.5898 17.75 16.3125L25.7188 24.2812L24.2812 25.7188L16.3125 17.75C14.5898 19.1602 12.3945 20 10 20C4.48828 20 0 15.5117 0 10C0 4.48828 4.48828 0 10 0ZM10 2C5.57031 2 2 5.57031 2 10C2 14.4297 5.57031 18 10 18C14.4297 18 18 14.4297 18 10C18 5.57031 14.4297 2 10 2ZM11 6V9H14V11H11V14H9V11H6V9H9V6H11Z"
                                fill="#00234D" />
                        </svg>
                    </button>

                    <a href="#" className="action-card action-wishlist" onClick={(e) => { addWishlist(e) }}>
                        <svg className="icon icon-wishlist" width="26" height="22"
                            viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.96429 0.000183105C3.12305 0.000183105 0 3.10686 0 6.84843C0 8.15388 0.602121 9.28455 1.16071 10.1014C1.71931 10.9181 2.29241 11.4425 2.29241 11.4425L12.3326 21.3439L13 22.0002L13.6674 21.3439L23.7076 11.4425C23.7076 11.4425 26 9.45576 26 6.84843C26 3.10686 22.877 0.000183105 19.0357 0.000183105C15.8474 0.000183105 13.7944 1.88702 13 2.68241C12.2056 1.88702 10.1526 0.000183105 6.96429 0.000183105ZM6.96429 1.82638C9.73912 1.82638 12.3036 4.48008 12.3036 4.48008L13 5.25051L13.6964 4.48008C13.6964 4.48008 16.2609 1.82638 19.0357 1.82638C21.8613 1.82638 24.1429 4.10557 24.1429 6.84843C24.1429 8.25732 22.4018 10.1584 22.4018 10.1584L13 19.4036L3.59821 10.1584C3.59821 10.1584 3.14844 9.73397 2.69866 9.07411C2.24888 8.41426 1.85714 7.55466 1.85714 6.84843C1.85714 4.10557 4.13867 1.82638 6.96429 1.82638Z"
                                fill="#00234D" />
                        </svg>
                    </a>

                    <a href="#" className="action-card action-addtocart" onClick={(e) => addToCart(e)}>
                        <svg className="icon icon-cart" width="24" height="26" viewBox="0 0 24 26"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 0.000183105C9.25391 0.000183105 7 2.25409 7 5.00018V6.00018H2.0625L2 6.93768L1 24.9377L0.9375 26.0002H23.0625L23 24.9377L22 6.93768L21.9375 6.00018H17V5.00018C17 2.25409 14.7461 0.000183105 12 0.000183105ZM12 2.00018C13.6562 2.00018 15 3.34393 15 5.00018V6.00018H9V5.00018C9 3.34393 10.3438 2.00018 12 2.00018ZM3.9375 8.00018H7V11.0002H9V8.00018H15V11.0002H17V8.00018H20.0625L20.9375 24.0002H3.0625L3.9375 8.00018Z"
                                fill="#00234D" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="product-card-details">
                <ul className="color-lists list-unstyled d-flex align-items-center">
                    <li><a href="#"
                        className="color-swatch swatch-black active"></a></li>
                    <li><a href="#" className="color-swatch swatch-cyan"></a></li>
                    <li><a href="#" className="color-swatch swatch-purple"></a>
                    </li>
                </ul>
                <h3 className="product-card-title">
                    <Link to={`/products/${title}`}>{title}</Link>
                </h3>
                <div className="product-card-price">
                    <span className="card-price-regular">{price}</span>
                    <span className="card-price-compare text-decoration-line-through">{stock}</span>
                </div>
            </div>

            {productModal && (<ProductPopUp productModal={productModal} productData={productData} setProductModal={setProductModal} />)}
        </div >
    )
}

export default ProductCard