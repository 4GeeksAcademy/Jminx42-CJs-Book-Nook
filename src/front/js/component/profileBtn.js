import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ProfileBtn = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <>
            <div className="dropdown">
                <button className="btn me-2 custom-button dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                    <i className="fa-solid fa-user"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>

                        <button className="dropdown-item" onClick={() => { navigate('/profile') }}>
                            <i className="fa-solid fa-user"></i> My Profile
                        </button>
                    </li>

                    <li >
                        <button className="dropdown-item" onClick={async () => {
                            await actions.logout()
                            navigate("/")
                        }}>
                            <i className="fa-solid fa-right-from-bracket"></i> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};
