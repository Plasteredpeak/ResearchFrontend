import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Logo from "../assets/wLogo.png";
import { login } from "../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Reset error message
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email) {
      setErrors({ ...errors, email: "Email is required" });
      return;
    }

    // Validate password
    if (!formData.password) {
      setErrors({ ...errors, password: "Password is required" });
      return;
    }

    const { success, data } = await login(formData);
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful");
      window.dispatchEvent(new Event("login"));
      navigate("/");
    } else {
      toast.error(data);
    }
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <form
        className="mb-5 flex w-full max-w-lg flex-col justify-center rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 flex justify-center">
          <img
            className="rounded-sm"
            src={Logo}
            alt=""
            height={200}
            width={200}
          />
        </div>
        <label className="form-control mb-5 w-full">
          <div
            className={`tooltip  tooltip-right ${
              errors.email ? "tooltip-error tooltip-open" : ""
            }`}
            {...(errors.email && { "data-tip": errors.email })}
          >
            <label
              className={`input input-bordered flex items-center gap-2
            ${errors.email ? "input-error" : ""}`}
            >
              <MdEmail />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                onChange={(e) => handleChange(e, "email")}
              />
            </label>
          </div>
        </label>
        <label className="form-control mb-5 w-full">
          <div
            className={`tooltip  tooltip-right ${
              errors.password ? "tooltip-error tooltip-open" : ""
            }`}
            {...(errors.password && { "data-tip": errors.password })}
          >
            <label
              className={`input input-bordered flex items-center gap-2
            ${errors.password ? "input-error" : ""}`}
            >
              <FaKey />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
              />
            </label>
          </div>
        </label>
        <button
          className="text-md btn btn-secondary my-5 text-[1rem]"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
