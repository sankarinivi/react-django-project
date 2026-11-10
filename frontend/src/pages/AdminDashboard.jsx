import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCar,
  FaClipboardList,
  FaSearch,
  FaFileAlt,
  FaEnvelope,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaShieldAlt,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      path: "/manage-users",
      label: "Manage Users",
      icon: <FaUsers />,
    },
    {
      path: "/manage-vehicles",
      label: "Manage Vehicles",
      icon: <FaCar />,
    },
    {
      path: "/manage-claims",
      label: "Manage Claims",
      icon: <FaClipboardList />,
    },
    {
      path: "/Assign-Surveyor",
      label: "Assign Survey",
      icon: <FaSearch />,
    },
    {
      path: "/view-survey-report",
      label: "Survey Reports",
      icon: <FaFileAlt />,
    },
    {
      path: "/liability-letter",
      label: "Liability Letter",
      icon: <FaEnvelope />,
    },
    {
      path: "/claim-settlement",
      label: "Claim Settlement",
      icon: <FaMoneyBillWave />,
    },
  ];

  const stats = [
    {
      title: "Total Customers",
      value: "25",
      description: "Active Customers",
      icon: <FaUsers />,
      bg: "bg-blue-50",
      iconBg: "bg-blue-600",
      text: "text-blue-600",
    },
    {
      title: "Total Vehicles",
      value: "50",
      description: "Registered Vehicles",
      icon: <FaCar />,
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-600",
      text: "text-indigo-600",
    },
    {
      title: "Total Claims",
      value: "18",
      description: "Insurance Claims",
      icon: <FaClipboardList />,
      bg: "bg-purple-50",
      iconBg: "bg-purple-600",
      text: "text-purple-600",
    },
    {
      title: "Pending Survey",
      value: "8",
      description: "Requires Attention",
      icon: <FaSearch />,
      bg: "bg-orange-50",
      iconBg: "bg-orange-500",
      text: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-900 text-white shadow-xl">

        <div className="h-full px-4 md:px-8 flex items-center justify-between">

          {/* Logo + Title */}
          <div className="flex items-center gap-4">

            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <FaShieldAlt className="text-xl text-blue-300" />
            </div>

            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-wide">
                Vehicle Insurance
              </h1>

              <p className="text-xs md:text-sm text-blue-300">
                Claim Management System
              </p>
            </div>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Notification */}
            <button className="hidden sm:flex relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 items-center justify-center transition">
              <FaBell className="text-blue-200" />

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin */}
            <div className="hidden md:flex items-center gap-3">

              <div className="text-right">
                <p className="text-sm font-semibold">
                  Administrator
                </p>

                <p className="text-xs text-blue-300">
                  System Admin
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center font-bold shadow-lg">
                A
              </div>

            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="
                flex items-center gap-2
                px-4 py-2.5
                bg-red-500/90
                hover:bg-red-600
                rounded-xl
                text-sm font-semibold
                transition-all duration-200
                shadow-lg
              "
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>

        </div>
      </header>


      {/* ================= SIDEBAR ================= */}
      <aside className="
        fixed
        left-0
        top-[72px]
        bottom-0
        w-[260px]
        hidden lg:block
        bg-slate-950
        text-white
        shadow-2xl
      ">

        <div className="p-5">

          {/* Profile */}
          <div className="
            p-4
            rounded-2xl
            bg-gradient-to-r from-blue-900/60 to-indigo-900/60
            border border-blue-800/40
            mb-6
          ">

            <div className="flex items-center gap-3">

              <div className="
                w-12 h-12
                rounded-xl
                bg-gradient-to-br from-blue-500 to-indigo-600
                flex items-center justify-center
                shadow-lg
              ">
                <FaShieldAlt className="text-xl" />
              </div>

              <div>
                <h2 className="font-bold">
                  Admin
                </h2>

                <p className="text-xs text-blue-300">
                  Administrator
                </p>
              </div>

            </div>

          </div>


          {/* Navigation Title */}
          <p className="text-[11px] uppercase tracking-[2px] text-slate-500 font-bold px-3 mb-3">
            Management
          </p>


          {/* Navigation */}
          <nav className="space-y-1.5">

            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="
                  group
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-slate-300
                  hover:text-white
                  hover:bg-blue-600/80
                  transition-all duration-200
                  no-underline
                "
              >

                <span className="
                  w-9 h-9
                  rounded-lg
                  bg-white/5
                  group-hover:bg-white/15
                  flex items-center justify-center
                  text-blue-400
                  group-hover:text-white
                  transition
                ">
                  {item.icon}
                </span>

                <span className="text-sm font-medium">
                  {item.label}
                </span>

              </Link>
            ))}

          </nav>


          {/* Sidebar Bottom */}
          <div className="
            mt-8
            p-4
            rounded-2xl
            bg-gradient-to-br from-blue-600/20 to-indigo-600/20
            border border-blue-500/10
          ">

            <FaChartLine className="text-blue-400 text-xl mb-3" />

            <p className="text-sm font-semibold">
              System Overview
            </p>

            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Monitor vehicle claims, surveys and settlements from one place.
            </p>

          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="lg:ml-[260px] pt-[72px] min-h-screen">

        <div className="p-5 md:p-8 lg:p-10">


          {/* ================= WELCOME ================= */}
          <div className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-blue-700
            via-indigo-700
            to-purple-700
            p-7 md:p-9
            text-white
            shadow-xl
            mb-8
          ">

            {/* Decorative circles */}
            <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10"></div>
            <div className="absolute right-20 -bottom-32 w-72 h-72 rounded-full bg-white/5"></div>

            <div className="relative z-10">

              <div className="flex items-center gap-2 mb-3">

                <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
                  ADMIN PANEL
                </span>

                <span className="px-3 py-1 rounded-full bg-green-400/20 text-green-200 text-xs font-semibold">
                  ● System Active
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold">
                Welcome, Admin 👋
              </h2>

              <p className="text-blue-100 mt-2 max-w-2xl">
                Manage users, vehicles, insurance claims, survey assignments
                and settlements from your centralized dashboard.
              </p>

            </div>

          </div>


          {/* ================= STATISTICS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="
                  group
                  bg-white
                  rounded-2xl
                  p-6
                  border border-slate-200
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-sm text-slate-500 font-medium">
                      {stat.title}
                    </p>

                    <h3 className={`
                      text-4xl
                      font-extrabold
                      mt-3
                      ${stat.text}
                    `}>
                      {stat.value}
                    </h3>

                  </div>

                  <div className={`
                    w-14 h-14
                    rounded-2xl
                    ${stat.iconBg}
                    text-white
                    flex items-center justify-center
                    text-xl
                    shadow-lg
                    group-hover:scale-110
                    transition-transform duration-300
                  `}>
                    {stat.icon}
                  </div>

                </div>

                <div className="flex items-center gap-2 mt-5">

                  <span className="w-2 h-2 rounded-full bg-green-500"></span>

                  <p className="text-xs text-slate-500 font-medium">
                    {stat.description}
                  </p>

                </div>

              </div>
            ))}

          </div>


          {/* ================= CLAIM OVERVIEW ================= */}
          <div className="
            mt-8
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            overflow-hidden
          ">

            {/* Header */}
            <div className="
              px-6 py-5
              border-b border-slate-100
              flex flex-col sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            ">

              <div>

                <h3 className="text-xl font-bold text-slate-800">
                  Claim Management Overview
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Current insurance claim status
                </p>

              </div>

              <Link
                to="/manage-claims"
                className="
                  no-underline
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:text-blue-800
                "
              >
                View All Claims →
              </Link>

            </div>


            {/* Status Cards */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Pending */}
              <div className="
                rounded-2xl
                bg-blue-50
                border border-blue-100
                p-5
                hover:shadow-md
                transition
              ">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Pending Claims
                    </p>

                    <h4 className="text-3xl font-extrabold text-blue-600 mt-2">
                      6
                    </h4>
                  </div>

                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-blue-600
                    text-white
                    flex items-center justify-center
                  ">
                    <FaClipboardList />
                  </div>

                </div>

                <div className="mt-4 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-blue-600 rounded-full"></div>
                </div>

              </div>


              {/* Approved */}
              <div className="
                rounded-2xl
                bg-green-50
                border border-green-100
                p-5
                hover:shadow-md
                transition
              ">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Approved Claims
                    </p>

                    <h4 className="text-3xl font-extrabold text-green-600 mt-2">
                      8
                    </h4>
                  </div>

                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-green-600
                    text-white
                    flex items-center justify-center
                  ">
                    ✓
                  </div>

                </div>

                <div className="mt-4 h-1.5 bg-green-100 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-green-600 rounded-full"></div>
                </div>

              </div>


              {/* Settled */}
              <div className="
                rounded-2xl
                bg-purple-50
                border border-purple-100
                p-5
                hover:shadow-md
                transition
              ">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Settled Claims
                    </p>

                    <h4 className="text-3xl font-extrabold text-purple-600 mt-2">
                      4
                    </h4>
                  </div>

                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-purple-600
                    text-white
                    flex items-center justify-center
                  ">
                    <FaMoneyBillWave />
                  </div>

                </div>

                <div className="mt-4 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-purple-600 rounded-full"></div>
                </div>

              </div>

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}
          <div className="mt-8">

            <h3 className="text-xl font-bold text-slate-800 mb-5">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <Link
                to="/manage-users"
                className="
                  no-underline
                  bg-white
                  rounded-2xl
                  p-5
                  border border-slate-200
                  hover:border-blue-400
                  hover:shadow-lg
                  transition
                  group
                "
              >
                <FaUsers className="text-2xl text-blue-600 mb-3 group-hover:scale-110 transition" />

                <p className="font-semibold text-slate-700">
                  Users
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Manage users
                </p>
              </Link>


              <Link
                to="/manage-vehicles"
                className="
                  no-underline
                  bg-white
                  rounded-2xl
                  p-5
                  border border-slate-200
                  hover:border-indigo-400
                  hover:shadow-lg
                  transition
                  group
                "
              >
                <FaCar className="text-2xl text-indigo-600 mb-3 group-hover:scale-110 transition" />

                <p className="font-semibold text-slate-700">
                  Vehicles
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Manage vehicles
                </p>
              </Link>


              <Link
                to="/Assign-Surveyor"
                className="
                  no-underline
                  bg-white
                  rounded-2xl
                  p-5
                  border border-slate-200
                  hover:border-orange-400
                  hover:shadow-lg
                  transition
                  group
                "
              >
                <FaSearch className="text-2xl text-orange-500 mb-3 group-hover:scale-110 transition" />

                <p className="font-semibold text-slate-700">
                  Surveys
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Assign surveyor
                </p>
              </Link>


              <Link
                to="/claim-settlement"
                className="
                  no-underline
                  bg-white
                  rounded-2xl
                  p-5
                  border border-slate-200
                  hover:border-green-400
                  hover:shadow-lg
                  transition
                  group
                "
              >
                <FaMoneyBillWave className="text-2xl text-green-600 mb-3 group-hover:scale-110 transition" />

                <p className="font-semibold text-slate-700">
                  Settlement
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Settle claims
                </p>
              </Link>

            </div>

          </div>


          {/* Footer */}
          <div className="text-center py-8">

            <p className="text-xs text-slate-400">
              Vehicle Insurance Claim Management System © 2026
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;