import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import 'bootstrap/dist/css/bootstrap.min.css';

class SettingComponent extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      shopName: 'Cửa hàng DHT',
      shopLogo: 'link-to-your-logo', // Đây là link ảnh logo
      establishmentDate: '01/01/2021',
      adminName: 'Admin',
      password: '******',
    };
  }

  render() {
    const { shopName, shopLogo, establishmentDate, adminName, password } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Xin Chào, ADMIN</h2>

        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label fw-bold">Tên cửa hàng:</label>
              <p>{shopName}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Ngày thành lập:</label>
              <p>{establishmentDate}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Tên Admin:</label>
              <p>{adminName}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Mật khẩu:</label>
              <p>{password}</p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="mb-3">
              <label className="form-label fw-bold">Logo cửa hàng:</label>
              <div className="border p-3" style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="1.png" alt="Logo" style={{ maxHeight: '500%', maxWidth: '500%'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingComponent;
