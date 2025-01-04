import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Form from "../Form/formComponent";
import Button from "../Button/buttonComponent";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginFildes = [
    {
      label: "Email",
      name: "email",
      type: "email",
      value: formData.email,
      onChange: handleInputChange,
      required: true,
    },
    {
      label: "Passwodr",
      name: "password",
      type: "password",
      value: formData.password,
      onChange: handleInputChange,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      console.log("Login successfully:", response.data);
      localStorage.setItem("authToken", response.data);

      if (response.data.user && response.data.user.id) {
        localStorage.setItem("userId", response.data.user._id);
        console.log("User ID saved:", response.user.data._id);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Error loggingh in:",
        err.response ? err.response.data.message : "somthing wrong"
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form fields={loginFildes} onSubmit={handleSubmit} submitText="Log In" />
      <Button onClick={handleSubmit} child={"Login"} />
    </div>
  );
};

export default Login;
