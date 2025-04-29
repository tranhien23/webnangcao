import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyProfile() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserInfo({
                username: user.username,
                password: "",
                name: user.name,
                phone: user.phone,
                email: user.email,
            });
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("user")).id;

        setLoading(true);

        try {
            const response = await axios.put(
                `${window.location.origin}/api/customer/customers/${userId}`,
                userInfo,
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );
            toast.success("Cập nhật thành công!");
            navigate("/profile");
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            setError(
                error.response?.data?.error || "Đã có lỗi xảy ra. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4 border-0 rounded-4">
                        <h3 className="text-center text-success mb-4">
                            Hồ sơ cá nhân
                        </h3>
                        <div className="form-group mb-3">
                            <label className="fw-bold">Tên đăng nhập</label>
                            <input
                                type="text"
                                name="username"
                                value={userInfo.username}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Tên đăng nhập"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold">Mật khẩu</label>
                            <input
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Để trống nếu không đổi"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold">Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2">{error}</div>
                        )}

                        <button
                            className="btn btn-success w-100 mt-3"
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>
                                    Đang cập nhật...
                                </>
                            ) : (
                                "Cập nhật hồ sơ"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
