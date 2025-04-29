import React, { Component } from "react";
import axios from "axios";
import MyContext from "../contexts/MyContext";

class CustomerComponent extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [], // Danh sách khách hàng
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  // Fetch danh sách khách hàng
  fetchCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/customers", config)
      .then((res) => {
        const customers = Array.isArray(res.data) ? res.data : [];
        this.setState({ customers });
      })
      .catch((err) => console.error("❌ Lỗi tải khách hàng:", err));
  }

  // // Vô hiệu hóa khách hàng
  // deactivateCustomer(customerId) {
  //   const config = { headers: { "x-access-token": this.context.token } };
  //   const body = { token: "7326926c91439cbb0adf64ced3203a52" }; // Token cần thiết

  //   axios
  //     .put(`/api/admin/customers/deactive/${customerId}`, body, config)
  //     .then(() => {
  //       alert("✔ Customer has been deactivated");
  //       this.fetchCustomers(); // Reload danh sách khách hàng
  //     })
  //     .catch((err) => console.error("❌ Lỗi vô hiệu hóa khách hàng:", err));
  // }

  render() {
    const { customers } = this.state;

    return (
      <div style={{ padding: "30px" }}>
        <h2 className="text-center mb-4 text-info">Customer List</h2>
        <table
          border="1"
          cellPadding="10"
          style={{
            margin: "auto",
            borderCollapse: "collapse",
            minWidth: "90%",
          }}
        >
          <thead
            style={{
              backgroundColor: "gold",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id} style={{ textAlign: "center" }}>
                  <td>{customer._id}</td>
                  <td>{customer.username}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.active === 1 ? "ACTIVE" : "INACTIVE"}</td>
                  {/* <td>
                  <button className="btn btn-warning btn-sm" onClick={() => this.deactivateCustomer(customer._id)}>
                    DEACTIVATE
                  </button>
                </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No customers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CustomerComponent;
