import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
        return (
          <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{new Date(item.cdate).toLocaleString()}</td>
            <td>{item.category ? item.category.name : 'No category'}</td> {/* Kiểm tra null cho category */}
            <td>
              <img
                src={"data:image/jpg;base64," + item.image}
                width="100px"
                height="100px"
                alt=""
              />
            </td>
          </tr>
        );
      });
      

    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if (index + 1 === this.state.curPage) {
        return (
          <span key={index}>
            | <b>{index + 1}</b> |
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className="Link"
            onClick={() => this.lnkPageClick(index + 1)}
          >
            | {index + 1} |
          </span>
        );
      }
    });

    return (
      <div>
        <div className="float-left">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
              <tr>
                <td colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail
          item={this.state.itemSelected}
          curPage={this.state.curPage}
          updateProducts={this.updateProducts}
        />
        <div className="float-clear" />
      </div>
    );
  }

  componentDidMount() {      // componentDidMount là một hàm đặc biệt được gọi sau khi component được render lần đầu tiên.
    this.apiGetProducts(this.state.curPage);      // this.apiGetProducts(this.state.curPage); là gọi hàm apiGetProducts để lấy danh sách sản phẩm từ server.
  }

  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {      // trItemClick(item) là một hàm được gọi khi người dùng click vào một hàng trong bảng sản phẩm.
    this.setState({ itemSelected: item });
  }

  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage,
      });
    });
  }

  updateProducts = (products, noPages) => {
    this.setState({ products: products, noPages: noPages });
  };
}

export default Product;
