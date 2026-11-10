import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaFileAlt,
  FaEye,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function CompletedSurvey() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedReports();
  }, []);

  const fetchCompletedReports = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/surveyReports/`
      );

      console.log("Survey Reports:", response.data);

      const completedReports = response.data.filter(
        (report) => report.status === "Completed"
      );

      setReports(completedReports);

    } catch (error) {
      console.error(
        "Error:",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#001f3f] via-[#003b73] to-[#00509e] text-white shadow-xl">

        <div className="px-6 md:px-10 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">

                <FaClipboardCheck className="text-2xl text-blue-200" />

              </div>

              <div>

                <h1 className="text-2xl md:text-3xl font-bold">
                  Completed Survey Reports
                </h1>

                <p className="text-sm text-blue-200 mt-1">
                  View completed vehicle inspection reports
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3 rounded-xl">

              <FaCheckCircle className="text-green-300" />

              <div>

                <p className="text-xs text-blue-200">
                  Completed Reports
                </p>

                <p className="text-lg font-bold">
                  {reports.length}
                </p>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}
      <main className="p-5 md:p-8">

        <div className="max-w-7xl mx-auto">

          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* TOTAL */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:-translate-y-1 transition">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Total Completed
                  </p>

                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                    {reports.length}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                  <FaClipboardCheck />
                </div>

              </div>

            </div>

            {/* STATUS */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:-translate-y-1 transition">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Survey Status
                  </p>

                  <h2 className="text-2xl font-bold text-green-600 mt-3">
                    Completed
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                  <FaCheckCircle />
                </div>

              </div>

            </div>

            {/* DOCUMENTS */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:-translate-y-1 transition">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Available Documents
                  </p>

                  <h2 className="text-4xl font-bold text-indigo-600 mt-2">
                    {
                      reports.filter(
                        (report) => report.report
                      ).length
                    }
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
                  <FaFileAlt />
                </div>

              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <h2 className="text-xl font-bold text-slate-800">
                Survey Report Details
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Review completed inspection information
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="bg-gradient-to-r from-[#003366] to-[#00509e] text-white">

                    <th className="px-6 py-4 text-left text-sm">
                      Claim Number
                    </th>

                    <th className="px-6 py-4 text-left text-sm">
                      Inspection Date
                    </th>

                    <th className="px-6 py-4 text-left text-sm">
                      Damage Details
                    </th>

                    <th className="px-6 py-4 text-left text-sm">
                      Remarks
                    </th>

                    <th className="px-6 py-4 text-center text-sm">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center text-sm">
                      Report
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {reports.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="p-12 text-center"
                      >

                        <div className="flex flex-col items-center">

                          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">

                            <FaClipboardCheck className="text-2xl" />

                          </div>

                          <h3 className="text-lg font-bold text-slate-700">
                            No Completed Survey Reports
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            Completed survey reports will appear here.
                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    reports.map((report) => (

                      <tr
                        key={report.id}
                        className="border-b border-slate-100 hover:bg-blue-50/50 transition"
                      >

                        {/* CLAIM */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                              <FaClipboardCheck />

                            </div>

                            <span className="font-bold text-slate-800">
                              {report.claim_number || "-"}
                            </span>

                          </div>

                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-slate-600">

                            <FaCalendarAlt className="text-blue-500" />

                            <span>
                              {report.inspection_date || "-"}
                            </span>

                          </div>

                        </td>

                        {/* DAMAGE */}
                        <td className="px-6 py-5">

                          <div className="max-w-xs text-sm text-slate-600 line-clamp-3">

                            {report.damage_description || "-"}

                          </div>

                        </td>

                        {/* REMARKS */}
                        <td className="px-6 py-5">

                          <div className="max-w-xs text-sm text-slate-600">

                            {report.remarks || "-"}

                          </div>

                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5 text-center">

                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-bold">

                            <FaCheckCircle />

                            {report.status}

                          </span>

                        </td>

                        {/* REPORT */}
                        <td className="px-6 py-5 text-center">

                          {report.report ? (

                            <a
                              href={`http://127.0.0.1:8000${report.report}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md transition"
                            >

                              <FaEye />

                              View Report

                            </a>

                          ) : (

                            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-500 text-xs font-semibold">

                              <FaExclamationCircle />

                              No Report

                            </span>

                          )}

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CompletedSurvey;