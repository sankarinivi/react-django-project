// src/pages/ViewSurveyReport.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function ViewSurveyReport() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/surveyReports/`
      );

      console.log("Survey Reports:", response.data);

      setReports(response.data);
    } catch (error) {
      console.log(
        "Survey Report Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">

      {/* Main Container */}
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Survey Report Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View survey reports, generate liability letters and settle claims
          </p>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">

          {/* Responsive horizontal scrolling */}
          <div className="overflow-x-auto">

            <table className="min-w-[1400px] w-full text-left">

              {/* Header */}
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Claim No
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Vehicle
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Surveyor
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Inspection Date
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Damaged Parts
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Damage Description
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Estimate
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Recommendation
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200">

                {reports.length > 0 ? (

                  reports.map((report) => (

                    <tr
                      key={report.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Claim */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">
                        {report.claim_number || "-"}
                      </td>

                      {/* Vehicle */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {report.vehicle_number || "-"}
                      </td>

                      {/* Surveyor */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {report.surveyor_name || "-"}
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {report.inspection_date || "-"}
                      </td>

                      {/* Damaged Parts */}
                      <td className="max-w-[200px] px-5 py-4 text-sm text-gray-600">
                        {report.damaged_parts || "-"}
                      </td>

                      {/* Description */}
                      <td className="max-w-[250px] px-5 py-4 text-sm text-gray-600">
                        {report.damage_description || "-"}
                      </td>

                      {/* Estimate */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-800">
                        ₹{report.repair_estimate ?? 0}
                      </td>

                      {/* Recommendation */}
                      <td className="px-5 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            report.recommendation === "Repair"
                              ? "bg-blue-100 text-blue-700"
                              : report.recommendation === "Replace"
                              ? "bg-yellow-100 text-yellow-700"
                              : report.recommendation === "Total Loss"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {report.recommendation || "-"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            report.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : report.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : report.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : report.status === "Settled"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status || "-"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex gap-2">

                          {/* Liability */}
                          <button
                            onClick={() =>
                              navigate(
                                `/liability-letter/${report.claim}`
                              )
                            }
                            className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Generate Liability
                          </button>

                          {/* Settlement */}
                          <button
                            onClick={() =>
                              navigate(
                                `/claim-settlement/${report.claim}`
                              )
                            }
                            className="whitespace-nowrap rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                          >
                            Settlement
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="10"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No Survey Reports Found
                    </td>
                  </tr>

                )}

              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSurveyReport;