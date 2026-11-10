
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import {
  FaUserShield,
  FaUsers,
  FaHardHat,
  FaUser,
  FaLock,
  FaCar,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOGIN
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: username.trim(),
          password,
          role,
        }
      );

      console.log("Login Response:", res.data);

      alert("Login Successful");

      // Save login details
      localStorage.setItem(
        "token",
        res.data.token || ""
      );

      localStorage.setItem("role", role);

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      // ========================================
      // ROLE BASED NAVIGATION
      // ========================================
      switch (role) {
        case "Admin":
          navigate("/admin-dashboard");
          break;

        case "Customer":
          navigate("/customer-dashboard");
          break;

        case "Surveyor":
          navigate("/surveyor-dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      console.error(
        "Login Error:",
        err.response?.data || err.message
      );

      if (err.response) {
        alert(
          err.response.data.error ||
            err.response.data.detail ||
            "Invalid username or password."
        );
      } else {
        alert(
          "Unable to connect to server. Please check Django server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ROLES
  // ==========================================
  const roles = [
    {
      name: "Admin",
      icon: <FaUserShield />,
      description: "Manage system",
    },
    {
      name: "Customer",
      icon: <FaUsers />,
      description: "Manage claims",
    },
    {
      name: "Surveyor",
      icon: <FaHardHat />,
      description: "Manage surveys",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6">

      {/* ======================================
          BACKGROUND DECORATION
      ====================================== */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>

      </div>

      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div
        className="
          relative z-10
          w-full max-w-6xl
          min-h-[650px]
          grid lg:grid-cols-2
          bg-white
          rounded-[2rem]
          overflow-hidden
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        "
      >

        {/* ======================================
            LEFT SIDE
        ====================================== */}

        <div
          className="
            relative
            hidden lg:flex
            flex-col justify-between
            p-10 xl:p-14
            text-white
            overflow-hidden
            bg-gradient-to-br
            from-blue-700
            via-indigo-700
            to-purple-800
          "
        >

          {/* Decorative circles */}

          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-white/10"></div>

          <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-white/5"></div>

          <div className="relative z-10">

            {/* Logo */}

            <div
              className="
                w-16 h-16
                rounded-2xl
                bg-white/15
                backdrop-blur-xl
                border border-white/20
                flex items-center justify-center
                shadow-xl
                mb-8
              "
            >
              <FaCar className="text-3xl" />
            </div>

            {/* Small title */}

            <div className="flex items-center gap-2 mb-4">

              <FaShieldAlt className="text-blue-200" />

              <span
                className="
                  text-blue-200
                  text-xs
                  font-bold
                  uppercase
                  tracking-[3px]
                "
              >
                Insurance Management
              </span>

            </div>

            {/* Main heading */}

            <h1
              className="
                text-4xl
                xl:text-5xl
                font-black
                leading-[1.1]
              "
            >
              Vehicle
              <br />

              <span className="text-blue-200">
                Insurance
              </span>

              <br />

              Claim Management
            </h1>

            {/* Line */}

            <div className="w-16 h-1 bg-white rounded-full my-7"></div>

            {/* Description */}

            <p
              className="
                text-blue-100
                text-base
                xl:text-lg
                leading-relaxed
                max-w-lg
              "
            >
              A smarter and faster way to manage
              vehicle insurance claims, surveys,
              approvals and settlements.
            </p>

            {/* Features */}

            <div className="mt-9 space-y-4">

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-200" />

                <span className="text-blue-100">
                  Secure role-based access
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-200" />

                <span className="text-blue-100">
                  Complete claim management
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-200" />

                <span className="text-blue-100">
                  Faster survey processing
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-200" />

                <span className="text-blue-100">
                  Easy claim settlement
                </span>
              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="relative z-10">

            <div className="h-px bg-white/20 mb-5"></div>

            <p className="text-xs text-blue-200">
              Secure • Reliable • Efficient
            </p>

          </div>

        </div>

        {/* ======================================
            RIGHT SIDE
        ====================================== */}

        <div
          className="
            bg-slate-50
            flex items-center justify-center
            p-5 sm:p-8 lg:p-10
          "
        >

          <div className="w-full max-w-md">

            {/* ==================================
                MOBILE LOGO
            ================================== */}

            <div className="lg:hidden flex justify-center mb-7">

              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-700
                  text-white
                  flex items-center justify-center
                  shadow-xl
                "
              >
                <FaCar className="text-3xl" />
              </div>

            </div>

            {/* ==================================
                HEADER
            ================================== */}

            <div className="text-center mb-7">

              <div
                className="
                  inline-flex
                  items-center gap-2
                  px-3 py-1.5
                  rounded-full
                  bg-blue-50
                  text-blue-600
                  text-xs
                  font-bold
                  mb-4
                "
              >
                <FaShieldAlt />

                Secure Login
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-black
                  text-slate-800
                "
              >
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-2 text-sm">
                Select your role to continue
              </p>

            </div>

            {/* ==================================
                ROLE SELECTION
            ================================== */}

            <div className="grid grid-cols-3 gap-3 mb-6">

              {roles.map((item) => {

                const selected =
                  role === item.name;

                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setRole(item.name)}
                    className={`
                      relative
                      group
                      rounded-2xl
                      p-3 sm:p-4
                      min-h-[120px]
                      border-2
                      flex flex-col
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      ${
                        selected
                          ? `
                            border-blue-600
                            bg-blue-50
                            text-blue-700
                            shadow-lg
                            shadow-blue-100
                            -translate-y-1
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-500
                            hover:border-blue-300
                            hover:bg-blue-50/50
                            hover:-translate-y-1
                          `
                      }
                    `}
                  >

                    {/* Selected dot */}

                    {selected && (
                      <span
                        className="
                          absolute
                          top-2
                          right-2
                          w-2.5 h-2.5
                          rounded-full
                          bg-blue-600
                          shadow-sm
                        "
                      ></span>
                    )}

                    {/* Icon */}

                    <div
                      className={`
                        text-2xl sm:text-3xl
                        mb-3
                        transition-transform
                        duration-300
                        group-hover:scale-110
                        ${
                          selected
                            ? "text-blue-600"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {item.icon}
                    </div>

                    {/* Name */}

                    <span className="font-bold text-xs sm:text-sm">
                      {item.name}
                    </span>

                    {/* Description */}

                    <span className="text-[10px] text-slate-400 mt-1 hidden sm:block">
                      {item.description}
                    </span>

                  </button>
                );
              })}

            </div>

            {/* ==================================
                LOGIN FORM
            ================================== */}

            {role ? (

              <form
                onSubmit={handleLogin}
                className="
                  bg-white
                  rounded-3xl
                  p-5 sm:p-6
                  border
                  border-slate-200
                  shadow-xl
                "
              >

                {/* Selected role */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    p-3
                    rounded-2xl
                    bg-blue-50
                    border
                    border-blue-100
                    mb-5
                  "
                >

                  <div>

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wider
                        text-blue-600
                        font-bold
                      "
                    >
                      Selected Role
                    </p>

                    <h3 className="text-lg font-bold text-slate-800">
                      {role} Login
                    </h3>

                  </div>

                  <div
                    className="
                      w-11 h-11
                      rounded-xl
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-md
                    "
                  >
                    {
                      roles.find(
                        (item) =>
                          item.name === role
                      )?.icon
                    }
                  </div>

                </div>

                {/* ==================================
                    USERNAME
                ================================== */}

                <div className="mb-4">

                  <label
                    className="
                      block
                      text-sm
                      font-bold
                      text-slate-700
                      mb-2
                    "
                  >
                    Username
                  </label>

                  <div className="relative">

                    <FaUser
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      autoComplete="username"
                      className="
                        w-full
                        pl-11 pr-4
                        py-3.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        outline-none
                        text-slate-800
                        placeholder:text-slate-400
                        transition-all
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />

                  </div>

                </div>

                {/* ==================================
                    PASSWORD
                ================================== */}

                <div className="mb-6">

                  <label
                    className="
                      block
                      text-sm
                      font-bold
                      text-slate-700
                      mb-2
                    "
                  >
                    Password
                  </label>

                  <div className="relative">

                    <FaLock
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      autoComplete="current-password"
                      className="
                        w-full
                        pl-11 pr-12
                        py-3.5
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        outline-none
                        text-slate-800
                        placeholder:text-slate-400
                        transition-all
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />

                    {/* Show password */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        hover:text-blue-600
                        transition
                      "
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* ==================================
                    LOGIN BUTTON
                ================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full
                    py-3.5
                    rounded-xl
                    text-white
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-3
                    transition-all
                    duration-300
                    shadow-lg
                    ${
                      loading
                        ? `
                          bg-slate-400
                          cursor-not-allowed
                        `
                        : `
                          bg-gradient-to-r
                          from-blue-600
                          to-indigo-600
                          hover:from-blue-700
                          hover:to-indigo-700
                          hover:-translate-y-0.5
                          shadow-blue-200
                        `
                    }
                  `}
                >

                  {loading ? (
                    <>
                      <div
                        className="
                          w-5 h-5
                          border-2
                          border-white/30
                          border-t-white
                          rounded-full
                          animate-spin
                        "
                      ></div>

                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In

                      <FaArrowRight />
                    </>
                  )}

                </button>

                {/* ==================================
                    NEW USER BUTTON
                ================================== */}

                <Link
                  to="/new-user"
                  className="
                    w-full
                    mt-4
                    py-3.5
                    rounded-xl
                    border-2
                    border-blue-600
                    text-blue-600
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition-all
                    duration-300
                    hover:bg-blue-600
                    hover:text-white
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    hover:shadow-blue-200
                  "
                >
                  <FaUser />
                  New User
                </Link>

              </form>

            ) : (

              /* ==================================
                 NO ROLE SELECTED
              ================================== */

              <div
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-dashed
                  border-slate-300
                  p-8
                  text-center
                "
              >

                <div
                  className="
                    w-16 h-16
                    mx-auto
                    rounded-2xl
                    bg-blue-50
                    text-blue-500
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <FaUser className="text-2xl" />
                </div>

                <h3
                  className="
                    font-bold
                    text-slate-700
                    text-lg
                  "
                >
                  Select Your Role
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-2
                  "
                >
                  Choose Admin, Customer or Surveyor
                  to continue.
                </p>

              </div>

            )}

            {/* ==================================
                FOOTER
            ================================== */}

            <div className="flex items-center justify-center gap-2 mt-6">

              <FaShieldAlt className="text-blue-500 text-xs" />

              <p className="text-xs text-slate-400">
                Secure Vehicle Insurance Management
              </p>

            </div>

            <p className="text-center text-[11px] text-slate-400 mt-2">
              © 2026 Vehicle Insurance Claim Management
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;

