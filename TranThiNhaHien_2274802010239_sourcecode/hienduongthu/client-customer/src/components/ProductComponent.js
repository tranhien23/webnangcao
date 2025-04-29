import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { cid, keyword } = this.props.params;

    if (cid) {
      this.apiGetProductsByCatID(cid);
    } else if (keyword) {
      this.apiGetProductsByKeyword(keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const { cid, keyword } = this.props.params;

    if (cid && cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(cid);
    } else if (keyword && keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    this.setState({ loading: true, error: null });
    axios
      .get(`/api/customer/products/category/${cid}`)
      .then((res) => {
        this.setState({ products: res.data, loading: false });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
        this.setState({ error: "Không thể tải sản phẩm", loading: false });
      });
  }

  apiGetProductsByKeyword(keyword) {
    this.setState({ loading: true, error: null });
    axios
      .get(`/api/customer/products/search/${keyword}`)
      .then((res) => {
        this.setState({ products: res.data, loading: false });
      })
      .catch((error) => {
        console.error("Lỗi khi tìm sản phẩm:", error);
        this.setState({ error: "Không thể tải sản phẩm", loading: false });
      });
  }

  render() {
    const { products, loading, error } = this.state;

    return (
      <div className="container my-4">
        <h2 className="text-center text-success mb-4">
          Danh sách sản phẩm
        </h2>

        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status" />
            <span className="ms-2">Đang tải sản phẩm...</span>
          </div>
        )}

        {error && (
          <p className="text-danger text-center fw-bold">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-muted">Không tìm thấy sản phẩm nào.</p>
        )}

        <div className="product-container">
          {products.map((item) => (
            <div key={item._id} className="product-card">
              <Link to={`/product/${item._id}`}>
                <img
                  src={
                    item.image
                      ? `data:image/jpg;base64,${item.image}`
                      : "/default-image.jpg"
                  }
                  alt={item.name}
                />
              </Link>
              <div className="product-info">
                <h4>{item.name}</h4>
                <p className="price text-danger fw-bold">
                  {item.price.toLocaleString()} VND
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
