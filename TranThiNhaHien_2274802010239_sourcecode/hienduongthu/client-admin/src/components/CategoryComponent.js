import React, { Component } from 'react';      // import React, { Component } from 'react'; là import thư viện React và Component từ react.
import CategoryDetail from './CategoryDetailComponent';      // import CategoryDetail from './CategoryDetailComponent'; là import component CategoryDetail từ file CategoryDetailComponent.js.
import axios from 'axios';
// Gửi request đến API (GET, POST, PUT, DELETE…):
//Gửi dữ liệu từ frontend (React) lên backend (Node.js/Express)
//Lấy dữ liệu từ backend để hiển thị ra giao diện
//Xử lý lỗi và thông báo cho người dùng
//Thực hiện các tác vụ khác như xác thực, phân quyền,…
//axios là một thư viện HTTP client cho Node.js và browser. Nó được sử dụng để gửi các request HTTP từ node.js hoặc XMLHttpRequests từ browser và nó hỗ trợ Promise API tương tự như ES6.
import MyContext from '../contexts/MyContext';  
//MyContext là một context được tạo ra để chia sẻ dữ liệu giữa các component trong ứng dụng React. Context được sử dụng để tránh việc truyền props qua nhiều cấp component.
import 'bootstrap/dist/css/bootstrap.min.css';  // import 'bootstrap/dist/css/bootstrap.min.css'; là import file css của bootstrap để sử dụng các component của bootstrap.
// Bootstrap là một framework CSS cho việc phát triển giao diện người dùng nhanh chóng và dễ dàng. Nó bao gồm các component như button, form, table, modal,… và các utility class như margin, padding, text-align,…
  
class Category extends Component {          // class Category extends Component là tạo một class component Category kế thừa từ Component.
  //Component là một class cơ bản của React được sử dụng để tạo ra các component. Component có hai loại là class component và function component. Class component được sử dụng khi cần sử dụng state và lifecycle methods.
  static contextType = MyContext;        // static contextType = MyContext; là khai báo contextType cho component Category.
  //contextType là một thuộc tính của class component để khai báo context cho component đó. Context được sử dụng để chia sẻ dữ liệu giữa các component trong ứng dụng React.

  constructor(props) {      // constructor(props) là phương thức khởi tạo của class component.
    super(props);        // super(props); là gọi phương thức khởi tạo của class cha (Component).    //props là một đối tượng chứa các thuộc tính được truyền từ component cha xuống component con.
    this.state = {       // this.state = {}; là khai báo state cho component Category.      //state là một đối tượng chứa các thuộc tính của component đó. State được sử dụng để lưu trữ dữ liệu của component và khi state thay đổi, component sẽ được render lại.
      categories: [],
      itemSelected: null
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  updateCategories = (categories) => {
    this.setState({ categories });
  };

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config)
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-danger fw-bold text-center">Danh Mục Sản Phẩm</h2>
        <div className="row">
          <div className="col-md-7">
            <table className="table table-bordered table-hover shadow">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-warning me-2" 
                        onClick={() => this.setState({ itemSelected: item })}>
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-5">
            <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
