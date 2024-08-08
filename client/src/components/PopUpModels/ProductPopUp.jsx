import React from 'react';
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import ProductShortDec from '../../components/Product/ProductShortDec'



function ProductPopUp({ productModal, setProductModal, productData }) {

    return (
        <>
            {createPortal(
                <Modal show={productModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setProductModal(false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductShortDec productData={productData} />
                    </Modal.Body>
                </Modal>,
                document.getElementById('portal')
            )}
        </>
    );
}

export default ProductPopUp;
