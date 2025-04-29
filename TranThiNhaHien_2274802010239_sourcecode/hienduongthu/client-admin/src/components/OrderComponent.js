import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class OrderComponent extends Component {
  static contextType = MyContext;

  constructor(props) {      // constructor là một hàm đặc biệt được gọi khi một đối tượng được tạo ra từ lớp.
    super(props);      // super(props); là gọi hàm constructor của lớp cha (Component) với tham số props.
    this.state = {        // this.state = {}; là tạo một đối tượng state để lưu trữ trạng thái của component.
      orders: [],  // Danh sách đơn hàng
      selectedOrder: null  // Đơn hàng được chọn để xem chi tiết      // selectedOrder: null là khởi tạo giá trị ban đầu cho selectedOrder là null.
    };
  }

  componentDidMount() {      // componentDidMount là một hàm đặc biệt được gọi sau khi component được render lần đầu tiên.
    // Gọi hàm fetchOrders để tải danh sách đơn hàng khi component được mount.
    //fetchOrders là một hàm bất đồng bộ (async function) dùng để tải danh sách đơn hàng từ server.
    this.fetchOrders();
  }

  fetchOrders = () => {    
    const config = { headers: { 'x-access-token': this.context.token } };    // config là một đối tượng chứa các thông tin cấu hình cho request.
    // headers: { 'x-access-token': this.context.token } là thêm token vào header của request để xác thực người dùng.
    axios.get('/api/admin/orders', config)    // axios.get('/api/admin/orders', config) là gửi một request GET đến server để lấy danh sách đơn hàng.
      .then(res => {    // then(res => {}) là một hàm callback được gọi khi request thành công.
        const orders = Array.isArray(res.data.orders) ? res.data.orders : [];
        this.setState({ orders });
      })
      .catch(err => console.error('❌ Lỗi tải đơn hàng:', err));
  };

  updateStatus = (orderId, status) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/orders/status/${orderId}`, { status }, config)
      .then(() => {
        alert("✔ Trạng thái đã được cập nhật");
        this.fetchOrders();
      })
      .catch(err => console.error("❌ Lỗi cập nhật trạng thái:", err));
  };

  render() {
    const { orders, selectedOrder } = this.state;

    return (
      <div style={{ padding: "30px" }}>
        <h2 className="text-center">ORDER LIST</h2>
        <table border="1" cellPadding="10" style={{ margin: "auto", borderCollapse: "collapse", minWidth: "90%" }}>
          <thead style={{ backgroundColor: "gold", fontWeight: "bold", textAlign: "center" }}>
            <tr>
              <th>ID</th>
              <th>Creation date</th>
              <th>Cust.name</th>
              <th>Cust.phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map(order => (
              <tr
                key={order._id}
                onClick={() => this.setState({ selectedOrder: order })}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: order.status === 'Pending' ? '#fdf8d2' : '#fff'
                }}
              >
                <td>{order._id}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
                <td>{order.customer?.name || "N/A"}</td>
                <td>{order.customer?.phone || "N/A"}</td>
                <td>{order.total?.toLocaleString() || 0}</td>
                <td>{order.status.toUpperCase()}</td>
                <td>
                  <div style={{ textAlign: 'center' }}>
                    {/* Hiển thị luôn hai nút APPROVE và CANCEL */}
                    <a
                      href="#"
                      style={{ color: "blue", fontWeight: "bold", textDecoration: "underline", marginRight: 10 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.updateStatus(order._id, "APPROVED");
                      }}
                    >
                      APPROVE
                    </a>
                    <span style={{ fontWeight: "bold" }}>&nbsp;||&nbsp;</span>
                    <a
                      href="#"
                      style={{ color: "blue", fontWeight: "bold", textDecoration: "underline" }}
                      onClick={(e) => {      // onClick={(e) => {}} là một hàm callback được gọi khi người dùng click vào nút CANCEL.
                        //e là một đối tượng sự kiện (event object) chứa thông tin về sự kiện click.
                        e.preventDefault();
                        e.stopPropagation();
                        this.updateStatus(order._id, "CANCELED");
                      }}
                    >
                      CANCEL
                    </a>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" className="text-center">Không có đơn hàng</td></tr>
            )}
          </tbody>
        </table>

        {selectedOrder && (
          <>
            <h2 className="text-center" style={{ marginTop: "40px" }}>ORDER DETAIL</h2>
            <table border="1" cellPadding="10" style={{ margin: "auto", borderCollapse: "collapse", minWidth: "90%", textAlign: "center" }}>
              <thead style={{ backgroundColor: "gold", fontWeight: "bold" }}>
                <tr>
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items?.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#fdf8d2" }}>
                    <td>{index + 1}</td>
                    <td>{item.product || "---"}</td>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.image ? `data:image/jpg;base64,${item.image}` : "/default-image.jpg"}
                        alt={item.name}
                        width="60"
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    );
  }
}

export default OrderComponent;
