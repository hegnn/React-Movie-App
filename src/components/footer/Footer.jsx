import React from 'react'

const Footer = () => {
    return(
        <div>
            <div className="mt-5" style={{ borderTop:"1px solid #5a606b"}} >

            </div>
            
            <div className="row mt-3 mb-5">
                    <div className="col-md-8 col-sm-6" style={{color: '#5a606b'}}>
                        <h3>ABOUT ME</h3>
                        <p>sdfsdf</p>
                        <p>sdfhdfhdf</p>
                        <ul class="list-inline">
                            <li class="list-inline-item">
                                <a href="/" style={{color: '#f4c10f'}} >
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="/" style={{color: '#f4c10f'}} >
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="/" style={{color: '#f4c10f'}} >
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="/" style={{color: '#f4c10f'}} >
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-6" style={{color: "#5a606b"}}>
                        <h3>CONTACT</h3>
                            <ul className="list-unstyled">
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-map-marker-alt"></i>
                                            Address:</strong> Istanbul, Maltepe, Turkey
                                        
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-phone-alt"></i>
                                            Phone:</strong> +90 534 325 1982
                                        
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-envelope"></i>
                                            Mail:</strong> hegonen98@gmail.com
                                        
                                    </p>
                                </li>
                            </ul>
                    </div>
                </div>

        </div>

    )
}

export default Footer