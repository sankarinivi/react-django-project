import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaShieldAlt,
  FaClipboardList,
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaFileAlt,
  FaExclamationTriangle,
  FaRupeeSign,
  FaTools,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function ClaimSettlement() {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [surveyReport, setSurveyReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [settling, setSettling] = useState(false);

  // ==========================================
  // LOAD CLAIMS
  // ==========================================
  useEffect(() => {
    fetchClaims();
  }, []);

  // ==========================================
  // GET APPROVED / COMPLETED CLAIMS
  // ==========================================
  const fetchClaims = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/claims/`);

      console.log("Claims Response:", response.data);

      const approvedClaims = response.data.filter(
        (claim) =>
          claim.status === "Approved" ||
          claim.status === "Completed"
      );

      setClaims(approvedClaims);
    } catch (error) {
      console.error(
        "Fetch Claims Error:",
        error.response?.data || error.message
      );

      alert("Unable to fetch claims");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SELECT CLAIM
  // ==========================================
  const handleClaimSelect = async (claim) => {
    try {
      setSelectedClaim(claim);
      setSurveyReport(null);

      const response = await axios.get(
        `${API_URL}/surveyReports/`
      );

      console.log("Survey Reports:", response.data);

      const report = response.data.find(
        (item) => Number(item.claim) === Number(claim.id)
      );

      console.log("Matched Survey Report:", report);

      setSurveyReport(report || null);
    } catch (error) {
      console.error(
        "Survey Report Error:",
        error.response?.data || error.message
      );

      setSurveyReport(null);
    }
  };

  // ==========================================
  // CALCULATE SETTLEMENT
  // ==========================================
  const calculateSettlement = () => {
    if (!surveyReport) {
      return 0;
    }

    const repairEstimate = Number(
      surveyReport.repair_estimate || 0
    );

    const laborCost = Number(
      surveyReport.labor_cost || 0
    );

    const partsCost = Number(
      surveyReport.parts_cost || 0
    );

    return repairEstimate + laborCost + partsCost;
  };

  // ==========================================
  // SETTLE CLAIM
  // ==========================================
  const handleSettlement = async () => {
    if (!selectedClaim) {
      alert("Please select a claim");
      return;
    }

    if (!surveyReport) {
      alert("Survey report not found");
      return;
    }

    const settlementAmount = calculateSettlement();

    const confirmSettlement = window.confirm(
      `Are you sure you want to settle claim ${selectedClaim.claim_number} for ₹${settlementAmount}?`
    );

    if (!confirmSettlement) {
      return;
    }

    try {
      setSettling(true);

      await axios.patch(
        `${API_URL}/claims/${selectedClaim.id}/`,
        {
          status: "Settled",
        }
      );

      alert("Claim Settled Successfully");

      setSelectedClaim(null);
      setSurveyReport(null);

      fetchClaims();
    } catch (error) {
      console.error(
        "Settlement Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Settlement Failed"
      );
    } finally {
      setSettling(false);
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Settled":
        return "bg-purple-50 text-purple-700 border-purple-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <div className="max-w-7xl mx-auto mb-7">

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-6 sm:p-7">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            {/* Title */}
            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">

                <FaShieldAlt className="text-2xl" />

              </div>

              <div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                  Claim Settlement
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Review approved claims and complete insurance settlement
                </p>

              </div>

            </div>

            {/* Count */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl px-5 py-3">

              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <FaClipboardList />
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">
                  Pending Settlement
                </p>

                <p className="text-xl font-extrabold text-blue-700">
                  {claims.length}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CLAIM TABLE
      ===================================================== */}
      <div className="max-w-7xl mx-auto">

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white overflow-hidden">

          {/* Table Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <FaFileAlt />
              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Approved Claims
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Select a claim to view survey and settlement details
                </p>

              </div>

            </div>

          </div>

          {/* Loading */}
          {loading ? (

            <div className="flex flex-col items-center justify-center py-20">

              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

              <p className="mt-4 text-sm text-slate-500 font-medium">
                Loading claims...
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                {/* Table Head */}
                <thead>

                  <tr className="bg-gradient-to-r from-[#003366] via-[#004b87] to-[#0066b3] text-white">

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Claim No
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Vehicle
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Accident Date
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider">
                      Action
                    </th>

                  </tr>

                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100">

                  {claims.length > 0 ? (

                    claims.map((claim) => (

                      <tr
                        key={claim.id}
                        className="group hover:bg-blue-50/70 transition-all duration-200"
                      >

                        {/* Claim */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">

                              <FaClipboardList />

                            </div>

                            <div>

                              <p className="font-bold text-slate-800">
                                {claim.claim_number}
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                ID: {claim.id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Vehicle */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <FaCar className="text-blue-500" />

                            <span className="text-sm font-semibold text-slate-700">
                              {claim.vehicle_number || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* Customer */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">

                              <FaUser />

                            </div>

                            <span className="text-sm font-semibold text-slate-700">
                              {claim.customer_name || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* Date */}
                        <td className="px-5 py-5">

                          <div className="flex items-center gap-2">

                            <FaCalendarAlt className="text-slate-400" />

                            <span className="text-sm text-slate-600">
                              {claim.accident_date || "N/A"}
                            </span>

                          </div>

                        </td>

                        {/* Status */}
                        <td className="px-5 py-5 text-center">

                          <span
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${getStatusStyle(
                              claim.status
                            )}`}
                          >

                            <span className="w-2 h-2 rounded-full bg-current"></span>

                            {claim.status}

                          </span>

                        </td>

                        {/* Action */}
                        <td className="px-5 py-5 text-center">

                          <button
                            onClick={() =>
                              handleClaimSelect(claim)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
                          >

                            <FaEye />

                            View Details

                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="px-6 py-20"
                      >

                        <div className="flex flex-col items-center justify-center">

                          <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">

                            <FaExclamationTriangle className="text-3xl" />

                          </div>

                          <h3 className="text-lg font-bold text-slate-700">
                            No Approved Claims
                          </h3>

                          <p className="text-sm text-slate-400 mt-1">
                            There are currently no claims waiting for settlement.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">

            <p className="text-xs text-slate-500">

              Showing {claims.length} claim
              {claims.length !== 1 ? "s" : ""}

            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500">

              <FaShieldAlt className="text-blue-500" />

              Secure Settlement Management

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SETTLEMENT DETAILS MODAL
      ===================================================== */}
      {selectedClaim && (

        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-6 py-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                  <FaFileAlt />

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Settlement Details
                  </h2>

                  <p className="text-sm text-blue-100">
                    Claim {selectedClaim.claim_number}
                  </p>

                </div>

              </div>

              <button
                onClick={() => {
                  setSelectedClaim(null);
                  setSurveyReport(null);
                }}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >

                <FaTimes />

              </button>

            </div>

            {/* Modal Body */}
            <div className="p-6">

              {/* Claim Information */}
              <div className="mb-7">

                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">

                  <FaClipboardList className="text-blue-600" />

                  Claim Information

                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Claim Number */}
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">

                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Claim Number
                    </p>

                    <p className="mt-2 font-bold text-blue-700">
                      {selectedClaim.claim_number}
                    </p>

                  </div>

                  {/* Vehicle */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">

                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Vehicle Number
                    </p>

                    <p className="mt-2 font-bold text-slate-700 flex items-center gap-2">

                      <FaCar className="text-blue-500" />

                      {selectedClaim.vehicle_number || "N/A"}

                    </p>

                  </div>

                  {/* Customer */}
                  <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">

                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Customer
                    </p>

                    <p className="mt-2 font-bold text-indigo-700">
                      {selectedClaim.customer_name || "N/A"}
                    </p>

                  </div>

                  {/* Status */}
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">

                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Claim Status
                    </p>

                    <p className="mt-2">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyle(
                          selectedClaim.status
                        )}`}
                      >

                        <span className="w-2 h-2 rounded-full bg-current"></span>

                        {selectedClaim.status}

                      </span>

                    </p>

                  </div>

                </div>

              </div>

              {/* Survey Report */}
              {surveyReport ? (

                <div>

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                      <FaTools />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-slate-800">
                        Survey Report
                      </h3>

                      <p className="text-sm text-slate-500">
                        Inspection and repair details
                      </p>

                    </div>

                  </div>

                  {/* Report Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Damage */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 md:col-span-2">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Damage Description
                      </p>

                      <p className="text-sm text-slate-700 leading-relaxed">
                        {surveyReport.damage_description || "N/A"}
                      </p>

                    </div>

                    {/* Damaged Parts */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Damaged Parts
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {surveyReport.damaged_parts || "N/A"}
                      </p>

                    </div>

                    {/* Recommendation */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">

                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Recommendation
                      </p>

                      <p className="text-sm font-semibold text-blue-700">
                        {surveyReport.recommendation || "N/A"}
                      </p>

                    </div>

                  </div>

                  {/* Cost Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">

                    <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">

                      <p className="text-xs font-semibold text-slate-500">
                        Repair Estimate
                      </p>

                      <p className="text-xl font-extrabold text-blue-700 mt-2">
                        ₹{Number(
                          surveyReport.repair_estimate || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">

                      <p className="text-xs font-semibold text-slate-500">
                        Labour Cost
                      </p>

                      <p className="text-xl font-extrabold text-amber-700 mt-2">
                        ₹{Number(
                          surveyReport.labor_cost || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-purple-50 border border-purple-100 p-5">

                      <p className="text-xs font-semibold text-slate-500">
                        Parts Cost
                      </p>

                      <p className="text-xl font-extrabold text-purple-700 mt-2">
                        ₹{Number(
                          surveyReport.parts_cost || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                  {/* Remarks */}
                  <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-5">

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Remarks
                    </p>

                    <p className="text-sm text-slate-700">
                      {surveyReport.remarks || "No remarks available"}
                    </p>

                  </div>

                  {/* Total */}
                  <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-xl">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                      <div>

                        <p className="text-sm text-blue-100">
                          Total Settlement Amount
                        </p>

                        <div className="flex items-center gap-2 mt-1">

                          <FaRupeeSign className="text-2xl" />

                          <span className="text-3xl sm:text-4xl font-extrabold">

                            {calculateSettlement().toLocaleString(
                              "en-IN"
                            )}

                          </span>

                        </div>

                      </div>

                      <button
                        className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all ${
                          settling
                            ? "bg-white/30 cursor-not-allowed"
                            : "bg-white text-blue-700 hover:bg-blue-50 hover:-translate-y-0.5"
                        }`}
                        onClick={handleSettlement}
                        disabled={settling}
                      >

                        <FaCheckCircle />

                        {settling
                          ? "Processing..."
                          : "Approve Settlement"}

                      </button>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="rounded-3xl border-2 border-dashed border-red-200 bg-red-50 p-10 text-center">

                  <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-500 flex items-center justify-center">

                    <FaExclamationTriangle className="text-2xl" />

                  </div>

                  <h3 className="mt-4 text-lg font-bold text-red-700">
                    Survey Report Not Found
                  </h3>

                  <p className="text-sm text-red-500 mt-2">
                    Please complete the survey report before settlement.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ClaimSettlement;