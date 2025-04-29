import React, { Component } from "react";
import axios from "axios";

class ActiveAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: localStorage.getItem("activationToken") || "",
      message: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, token } = this.state;

    try {
      const response = await axios.post(
        `${window.location.origin}/api/customer/active`,
        {
          id,
          token,
        },
      );

      if (response.data.success) {
        this.setState({ message: "Account activated successfully!" });
      } else {
        this.setState({ message: "Failed to activate account." });
      }
    } catch (error) {
      console.error("Error activating account:", error);
      this.setState({ message: "Error during activation, please try again." });
    }
  };

  render() {
    const { id, token, message } = this.state;

    return (
      <div className="active-account-container">
        <h2 className="text-center">Activate Your Account</h2>
        {message && (
          <p
            className={`message ${message.includes("success") ? "success" : "error"}`}
          >
            {message}
          </p>
        )}
        <form onSubmit={this.handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="id">Account ID:</label>
            <input
              type="text"
              name="id"
              value={id}
              onChange={this.handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="token">Activation Token:</label>
            <input
              type="text"
              name="token"
              value={token}
              readOnly
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn">
            Activate
          </button>
        </form>
      </div>
    );
  }
}

export default ActiveAccountComponent;
