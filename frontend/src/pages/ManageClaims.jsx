import React, { useEffect, useState } from "react";
import api from "../services/api";
import bgImage from "../assets/bg.png";

import {
  FaClipboardList,
  FaUsers,
  FaCar,
  FaCalendarAlt,
  FaEye,
  FaCheck,
  FaTimes,
  FaShieldAlt,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

function ManageClaims() {
  const [claims, setClaims] = useState([]);

  // ============================
  // LOAD CLAIMS
  // ============================
  useEffect(() => {
    fetchClaims();
  }, []);

  // ============================
  // GET ALL CLAIMS
  // ============================
  const fetchClaims = async () => {
    try {
      const response = await api.get("claims/");

      console.log("Claims API Response:", response.data);
      console.log("Number of Claims:", response.data.length);

      setClaims(response.data);
    } catch (error) {
      console.error(
        "Fetch Error:",
        error.response?.data || error.message
      );
    }
  };

  // ============================
  // VIEW CLAIM
  // ============================
  const viewClaim = (claim) => {
    alert(`
Claim Number : ${claim.claim_number || "N/A"}
Customer     : ${claim.customer_name || claim.customer || "N/A"}
Vehicle      : ${claim.vehicle_number || "N/A"}
Accident Date: ${claim.accident_date || "N/A"}
Place        : ${claim.place || "N/A"}
Loss Details : ${claim.loss_details || "N/A"}
Status       : ${claim.status || "N/A"}
    `);
  };

  // ============================
  // APPROVE CLAIM
  // ============================
  const approveClaim = async (claim) => {
    try {
      console.log("Approving Claim ID:", claim.id);

      const response = await api.patch(`claims/${claim.id}/`, {
        status: "Approved",
      });

      console.log("Approval Response:", response.data);

      alert("Claim Approved Successfully");

      // Refresh claim list
      fetchClaims();
    } catch (error) {
      console.error(
        "Approval Error:",
        error.response?.data || error.message
      );

      alert("Approval Failed");
    }
  };

  // ============================
  // REJECT CLAIM
  // ============================
  const rejectClaim = async (claim) => {
    try {
      console.log("Rejecting Claim ID:", claim.id);

      const response = await api.patch(`claims/${claim.id}/`, {
        status: "Rejected",
      });

      console.log("Reject Response:", response.data);

      alert("Claim Rejected Successfully");

      // Refresh claim list
      fetchClaims();
    } catch (error) {
      console.error(
        "Reject Error:",
        error.response?.data || error.message
      );

      alert("Reject Failed");
    }
  };

  // ============================
  // STATUS STYLE
  // ============================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";

      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-200";

      case "Settled":
        return "bg-purple-100 text-purple-700 border border-purple-200";

      case "Completed":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "Pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";

      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  // ============================
  // UI
  // ============================
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-950/60"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">

        {/* ================= HEADER ================= */}
        <div className="max-w-7xl mx-auto mb-7">
          <div
            className="
              bg-white/95
              backdrop-blur-xl
              rounded-3xl
              shadow-2xl
              border border-white/40
              p-6 sm:p-7
            "
          >
            <div
              className="
                flex flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
              "
            >
              {/* Title */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-700
                    flex items-center justify-center
                    text-white
                    shadow-lg
                  "
                >
                  <FaShieldAlt className="text-2xl" />
                </div>

                <div>
                  <h1
                    className="
                      text-2xl
                      sm:text-3xl
                      font-extrabold
                      text-slate-800
                    "
                  >
                    Manage Claims
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Review, approve and manage vehicle insurance claims
                  </p>
                </div>
              </div>

              {/* Total Claims */}
              <div
                className="
                  flex items-center gap-3
                  bg-gradient-to-r
                  from-blue-50
                  to-indigo-50
                  border border-blue-100
                  px-5 py-3
                  rounded-2xl
                "
              >
                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-blue-600
                    text-white
                    flex items-center justify-center
                  "
                >
                  <FaClipboardList />
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Total Claims
                  </p>

                  <p className="text-xl font-extrabold text-blue-700">
                    {claims.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="max-w-7xl mx-auto">
          <div
            className="
              bg-white/95
              backdrop-blur-xl
              rounded-3xl
              shadow-2xl
              overflow-hidden
              border border-white/40
            "
          >

            {/* Table Header */}
            <div
              className="
                px-6 py-5
                border-b border-slate-200
                bg-gradient-to-r
                from-white
                to-slate-50
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-indigo-100
                    text-indigo-600
                    flex items-center justify-center
                  "
                >
                  <FaFileAlt />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Claim List
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage registered insurance claims
                  </p>
                </div>

              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                {/* ================= TABLE HEAD ================= */}
                <thead>
                  <tr
                    className="
                      bg-gradient-to-r
                      from-[#003366]
                      via-[#004b87]
                      to-[#0066b3]
                      text-white
                    "
                  >

                    <th
                      className="
                        px-5 py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Claim
                    </th>

                    <th
                      className="
                        px-5 py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Customer
                    </th>

                    <th
                      className="
                        px-5 py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Vehicle
                    </th>

                    <th
                      className="
                        px-5 py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Accident Date
                    </th>

                    <th
                      className="
                        px-5 py-4
                        text-center
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Status
                    </th>

                    <th
                      className="
                        px-5 py-4
                        text-center
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Actions
                    </th>

                  </tr>
                </thead>

                {/* ================= TABLE BODY ================= */}
                <tbody className="divide-y divide-slate-100">

                  {claims.length > 0 ? (

                    claims.map((claim) => (

                      <tr
                        key={claim.id}
                        className="
                          group
                          hover:bg-blue-50/70
                          transition-all
                          duration-200
                        "
                      >

                        {/* Claim Number */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-10 h-10
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                                flex items-center justify-center
                                group-hover:bg-blue-600
                                group-hover:text-white
                                transition
                              "
                            >
                              <FaClipboardList />
                            </div>

                            <div>

                              <p
                                className="
                                  font-bold
                                  text-slate-800
                                "
                              >
                                {claim.claim_number || "N/A"}
                              </p>

                              <p
                                className="
                                  text-xs
                                  text-slate-400
                                  mt-1
                                "
                              >
                                Claim ID: {claim.id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Customer */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-9 h-9
                                rounded-full
                                bg-indigo-100
                                text-indigo-600
                                flex items-center justify-center
                              "
                            >
                              <FaUsers />
                            </div>

                            <span
                              className="
                                text-sm
                                font-semibold
                                text-slate-700
                              "
                            >
                              {claim.customer_name ||
                                claim.customer ||
                                "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* Vehicle */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <FaCar className="text-blue-500" />

                            <span
                              className="
                                text-sm
                                font-medium
                                text-slate-700
                              "
                            >
                              {claim.vehicle_number || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* Accident Date */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <FaCalendarAlt className="text-slate-400" />

                            <span
                              className="
                                text-sm
                                text-slate-600
                              "
                            >
                              {claim.accident_date || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* Status */}
                        <td className="px-5 py-5 text-center">

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-2
                              px-3.5
                              py-1.5
                              rounded-full
                              text-xs
                              font-bold
                              ${getStatusStyle(claim.status)}
                            `}
                          >

                            <span
                              className="
                                w-2 h-2
                                rounded-full
                                bg-current
                              "
                            ></span>

                            {claim.status || "Pending"}

                          </span>

                        </td>

                        {/* Actions */}
                        <td className="px-5 py-5">

                          <div
                            className="
                              flex
                              justify-center
                              items-center
                              gap-2
                            "
                          >

                            {/* View */}
                            <button
                              type="button"
                              onClick={() => viewClaim(claim)}
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3.5
                                py-2
                                rounded-xl
                                bg-slate-100
                                text-slate-700
                                text-sm
                                font-semibold
                                hover:bg-slate-700
                                hover:text-white
                                transition-all
                                duration-200
                                shadow-sm
                              "
                            >
                              <FaEye />
                              View
                            </button>

                            {/* Approve */}
                            <button
                              type="button"
                              disabled={claim.status === "Approved"}
                              onClick={() => approveClaim(claim)}
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3.5
                                py-2
                                rounded-xl
                                text-white
                                text-sm
                                font-semibold
                                transition-all
                                duration-200
                                shadow-sm

                                ${
                                  claim.status === "Approved"
                                    ? `
                                      bg-slate-300
                                      cursor-not-allowed
                                    `
                                    : `
                                      bg-emerald-600
                                      hover:bg-emerald-700
                                      hover:-translate-y-0.5
                                    `
                                }
                              `}
                            >
                              <FaCheck />
                              Approve
                            </button>

                            {/* Reject */}
                            <button
                              type="button"
                              disabled={claim.status === "Rejected"}
                              onClick={() => rejectClaim(claim)}
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3.5
                                py-2
                                rounded-xl
                                text-white
                                text-sm
                                font-semibold
                                transition-all
                                duration-200
                                shadow-sm

                                ${
                                  claim.status === "Rejected"
                                    ? `
                                      bg-slate-300
                                      cursor-not-allowed
                                    `
                                    : `
                                      bg-red-600
                                      hover:bg-red-700
                                      hover:-translate-y-0.5
                                    `
                                }
                              `}
                            >
                              <FaTimes />
                              Reject
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    /* Empty State */
                    <tr>

                      <td
                        colSpan="6"
                        className="px-6 py-16"
                      >

                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            justify-center
                          "
                        >

                          <div
                            className="
                              w-20 h-20
                              rounded-full
                              bg-slate-100
                              text-slate-400
                              flex items-center justify-center
                              mb-4
                            "
                          >
                            <FaExclamationTriangle className="text-3xl" />
                          </div>

                          <h3
                            className="
                              text-lg
                              font-bold
                              text-slate-700
                            "
                          >
                            No Claims Found
                          </h3>

                          <p
                            className="
                              text-sm
                              text-slate-400
                              mt-1
                            "
                          >
                            There are currently no registered claims.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* Footer */}
            <div
              className="
                px-6 py-4
                border-t
                border-slate-200
                bg-slate-50
                flex
                items-center
                justify-between
              "
            >

              <p className="text-xs text-slate-500">
                Showing {claims.length} claim
                {claims.length !== 1 ? "s" : ""}
              </p>

              <div
                className="
                  flex items-center gap-2
                  text-xs text-slate-500
                "
              >
                <FaShieldAlt className="text-blue-500" />
                Secure Claim Management
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ManageClaims;