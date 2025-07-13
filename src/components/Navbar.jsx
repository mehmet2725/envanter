import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Navbar.css';

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
                <div className="container-fluid">
                    <span className="navbar-brand">Hoşgeldiniz</span>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">👤 Profil</a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                    onClick={() => {
                                        localStorage.removeItem('isLoggedIn');
                                        localStorage.removeItem('currentUser');
                                        window.location.href = "/login";
                                    }}
                                >
                                    🚪 Çıkış
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );

}