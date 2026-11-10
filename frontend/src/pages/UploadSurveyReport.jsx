import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  FaFileUpload,
  FaCar,
  FaUserTie,
  FaCalendarAlt,
  FaTools,
  FaRupeeSign,
  FaClipboardList,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function UploadSurveyReport() {
  const fileInputRef = useRef(null);

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [claimsLoading, setClaimsLoading] = useState(false);

  const [report, setReport] = useState({
    claim: "",
    inspection_date: "",
    damaged_parts: "",
    damage_description: "",
    repair_estimate: "",
    labor_cost: "",
    parts_cost: "",
    recommendation: "Repair",
    remarks: "",
    reportFile: null,
  });

  // ==========================================
  // FETCH CLAIMS
  // ==========================================

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setClaimsLoading(true);

      const response = await axios.get(`${API_URL}/claims/`);

      console.log("Claims:", response.data);

      // Only show claims suitable for survey report
      const filteredClaims = response.data.filter(
        (claim) =>
          claim.status === "Pending" ||
          claim.status === "Pending Assignment" ||
          claim.status === "Approved" ||
          claim.status === "Assigned"
      );

      setClaims(filteredClaims);
    } catch (error) {
      console.error(
        "Claims Error:",
        error.response?.data || error.message
      );

      alert("Unable to load claims");
    } finally {
      setClaimsLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "reportFile") {
      setReport((previous) => ({
        ...previous,
        reportFile: files && files.length > 0 ? files[0] : null,
      }));

      return;
    }

    setReport((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // CALCULATE TOTAL
  // ==========================================

  const calculateTotal = () => {
    const repair = Number(report.repair_estimate || 0);
    const labor = Number(report.labor_cost || 0);
    const parts = Number(report.parts_cost || 0);

    return repair + labor + parts;
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setReport({
      claim: "",
      inspection_date: "",
      damaged_parts: "",
      damage_description: "",
      repair_estimate: "",
      labor_cost: "",
      parts_cost: "",
      recommendation: "Repair",
      remarks: "",
      reportFile: null,
    });

    // Correct way to clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SUBMIT REPORT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!report.claim) {
      alert("Please select a claim");
      return;
    }

    if (!report.inspection_date) {
      alert("Please select inspection date");
      return;
    }

    if (!report.damaged_parts.trim()) {
      alert("Please enter damaged parts");
      return;
    }

    if (!report.damage_description.trim()) {
      alert("Please enter damage description");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("claim", report.claim);
      formData.append(
        "inspection_date",
        report.inspection_date
      );

      formData.append(
        "damaged_parts",
        report.damaged_parts
      );

      formData.append(
        "damage_description",
        report.damage_description
      );

      formData.append(
        "repair_estimate",
        report.repair_estimate || "0"
      );

      formData.append(
        "labor_cost",
        report.labor_cost || "0"
      );

      formData.append(
        "parts_cost",
        report.parts_cost || "0"
      );

      formData.append(
        "recommendation",
        report.recommendation
      );

      formData.append(
        "remarks",
        report.remarks
      );

      // Add file only if selected
      if (report.reportFile) {
        formData.append(
          "report",
          report.reportFile
        );
      }

      console.log("Sending Survey Report...");

      const response = await axios.post(
        `${API_URL}/surveyReports/`,
        formData
      );

      console.log(
        "Survey Report Response:",
        response.data
      );

      alert("Survey Report Uploaded Successfully");

      resetForm();

    } catch (error) {
      console.error(
        "Upload Error:",
        error.response?.data || error.message
      );

      if (error.response?.data) {
        alert(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      } else {
        alert("Survey Report Upload Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-md">
                <FaFileUpload className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold sm:text-3xl">
                  Upload Survey Report
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  Submit vehicle inspection and survey assessment
                </p>
              </div>

            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur-md">
              Survey Report Management
            </div>

          </div>

        </div>

        {/* ==========================================
            MAIN CARD
        ========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

          <form onSubmit={handleSubmit}>

            {/* ======================================
                CLAIM INFORMATION
            ====================================== */}

            <div className="border-b border-slate-200 p-6 sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FaClipboardList />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Claim Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Select the claim and inspection date
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Surveyor */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FaUserTie className="text-blue-500" />
                    Surveyor
                  </label>

                  <input
                    type="text"
                    value="Logged-in Surveyor"
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-600 outline-none"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Surveyor is automatically assigned by the system.
                  </p>

                </div>

                {/* Claim */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FaCar className="text-blue-500" />
                    Select Claim
                  </label>

                  <select
                    name="claim"
                    value={report.claim}
                    onChange={handleChange}
                    required
                    disabled={claimsLoading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  >

                    <option value="">
                      {claimsLoading
                        ? "Loading claims..."
                        : "Select Claim"}
                    </option>

                    {claims.map((claim) => (
                      <option
                        key={claim.id}
                        value={claim.id}
                      >
                        {claim.claim_number} -{" "}
                        {claim.vehicle_number}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Inspection Date */}

                <div className="md:col-span-2">

                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FaCalendarAlt className="text-blue-500" />
                    Inspection Date
                  </label>

                  <input
                    type="date"
                    name="inspection_date"
                    value={report.inspection_date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

            </div>

            {/* ======================================
                DAMAGE ASSESSMENT
            ====================================== */}

            <div className="border-b border-slate-200 bg-slate-50 p-6 sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <FaTools />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Damage Assessment
                  </h2>

                  <p className="text-sm text-slate-500">
                    Enter the vehicle damage details
                  </p>
                </div>

              </div>

              <div className="space-y-6">

                {/* Damaged Parts */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Damaged Parts
                  </label>

                  <textarea
                    name="damaged_parts"
                    value={report.damaged_parts}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Example: Front bumper, headlight, bonnet..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Damage Description */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Damage Description
                  </label>

                  <textarea
                    name="damage_description"
                    value={report.damage_description}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Describe the accident damage and inspection findings..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

            </div>

            {/* ======================================
                COST ESTIMATION
            ====================================== */}

            <div className="border-b border-slate-200 p-6 sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <FaRupeeSign />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Cost Estimation
                  </h2>

                  <p className="text-sm text-slate-500">
                    Enter estimated repair and parts costs
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* Repair */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Repair Estimate
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      name="repair_estimate"
                      value={report.repair_estimate}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

                {/* Labour */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Labour Cost
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      name="labor_cost"
                      value={report.labor_cost}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

                {/* Parts */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Parts Cost
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      name="parts_cost"
                      value={report.parts_cost}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </div>

              {/* Total */}

              <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Estimated Settlement Amount
                  </p>

                  <p className="text-xs text-slate-400">
                    Repair + Labour + Parts
                  </p>
                </div>

                <span className="text-2xl font-extrabold text-blue-700">
                  ₹{calculateTotal().toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            {/* ======================================
                RECOMMENDATION
            ====================================== */}

            <div className="border-b border-slate-200 p-6 sm:p-8">

              <div className="mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" />

                <label className="text-sm font-bold text-slate-700">
                  Survey Recommendation
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {["Repair", "Replace", "Total Loss"].map(
                  (item) => (
                    <label
                      key={item}
                      className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                        report.recommendation === item
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >

                      <input
                        type="radio"
                        name="recommendation"
                        value={item}
                        checked={
                          report.recommendation === item
                        }
                        onChange={handleChange}
                        className="hidden"
                      />

                      <span className="font-bold">
                        {item}
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>

            {/* ======================================
                REMARKS + FILE
            ====================================== */}

            <div className="p-6 sm:p-8">

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Remarks */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Surveyor Remarks
                  </label>

                  <textarea
                    name="remarks"
                    value={report.remarks}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Enter additional survey remarks..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* File Upload */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Survey Report File
                  </label>

                  <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-100">

                    <FaFileAlt className="mb-3 text-4xl text-blue-500" />

                    <span className="text-sm font-bold text-slate-700">
                      {report.reportFile
                        ? report.reportFile.name
                        : "Choose survey report"}
                    </span>

                    <span className="mt-2 text-xs text-slate-400">
                      PDF, JPG, PNG or document
                    </span>

                    <input
                      ref={fileInputRef}
                      id="surveyFile"
                      type="file"
                      name="reportFile"
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                    />

                  </label>

                </div>

              </div>

              {/* ======================================
                  SUBMIT BUTTON
              ====================================== */}

              <div className="mt-8 border-t border-slate-200 pt-6">

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-lg transition-all ${
                    loading
                      ? "cursor-not-allowed bg-slate-400"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  }`}
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                      Uploading Report...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />

                      Submit Survey Report
                    </>
                  )}

                </button>

              </div>

            </div>

          </form>

        </div>

        {/* Footer */}

        <p className="mt-5 text-center text-xs text-slate-500">
          Secure Vehicle Insurance Claim Management System
        </p>

      </div>
    </div>
  );
}

export default UploadSurveyReport;