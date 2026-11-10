import React, { useEffect, useState } from "react";
import api from "../services/api";
import bgImage from "../assets/bg.png";

import {
  FaUsers,
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaHardHat,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Customer",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ============================
  // GET USERS
  // ============================
  const fetchUsers = async () => {
    try {
      const response = await api.get("userprofiles/");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // HANDLE INPUT
  // ============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // ADD / UPDATE USER
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    try {
      if (editingId) {
        await api.put(`userprofiles/${editingId}/`, data);
        alert("User Updated Successfully");
      } else {
        await api.post("userprofiles/", data);
        alert("User Added Successfully");
      }

      resetForm();
      fetchUsers();

    } catch (error) {
      console.log(error.response?.data);
      alert("Operation Failed");
    }
  };

  // ============================
  // EDIT USER
  // ============================
  const editUser = (user) => {
    setEditingId(user.id);

    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  // ============================
  // DELETE USER
  // ============================
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.delete(`userprofiles/${id}/`);

      alert("User Deleted Successfully");

      fetchUsers();

    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // ============================
  // RESET FORM
  // ============================
  const resetForm = () => {
    setEditingId(null);

    setFormData({
      username: "",
      email: "",
      role: "Customer",
    });
  };

  // ============================
  // ROLE STYLE
  // ============================
  const getRoleStyle = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700 border border-red-200";

      case "Surveyor":
        return "bg-orange-100 text-orange-700 border border-orange-200";

      default:
        return "bg-blue-100 text-blue-700 border border-blue-200";
    }
  };

  // ============================
  // ROLE ICON
  // ============================
  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <FaUserShield />;

      case "Surveyor":
        return <FaHardHat />;

      default:
        return <FaUser />;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/60"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">

        {/* ================= HEADER ================= */}
        <div className="max-w-7xl mx-auto mb-7">

          <div className="
            bg-white/95
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border border-white/40
            p-6
            sm:p-7
          ">

            <div className="
              flex flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
            ">

              {/* TITLE */}
              <div className="flex items-center gap-4">

                <div className="
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-700
                  flex items-center justify-center
                  text-white
                  shadow-lg
                ">
                  <FaUsers className="text-2xl" />
                </div>

                <div>

                  <h1 className="
                    text-2xl
                    sm:text-3xl
                    font-extrabold
                    text-slate-800
                  ">
                    Manage Users
                  </h1>

                  <p className="
                    text-sm
                    text-slate-500
                    mt-1
                  ">
                    Manage customers, surveyors and administrators
                  </p>

                </div>

              </div>

              {/* TOTAL USERS */}
              <div className="
                flex items-center gap-3
                bg-gradient-to-r
                from-blue-50
                to-indigo-50
                border border-blue-100
                px-5 py-3
                rounded-2xl
              ">

                <div className="
                  w-10 h-10
                  rounded-xl
                  bg-blue-600
                  text-white
                  flex items-center justify-center
                ">
                  <FaUsers />
                </div>

                <div>

                  <p className="
                    text-xs
                    text-slate-500
                    font-medium
                  ">
                    Total Users
                  </p>

                  <p className="
                    text-xl
                    font-extrabold
                    text-blue-700
                  ">
                    {users.length}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= ADD / UPDATE USER ================= */}
        <div className="max-w-7xl mx-auto mb-7">

          <div className="
            bg-white/95
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border border-white/40
            overflow-hidden
          ">

            {/* FORM HEADER */}
            <div className="
              px-6 py-5
              border-b border-slate-200
              bg-gradient-to-r
              from-white
              to-slate-50
            ">

              <div className="flex items-center gap-3">

                <div className="
                  w-11 h-11
                  rounded-xl
                  bg-indigo-100
                  text-indigo-600
                  flex items-center justify-center
                ">
                  {editingId ? <FaEdit /> : <FaUserPlus />}
                </div>

                <div>

                  <h2 className="
                    text-xl
                    font-bold
                    text-slate-800
                  ">
                    {editingId
                      ? "Update User"
                      : "Add New User"}
                  </h2>

                  <p className="
                    text-sm
                    text-slate-500
                    mt-1
                  ">
                    {editingId
                      ? "Update user account details"
                      : "Create a new user account"}
                  </p>

                </div>

              </div>

            </div>


            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
              ">

                {/* USERNAME */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Username
                  </label>

                  <div className="relative">

                    <FaUser className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    " />

                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        pl-11
                        pr-4
                        py-3
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        text-slate-700
                        outline-none
                        transition
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />

                  </div>

                </div>


                {/* EMAIL */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Email Address
                  </label>

                  <div className="relative">

                    <FaEnvelope className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    " />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        pl-11
                        pr-4
                        py-3
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        text-slate-700
                        outline-none
                        transition
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    />

                  </div>

                </div>


                {/* ROLE */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    User Role
                  </label>

                  <div className="relative">

                    <FaUserShield className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    " />

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="
                        w-full
                        pl-11
                        pr-4
                        py-3
                        bg-slate-50
                        border
                        border-slate-200
                        rounded-xl
                        text-slate-700
                        outline-none
                        appearance-none
                        cursor-pointer
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                      "
                    >

                      <option value="Admin">
                        Admin
                      </option>

                      <option value="Customer">
                        Customer
                      </option>

                      <option value="Surveyor">
                        Surveyor
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* BUTTONS */}
              <div className="
                flex
                flex-col
                sm:flex-row
                justify-end
                gap-3
                mt-6
              ">

                {editingId && (

                  <button
                    type="button"
                    onClick={resetForm}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-5
                      py-3
                      rounded-xl
                      bg-slate-200
                      text-slate-700
                      font-semibold
                      hover:bg-slate-300
                      transition
                    "
                  >
                    <FaTimes />
                    Cancel
                  </button>

                )}

                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-700
                    text-white
                    font-semibold
                    shadow-lg
                    shadow-blue-200
                    hover:from-blue-700
                    hover:to-indigo-800
                    hover:-translate-y-0.5
                    transition-all
                  "
                >
                  {editingId ? (
                    <>
                      <FaSave />
                      Update User
                    </>
                  ) : (
                    <>
                      <FaUserPlus />
                      Add User
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>


        {/* ================= USER TABLE ================= */}
        <div className="max-w-7xl mx-auto">

          <div className="
            bg-white/95
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border border-white/40
            overflow-hidden
          ">

            {/* TABLE HEADER */}
            <div className="
              px-6 py-5
              border-b border-slate-200
              bg-gradient-to-r
              from-white
              to-slate-50
            ">

              <div className="
                flex
                items-center
                justify-between
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                    flex items-center justify-center
                  ">
                    <FaUsers />
                  </div>

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-slate-800
                    ">
                      User List
                    </h2>

                    <p className="
                      text-sm
                      text-slate-500
                      mt-1
                    ">
                      Manage registered users
                    </p>

                  </div>

                </div>

                <div className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  bg-blue-100
                  text-blue-700
                  px-4
                  py-2
                  rounded-full
                  font-bold
                  text-sm
                ">
                  <FaUsers />
                  {users.length} Users
                </div>

              </div>

            </div>


            {/* RESPONSIVE TABLE */}
            <div className="overflow-x-auto">

              <table className="
                w-full
                min-w-[850px]
              ">

                {/* TABLE HEAD */}
                <thead>

                  <tr className="
                    bg-gradient-to-r
                    from-[#003366]
                    via-[#004b87]
                    to-[#0066b3]
                    text-white
                  ">

                    <th className="
                      px-5
                      py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    ">
                      ID
                    </th>

                    <th className="
                      px-5
                      py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    ">
                      User
                    </th>

                    <th className="
                      px-5
                      py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    ">
                      Email
                    </th>

                    <th className="
                      px-5
                      py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    ">
                      Role
                    </th>

                    <th className="
                      px-5
                      py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                    ">
                      Actions
                    </th>

                  </tr>

                </thead>


                {/* TABLE BODY */}
                <tbody className="
                  divide-y
                  divide-slate-100
                ">

                  {users.length > 0 ? (

                    users.map((user) => (

                      <tr
                        key={user.id}
                        className="
                          group
                          hover:bg-blue-50/70
                          transition-all
                          duration-200
                        "
                      >

                        {/* ID */}
                        <td className="px-5 py-5">

                          <span className="
                            inline-flex
                            items-center
                            justify-center
                            w-9
                            h-9
                            rounded-xl
                            bg-slate-100
                            text-slate-600
                            font-bold
                            text-sm
                          ">
                            {user.id}
                          </span>

                        </td>


                        {/* USERNAME */}
                        <td className="px-5 py-5">

                          <div className="
                            flex
                            items-center
                            gap-3
                          ">

                            <div className="
                              w-10
                              h-10
                              rounded-full
                              bg-gradient-to-br
                              from-blue-500
                              to-indigo-600
                              text-white
                              flex
                              items-center
                              justify-center
                              font-bold
                            ">
                              {user.username
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>

                              <p className="
                                font-bold
                                text-slate-800
                              ">
                                {user.username}
                              </p>

                              <p className="
                                text-xs
                                text-slate-400
                              ">
                                User Account
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* EMAIL */}
                        <td className="
                          px-5
                          py-5
                          text-sm
                          text-slate-600
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <FaEnvelope className="
                              text-slate-400
                            " />

                            {user.email}

                          </div>

                        </td>


                        {/* ROLE */}
                        <td className="px-5 py-5">

                          <span className={`
                            inline-flex
                            items-center
                            gap-2
                            px-3.5
                            py-1.5
                            rounded-full
                            text-xs
                            font-bold
                            ${getRoleStyle(user.role)}
                          `}>

                            {getRoleIcon(user.role)}

                            {user.role}

                          </span>

                        </td>


                        {/* ACTIONS */}
                        <td className="px-5 py-5">

                          <div className="
                            flex
                            justify-center
                            items-center
                            gap-2
                          ">

                            {/* EDIT */}
                            <button
                              type="button"
                              onClick={() => editUser(user)}
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-xl
                                bg-blue-600
                                text-white
                                text-sm
                                font-semibold
                                shadow-sm
                                hover:bg-blue-700
                                hover:-translate-y-0.5
                                transition-all
                              "
                            >
                              <FaEdit />
                              Edit
                            </button>


                            {/* DELETE */}
                            <button
                              type="button"
                              onClick={() =>
                                deleteUser(user.id)
                              }
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-xl
                                bg-red-600
                                text-white
                                text-sm
                                font-semibold
                                shadow-sm
                                hover:bg-red-700
                                hover:-translate-y-0.5
                                transition-all
                              "
                            >
                              <FaTrash />
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    /* EMPTY STATE */
                    <tr>

                      <td
                        colSpan="5"
                        className="px-6 py-16"
                      >

                        <div className="
                          flex
                          flex-col
                          items-center
                          justify-center
                        ">

                          <div className="
                            w-20
                            h-20
                            rounded-full
                            bg-slate-100
                            text-slate-400
                            flex
                            items-center
                            justify-center
                            mb-4
                          ">

                            <FaExclamationTriangle
                              className="text-3xl"
                            />

                          </div>

                          <h3 className="
                            text-lg
                            font-bold
                            text-slate-700
                          ">
                            No Users Found
                          </h3>

                          <p className="
                            text-sm
                            text-slate-400
                            mt-1
                          ">
                            Add a new user to get started.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* FOOTER */}
            <div className="
              px-6
              py-4
              border-t
              border-slate-200
              bg-slate-50
              flex
              items-center
              justify-between
            ">

              <p className="
                text-xs
                text-slate-500
              ">
                Showing {users.length} user
                {users.length !== 1 ? "s" : ""}
              </p>

              <div className="
                hidden
                sm:flex
                items-center
                gap-2
                text-xs
                text-slate-500
              ">

                <FaShieldAlt className="text-blue-500" />

                Secure User Management

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;