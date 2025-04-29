import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import OrderComponent from './OrderComponent'; // Thêm import cho OrderComponent
import CustomerComponent from './CustomerComponent'; // Đảm bảo dòng này có trong file
import SettingComponent from './SettingComponent'; // Correct path if the file is in the same folder


class Main extends Component {
  static contextType = MyContext;

  render() {
    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          <Menu />
          <Routes>
            {/* Điều hướng mặc định */}
            <Route path="/admin" element={<Navigate replace to="/admin/home" />} />
            
            {/* Trang chính */}
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/order" element={<OrderComponent />} />
            <Route path="/admin/customer" element={<CustomerComponent />} />
            <Route path="/admin/settings" element={<SettingComponent />} /> {/* Đổi 'component' thành 'element' */}
          </Routes>
        </div>
      );
    }
    return <div />;
  }
}

export default Main;
