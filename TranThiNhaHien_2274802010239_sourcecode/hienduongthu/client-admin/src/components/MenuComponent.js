import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCog } from "react-icons/fa";

class Menu extends Component {
  static contextType = MyContext;

  lnkLogoutClick = () => {
    this.context.setToken('');
    this.context.setUsername('');
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm fixed-top w-100">

        <div className="container">
          {/* Logo & Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/admin/home">
            <img src="1.png" alt="Logo" style={{ height: '90px', marginRight: '50px' }} />
            <span className="fw-bold fs-4">DHT</span>
          </Link>

          {/* Toggle button for mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-bold text-white" to="/admin/category">Danh mục</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold text-white" to="/admin/product">Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold text-white" to="/admin/order">Đơn hàng</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold text-white" to="/admin/customer">Khách hàng</Link>
              </li>
              
            </ul>
            {/* User info + logout */}
            <div className="d-flex align-items-center ms-3 text-white small">
            <Link className="ms-2 text-white text-decoration-none" to="/admin/settings"><span>Xin chào, <strong>{this.context.username}</strong></span> </Link>
              <Link className="ms-2 text-white text-decoration-none" to="/admin/settings">
                <FaCog className="me-2" />
               
              </Link> |
              <Link to="/admin/home" className="ms-2 text-white text-decoration-underline fw-bold" onClick={this.lnkLogoutClick}>
                Đăng xuất
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
