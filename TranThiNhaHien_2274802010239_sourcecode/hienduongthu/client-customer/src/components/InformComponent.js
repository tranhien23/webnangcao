import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    FaUser,
    FaBox,
    FaSignOutAlt,
    FaShoppingCart,
    FaSignInAlt,
    FaUserPlus,
    FaCheckCircle,
} from "react-icons/fa";

class Inform extends Component {
    render() {
        const user = localStorage.getItem("user");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItemCount = cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
        );

        return (
            <div className="info-container">
                <div className="info-left">
                    {user ? (
                        <>
                            <span className="greeting-text">
                                👋 Xin chào,{" "}
                                <strong>{JSON.parse(user).username}</strong>
                            </span>

                            <Link to="/profile" className="info-link">
                                <FaUser className="icon" /> Hồ sơ
                            </Link>

                            <Link to="/myorders" className="info-link">
                                <FaBox className="icon" /> Đơn hàng
                            </Link>

                            <button
                                className="logout-btn"
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    localStorage.removeItem("token");
                                    window.location.reload();
                                }}
                            >
                                <FaSignOutAlt className="icon" /> Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="info-link">
                                <FaSignInAlt className="icon" /> Đăng nhập
                            </Link>

                            <Link to="/signup" className="info-link">
                                <FaUserPlus className="icon" /> Đăng ký
                            </Link>

                            <Link to="/active" className="info-link">
                                <FaCheckCircle className="icon" /> Kích hoạt
                            </Link>
                        </>
                    )}
                </div>

                <div className="info-right">
                    <Link to="/mycart" className="cart-link">
                        <FaShoppingCart className="icon" />
                        Giỏ hàng: <b>{cartItemCount}</b> sản phẩm
                    </Link>
                </div>
            </div>
        );
    }
}

export default Inform;
