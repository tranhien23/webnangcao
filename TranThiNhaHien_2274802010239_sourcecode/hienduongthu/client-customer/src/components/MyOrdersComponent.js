import React, { Component } from 'react';
import axios from 'axios';

class MyOrdersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedOrder: null
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && user.id && token) {
      axios.get(`/api/customer/orders/customer/${user.id}`, {
        headers: { 'x-access-token': token }
      })
        .then((res) => {
          this.setState({ orders: res.data.orders });
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
        });
    }
  }

  handleSelectOrder = (order) => {
    this.setState({ selectedOrder: order });
  }

  render() {
    const { orders, selectedOrder } = this.state;

    return (
      <div className="order-page">
        <h2 className="order-title">🧾 LỊCH SỬ ĐẶT HÀNG</h2>

        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ngày tạo</th>
                <th>Khách hàng</th>
                <th>Điện thoại</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => this.handleSelectOrder(order)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{order._id}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>{order.customer.name}</td>
                  <td>{order.customer.phone}</td>
                  <td>{order.total.toLocaleString()} đ</td>
                  <td>
                    <span className={`status-tag status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="order-detail">
            <h3>🛍️ Chi tiết đơn hàng</h3>
            <table className="order-detail-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã SP</th>
                  <th>Tên SP</th>
                  <th>Hình ảnh</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product}</td>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.image ? `data:image/jpg;base64,${item.image}` : '/default-image.jpg'}
                        alt={item.name}
                        width="60"
                        style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                      />
                    </td>
                    <td>{item.price.toLocaleString()} đ</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default MyOrdersComponent;
