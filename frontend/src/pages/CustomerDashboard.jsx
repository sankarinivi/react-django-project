import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaCar,
  FaFileAlt,
  FaClipboardCheck,
  FaSearch,
  FaSignOutAlt,
  FaChevronRight,
  FaShieldAlt,
} from "react-icons/fa";

function CustomerDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    navigate("/");
  };

  const menuItems = [
    {
      path: "/customer-profile",
      label: "My Profile",
      icon: <FaUser />,
    },
    {
      path: "/my-vehicles",
      label: "My Vehicles",
      icon: <FaCar />,
    },
    {
      path: "/raise-new-claim",
      label: "Raise New Claim",
      icon: <FaFileAlt />,
    },
    {
      path: "/claim-status",
      label: "Claim Status",
      icon: <FaClipboardCheck />,
    },
    {
      path: "/survey-status",
      label: "Survey Status",
      icon: <FaSearch />,
    },
  ];

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-indigo-100
    ">

      {/* ================= HEADER ================= */}

      <header className="
        h-[75px]
        bg-gradient-to-r
        from-[#001f3f]
        via-[#003b73]
        to-[#00509e]
        text-white
        flex
        items-center
        justify-between
        px-5
        md:px-8
        shadow-xl
      ">

        {/* Logo / Title */}

        <div className="flex items-center gap-4">

          <div className="
            w-11
            h-11
            rounded-xl
            bg-white/10
            border
            border-white/20
            flex
            items-center
            justify-center
          ">

            <FaShieldAlt className="
              text-xl
              text-blue-200
            " />

          </div>

          <div>

            <h1 className="
              text-lg
              md:text-2xl
              font-bold
              tracking-wide
            ">
              Vehicle Insurance Claim Management
            </h1>

            <p className="
              hidden
              md:block
              text-xs
              text-blue-200
              mt-1
            ">
              Customer Portal
            </p>

          </div>

        </div>


        {/* Logout */}

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            px-4
            md:px-5
            py-2.5
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-xl
            font-semibold
            shadow-md
            hover:shadow-lg
            transition
            duration-200
          "
        >

          <FaSignOutAlt />

          <span className="hidden sm:block">
            Logout
          </span>

        </button>

      </header>


      {/* ================= BODY ================= */}

      <div className="
        flex
        min-h-[calc(100vh-75px)]
      ">


        {/* ================= SIDEBAR ================= */}

        <aside className="
          hidden
          md:flex
          w-[260px]
          bg-gradient-to-b
          from-[#003b73]
          to-[#001f3f]
          text-white
          flex-col
          shadow-xl
        ">

          {/* Sidebar Heading */}

          <div className="
            p-6
            border-b
            border-white/10
          ">

            <div className="flex items-center gap-3">

              <div className="
                w-11
                h-11
                rounded-full
                bg-white/15
                flex
                items-center
                justify-center
              ">

                <FaUser className="text-lg" />

              </div>

              <div>

                <h2 className="
                  font-bold
                  text-lg
                ">
                  Customer
                </h2>

                <p className="
                  text-xs
                  text-blue-200
                ">
                  Customer Portal
                </p>

              </div>

            </div>

          </div>


          {/* Navigation */}

          <nav className="
            flex-1
            p-4
            space-y-2
          ">

            <p className="
              text-xs
              uppercase
              tracking-wider
              text-blue-300
              font-semibold
              px-4
              mb-3
            ">
              Main Menu
            </p>

            {menuItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  bg-white/5
                  hover:bg-blue-500
                  border
                  border-transparent
                  hover:border-blue-400
                  text-white
                  transition
                  duration-200
                  no-underline
                "
              >

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <span className="
                    text-blue-200
                    group-hover:text-white
                    text-lg
                  ">
                    {item.icon}
                  </span>

                  <span className="
                    font-medium
                  ">
                    {item.label}
                  </span>

                </div>

                <FaChevronRight className="
                  text-xs
                  text-blue-300
                  group-hover:text-white
                  group-hover:translate-x-1
                  transition
                " />

              </Link>

            ))}

          </nav>


          {/* Sidebar Footer */}

          <div className="
            p-5
            border-t
            border-white/10
          ">

            <div className="
              bg-white/10
              rounded-xl
              p-4
            ">

              <div className="
                flex
                items-center
                gap-2
                mb-2
              ">

                <FaShieldAlt className="
                  text-green-300
                " />

                <span className="
                  text-sm
                  font-semibold
                ">
                  Secure Portal
                </span>

              </div>

              <p className="
                text-xs
                text-blue-200
                leading-5
              ">
                Manage your vehicles and insurance
                claims securely.
              </p>

            </div>

          </div>

        </aside>


        {/* ================= MAIN CONTENT ================= */}

        <main className="
          flex-1
          p-5
          md:p-8
          overflow-y-auto
        ">

          <div className="
            max-w-7xl
            mx-auto
          ">


            {/* ================= WELCOME ================= */}

            <div className="
              bg-white
              rounded-2xl
              shadow-lg
              border
              border-slate-100
              p-6
              md:p-8
              mb-8
              relative
              overflow-hidden
            ">

              {/* Background decoration */}

              <div className="
                absolute
                -right-10
                -top-10
                w-40
                h-40
                bg-blue-100
                rounded-full
                opacity-50
              " />

              <div className="
                absolute
                right-20
                -bottom-16
                w-32
                h-32
                bg-indigo-100
                rounded-full
                opacity-40
              " />


              <div className="
                relative
                z-10
              ">

                <div className="
                  flex
                  items-center
                  gap-4
                ">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  ">

                    <FaUser className="text-xl" />

                  </div>

                  <div>

                    <h2 className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      text-slate-800
                    ">
                      Welcome, Customer 👋
                    </h2>

                    <p className="
                      text-slate-500
                      mt-1
                    ">
                      Manage your vehicles and track your
                      insurance claims from one place.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= MOBILE MENU ================= */}

            <div className="
              md:hidden
              grid
              grid-cols-2
              gap-3
              mb-8
            ">

              {menuItems.map((item) => (

                <Link
                  key={item.path}
                  to={item.path}
                  className="
                    bg-white
                    rounded-xl
                    p-4
                    shadow-md
                    border
                    border-slate-100
                    flex
                    flex-col
                    items-center
                    gap-2
                    text-slate-700
                    hover:bg-blue-50
                    transition
                    no-underline
                  "
                >

                  <span className="
                    text-blue-600
                    text-xl
                  ">
                    {item.icon}
                  </span>

                  <span className="
                    text-xs
                    font-semibold
                    text-center
                  ">
                    {item.label}
                  </span>

                </Link>

              ))}

            </div>


            {/* ================= STAT CARDS ================= */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
            ">


              {/* Vehicles */}

              <div className="
                bg-white
                rounded-2xl
                p-6
                shadow-lg
                border
                border-slate-100
                hover:-translate-y-1
                hover:shadow-xl
                transition
                duration-300
              ">

                <div className="
                  flex
                  justify-between
                  items-start
                ">

                  <div>

                    <p className="
                      text-sm
                      text-slate-500
                      font-medium
                    ">
                      Total Vehicles
                    </p>

                    <h3 className="
                      text-4xl
                      font-bold
                      text-blue-600
                      mt-3
                    ">
                      2
                    </h3>

                  </div>

                  <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">

                    <FaCar />

                  </div>

                </div>

                <p className="
                  text-xs
                  text-blue-600
                  font-semibold
                  mt-5
                ">
                  Registered vehicles
                </p>

              </div>


              {/* Claims */}

              <div className="
                bg-white
                rounded-2xl
                p-6
                shadow-lg
                border
                border-slate-100
                hover:-translate-y-1
                hover:shadow-xl
                transition
                duration-300
              ">

                <div className="
                  flex
                  justify-between
                  items-start
                ">

                  <div>

                    <p className="
                      text-sm
                      text-slate-500
                      font-medium
                    ">
                      Claims Submitted
                    </p>

                    <h3 className="
                      text-4xl
                      font-bold
                      text-indigo-600
                      mt-3
                    ">
                      5
                    </h3>

                  </div>

                  <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-indigo-100
                    text-indigo-600
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">

                    <FaFileAlt />

                  </div>

                </div>

                <p className="
                  text-xs
                  text-indigo-600
                  font-semibold
                  mt-5
                ">
                  Total submitted claims
                </p>

              </div>


              {/* Approved */}

              <div className="
                bg-white
                rounded-2xl
                p-6
                shadow-lg
                border
                border-slate-100
                hover:-translate-y-1
                hover:shadow-xl
                transition
                duration-300
              ">

                <div className="
                  flex
                  justify-between
                  items-start
                ">

                  <div>

                    <p className="
                      text-sm
                      text-slate-500
                      font-medium
                    ">
                      Approved Claims
                    </p>

                    <h3 className="
                      text-4xl
                      font-bold
                      text-green-600
                      mt-3
                    ">
                      3
                    </h3>

                  </div>

                  <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-green-100
                    text-green-600
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">

                    <FaClipboardCheck />

                  </div>

                </div>

                <p className="
                  text-xs
                  text-green-600
                  font-semibold
                  mt-5
                ">
                  Successfully approved
                </p>

              </div>


              {/* Pending */}

              <div className="
                bg-white
                rounded-2xl
                p-6
                shadow-lg
                border
                border-slate-100
                hover:-translate-y-1
                hover:shadow-xl
                transition
                duration-300
              ">

                <div className="
                  flex
                  justify-between
                  items-start
                ">

                  <div>

                    <p className="
                      text-sm
                      text-slate-500
                      font-medium
                    ">
                      Pending Claims
                    </p>

                    <h3 className="
                      text-4xl
                      font-bold
                      text-orange-500
                      mt-3
                    ">
                      2
                    </h3>

                  </div>

                  <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-orange-100
                    text-orange-500
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">

                    <FaSearch />

                  </div>

                </div>

                <p className="
                  text-xs
                  text-orange-600
                  font-semibold
                  mt-5
                ">
                  Claims under process
                </p>

              </div>

            </div>


            {/* ================= QUICK ACTIONS ================= */}

            <div className="
              mt-8
              bg-white
              rounded-2xl
              shadow-lg
              border
              border-slate-100
              p-6
            ">

              <h3 className="
                text-xl
                font-bold
                text-slate-800
                mb-5
              ">
                Quick Actions
              </h3>

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
              ">

                <Link
                  to="/raise-new-claim"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-blue-50
                    hover:bg-blue-600
                    text-blue-700
                    hover:text-white
                    transition
                    no-underline
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <FaFileAlt />

                    <span className="font-semibold">
                      Raise Claim
                    </span>

                  </div>

                  <FaChevronRight className="
                    group-hover:translate-x-1
                    transition
                  " />

                </Link>


                <Link
                  to="/my-vehicles"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-indigo-50
                    hover:bg-indigo-600
                    text-indigo-700
                    hover:text-white
                    transition
                    no-underline
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <FaCar />

                    <span className="font-semibold">
                      My Vehicles
                    </span>

                  </div>

                  <FaChevronRight className="
                    group-hover:translate-x-1
                    transition
                  " />

                </Link>


                <Link
                  to="/claim-status"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-green-50
                    hover:bg-green-600
                    text-green-700
                    hover:text-white
                    transition
                    no-underline
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <FaClipboardCheck />

                    <span className="font-semibold">
                      Track Claim
                    </span>

                  </div>

                  <FaChevronRight className="
                    group-hover:translate-x-1
                    transition
                  " />

                </Link>


                <Link
                  to="/survey-status"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-purple-50
                    hover:bg-purple-600
                    text-purple-700
                    hover:text-white
                    transition
                    no-underline
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <FaSearch />

                    <span className="font-semibold">
                      Survey Status
                    </span>

                  </div>

                  <FaChevronRight className="
                    group-hover:translate-x-1
                    transition
                  " />

                </Link>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default CustomerDashboard;