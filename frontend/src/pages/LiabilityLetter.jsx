import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  FaFileInvoiceDollar,
  FaCar,
  FaShieldAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaPrint,
  FaEnvelope,
  FaFileSignature,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function LiabilityLetter() {
  const { claimId } = useParams();

  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [formData, setFormData] = useState({
    claim: "",
    approved_amount: "",
    deductible: "",
    net_amount: "",
    workshop_name: "",
    remarks: "",
  });

  /* =========================
     FETCH APPROVED CLAIMS
  ========================= */

  useEffect(() => {
    fetchApprovedClaims();
  }, []);

  const fetchApprovedClaims = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/claims/`
      );

      console.log("Claims:", response.data);

      const approvedClaims = response.data.filter(
        (claim) => claim.status === "Approved"
      );

      setClaims(approvedClaims);

      /* Automatically select claim from URL */
      if (claimId) {
        const selected = approvedClaims.find(
          (claim) => String(claim.id) === String(claimId)
        );

        if (selected) {
          setSelectedClaim(selected);

          setFormData((prev) => ({
            ...prev,
            claim: selected.id,
          }));
        }
      }

    } catch (error) {
      console.error(
        "Error fetching claims:",
        error.response?.data || error.message
      );
    }
  };

  /* =========================
     CLAIM CHANGE
  ========================= */

  const handleClaimChange = (e) => {
    const id = Number(e.target.value);

    const claim = claims.find(
      (item) => item.id === id
    );

    setSelectedClaim(claim || null);

    setFormData((prev) => ({
      ...prev,
      claim: id,
    }));
  };

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    const approved = parseFloat(
      updated.approved_amount || 0
    );

    const deductible = parseFloat(
      updated.deductible || 0
    );

    updated.net_amount = Math.max(
      approved - deductible,
      0
    );

    setFormData(updated);
  };

  /* =========================
     GENERATE LIABILITY
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.claim) {
      alert("Please select a claim");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/liabilityletters/`,
        formData
      );

      console.log(
        "Liability Letter:",
        response.data
      );

      alert(
        "Liability Letter Generated Successfully"
      );

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          JSON.stringify(error.response.data)
        );
      } else {
        alert(
          "Unable to connect to server."
        );
      }
    }
  };

  /* =========================
     SEND MAIL
  ========================= */

  const sendMail = async () => {
    if (!selectedClaim) {
      alert("Please select claim");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/send-liability-mail/`,
        {
          claim: selectedClaim.id,
        }
      );

      alert(
        response.data.message ||
          "Mail sent successfully"
      );

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          "Mail sending failed"
      );
    }
  };

  /* =========================
     PRINT
  ========================= */

  const printLetter = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="bg-gradient-to-r from-[#001f3f] via-[#003b73] to-[#00509e] rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">

                <FaFileInvoiceDollar className="text-3xl" />

              </div>

              <div>

                <h1 className="text-2xl md:text-3xl font-bold">
                  Liability Letter
                </h1>

                <p className="text-blue-200 text-sm mt-1">
                  Generate and send claim liability approval letters
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3">

              <FaCheckCircle className="text-green-300" />

              <div>

                <p className="text-xs text-blue-200">
                  Approved Claims
                </p>

                <p className="text-xl font-bold">
                  {claims.length}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= MAIN ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

          {/* ================= FORM ================= */}

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">

              <div className="flex items-center gap-3">

                <FaFileSignature className="text-2xl" />

                <div>

                  <h2 className="text-xl font-bold">
                    Generate Letter
                  </h2>

                  <p className="text-blue-100 text-sm">
                    Enter liability approval details
                  </p>

                </div>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8"
            >

              {/* CLAIM */}

              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Approved Claim
                </label>

                <select
                  value={formData.claim}
                  onChange={handleClaimChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="">
                    Select Claim
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

              {/* CLAIM DETAILS */}

              {selectedClaim && (

                <div className="mb-7 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <FaCar />
                    </div>

                    <div>

                      <h3 className="font-bold text-slate-800">
                        Claim Details
                      </h3>

                      <p className="text-xs text-slate-500">
                        Approved claim information
                      </p>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Detail
                      label="Claim Number"
                      value={selectedClaim.claim_number}
                    />

                    <Detail
                      label="Customer"
                      value={selectedClaim.customer_name}
                    />

                    <Detail
                      label="Vehicle Number"
                      value={selectedClaim.vehicle_number}
                    />

                    <Detail
                      label="Policy Number"
                      value={selectedClaim.policy_number}
                    />

                    <div className="bg-white rounded-xl p-4 shadow-sm sm:col-span-2">

                      <div className="flex items-center gap-3">

                        <FaShieldAlt className="text-indigo-600" />

                        <div>

                          <p className="text-xs text-slate-500">
                            Insurance Company
                          </p>

                          <p className="font-bold text-slate-800 mt-1">
                            {selectedClaim.insurance_company}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )}

              {/* APPROVED AMOUNT */}

              <InputField
                label="Approved Amount"
                name="approved_amount"
                value={formData.approved_amount}
                onChange={handleChange}
                placeholder="Enter approved amount"
              />

              {/* DEDUCTIBLE */}

              <InputField
                label="Policy Deductible"
                name="deductible"
                value={formData.deductible}
                onChange={handleChange}
                placeholder="Enter deductible"
              />

              {/* NET */}

              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Net Liability
                </label>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-green-700 font-medium">
                      Final Payable Amount
                    </span>

                    <span className="text-2xl font-bold text-green-700">

                      ₹
                      {Number(
                        formData.net_amount || 0
                      ).toLocaleString("en-IN")}

                    </span>

                  </div>

                </div>

              </div>

              {/* WORKSHOP */}

              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Workshop Name
                </label>

                <div className="relative">

                  <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                  <input
                    type="text"
                    name="workshop_name"
                    value={formData.workshop_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter workshop name"
                    className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

              {/* REMARKS */}

              <div className="mb-7">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Remarks
                </label>

                <textarea
                  rows="4"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks (optional)"
                  className="w-full border border-slate-300 rounded-xl p-4 bg-slate-50 resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
              >

                <FaFileSignature />

                Generate Liability Letter

              </button>

            </form>

          </div>

          {/* ================= PREVIEW ================= */}

          {selectedClaim ? (

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

              <div className="bg-slate-800 text-white px-6 py-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <FaFileInvoiceDollar className="text-xl" />

                  <div>

                    <h2 className="font-bold text-lg">
                      Letter Preview
                    </h2>

                    <p className="text-xs text-slate-300">
                      Liability approval document
                    </p>

                  </div>

                </div>

                <FaFileSignature className="text-2xl text-blue-300" />

              </div>

              <div
                id="liability-letter"
                className="p-6 md:p-8 lg:p-10 bg-white"
              >

                {/* TITLE */}

                <div className="text-center mb-6">

                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">

                    <FaShieldAlt className="text-2xl" />

                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-wide">
                    LIABILITY APPROVAL LETTER
                  </h2>

                  <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>

                </div>

                {/* DATE */}

                <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">

                  <FaCalendarAlt className="text-blue-600" />

                  <strong>Date:</strong>

                  {new Date().toLocaleDateString("en-IN")}

                </div>

                {/* CLAIM INFORMATION */}

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">

                  <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
                    Claim Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Detail
                      label="Claim Number"
                      value={selectedClaim.claim_number}
                    />

                    <Detail
                      label="Customer"
                      value={selectedClaim.customer_name}
                    />

                    <Detail
                      label="Vehicle Number"
                      value={selectedClaim.vehicle_number}
                    />

                    <Detail
                      label="Policy Number"
                      value={selectedClaim.policy_number}
                    />

                    <div className="sm:col-span-2">

                      <p className="text-xs text-slate-500">
                        Insurance Company
                      </p>

                      <p className="font-bold text-slate-800 mt-1">
                        {selectedClaim.insurance_company}
                      </p>

                    </div>

                  </div>

                </div>

                {/* AMOUNT TABLE */}

                <div className="overflow-hidden border border-slate-200 rounded-xl mb-7">

                  <table className="w-full">

                    <thead className="bg-[#003b73] text-white">

                      <tr>

                        <th className="text-left px-4 py-3 text-sm">
                          Description
                        </th>

                        <th className="text-right px-4 py-3 text-sm">
                          Amount (₹)
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr className="border-b">

                        <td className="px-4 py-3 text-sm text-slate-600">
                          Approved Repair Amount
                        </td>

                        <td className="px-4 py-3 text-right font-semibold">

                          ₹
                          {Number(
                            formData.approved_amount || 0
                          ).toLocaleString("en-IN")}

                        </td>

                      </tr>

                      <tr className="border-b">

                        <td className="px-4 py-3 text-sm text-slate-600">
                          Policy Deductible
                        </td>

                        <td className="px-4 py-3 text-right font-semibold text-orange-600">

                          ₹
                          {Number(
                            formData.deductible || 0
                          ).toLocaleString("en-IN")}

                        </td>

                      </tr>

                      <tr className="bg-green-50">

                        <td className="px-4 py-4 font-bold text-green-700">
                          Net Liability
                        </td>

                        <td className="px-4 py-4 text-right font-bold text-xl text-green-700">

                          ₹
                          {Number(
                            formData.net_amount || 0
                          ).toLocaleString("en-IN")}

                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

                {/* LETTER CONTENT */}

                <div className="text-sm md:text-base leading-7 text-slate-700 space-y-4">

                  <p>
                    Dear{" "}
                    <strong>
                      {selectedClaim.customer_name}
                    </strong>,
                  </p>

                  <p>
                    We are pleased to inform you that your
                    vehicle insurance claim has been approved
                    after reviewing the survey report.
                  </p>

                  <p>
                    The approved repair liability amount is{" "}
                    <strong className="text-green-700">
                      ₹
                      {Number(
                        formData.net_amount || 0
                      ).toLocaleString("en-IN")}
                    </strong>
                    . The payment will be processed according
                    to your insurance policy after repair
                    completion and invoice verification.
                  </p>

                  {/* WORKSHOP */}

                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">

                    <FaBuilding className="text-blue-600 mt-1" />

                    <div>

                      <p className="text-xs text-slate-500">
                        Authorized Workshop
                      </p>

                      <p className="font-bold text-slate-800">
                        {formData.workshop_name || "Not specified"}
                      </p>

                    </div>

                  </div>

                  {/* REMARKS */}

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                    <p className="text-xs text-slate-500 mb-1">
                      Remarks
                    </p>

                    <p className="text-sm text-slate-700">
                      {formData.remarks || "NIL"}
                    </p>

                  </div>

                  <p>
                    Thank you for choosing our insurance
                    services.
                  </p>

                </div>

                {/* SIGNATURE */}

                <div className="mt-10 text-right">

                  <p className="text-slate-400 mb-2">
                    ______________________________
                  </p>

                  <p className="font-bold text-slate-800">
                    Authorized Signatory
                  </p>

                  <p className="text-sm text-slate-500">
                    Insurance Company
                  </p>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="border-t border-slate-200 bg-slate-50 p-5 flex flex-col sm:flex-row gap-3">

                <button
                  type="button"
                  onClick={printLetter}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition"
                >

                  <FaPrint />

                  Print Letter

                </button>

                <button
                  type="button"
                  onClick={sendMail}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition"
                >

                  <FaEnvelope />

                  Send Mail

                </button>

              </div>

            </div>

          ) : (

            <div className="bg-white rounded-2xl shadow-xl min-h-[500px] flex items-center justify-center text-center p-8">

              <div>

                <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-5">

                  <FaFileInvoiceDollar className="text-3xl" />

                </div>

                <h3 className="text-xl font-bold text-slate-700">
                  No Claim Selected
                </h3>

                <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
                  Select an approved claim from the form
                  to preview the liability approval letter.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

/* =========================
   REUSABLE DETAIL COMPONENT
========================= */

function Detail({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="font-semibold text-slate-800 mt-1">
        {value || "-"}
      </p>

    </div>
  );
}

/* =========================
   REUSABLE INPUT COMPONENT
========================= */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-5">

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />

        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          required
          min="0"
          placeholder={placeholder}
          className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

      </div>

    </div>
  );
}

export default LiabilityLetter;