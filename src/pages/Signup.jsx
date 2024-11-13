import React, { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import Logo from "../assets/wLogo.png";
import { signup } from "../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Reset error message
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username
    if (!formData.userName) {
      setErrors({ ...errors, userName: "Username is required" });
      return;
    }

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

    // check password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    const { success, data } = await signup(formData);

    if (success) {
      toast.success("Signup successful");
      navigate("/login");
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
            className=" rounded-sm"
            src={Logo}
            alt=""
            height={200}
            width={200}
          />
        </div>
        <label className="form-control mb-5 w-full">
          <div
            className={`tooltip  tooltip-right ${
              errors.userName ? "tooltip-error tooltip-open" : ""
            }`}
            {...(errors.userName && { "data-tip": errors.userName })}
          >
            <label
              className={`input input-bordered flex items-center gap-2 ${
                errors.userName ? "input-error" : ""
              }`}
            >
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                onChange={(e) => handleChange(e, "userName")}
              />
            </label>
          </div>
        </label>
        <label className="form-control mb-5 w-full">
          <div
            className={`tooltip  tooltip-right ${
              errors.email ? "tooltip-error tooltip-open" : ""
            }`}
            {...(errors.email && { "data-tip": errors.email })}
          >
            <label
              className={`input input-bordered flex items-center gap-2 
            ${errors.email ? "input-error" : ""}
            `}
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
            ${errors.password ? "input-error" : ""}
            `}
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
        <label className="form-control mb-5 w-full">
          <div
            className={`tooltip  tooltip-right ${
              errors.confirmPassword ? "tooltip-error tooltip-open" : ""
            }`}
            {...(errors.confirmPassword && {
              "data-tip": errors.confirmPassword,
            })}
          >
            <label
              className={`input input-bordered flex items-center gap-2
            ${errors.confirmPassword ? "input-error" : ""}
            `}
            >
              <FaKey />
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e, "confirmPassword")}
              />
            </label>
          </div>
        </label>
        <button
          className={`text-md btn btn-secondary my-5 text-[1rem] 
            ${loading && "disabled"}
          `}
          type="submit"
        >
          {loading && <span class="loading loading-spinner"></span>}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
