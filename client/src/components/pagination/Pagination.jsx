import React from 'react'

function Pagination() {
    return (
        <>
            <div className="pagination justify-content-center mt-100">
                <nav>
                    <ul className="pagination m-0 d-flex align-items-center">
                        <li className="item disabled">
                            <a className="link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="icon icon-left">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </a>
                        </li>
                        <li className="item"><a className="link" href="#">1</a></li>
                        <li className="item active"><a className="link" href="#">2</a></li>
                        <li className="item"><a className="link" href="#">3</a></li>
                        <li className="item"><a className="link" href="#">4</a></li>
                        <li className="item">
                            <a className="link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="icon icon-right">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Pagination