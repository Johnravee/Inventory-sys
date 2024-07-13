export default function Dashboard(){
    return(
        <>
            <div className="wrapper w-100">
                <div className="wrapper-monitor w-100 d-flex justify-content-evenly pt-4 pb-4 flex-wrap">
                    <div className="monitor w-25  d-flex justify-content-evenly align-items-center p-4 bg-primary rounded-3 m-1 flex-wrap">
                        <div className="monitor-logo">
                            <h1><i className="bi bi-people"></i></h1>
                        </div>
                        <div className="monitor-context d-flex align-items-center flex-column">
                            <h1 className="counter">8</h1>
                            <h5 className="monitor-title">Categories</h5>
                        </div>
                    </div>

                    <div className="monitor w-25  d-flex justify-content-evenly align-items-center p-4 bg-danger rounded-3 m-1 flex-wrap">
                        <div className="monitor-logo">
                            <h1><i className="bi bi-people"></i></h1>
                        </div>
                        <div className="monitor-context d-flex align-items-center flex-column">
                            <h1 className="counter">8</h1>
                            <h5 className="monitor-title">Products</h5>
                        </div>
                    </div>

                    <div className="monitor w-25  d-flex justify-content-evenly align-items-center p-4 bg-success rounded-3 m-1">
                        <div className="monitor-logo">
                            <h1><i className="bi bi-people"></i></h1>
                        </div>
                        <div className="monitor-context d-flex align-items-center flex-column">
                            <h1 className="counter">8</h1>
                            <h5 className="monitor-title">Sales</h5>
                        </div>
                    </div>
                </div>    

                <div className="Card-wrapper w-100 d-flex justify-content-evenly p-2 flex-wrap">
                   <div className="card">
                        <h5 className="card-header"><i className="bi bi-grid-3x3-gap"></i> RECENTLY ADDED PRODUCTS</h5>
                        <div className="card-body">
                            <table className="table">
                            <thead>
                                <tr>

                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>

                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <h5 className="card-header"><i className="bi bi-grid-3x3-gap"></i> LATEST SALES</h5>
                        <div className="card-body">
                            <table className="table">
                            <thead>
                                <tr>

                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>

                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card">
                        <h5 className="card-header"><i className="bi bi-grid-3x3-gap"></i> HIGHEST SELLING PRODUCTS</h5>
                        <div className="card-body">
                            <table className="table">
                            <thead>
                                <tr>

                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>

                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>    
        </>
    )
}