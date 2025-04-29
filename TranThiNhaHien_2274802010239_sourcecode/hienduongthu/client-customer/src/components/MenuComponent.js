import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: "",
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios
      .get("/api/customer/categories")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh mục:", error);
      });
  }

  handleChange = (e) => {
    this.setState({ txtKeyword: e.target.value });
  };

  btnSearchClick = (e) => {
    e.preventDefault();
    this.props.navigate(`/product/search/${this.state.txtKeyword}`);
  };

  render() {
    const { categories, txtKeyword } = this.state;

    return (
      <nav className="menu-navbar">
        <div className="menu-left">
          <ul className="menu-list">
            <li>
              <Link to="/" className="menu-link">
                Trang chủ
              </Link>
            </li>
            {categories.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/product/category/${item._id}`}
                  className="menu-link"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-search">
          <form onSubmit={this.btnSearchClick} className="menu-search-form">
            <input
              type="text"
              value={txtKeyword}
              placeholder="Tìm kiếm sản phẩm..."
              onChange={this.handleChange}
              className="menu-search-input"
            />
            <button type="submit" className="menu-search-button">
              🔍
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu);
