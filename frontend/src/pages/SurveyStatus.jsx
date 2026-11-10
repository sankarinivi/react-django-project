// src/pages/SurveyStatus.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

function SurveyStatus() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/surveyReports/`);

      console.log("Survey Reports:", response.data);

      setReports(response.data);
    } catch (error) {
      console.error("API Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }

      alert("Unable to load survey status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      
      {/* Main Container */}
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Survey Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View the current status of vehicle survey reports
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <p className="text-gray-600">
              Loading...
            </p>
          </div>
        ) : (

          /* Table Card */
          <div className="overflow-hidden rounded-xl bg-white shadow-md">

            {/* Responsive horizontal scroll */}
            <div className="overflow-x-auto">

              <table className="min-w-full text-left">

                {/* Table Header */}
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Claim No
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Surveyor
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Inspection Date
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Damage Level
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Survey Status
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">

                  {reports.length > 0 ? (

                    reports.map((item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {item.claim_number}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.surveyor_name}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.inspection_date}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.recommendation}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : item.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : item.status === "Completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>
                      </tr>
                    ))

                  ) : (

                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No Survey Reports Found
                      </td>
                    </tr>

                  )}

                </tbody>
              </table>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SurveyStatus;