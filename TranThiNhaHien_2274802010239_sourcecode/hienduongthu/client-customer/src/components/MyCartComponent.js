import React, { Component } from "react";
import withRouter from "../utils/withRouter";

class MyCartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
            success: false,
        };
    }

    componentDidMount() {
        this.syncCartWithStorage();
        window.addEventListener("storage", this.syncCartWithStorage);
    }

    componentWillUnmount() {
        window.removeEventListener("storage", this.syncCartWithStorage);
    }

    syncCartWithStorage = () => {
        const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        this.setState({ cartItems: updatedCart });
    };

    removeItem = (id) => {
        const updatedCart = this.state.cartItems.filter(
            (item) => item._id !== id,
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        this.setState({ cartItems: updatedCart });
    };

    updateQuantity = (id, newQuantity) => {
        if (isNaN(newQuantity) || newQuantity < 1) return;

        const updatedCart = this.state.cartItems.map((item) => {
            if (item._id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        this.setState({ cartItems: updatedCart });
        window.dispatchEvent(new Event("storage"));
    };

    handleCheckout = async () => {
        const token = localStorage.getItem("token");
        const { cartItems } = this.state;

        if (!token) {
            alert("Bạn cần đăng nhập để đặt hàng!");
            return;
        }

        if (cartItems.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }

        try {
            const response = await fetch(
                `${window.location.origin}/api/customer/checkout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token,
                    },
                    body: JSON.stringify({ cartItems }),
                },
            );

            const data = await response.json();

            if (data.success) {
                localStorage.removeItem("cartItems");
                this.setState({ cartItems: [], success: true });
                window.dispatchEvent(new Event("storage"));

                setTimeout(() => {
                    this.props.navigate("/myorders");
                    window.location.reload();
                }, 500);
            } else {
                alert("Đặt hàng thất bại!");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Có lỗi xảy ra khi đặt hàng.");
        }
    };

    render() {
        const { cartItems, success } = this.state;
        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
        const cartCount = cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0,
        );

        return (
            <div className="cart-page">
                <h2 className="cart-title">🛒 GIỎ HÀNG CỦA BẠN</h2>

                {success && (
                    <div className="cart-success">✅ Đặt hàng thành công!</div>
                )}

                <div className="cart-table-wrapper">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.price.toLocaleString()} đ</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    this.updateQuantity(
                                                        item._id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="quantity-input"
                                            />
                                        </td>
                                        <td>
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString()}{" "}
                                            đ
                                        </td>
                                        <td>
                                            <button
                                                className="btn-remove"
                                                onClick={() =>
                                                    this.removeItem(item._id)
                                                }
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Chưa có sản phẩm nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="cart-summary">
                    <p>
                        <strong>Số lượng:</strong> {cartCount} sản phẩm
                    </p>
                    <p>
                        <strong>Tổng cộng:</strong> {total.toLocaleString()} đ
                    </p>
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-checkout">
                        <button
                            className="btn-checkout"
                            onClick={this.handleCheckout}
                        >
                            ✅ Thanh toán ngay
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(MyCartComponent);
