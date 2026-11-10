import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaClipboardCheck,
  FaCar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function ClaimStatus() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/claims/`);

      setClaims(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load claim status");
    } finally {
      setLoading(false);
    }
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return {
          className:
            "bg-green-100 text-green-700 border border-green-200",
          icon: <FaCheckCircle />,
        };

      case "Completed":
        return {
          className:
            "bg-blue-100 text-blue-700 border border-blue-200",
          icon: <FaCheckCircle />,
        };

      case "Settled":
        return {
          className:
            "bg-purple-100 text-purple-700 border border-purple-200",
          icon: <FaCheckCircle />,
        };

      case "Rejected":
        return {
          className:
            "bg-red-100 text-red-700 border border-red-200",
          icon: <FaTimesCircle />,
        };

      case "Pending":
      default:
        return {
          className:
            "bg-orange-100 text-orange-700 border border-orange-200",
          icon: <FaClock />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* ================= HEADER ================= */}

      <header className="
        bg-gradient-to-r
        from-[#001f3f]
        via-[#003b73]
        to-[#00509e]
        text-white
        shadow-xl
      ">

        <div className="px-6 md:px-10 py-6">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          ">

            {/* Title */}

            <div className="flex items-center gap-4">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-white/10
                border
                border-white/20
                flex
                items-center
                justify-center
              ">

                <FaClipboardCheck className="text-2xl text-blue-200" />

              </div>

              <div>

                <h1 className="
                  text-2xl
                  md:text-3xl
                  font-bold
                ">
                  Track Claim Status
                </h1>

                <p className="
                  text-sm
                  text-blue-200
                  mt-1
                ">
                  Monitor your vehicle insurance claim progress
                </p>

              </div>

            </div>

            {/* Total Claims */}

            <div className="
              flex
              items-center
              gap-3
              bg-white/10
              border
              border-white/20
              px-5
              py-3
              rounded-xl
            ">

              <FaClipboardCheck />

              <div>

                <p className="text-xs text-blue-200">
                  Total Claims
                </p>

                <p className="font-bold text-lg">
                  {claims.length}
                </p>

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="p-5 md:p-8">

        <div className="max-w-7xl mx-auto">


          {/* ================= INFO CARD ================= */}

          <div className="
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-slate-100
            p-6
            mb-8
          ">

            <div className="flex items-center gap-4">

              <div className="
                w-12
                h-12
                rounded-xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              ">

                <FaSearch />

              </div>

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-800
                ">
                  Your Insurance Claims
                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Check your claim number, vehicle details,
                  accident information and current status.
                </p>

              </div>

            </div>

          </div>


          {/* ================= TABLE ================= */}

          <div className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-slate-100
            overflow-hidden
          ">

            {/* Table Header */}

            <div className="
              px-6
              py-5
              border-b
              border-slate-100
            ">

              <h2 className="
                text-xl
                font-bold
                text-slate-800
              ">
                Claim Details
              </h2>

              <p className="
                text-sm
                text-slate-500
                mt-1
              ">
                Latest status of your submitted claims
              </p>

            </div>


            {/* Responsive Table */}

            <div className="overflow-x-auto">

              <table className="w-full">

                {/* ================= THEAD ================= */}

                <thead>

                  <tr className="
                    bg-gradient-to-r
                    from-[#003366]
                    to-[#00509e]
                    text-white
                  ">

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                    ">
                      Claim No
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                    ">
                      Vehicle No
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                    ">
                      Accident Date
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                    ">
                      Place
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-center
                      text-sm
                      font-semibold
                    ">
                      Status
                    </th>

                  </tr>

                </thead>


                {/* ================= TBODY ================= */}

                <tbody>

                  {/* Loading */}

                  {loading ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="p-12 text-center"
                      >

                        <div className="
                          flex
                          flex-col
                          items-center
                          gap-3
                        ">

                          <div className="
                            w-10
                            h-10
                            border-4
                            border-blue-200
                            border-t-blue-600
                            rounded-full
                            animate-spin
                          " />

                          <p className="
                            text-slate-500
                            font-medium
                          ">
                            Loading claim details...
                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : claims.length > 0 ? (

                    claims.map((item) => {

                      const status =
                        getStatusStyle(item.status);

                      return (

                        <tr
                          key={item.id}
                          className="
                            border-b
                            border-slate-100
                            hover:bg-blue-50/50
                            transition
                          "
                        >

                          {/* Claim Number */}

                          <td className="px-6 py-5">

                            <div className="
                              flex
                              items-center
                              gap-3
                            ">

                              <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                                flex
                                items-center
                                justify-center
                              ">

                                <FaClipboardCheck />

                              </div>

                              <div>

                                <p className="
                                  font-bold
                                  text-slate-800
                                ">
                                  {item.claim_number}
                                </p>

                                <p className="
                                  text-xs
                                  text-slate-400
                                ">
                                  Claim ID: {item.id}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Vehicle */}

                          <td className="px-6 py-5">

                            <div className="
                              flex
                              items-center
                              gap-3
                            ">

                              <div className="
                                w-9
                                h-9
                                rounded-lg
                                bg-indigo-100
                                text-indigo-600
                                flex
                                items-center
                                justify-center
                              ">

                                <FaCar />

                              </div>

                              <span className="
                                font-semibold
                                text-slate-700
                              ">
                                {item.vehicle_number}
                              </span>

                            </div>

                          </td>


                          {/* Accident Date */}

                          <td className="px-6 py-5">

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-slate-600
                            ">

                              <FaCalendarAlt className="
                                text-blue-500
                              " />

                              <span>
                                {item.accident_date}
                              </span>

                            </div>

                          </td>


                          {/* Place */}

                          <td className="px-6 py-5">

                            <div className="
                              flex
                              items-center
                              gap-2
                              text-slate-600
                            ">

                              <FaMapMarkerAlt className="
                                text-red-500
                              " />

                              <span>
                                {item.place}
                              </span>

                            </div>

                          </td>


                          {/* Status */}

                          <td className="
                            px-6
                            py-5
                            text-center
                          ">

                            <span className={`
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-bold
                              ${status.className}
                            `}>

                              {status.icon}

                              {item.status}

                            </span>

                          </td>

                        </tr>

                      );

                    })

                  ) : (

                    /* No Claims */

                    <tr>

                      <td
                        colSpan="5"
                        className="p-12 text-center"
                      >

                        <div className="
                          flex
                          flex-col
                          items-center
                        ">

                          <div className="
                            w-16
                            h-16
                            rounded-full
                            bg-slate-100
                            text-slate-400
                            flex
                            items-center
                            justify-center
                            mb-4
                          ">

                            <FaClipboardCheck className="text-2xl" />

                          </div>

                          <h3 className="
                            text-lg
                            font-bold
                            text-slate-700
                          ">
                            No Claims Found
                          </h3>

                          <p className="
                            text-sm
                            text-slate-500
                            mt-1
                          ">
                            You don't have any insurance claims yet.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= STATUS LEGEND ================= */}

          <div className="
            mt-6
            bg-white
            rounded-2xl
            shadow-md
            border
            border-slate-100
            p-5
          ">

            <h3 className="
              text-sm
              font-bold
              text-slate-700
              mb-4
            ">
              Status Guide
            </h3>

            <div className="
              flex
              flex-wrap
              gap-4
            ">

              <span className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-orange-100
                text-orange-700
                text-xs
                font-semibold
              ">
                <FaClock />
                Pending
              </span>

              <span className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-blue-100
                text-blue-700
                text-xs
                font-semibold
              ">
                <FaCheckCircle />
                Completed
              </span>

              <span className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-green-100
                text-green-700
                text-xs
                font-semibold
              ">
                <FaCheckCircle />
                Approved
              </span>

              <span className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-purple-100
                text-purple-700
                text-xs
                font-semibold
              ">
                <FaCheckCircle />
                Settled
              </span>

              <span className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-red-100
                text-red-700
                text-xs
                font-semibold
              ">
                <FaTimesCircle />
                Rejected
              </span>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ClaimStatus;