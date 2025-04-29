import React, { Component } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      phone: "",
      email: "",
      message: "",
      token: "",
      redirect: false,
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateInput = () => {
    const { username, password, name, phone, email } = this.state;
    if (!username || !password || !name || !phone || !email) {
      this.setState({ message: "Vui lòng điền đầy đủ thông tin." });
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.setState({ message: "Email không hợp lệ." });
      return false;
    }
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateInput()) return;

    const { username, password, name, phone, email } = this.state;
    this.setState({ loading: true });

    try {
      const response = await axios.post(
        `${window.location.origin}/api/customer/signup`,
        { username, password, name, phone, email },
      );

      if (response.data.success) {
        this.setState({
          message: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt.",
          token: response.data.token,
          redirect: true,
        });
        localStorage.setItem("activationToken", response.data.token);
      } else {
        this.setState({ message: "Đăng ký thất bại, vui lòng thử lại." });
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      this.setState({ message: "Lỗi khi đăng ký, hãy thử lại sau." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      username,
      password,
      name,
      phone,
      email,
      message,
      token,
      redirect,
      loading,
    } = this.state;

    if (redirect) return <Navigate to="/login" />;

    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm p-4 rounded-4 border-0">
              <h3 className="text-center mb-4" style={{ color: "#45a049" }}>
                Đăng ký tài khoản
              </h3>

              {message && (
                <Alert
                  variant={
                    message.includes("thành công") ? "success" : "danger"
                  }
                >
                  {message}
                </Alert>
              )}

              {token && (
                <Alert variant="info">
                  <strong>Token:</strong> {token}
                </Alert>
              )}

              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    placeholder="Tên đăng nhập"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={this.handleChange}
                    placeholder="0123456789"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="example@gmail.com"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#45a049",
                    borderColor: "#45a049",
                    fontWeight: "bold",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Đang đăng ký...
                    </>
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </Form>

              <p className="text-center mt-4">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-decoration-none" style={{ color: "#45a049" }}>
                  Đăng nhập
                </Link>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUpComponent;
