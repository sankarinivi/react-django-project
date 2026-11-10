import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function ViewSurveyReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/surveyReports/`);

      console.log("Survey Reports:", response.data);

      setReports(response.data);
    } catch (error) {
      console.error(
        "Survey Report Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <h2 className="text-lg font-bold text-slate-700">
            Loading Survey Reports...
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-5 md:p-8">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#001f3f] via-[#003b73] to-[#00509e] rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Survey Report Management
              </h1>

              <p className="text-blue-200 text-sm mt-1">
                Review survey reports and process claim settlement
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3">
              <p className="text-xs text-blue-200">
                Total Reports
              </p>

              <p className="text-2xl font-bold">
                {reports.length}
              </p>
            </div>

          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">
              Survey Report Details
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Review completed vehicle inspection information
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1200px]">

              <thead>
                <tr className="bg-gradient-to-r from-[#003366] to-[#00509e] text-white">

                  <th className="px-5 py-4 text-left text-sm">
                    Claim No
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Vehicle
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Surveyor
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Inspection Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Damaged Parts
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Damage Description
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Estimate
                  </th>

                  <th className="px-5 py-4 text-left text-sm">
                    Recommendation
                  </th>

                  <th className="px-5 py-4 text-center text-sm">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center text-sm">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {reports.length === 0 ? (

                  <tr>
                    <td
                      colSpan="10"
                      className="p-12 text-center text-slate-500"
                    >
                      No Survey Reports Found
                    </td>
                  </tr>

                ) : (

                  reports.map((report) => (

                    <tr
                      key={report.id}
                      className="border-b border-slate-100 hover:bg-blue-50 transition"
                    >

                      <td className="px-5 py-4 font-semibold text-blue-700">
                        {report.claim_number || "-"}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {report.vehicle_number || "-"}
                      </td>

                      <td className="px-5 py-4">
                        {report.surveyor_name || "-"}
                      </td>

                      <td className="px-5 py-4">
                        {report.inspection_date || "-"}
                      </td>

                      <td className="px-5 py-4">
                        {report.damaged_parts || "-"}
                      </td>

                      <td className="px-5 py-4 max-w-xs">
                        <p className="line-clamp-3 text-sm text-slate-600">
                          {report.damage_description || "-"}
                        </p>
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        ₹
                        {Number(
                          report.repair_estimate || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        {report.recommendation || "-"}
                      </td>

                      <td className="px-5 py-4 text-center">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            report.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : report.status === "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status || "-"}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex flex-col gap-2">

                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                            onClick={() =>
                              navigate(
                                `/liability-letter/${report.claim}`
                              )
                            }
                          >
                            Generate Liability
                          </button>

                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                            onClick={() =>
                              navigate(
                                `/claim-settlement/${report.claim}`
                              )
                            }
                          >
                            Settlement
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

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