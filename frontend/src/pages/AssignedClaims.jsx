import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaSearch,
  FaSyncAlt,
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function AssignedClaims() {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/surveyassignments/`
      );

      console.log(response.data);

      setAssignments(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load assigned claims");
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const filteredAssignments = assignments.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.claim_number?.toLowerCase().includes(searchText) ||
      item.customer_name?.toLowerCase().includes(searchText) ||
      item.vehicle_number?.toLowerCase().includes(searchText) ||
      item.status?.toLowerCase().includes(searchText)
    );
  });

  // Status style
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          className:
            "bg-green-100 text-green-700 border border-green-200",
          icon: <FaCheckCircle />,
        };

      case "pending":
        return {
          className:
            "bg-orange-100 text-orange-700 border border-orange-200",
          icon: <FaClock />,
        };

      case "approved":
        return {
          className:
            "bg-blue-100 text-blue-700 border border-blue-200",
          icon: <FaCheckCircle />,
        };

      default:
        return {
          className:
            "bg-slate-100 text-slate-600 border border-slate-200",
          icon: <FaClock />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="bg-gradient-to-r from-slate-950 via-blue-950 to-blue-900 text-white shadow-xl">

        <div className="px-5 md:px-8 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* Title */}
            <div className="flex items-center gap-4">

              <div className="
                w-14 h-14
                rounded-2xl
                bg-blue-500/20
                border border-blue-400/20
                flex items-center justify-center
              ">
                <FaClipboardList className="text-2xl text-blue-300" />
              </div>

              <div>

                <h1 className="text-2xl md:text-3xl font-bold">
                  Assigned Claims
                </h1>

                <p className="text-blue-300 text-sm mt-1">
                  View and manage assigned survey claims
                </p>

              </div>

            </div>


            {/* Refresh */}
            <button
              onClick={fetchAssignments}
              disabled={loading}
              className="
                flex items-center justify-center gap-2
                px-5 py-3
                bg-white/10
                hover:bg-white/20
                border border-white/10
                rounded-xl
                text-sm font-semibold
                transition
                disabled:opacity-50
              "
            >
              <FaSyncAlt
                className={loading ? "animate-spin" : ""}
              />

              {loading ? "Loading..." : "Refresh"}

            </button>

          </div>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}
      <main className="p-5 md:p-8">

        <div className="max-w-7xl mx-auto">


          {/* ================= SUMMARY ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-7">

            {/* Total */}
            <div className="
              bg-white
              rounded-2xl
              p-5
              border border-slate-200
              shadow-sm
              hover:shadow-lg
              transition
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Total Assigned Claims
                  </p>

                  <h2 className="text-3xl font-extrabold text-blue-600 mt-2">
                    {assignments.length}
                  </h2>

                </div>

                <div className="
                  w-12 h-12
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  flex items-center justify-center
                ">
                  <FaClipboardList />
                </div>

              </div>

            </div>


            {/* Pending */}
            <div className="
              bg-white
              rounded-2xl
              p-5
              border border-slate-200
              shadow-sm
              hover:shadow-lg
              transition
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Pending
                  </p>

                  <h2 className="text-3xl font-extrabold text-orange-500 mt-2">
                    {
                      assignments.filter(
                        (item) =>
                          item.status?.toLowerCase() === "pending"
                      ).length
                    }
                  </h2>

                </div>

                <div className="
                  w-12 h-12
                  rounded-xl
                  bg-orange-100
                  text-orange-500
                  flex items-center justify-center
                ">
                  <FaClock />
                </div>

              </div>

            </div>


            {/* Completed */}
            <div className="
              bg-white
              rounded-2xl
              p-5
              border border-slate-200
              shadow-sm
              hover:shadow-lg
              transition
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Completed
                  </p>

                  <h2 className="text-3xl font-extrabold text-green-600 mt-2">
                    {
                      assignments.filter(
                        (item) =>
                          item.status?.toLowerCase() === "completed"
                      ).length
                    }
                  </h2>

                </div>

                <div className="
                  w-12 h-12
                  rounded-xl
                  bg-green-100
                  text-green-600
                  flex items-center justify-center
                ">
                  <FaCheckCircle />
                </div>

              </div>

            </div>

          </div>


          {/* ================= TABLE CARD ================= */}
          <div className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            overflow-hidden
          ">


            {/* Table Header */}
            <div className="
              p-5 md:p-6
              border-b border-slate-100
              flex flex-col md:flex-row
              md:items-center
              md:justify-between
              gap-4
            ">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Survey Assignments
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {filteredAssignments.length} assignment
                  {filteredAssignments.length !== 1 ? "s" : ""} found
                </p>

              </div>


              {/* Search */}
              <div className="relative w-full md:w-80">

                <FaSearch className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                " />

                <input
                  type="text"
                  placeholder="Search claim, customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    bg-slate-50
                    border border-slate-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-slate-700
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />

              </div>

            </div>


            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                {/* Header */}
                <thead>

                  <tr className="bg-slate-50 border-b border-slate-200">

                    <th className="
                      px-6 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    ">
                      Claim
                    </th>

                    <th className="
                      px-6 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    ">
                      Customer
                    </th>

                    <th className="
                      px-6 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    ">
                      Vehicle
                    </th>

                    <th className="
                      px-6 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    ">
                      Inspection Date
                    </th>

                    <th className="
                      px-6 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    ">
                      Status
                    </th>

                    <th className="
                      px-6 py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    ">
                      Action
                    </th>

                  </tr>

                </thead>


                {/* Body */}
                <tbody className="divide-y divide-slate-100">

                  {loading ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="px-6 py-14 text-center"
                      >

                        <div className="flex flex-col items-center">

                          <FaSyncAlt className="
                            text-3xl
                            text-blue-500
                            animate-spin
                            mb-4
                          " />

                          <p className="text-slate-500">
                            Loading assigned claims...
                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : filteredAssignments.length > 0 ? (

                    filteredAssignments.map((item) => {

                      const status = getStatusStyle(item.status);

                      return (
                        <tr
                          key={item.id}
                          className="
                            hover:bg-blue-50/50
                            transition-colors
                            duration-200
                            group
                          "
                        >

                          {/* Claim */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="
                                w-10 h-10
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                                flex items-center justify-center
                              ">
                                <FaClipboardList />
                              </div>

                              <div>

                                <p className="font-bold text-slate-800">
                                  {item.claim_number || "-"}
                                </p>

                                <p className="text-xs text-slate-400">
                                  Claim ID: {item.id}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Customer */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="
                                w-9 h-9
                                rounded-full
                                bg-indigo-100
                                text-indigo-600
                                flex items-center justify-center
                              ">
                                <FaUser className="text-sm" />
                              </div>

                              <span className="font-medium text-slate-700">
                                {item.customer_name || "-"}
                              </span>

                            </div>

                          </td>


                          {/* Vehicle */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <FaCar className="text-slate-400" />

                              <span className="
                                font-semibold
                                text-slate-700
                              ">
                                {item.vehicle_number || "-"}
                              </span>

                            </div>

                          </td>


                          {/* Date */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <FaCalendarAlt className="text-slate-400" />

                              <span className="text-slate-600">
                                {item.inspection_date || "Not scheduled"}
                              </span>

                            </div>

                          </td>


                          {/* Status */}
                          <td className="px-6 py-5">

                            <span className={`
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-bold
                              ${status.className}
                            `}>

                              {status.icon}

                              {item.status || "Unknown"}

                            </span>

                          </td>


                          {/* Action */}
                          <td className="px-6 py-5 text-center">

                            <button
                              className="
                                w-9 h-9
                                rounded-lg
                                bg-slate-100
                                text-slate-500
                                hover:bg-blue-600
                                hover:text-white
                                transition
                                inline-flex
                                items-center
                                justify-center
                              "
                              title="View Claim"
                            >
                              <FaEye />
                            </button>

                          </td>

                        </tr>
                      );
                    })

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="px-6 py-16 text-center"
                      >

                        <div className="flex flex-col items-center">

                          <div className="
                            w-16 h-16
                            rounded-2xl
                            bg-slate-100
                            text-slate-400
                            flex items-center justify-center
                            mb-4
                          ">
                            <FaClipboardList className="text-2xl" />
                          </div>

                          <h3 className="font-bold text-slate-700">
                            No Assigned Claims
                          </h3>

                          <p className="text-sm text-slate-400 mt-1">
                            No survey assignments are available.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* Footer */}
            <div className="
              px-6 py-4
              bg-slate-50
              border-t border-slate-100
              flex items-center justify-between
            ">

              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-700">
                  {filteredAssignments.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-700">
                  {assignments.length}
                </span>{" "}
                assignments
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AssignedClaims;