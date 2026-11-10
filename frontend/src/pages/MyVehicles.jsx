
import React, { useEffect, useState } from "react";
import api from "../services/api";

function AssignSurveyor() {
  const [claims, setClaims] = useState([]);
  const [surveyors, setSurveyors] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    claim: "",
    surveyor: "",
    inspection_date: "",
    remarks: "",
  });

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchClaims(),
        fetchSurveyors(),
        fetchAssignments(),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GET CLAIMS
  // =====================================================

  const fetchClaims = async () => {
    try {
      const response = await api.get("claims/");

      console.log("CLAIMS:", response.data);

      if (Array.isArray(response.data)) {
        setClaims(response.data);
      } else if (Array.isArray(response.data.results)) {
        setClaims(response.data.results);
      } else {
        setClaims([]);
      }
    } catch (error) {
      console.error("Claims error:", error);
    }
  };

  // =====================================================
  // GET SURVEYORS
  // =====================================================

  const fetchSurveyors = async () => {
    try {
      const response = await api.get("userprofiles/");

      console.log("USER PROFILES:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      const surveyorList = data.filter(
        (item) =>
          item.role?.toLowerCase() === "surveyor" ||
          item.user?.role?.toLowerCase() === "surveyor"
      );

      setSurveyors(surveyorList);
    } catch (error) {
      console.error("Surveyor error:", error);
    }
  };

  // =====================================================
  // GET ASSIGNMENTS
  // =====================================================

  const fetchAssignments = async () => {
    try {
      const response = await api.get("surveyassignments/");

      console.log("ASSIGNMENTS:", response.data);

      if (Array.isArray(response.data)) {
        setAssignments(response.data);
      } else if (Array.isArray(response.data.results)) {
        setAssignments(response.data.results);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error("Assignments error:", error);
    }
  };

  // =====================================================
  // CHECK WHETHER CLAIM IS ALREADY ASSIGNED
  // =====================================================

  const isClaimAssigned = (claimId) => {
    return assignments.some(
      (assignment) =>
        String(assignment.claim) === String(claimId) ||
        String(assignment.claim_id) === String(claimId)
    );
  };

  // =====================================================
  // ONLY PENDING + NOT ASSIGNED CLAIMS
  // =====================================================

  const pendingVehicles = claims.filter((claim) => {
    const status = claim.status?.toLowerCase();

    const isPending =
      status === "pending" ||
      status === "pending assignment";

    const alreadyAssigned = isClaimAssigned(claim.id);

    return isPending && !alreadyAssigned;
  });

  // =====================================================
  // SELECT CLAIM
  // =====================================================

  const handleClaimChange = (e) => {
    setFormData({
      ...formData,
      claim: e.target.value,
    });
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // ASSIGN SURVEYOR
  // =====================================================

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!formData.claim) {
      alert("Please select a pending vehicle");
      return;
    }

    if (!formData.surveyor) {
      alert("Please select a surveyor");
      return;
    }

    try {
      setLoading(true);

      console.log("ASSIGN DATA:", formData);

      await api.post("surveyassignments/", {
        claim: formData.claim,
        surveyor: formData.surveyor,
        inspection_date: formData.inspection_date,
        remarks: formData.remarks,
      });

      alert("Surveyor assigned successfully");

      // Clear form
      setFormData({
        claim: "",
        surveyor: "",
        inspection_date: "",
        remarks: "",
      });

      // Refresh data
      await fetchClaims();
      await fetchAssignments();
    } catch (error) {
      console.error("Assignment error:", error);

      console.log(
        "Backend response:",
        error.response?.data
      );

      alert(
        error.response?.data?.detail ||
          "Failed to assign surveyor"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SELECTED CLAIM DETAILS
  // =====================================================

  const selectedClaim = claims.find(
    (claim) =>
      String(claim.id) === String(formData.claim)
  );

  // =====================================================
  // GET SURVEYOR NAME
  // =====================================================

  const getSurveyorName = (surveyor) => {
    return (
      surveyor.username ||
      surveyor.user?.username ||
      surveyor.user?.first_name ||
      `Surveyor ${surveyor.id}`
    );
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 md:p-10">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="max-w-7xl mx-auto mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
              🔎
            </div>

            <div>

              <h1 className="text-3xl font-bold text-[#003366]">
                Assign Surveyor
              </h1>

              <p className="text-gray-500 mt-1">
                Assign surveyors to pending customer claim vehicles
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 text-sm font-semibold">
                Pending Vehicles
              </p>

              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {pendingVehicles.length}
              </p>
            </div>

            <div className="text-4xl">
              🚗
            </div>

          </div>

        </div>

        {/* Surveyors */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm font-semibold">
                Available Surveyors
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {surveyors.length}
              </p>

            </div>

            <div className="text-4xl">
              👨‍🔧
            </div>

          </div>

        </div>

        {/* Assigned */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm font-semibold">
                Assigned Vehicles
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {assignments.length}
              </p>

            </div>

            <div className="text-4xl">
              ✅
            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          MAIN FORM
      ================================================= */}

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-7">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-[#003366]">
              Assign Surveyor to Pending Vehicle
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Only pending and unassigned customer claims are displayed.
            </p>

          </div>

          {/* =================================================
              NO PENDING VEHICLES
          ================================================= */}

          {pendingVehicles.length === 0 ? (

            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">

              <div className="text-5xl mb-3">
                ✅
              </div>

              <h3 className="text-xl font-bold text-green-700">
                No Pending Vehicles
              </h3>

              <p className="text-green-600 mt-2">
                There are currently no pending customer claims
                waiting for surveyor assignment.
              </p>

            </div>

          ) : (

            <form onSubmit={handleAssign}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* =================================================
                    PENDING VEHICLE
                ================================================= */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pending Vehicle / Claim
                  </label>

                  <select
                    name="claim"
                    value={formData.claim}
                    onChange={handleClaimChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >

                    <option value="">
                      -- Select Pending Vehicle --
                    </option>

                    {pendingVehicles.map((claim) => (

                      <option
                        key={claim.id}
                        value={claim.id}
                      >

                        {claim.claim_number || `Claim #${claim.id}`}
                        {" - "}
                        {claim.vehicle_number ||
                          claim.vehicle?.vehicle_number ||
                          "Vehicle"}

                      </option>

                    ))}

                  </select>

                </div>

                {/* =================================================
                    SURVEYOR
                ================================================= */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Surveyor
                  </label>

                  <select
                    name="surveyor"
                    value={formData.surveyor}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >

                    <option value="">
                      -- Select Surveyor --
                    </option>

                    {surveyors.map((surveyor) => (

                      <option
                        key={surveyor.id}
                        value={
                          surveyor.user?.id ||
                          surveyor.user_id ||
                          surveyor.id
                        }
                      >

                        {getSurveyorName(surveyor)}

                      </option>

                    ))}

                  </select>

                </div>

                {/* =================================================
                    CUSTOMER NAME
                ================================================= */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Customer
                  </label>

                  <input
                    type="text"
                    value={
                      selectedClaim?.customer_name ||
                      selectedClaim?.customer?.username ||
                      selectedClaim?.customer?.user?.username ||
                      ""
                    }
                    readOnly
                    placeholder="Customer name"
                    className="w-full border border-gray-300 bg-gray-100 rounded-xl px-4 py-3"
                  />

                </div>

                {/* =================================================
                    VEHICLE NUMBER
                ================================================= */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    value={
                      selectedClaim?.vehicle_number ||
                      selectedClaim?.vehicle?.vehicle_number ||
                      ""
                    }
                    readOnly
                    placeholder="Vehicle number"
                    className="w-full border border-gray-300 bg-gray-100 rounded-xl px-4 py-3 font-bold"
                  />

                </div>

                {/* =================================================
                    INSPECTION DATE
                ================================================= */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Inspection Date
                  </label>

                  <input
                    type="date"
                    name="inspection_date"
                    value={formData.inspection_date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                </div>

                {/* =================================================
                    REMARKS
                ================================================= */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Remarks
                  </label>

                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

              {/* =================================================
                  ASSIGN BUTTON
              ================================================= */}

              <div className="mt-7">

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:bg-gray-400"
                >

                  {loading
                    ? "Assigning..."
                    : "🔎 Assign Surveyor"}

                </button>

              </div>

            </form>

          )}

        </div>

      </div>

      {/* =================================================
          PENDING VEHICLE LIST
      ================================================= */}

      <div className="max-w-7xl mx-auto mt-8">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-200">

            <h2 className="text-xl font-bold text-[#003366]">
              Pending Vehicles Waiting for Surveyor
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Customer-raised claims that have not yet been assigned
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="bg-[#003366] text-white">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Claim No
                  </th>

                  <th className="px-5 py-4 text-left">
                    Vehicle No
                  </th>

                  <th className="px-5 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {pendingVehicles.length > 0 ? (

                  pendingVehicles.map((claim) => (

                    <tr
                      key={claim.id}
                      className="border-b hover:bg-blue-50 transition"
                    >

                      <td className="px-5 py-4 font-semibold">
                        {claim.claim_number ||
                          `CLM-${claim.id}`}
                      </td>

                      <td className="px-5 py-4 font-bold">
                        {claim.vehicle_number ||
                          claim.vehicle?.vehicle_number ||
                          "-"}
                      </td>

                      <td className="px-5 py-4">
                        {claim.customer_name ||
                          claim.customer?.username ||
                          claim.customer?.user?.username ||
                          "-"}
                      </td>

                      <td className="px-5 py-4">

                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                          Pending
                        </span>

                      </td>

                      <td className="px-5 py-4 text-center">

                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              claim: claim.id,
                            })
                          }
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                        >
                          Assign
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-12 text-gray-500"
                    >

                      <div className="text-4xl mb-3">
                        ✅
                      </div>

                      <p className="font-semibold">
                        No Pending Vehicles
                      </p>

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

export default AssignSurveyor;