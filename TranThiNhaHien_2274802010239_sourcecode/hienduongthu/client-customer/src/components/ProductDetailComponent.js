import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
    };
  }

  componentDidMount() {
    const params = this.props.params || {};
    if (params.id) {
      this.apiGetProduct(params.id);
    }
  }

  apiGetProduct(id) {      // apiGetProduct(id) là một hàm bất đồng bộ (async function) dùng để lấy thông tin sản phẩm từ server theo id.
    axios
      .get(`/api/customer/products/${id}`)
      .then((res) => {
        this.setState({ product: res.data });
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        this.setState({ product: null });
      });
  }

  addToCart = () => {
    const { product, quantity } = this.state;      // Lấy thông tin sản phẩm và số lượng từ state
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];  // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa có

    const existingProductIndex = cart.findIndex(      // Tìm kiếm sản phẩm trong giỏ hàng
      (item) => item._id === product._id      // So sánh ID sản phẩm
    );

    if (existingProductIndex !== -1) {      // Nếu sản phẩm đã tồn tại trong giỏ hàng
      cart[existingProductIndex].quantity += quantity;      // Tăng số lượng sản phẩm
    } else {
      cart.push({ ...product, quantity });      // Thêm sản phẩm mới vào giỏ hàng  //quantity: là số lượng sản phẩm
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));      // Lưu giỏ hàng vào localStorage
    this.setState({ quantity: 1 });    // Đặt lại số lượng về 1 sau khi thêm vào giỏ hàng
  
    window.dispatchEvent(new Event("storage"));      // Gửi sự kiện để cập nhật giỏ hàng trên các component khác
    window.location.reload();      // Tải lại trang để cập nhật giỏ hàng
  };

  render() {
    const { product, quantity } = this.state;      // Lấy thông tin sản phẩm và số lượng từ state

    if (!product) {
      return <p className="text-center">Không tìm thấy sản phẩm</p>;      // Hiển thị thông báo nếu không tìm thấy sản phẩm
    }

    return (
      <div className="container my-5">
        <div className="card shadow-lg p-4 rounded-4">
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <img
                src={
                  product.image
                    ? `data:image/jpg;base64,${product.image}`
                    : "/default-image.jpg"
                }
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-success fw-bold mb-3">{product.name}</h2>
              <p>
                <strong>Mã SP:</strong> {product._id}
              </p>
              <p>
                <strong>Giá:</strong>{" "}
                <span className="text-danger fs-5 fw-bold">
                  {product.price.toLocaleString()} VND
                </span>
              </p>
              <p>
                <strong>Danh mục:</strong>{" "}
                {product.category ? product.category.name : "Chưa phân loại"}
              </p>
              <div className="mb-3">
                <label className="form-label fw-bold">Số lượng</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) =>
                    this.setState({ quantity: parseInt(e.target.value) })      // Cập nhật số lượng khi người dùng thay đổi
                  }
                  style={{ maxWidth: "100px" }}
                />
              </div>
              <button
                onClick={this.addToCart}      // Gọi hàm addToCart khi người dùng click vào nút
                className="btn btn-success w-100"
              >
                🛒 Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);
