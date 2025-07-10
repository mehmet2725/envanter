import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Sidebar.css";

export default function Sidebar({ setSelectedPage }) {
  return (
    <div className="d-flex">
      <div className="sidebar bg-dark text-white p-3" style={{ height: "100vh" }}>
        <h4 className="mb-4 text-center">Envanter</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedPage("list")}
            >
              📦 Stok Listesi
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedPage("add")}
            >
              ➕ Ürün Ekle
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}