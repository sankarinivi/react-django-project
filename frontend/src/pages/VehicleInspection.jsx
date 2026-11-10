// src/pages/VehicleInspection.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaCar,
  FaClipboardCheck,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCommentAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaUserTie,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function VehicleInspection() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [inspection, setInspection] = useState({
    claim: "",
    inspection_date: "",
    damage_level: "",
    remarks: "",
    surveyor: "",
  });

  // ==========================================
  // LOAD CLAIMS + SURVEYOR
  // ==========================================

  useEffect(() => {
    fetchClaims();

    const userId = localStorage.getItem("user_id");

    console.log("Logged Surveyor ID:", userId);

    setInspection((prev) => ({
      ...prev,
      surveyor: userId || "",
    }));
  }, []);

  // ==========================================
  // FETCH CLAIMS
  // ==========================================

  const fetchClaims = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/claims/`);

      console.log("Claims:", response.data);

      // Show only claims that can be inspected
      const pendingClaims = response.data.filter(
        (claim) =>
          claim.status === "Approved" ||
          claim.status === "Pending" ||
          claim.status === "Pending Assignment"
      );

      setClaims(pendingClaims);
    } catch (error) {
      console.error(
        "Claim Fetch Error:",
        error.response?.data || error.message
      );

      alert("Unable to load claims.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInspection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT INSPECTION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inspection.surveyor) {
      alert("Surveyor login information not found.");
      return;
    }

    try {
      setSubmitting(true);

      console.log("Sending Inspection:", inspection);

      const response = await axios.post(
        `${API_URL}/surveyReports/`,
        inspection
      );

      console.log("Success:", response.data);

      alert("Vehicle Inspection Submitted Successfully!");

      // Reset form
      setInspection({
        claim: "",
        inspection_date: "",
        damage_level: "",
        remarks: "",
        surveyor: localStorage.getItem("user_id") || "",
      });

      fetchClaims();
    } catch (error) {
      console.error(
        "Inspection Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data, null, 2)
          : "Inspection submission failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="mx-auto max-w-5xl">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#003366] via-[#00509e] to-[#0066b3] p-6 text-white shadow-xl sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur-md">
                <FaCar className="text-3xl" />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[3px] text-blue-200">
                  Surveyor Panel
                </p>

                <h1 className="text-2xl font-extrabold sm:text-3xl">
                  Vehicle Inspection
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  Inspect the vehicle and record damage information
                </p>
              </div>

            </div>

            <div className="hidden rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md sm:block">

              <div className="flex items-center gap-3">

                <FaShieldAlt className="text-2xl text-blue-200" />

                <div>
                  <p className="text-xs text-blue-200">
                    Secure Process
                  </p>

                  <p className="font-bold">
                    Insurance Inspection
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ==========================================
            FORM CARD
        ========================================== */}

        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-2xl backdrop-blur-xl">

          {/* Card Header */}

          <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-6 py-5 sm:px-8">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FaClipboardCheck />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Inspection Details
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the required vehicle inspection information
                </p>
              </div>

            </div>

          </div>

          {/* ==========================================
              FORM
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-7 p-6 sm:p-8"
          >

            {/* ========================================
                CLAIM + DATE
            ======================================== */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* CLAIM */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FaClipboardCheck className="text-blue-500" />
                  Select Claim
                </label>

                <select
                  name="claim"
                  value={inspection.claim}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >

                  <option value="">
                    {loading
                      ? "Loading claims..."
                      : "Select Claim"}
                  </option>

                  {claims.map((claim) => (
                    <option
                      key={claim.id}
                      value={claim.id}
                    >
                      {claim.claim_number} -{" "}
                      {claim.vehicle_number || "N/A"}
                    </option>
                  ))}

                </select>

                <p className="mt-2 text-xs text-slate-400">
                  Select the claim associated with this inspection.
                </p>

              </div>

              {/* INSPECTION DATE */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FaCalendarAlt className="text-blue-500" />
                  Inspection Date
                </label>

                <input
                  type="date"
                  name="inspection_date"
                  value={inspection.inspection_date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Date when the vehicle was inspected.
                </p>

              </div>

            </div>

            {/* ========================================
                DAMAGE LEVEL
            ======================================== */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <FaExclamationTriangle className="text-amber-500" />
                Damage Level
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {[
                  {
                    value: "Minor",
                    description: "Small damage",
                  },
                  {
                    value: "Medium",
                    description: "Moderate damage",
                  },
                  {
                    value: "Major",
                    description: "Severe damage",
                  },
                  {
                    value: "Total Loss",
                    description: "Vehicle loss",
                  },
                ].map((item) => (

                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setInspection((prev) => ({
                        ...prev,
                        damage_level: item.value,
                      }))
                    }
                    className={`
                      rounded-xl border-2 p-4 text-left transition-all duration-200
                      ${
                        inspection.damage_level === item.value
                          ? "border-blue-600 bg-blue-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                      }
                    `}
                  >

                    <div className="flex items-center justify-between">

                      <span
                        className={`
                          text-sm font-bold
                          ${
                            inspection.damage_level === item.value
                              ? "text-blue-700"
                              : "text-slate-700"
                          }
                        `}
                      >
                        {item.value}
                      </span>

                      {inspection.damage_level === item.value && (
                        <FaCheckCircle className="text-blue-600" />
                      )}

                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.description}
                    </p>

                  </button>

                ))}

              </div>

              <input
                type="text"
                value={inspection.damage_level}
                required
                readOnly
                className="pointer-events-none absolute h-0 w-0 opacity-0"
                tabIndex="-1"
              />

            </div>

            {/* ========================================
                REMARKS
            ======================================== */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <FaCommentAlt className="text-blue-500" />
                Inspection Remarks
              </label>

              <textarea
                name="remarks"
                value={inspection.remarks}
                onChange={handleChange}
                placeholder="Describe the vehicle damage, affected areas, visible defects and other inspection observations..."
                rows="6"
                required
                className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <div className="mt-2 flex justify-between">

                <p className="text-xs text-slate-400">
                  Provide detailed inspection observations.
                </p>

                <p className="text-xs text-slate-400">
                  {inspection.remarks.length} characters
                </p>

              </div>

            </div>

            {/* ========================================
                SURVEYOR INFORMATION
            ======================================== */}

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <FaUserTie />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                    Assigned Surveyor
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    Surveyor ID:{" "}
                    {inspection.surveyor || "Not Available"}
                  </p>

                </div>

              </div>

            </div>

            {/* ========================================
                SUBMIT BUTTON
            ======================================== */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setInspection({
                    claim: "",
                    inspection_date: "",
                    damage_level: "",
                    remarks: "",
                    surveyor:
                      localStorage.getItem("user_id") || "",
                  })
                }
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-600 transition-all hover:bg-slate-100"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={submitting}
                className={`
                  flex items-center justify-center gap-3 rounded-xl px-8 py-3 font-bold text-white shadow-lg transition-all
                  ${
                    submitting
                      ? "cursor-not-allowed bg-slate-400"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  }
                `}
              >

                {submitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Submit Inspection
                  </>
                )}

              </button>

            </div>

          </form>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-8">

            <p className="text-xs text-slate-400">
              Vehicle Insurance Claim Management
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <FaShieldAlt className="text-blue-500" />
              Secure Inspection
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default VehicleInspection;