import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SurveyorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* ================= HEADER ================= */}
      <header className="h-[72px] bg-gradient-to-r from-[#002b5c] to-[#00509e] text-white flex items-center justify-between px-5 md:px-8 shadow-lg">

        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Vehicle Insurance Claim Management
          </h1>

          <p className="text-xs md:text-sm text-blue-200 mt-1">
            Surveyor Dashboard
          </p>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 bg-red-500 rounded-lg font-semibold
          hover:bg-red-600 active:scale-95
          transition duration-200 shadow-md"
        >
          Logout
        </button>

      </header>


      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex min-h-[calc(100vh-72px)]">


        {/* ================= SIDEBAR ================= */}
        <aside className="hidden md:block w-[260px]
          bg-gradient-to-b from-[#003b73] to-[#001f3f]
          text-white p-6 shadow-xl">

          {/* Surveyor Profile */}
          <div className="flex items-center gap-3 mb-8">

            <div className="w-12 h-12 bg-white/20 rounded-full
              flex items-center justify-center text-2xl">
              🔍
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Surveyor
              </h2>

              <p className="text-xs text-blue-200">
                Insurance Surveyor
              </p>
            </div>

          </div>


          {/* Navigation */}
          <nav className="space-y-3">

            <Link
              to="/assigned-claims"
              className="flex items-center gap-3 px-4 py-3
              rounded-lg bg-white/10
              hover:bg-blue-500
              hover:translate-x-1
              transition duration-200
              no-underline text-white font-medium"
            >
              📋
              <span>Assigned Claims</span>
            </Link>


            <Link
              to="/Vehicle-inspection"
              className="flex items-center gap-3 px-4 py-3
              rounded-lg bg-white/10
              hover:bg-blue-500
              hover:translate-x-1
              transition duration-200
              no-underline text-white font-medium"
            >
              🚗
              <span>Vehicle Inspection</span>
            </Link>


            <Link
              to="/upload-survey-report"
              className="flex items-center gap-3 px-4 py-3
              rounded-lg bg-white/10
              hover:bg-blue-500
              hover:translate-x-1
              transition duration-200
              no-underline text-white font-medium"
            >
              📤
              <span>Upload Survey Report</span>
            </Link>


            <Link
              to="/completed-surveys"
              className="flex items-center gap-3 px-4 py-3
              rounded-lg bg-white/10
              hover:bg-blue-500
              hover:translate-x-1
              transition duration-200
              no-underline text-white font-medium"
            >
              📄
              <span>Completed Surveys</span>
            </Link>

          </nav>

        </aside>


        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">

          {/* Welcome */}
          <div className="mb-8">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome Surveyor 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Manage assigned claims, inspections and survey reports.
            </p>

          </div>


          {/* ================= DASHBOARD CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">


            {/* Assigned Claims */}
            <div className="bg-white rounded-2xl p-6 shadow-lg
              hover:shadow-2xl hover:-translate-y-1
              transition duration-300 border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm font-medium">
                    Assigned Claims
                  </p>

                  <h3 className="text-4xl font-bold text-blue-600 mt-3">
                    12
                  </h3>

                </div>

                <div className="w-14 h-14 bg-blue-100 rounded-xl
                  flex items-center justify-center text-2xl">
                  📋
                </div>

              </div>

              <p className="text-blue-600 text-sm mt-5 font-medium">
                Total assigned
              </p>

            </div>


            {/* Pending Inspection */}
            <div className="bg-white rounded-2xl p-6 shadow-lg
              hover:shadow-2xl hover:-translate-y-1
              transition duration-300 border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm font-medium">
                    Pending Inspection
                  </p>

                  <h3 className="text-4xl font-bold text-orange-500 mt-3">
                    5
                  </h3>

                </div>

                <div className="w-14 h-14 bg-orange-100 rounded-xl
                  flex items-center justify-center text-2xl">
                  🔍
                </div>

              </div>

              <p className="text-orange-600 text-sm mt-5 font-medium">
                Requires attention
              </p>

            </div>


            {/* Completed Reports */}
            <div className="bg-white rounded-2xl p-6 shadow-lg
              hover:shadow-2xl hover:-translate-y-1
              transition duration-300 border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm font-medium">
                    Completed Reports
                  </p>

                  <h3 className="text-4xl font-bold text-green-600 mt-3">
                    20
                  </h3>

                </div>

                <div className="w-14 h-14 bg-green-100 rounded-xl
                  flex items-center justify-center text-2xl">
                  📄
                </div>

              </div>

              <p className="text-green-600 text-sm mt-5 font-medium">
                Completed surveys
              </p>

            </div>


            {/* Today's Inspections */}
            <div className="bg-white rounded-2xl p-6 shadow-lg
              hover:shadow-2xl hover:-translate-y-1
              transition duration-300 border border-gray-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500 text-sm font-medium">
                    Today's Inspections
                  </p>

                  <h3 className="text-4xl font-bold text-purple-600 mt-3">
                    3
                  </h3>

                </div>

                <div className="w-14 h-14 bg-purple-100 rounded-xl
                  flex items-center justify-center text-2xl">
                  📅
                </div>

              </div>

              <p className="text-purple-600 text-sm mt-5 font-medium">
                Scheduled today
              </p>

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-xl font-bold text-gray-800 mb-5">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


              <Link
                to="/assigned-claims"
                className="group bg-blue-50 border border-blue-100
                rounded-xl p-5
                hover:bg-blue-100 hover:shadow-md
                transition duration-200 no-underline"
              >

                <div className="text-3xl mb-3">
                  📋
                </div>

                <h4 className="font-bold text-blue-700">
                  View Assigned Claims
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Check claims assigned to you.
                </p>

              </Link>


              <Link
                to="/Vehicle-inspection"
                className="group bg-orange-50 border border-orange-100
                rounded-xl p-5
                hover:bg-orange-100 hover:shadow-md
                transition duration-200 no-underline"
              >

                <div className="text-3xl mb-3">
                  🚗
                </div>

                <h4 className="font-bold text-orange-700">
                  Vehicle Inspection
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Perform vehicle inspection.
                </p>

              </Link>


              <Link
                to="/upload-survey-report"
                className="group bg-green-50 border border-green-100
                rounded-xl p-5
                hover:bg-green-100 hover:shadow-md
                transition duration-200 no-underline"
              >

                <div className="text-3xl mb-3">
                  📤
                </div>

                <h4 className="font-bold text-green-700">
                  Upload Survey Report
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Submit your completed survey report.
                </p>

              </Link>

            </div>

          </div>


          {/* ================= MOBILE MENU ================= */}
          <div className="md:hidden mt-8 bg-white rounded-2xl shadow-lg p-5">

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Surveyor Menu
            </h3>

            <div className="grid grid-cols-1 gap-3">

              <Link
                to="/assigned-claims"
                className="px-4 py-3 rounded-lg bg-blue-50
                text-blue-700 font-semibold
                hover:bg-blue-100 no-underline"
              >
                📋 Assigned Claims
              </Link>

              <Link
                to="/Vehicle-inspection"
                className="px-4 py-3 rounded-lg bg-orange-50
                text-orange-700 font-semibold
                hover:bg-orange-100 no-underline"
              >
                🚗 Vehicle Inspection
              </Link>

              <Link
                to="/upload-survey-report"
                className="px-4 py-3 rounded-lg bg-green-50
                text-green-700 font-semibold
                hover:bg-green-100 no-underline"
              >
                📤 Upload Survey Report
              </Link>

              <Link
                to="/completed-surveys"
                className="px-4 py-3 rounded-lg bg-purple-50
                text-purple-700 font-semibold
                hover:bg-purple-100 no-underline"
              >
                📄 Completed Surveys
              </Link>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default SurveyorDashboard;