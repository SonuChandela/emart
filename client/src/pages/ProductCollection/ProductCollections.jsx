import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import Layout from '../../components/Layouts/Layout'
import ProductCard from '../../components/Cards/ProductCard'
import FilterDrawer from '../../components/Drawer/FilterDrawer'
import Pagination from '../../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/Features/ProductSlice';

function ProductCollections() {
    const [filter, setFilter] = useState(false);

    // dispatch hook 
    const dispatch = useDispatch();
    // selector hook 
    const { data: products, status } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <Layout>
            {/* breadcrumb start */}
            <div className="breadcrumb">
                <Container>
                    <ul className="list-unstyled d-flex align-items-center m-0">
                        <li><a href="/">Home</a></li>
                        <li>
                            <svg className="icon icon-breadcrumb" width="64" height="64" viewBox="0 0 64 64" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.4">
                                    <path
                                        d="M25.9375 8.5625L23.0625 11.4375L43.625 32L23.0625 52.5625L25.9375 55.4375L47.9375 33.4375L49.3125 32L47.9375 30.5625L25.9375 8.5625Z"
                                        fill="#000" />
                                </g>
                            </svg>
                        </li>
                        <li>Products</li>
                    </ul>
                </Container>
            </div>
            {/* breadcrumb end  */}

            <main id="MainContent" className="content-for-layout">
                <div className="collection mt-100">
                    <Container>
                        <Row className="flex-row-reverse">
                            {/* product area start  */}
                            <Col lg={9} md={12} xs={12}>
                                <div className="filter-sort-wrapper d-flex justify-content-between flex-wrap">
                                    <div className="collection-title-wrap d-flex align-items-end">
                                        <h2 className="collection-title heading_24 mb-0">All products</h2>
                                        <p className="collection-counter text_16 mb-0 ms-2">(237 items)</p>
                                    </div>
                                    <div className="filter-sorting">
                                        <div className="collection-sorting position-relative d-none d-lg-block">
                                            <div
                                                className="sorting-header text_16 d-flex align-items-center justify-content-end">
                                                <span className="sorting-title me-2">Sort by:</span>
                                                <span className="active-sorting">Featured</span>
                                                <span className="sorting-icon">
                                                    <svg className="icon icon-down feather feather-chevron-down" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <ul className="sorting-lists m-0">
                                                <li><Link to="#" className="text_14">Featured</Link></li>
                                                <li><a href="#" className="text_14">Best Selling</a></li>
                                                <li><a href="#" className="text_14">Alphabetically, A-Z</a></li>
                                                <li><a href="#" className="text_14">Alphabetically, Z-A</a></li>
                                                <li><a href="#" className="text_14">Price, low to high</a></li>
                                                <li><a href="#" className="text_14">Price, high to low</a></li>
                                                <li><a href="#" className="text_14">Date, old to new</a></li>
                                                <li><a href="#" className="text_14">Date, new to old</a></li>
                                            </ul>
                                        </div>
                                        <div
                                            className="filter-drawer-trigger mobile-filter d-flex align-items-center d-lg-none" onClick={() => setFilter(!filter)}>
                                            <span className="mobile-filter-icon me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round" className="icon icon-filter">
                                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                                </svg>
                                            </span>
                                            <span className="mobile-filter-heading">Filter and Sorting</span>
                                        </div>
                                    </div>
                                </div>
                                <Container className="collection-product-container">
                                    <Row>
                                        {
                                            products?.map((product) => (
                                                <Col key={product.id} lg={4} md={6} xs={6} data-aos="fade-up" data-aos-duration="700">
                                                    <ProductCard productData={product} />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Container>
                                {/* pagination */}
                                <Pagination />
                                {/* pagination */}
                            </Col>
                            {/* product area end  */}

                            {/* sidebar start */}

                            <FilterDrawer filter={filter} setFilter={setFilter} />

                            {/* sidebar end  */}
                        </Row>
                    </Container>
                </div>
            </main>
        </Layout>
    )
}

export default ProductCollections