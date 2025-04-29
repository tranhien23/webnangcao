import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaSpinner } from "react-icons/fa";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `${window.location.origin}/api/customer/login`,
                { username, password },
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.customer),
            );
            localStorage.setItem("token", response.data.token);

            navigate("/home");
            window.location.reload();
        } catch (error) {
            console.error("Error during login:", error);
            setError(
                error.response?.data?.error ||
                    "Đã có lỗi xảy ra. Vui lòng thử lại.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card shadow">
                <h2 className="login-title">Đăng Nhập Tài Khoản</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>
                            <FaUser style={{ marginRight: 6 }} />
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaLock style={{ marginRight: 6 }} />
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="spin" /> Đang đăng nhập...
                            </>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>
                </form>
                <p className="signup-link">
                    Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
