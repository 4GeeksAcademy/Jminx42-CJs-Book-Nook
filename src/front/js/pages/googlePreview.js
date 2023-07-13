import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { GoogleBooksViewer } from "../component/googleBooksViewer";
import { Footer } from "../component/footer";
import "../../styles/index.css"

export const GooglePreview = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);
    }, []);
    return (
        <div>
            <Navbar />
            {
                store.alert && store.alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {store.alert}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            {
                store.errorMsg && store.errorMsg !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {store.errorMsg}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }

            <div className="container mt-4">
                <h1 className="text-center">Where Magic Happens!</h1>
                <div className="text-center mt-3">
                    <button className="btn custom-button" onClick={() => window.location.reload(true)}>Want to see some magic! Click here to reload the page!</button>
                </div>

                <div className="row d-flex justify-content-center">
                    <GoogleBooksViewer isbn={params.theisbn} />
                </div>
            </div>
            <Footer />
        </div>
    );
}