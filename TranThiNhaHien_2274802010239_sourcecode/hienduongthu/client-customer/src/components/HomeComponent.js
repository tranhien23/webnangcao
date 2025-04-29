import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios
      .get("/api/customer/products/new")
      .then((res) => {
        this.setState({ newprods: res.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching new products:", error);
        this.setState({
          error: "Không thể tải sản phẩm mới.",
          loading: false,
        });
      });
  }

  apiGetHotProducts() {
    axios
      .get("/api/customer/products/hot")
      .then((res) => {
        this.setState({ hotprods: res.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching hot products:", error);
        this.setState({
          error: "Không thể tải sản phẩm hot.",
          loading: false,
        });
      });
  }

  renderProducts(products) {
    return products.length > 0 ? (
      products.map((item) => (
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
            <p className="price">{item.price.toLocaleString()} VND</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">Không có sản phẩm nào.</p>
    );
  }

  render() {
    const { newprods, hotprods, loading, error } = this.state;

    return (
      <div className="home-container">
        {/* ✅ BANNER ĐIỆN THOẠI MỚI */}
        <div
          className="main-banner"
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            overflow: "hidden",
            borderRadius: "12px",
            marginBottom: "50px",
          }}
        >
          {/* Hình nền banner */}
          <img
            src="https://diemtincongnghe.com/wp-content/uploads/2022/03/samsung-galaxy-a53-co-gi-moi-4.jpg"
            alt="banner điện thoại"
            style={{
              width: "90%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.6)",
            }}
          />

          {/* Nội dung chữ nổi trên hình */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                letterSpacing: "2px",
              }}
            >
              ĐIỆN THOẠI SIÊU HOT
            </h1>
            <p
              style={{
                fontSize: "20px",
                margin: "15px 0",
                textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              Mua điện thoại mới - Ưu đãi{" "}
              <strong style={{ color: "#ffd54f" }}>đến 30%</strong> 🎁
            </p>
          </div>
        </div>

        {/* ✅ SẢN PHẨM */}
        {loading && (
          <div
            className="text-center"
            style={{ padding: "30px", fontSize: "18px" }}
          >
            <span className="spinner-border text-primary" role="status" />
            <span style={{ marginLeft: "10px" }}>Đang tải sản phẩm...</span>
          </div>
        )}

        {error && (
          <p
            className="error-message text-center"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="container">
            <h2 className="text-center">SẢN PHẨM MỚI</h2>
            <div className="product-container">
              {this.renderProducts(newprods)}
            </div>

            <h2 className="text-center" style={{ marginTop: "40px" }}>
              SẢN PHẨM HOT
            </h2>
            <div className="product-container">
              {this.renderProducts(hotprods)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
