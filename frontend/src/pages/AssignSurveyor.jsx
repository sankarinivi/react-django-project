import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUserTie,
  FaClipboardList,
  FaCar,
  FaCalendarAlt,
  FaCommentAlt,
  FaUserCheck,
  FaSearch,
  FaSyncAlt,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function AssignSurveyor() {
  const [claims, setClaims] = useState([]);
  const [surveyors, setSurveyors] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [formData, setFormData] = useState({
    claim: "",
    surveyor: "",
    inspection_date: "",
    remarks: "",
  });

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([
      fetchClaims(),
      fetchSurveyors(),
      fetchAssignments(),
    ]);
  };

  // =====================================================
  // FETCH CLAIMS
  // =====================================================

  const fetchClaims = async () => {
    try {
      const res = await axios.get(`${API_URL}/claims/`);

      console.log("ALL CLAIMS:", res.data);

      setClaims(res.data);

    } catch (error) {
      console.log("Claims Error:", error);
    }
  };

  // =====================================================
  // FETCH SURVEYORS
  // =====================================================

  const fetchSurveyors = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/userprofiles/`
      );

      console.log("ALL USERS:", res.data);

      const surveyorList = res.data.filter(
        (user) =>
          user.role?.toLowerCase() === "surveyor"
      );

      console.log("SURVEYORS:", surveyorList);

      setSurveyors(surveyorList);

    } catch (error) {
      console.log("Surveyor Error:", error);
    }
  };

  // =====================================================
  // FETCH EXISTING ASSIGNMENTS
  // =====================================================

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/surveyassignments/`
      );

      console.log("ALL ASSIGNMENTS:", res.data);

      setAssignments(res.data);

    } catch (error) {
      console.log("Assignment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PENDING + NOT ASSIGNED CLAIMS
  // =====================================================

  const pendingUnassignedClaims = claims.filter(
    (claim) => {

      // Claim must be Pending
      const isPending =
        claim.status?.toLowerCase() === "pending";

      // Check whether this claim is already assigned
      const alreadyAssigned = assignments.some(
        (assignment) =>
          String(assignment.claim) ===
          String(claim.id)
      );

      // Only Pending AND NOT ASSIGNED
      return isPending && !alreadyAssigned;
    }
  );

  // =====================================================
  // HANDLE FORM CHANGE
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.claim) {
      alert("Please select a pending vehicle.");
      return;
    }

    if (!formData.surveyor) {
      alert("Please select a surveyor.");
      return;
    }

    if (!formData.inspection_date) {
      alert("Please select inspection date.");
      return;
    }

    try {
      setAssigning(true);

      console.log(
        "ASSIGNMENT DATA:",
        formData
      );

      await axios.post(
        `${API_URL}/surveyassignments/`,
        formData
      );

      alert(
        "Surveyor assigned successfully!"
      );

      // Clear form
      setFormData({
        claim: "",
        surveyor: "",
        inspection_date: "",
        remarks: "",
      });

      // Refresh everything
      await fetchClaims();
      await fetchAssignments();

    } catch (error) {

      console.log(
        "ASSIGNMENT ERROR:",
        error
      );

      console.log(
        "BACKEND ERROR:",
        error.response?.data
      );

      alert(
        error.response?.data?.detail ||
        "Surveyor assignment failed."
      );

    } finally {
      setAssigning(false);
    }
  };

  // =====================================================
  // SEARCH ASSIGNED
  // =====================================================

  const filteredAssignments =
    assignments.filter((item) => {

      const searchText =
        search.toLowerCase();

      return (
        item.claim_number
          ?.toLowerCase()
          .includes(searchText) ||

        item.customer_name
          ?.toLowerCase()
          .includes(searchText) ||

        item.vehicle_number
          ?.toLowerCase()
          .includes(searchText) ||

        item.surveyor_name
          ?.toLowerCase()
          .includes(searchText) ||

        item.status
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {

    switch (status?.toLowerCase()) {

      case "completed":
        return "bg-green-100 text-green-700 border border-green-200";

      case "approved":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "pending":
        return "bg-orange-100 text-orange-700 border border-orange-200";

      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200";

      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    loadData();
  };

  // =====================================================
  // SELECTED CLAIM
  // =====================================================

  const selectedClaim =
    pendingUnassignedClaims.find(
      (claim) =>
        String(claim.id) ===
        String(formData.claim)
    );

  return (

    <div className="min-h-screen bg-slate-100">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header
        className="
          bg-gradient-to-r
          from-slate-950
          via-blue-950
          to-blue-900
          text-white
          shadow-xl
        "
      >

        <div className="px-5 md:px-8 py-6">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
            "
          >

            {/* TITLE */}

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-blue-500/20
                  border
                  border-blue-400/20
                  flex
                  items-center
                  justify-center
                "
              >

                <FaUserTie
                  className="
                    text-2xl
                    text-blue-300
                  "
                />

              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                  "
                >
                  Assign Surveyor
                </h1>

                <p
                  className="
                    text-blue-300
                    text-sm
                    mt-1
                  "
                >
                  Assign surveyors to pending
                  unassigned vehicles
                </p>

              </div>

            </div>

            {/* REFRESH */}

            <button
              onClick={handleRefresh}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                rounded-xl
                text-sm
                font-semibold
                transition
              "
            >

              <FaSyncAlt />

              Refresh

            </button>

          </div>

        </div>

      </header>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="p-5 md:p-8">

        <div className="max-w-7xl mx-auto">


          {/* ================================================= */}
          {/* SUMMARY */}
          {/* ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
              mb-8
            "
          >

            {/* PENDING UNASSIGNED */}

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                border
                border-slate-200
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      font-medium
                    "
                  >
                    Pending Vehicles
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-extrabold
                      text-orange-500
                      mt-2
                    "
                  >
                    {pendingUnassignedClaims.length}
                  </h2>

                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-orange-100
                    text-orange-600
                    flex
                    items-center
                    justify-center
                  "
                >

                  <FaCar />

                </div>

              </div>

              <p
                className="
                  text-xs
                  text-slate-400
                  mt-3
                "
              >
                Pending and not assigned
              </p>

            </div>


            {/* SURVEYORS */}

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                border
                border-slate-200
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      font-medium
                    "
                  >
                    Total Surveyors
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-extrabold
                      text-indigo-600
                      mt-2
                    "
                  >
                    {surveyors.length}
                  </h2>

                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-indigo-100
                    text-indigo-600
                    flex
                    items-center
                    justify-center
                  "
                >

                  <FaUsers />

                </div>

              </div>

              <p
                className="
                  text-xs
                  text-slate-400
                  mt-3
                "
              >
                Registered surveyors
              </p>

            </div>


            {/* ASSIGNED */}

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                border
                border-slate-200
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      font-medium
                    "
                  >
                    Assigned Vehicles
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-extrabold
                      text-green-600
                      mt-2
                    "
                  >
                    {assignments.length}
                  </h2>

                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-green-100
                    text-green-600
                    flex
                    items-center
                    justify-center
                  "
                >

                  <FaUserCheck />

                </div>

              </div>

              <p
                className="
                  text-xs
                  text-slate-400
                  mt-3
                "
              >
                Already assigned vehicles
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* ASSIGNMENT FORM */}
          {/* ================================================= */}

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              overflow-hidden
              mb-8
            "
          >

            {/* HEADER */}

            <div
              className="
                px-6
                py-5
                bg-gradient-to-r
                from-blue-50
                to-indigo-50
                border-b
                border-blue-100
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >

                  <FaUserCheck />

                </div>

                <div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-slate-800
                    "
                  >
                    Assign Surveyor
                  </h2>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Select a pending vehicle
                    that has not been assigned
                  </p>

                </div>

              </div>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8"
            >

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-6
                "
              >

                {/* VEHICLE / CLAIM */}

                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >

                    <FaCar
                      className="text-blue-500"
                    />

                    Pending Vehicle

                  </label>

                  <select
                    name="claim"
                    value={formData.claim}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-slate-700
                      outline-none
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      transition
                    "
                  >

                    <option value="">
                      Select Pending Vehicle
                    </option>

                    {pendingUnassignedClaims.map(
                      (claim) => (

                        <option
                          key={claim.id}
                          value={claim.id}
                        >

                          {claim.vehicle_number ||
                            "Vehicle"}

                          {" - "}

                          {claim.claim_number ||
                            `Claim ${claim.id}`}

                          {" - Pending"}

                        </option>

                      )
                    )}

                  </select>

                  {pendingUnassignedClaims.length ===
                    0 && (

                    <p
                      className="
                        text-xs
                        text-red-500
                        mt-2
                      "
                    >
                      No pending unassigned
                      vehicles available.
                    </p>

                  )}

                </div>


                {/* SURVEYOR */}

                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >

                    <FaUserTie
                      className="text-indigo-500"
                    />

                    Select Surveyor

                  </label>

                  <select
                    name="surveyor"
                    value={formData.surveyor}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-slate-700
                      outline-none
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                      transition
                    "
                  >

                    <option value="">
                      Select Surveyor
                    </option>

                    {surveyors.map(
                      (surveyor) => (

                        <option
                          key={surveyor.id}
                          value={surveyor.id}
                        >

                          {surveyor.username ||
                            surveyor.user?.username ||
                            surveyor.name ||
                            surveyor.id}

                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* CUSTOMER */}

                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >

                    <FaUser
                      className="text-green-500"
                    />

                    Customer

                  </label>

                  <input
                    type="text"
                    value={
                      selectedClaim
                        ?.customer_name || ""
                    }
                    placeholder="Customer name"
                    readOnly
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-100
                      border
                      border-slate-200
                      rounded-xl
                      text-slate-600
                      outline-none
                    "
                  />

                </div>


                {/* VEHICLE NUMBER */}

                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >

                    <FaCar
                      className="text-purple-500"
                    />

                    Vehicle Number

                  </label>

                  <input
                    type="text"
                    value={
                      selectedClaim
                        ?.vehicle_number || ""
                    }
                    placeholder="Vehicle number"
                    readOnly
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-100
                      border
                      border-slate-200
                      rounded-xl
                      text-slate-600
                      outline-none
                    "
                  />

                </div>


                {/* INSPECTION DATE */}

                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >

                    <FaCalendarAlt
                      className="text-orange-500"
                    />

                    Inspection Date

                  </label>

                  <input
                    type="date"
                    name="inspection_date"
                    value={
                      formData.inspection_date
                    }
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-slate-700
                      outline-none
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-100
                      transition
                    "
                  />

                </div>


                {/* REMARKS */}

                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-2
                    "
                  >

                    <FaCommentAlt
                      className="text-purple-500"
                    />

                    Remarks

                  </label>

                  <textarea
                    name="remarks"
                    rows="1"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks..."
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-slate-700
                      placeholder:text-slate-400
                      outline-none
                      resize-none
                      focus:border-purple-500
                      focus:ring-4
                      focus:ring-purple-100
                      transition
                    "
                  />

                </div>

              </div>


              {/* SUBMIT */}

              <div
                className="
                  mt-7
                  flex
                  justify-end
                "
              >

                <button
                  type="submit"
                  disabled={
                    assigning ||
                    pendingUnassignedClaims.length ===
                      0 ||
                    surveyors.length === 0
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-7
                    py-3.5
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    hover:from-blue-700
                    hover:to-indigo-700
                    text-white
                    rounded-xl
                    font-bold
                    shadow-lg
                    shadow-blue-200
                    hover:-translate-y-0.5
                    active:scale-[0.98]
                    transition-all
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >

                  <FaUserCheck />

                  {assigning
                    ? "Assigning..."
                    : "Assign Surveyor"}

                </button>

              </div>

            </form>

          </div>


          {/* ================================================= */}
          {/* ASSIGNED TABLE */}
          {/* ================================================= */}

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              overflow-hidden
            "
          >

            {/* TABLE HEADER */}

            <div
              className="
                p-6
                border-b
                border-slate-100
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-800
                  "
                >
                  Assigned Vehicles
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-1
                  "
                >
                  Vehicles already assigned
                  to surveyors
                </p>

              </div>


              {/* SEARCH */}

              <div
                className="
                  relative
                  w-full
                  md:w-80
                "
              >

                <FaSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  placeholder="Search vehicle or surveyor..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-xl
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />

              </div>

            </div>


            {/* TABLE */}

            <div className="overflow-x-auto">

              <table
                className="
                  w-full
                  min-w-[950px]
                "
              >

                <thead>

                  <tr
                    className="
                      bg-slate-50
                      border-b
                      border-slate-200
                    "
                  >

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Claim
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Customer
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Vehicle
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Surveyor
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Inspection Date
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody
                  className="
                    divide-y
                    divide-slate-100
                  "
                >

                  {loading ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="
                          px-6
                          py-14
                          text-center
                        "
                      >

                        <FaSyncAlt
                          className="
                            mx-auto
                            text-3xl
                            text-blue-500
                            animate-spin
                            mb-3
                          "
                        />

                        <p
                          className="
                            text-slate-500
                          "
                        >
                          Loading...
                        </p>

                      </td>

                    </tr>

                  ) : filteredAssignments.length >
                    0 ? (

                    filteredAssignments.map(
                      (item) => (

                        <tr
                          key={item.id}
                          className="
                            hover:bg-blue-50/50
                            transition
                          "
                        >

                          {/* CLAIM */}

                          <td
                            className="
                              px-6
                              py-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  w-10
                                  h-10
                                  rounded-xl
                                  bg-blue-100
                                  text-blue-600
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaClipboardList />

                              </div>

                              <span
                                className="
                                  font-bold
                                  text-slate-800
                                "
                              >
                                {item.claim_number ||
                                  item.claim ||
                                  "-"}
                              </span>

                            </div>

                          </td>


                          {/* CUSTOMER */}

                          <td
                            className="
                              px-6
                              py-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <FaUser
                                className="
                                  text-slate-400
                                "
                              />

                              <span
                                className="
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {item.customer_name ||
                                  "-"}
                              </span>

                            </div>

                          </td>


                          {/* VEHICLE */}

                          <td
                            className="
                              px-6
                              py-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <FaCar
                                className="
                                  text-slate-400
                                "
                              />

                              <span
                                className="
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {item.vehicle_number ||
                                  "-"}
                              </span>

                            </div>

                          </td>


                          {/* SURVEYOR */}

                          <td
                            className="
                              px-6
                              py-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-full
                                  bg-indigo-100
                                  text-indigo-600
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaUserTie />

                              </div>

                              <span
                                className="
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {item.surveyor_name ||
                                  item.surveyor ||
                                  "-"}
                              </span>

                            </div>

                          </td>


                          {/* DATE */}

                          <td
                            className="
                              px-6
                              py-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-slate-600
                              "
                            >

                              <FaCalendarAlt
                                className="
                                  text-slate-400
                                "
                              />

                              {item.inspection_date ||
                                "Not scheduled"}

                            </div>

                          </td>


                          {/* STATUS */}

                          <td
                            className="
                              px-6
                              py-5
                            "
                          >

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                text-xs
                                font-bold
                                ${getStatusStyle(
                                  item.status
                                )}
                              `}
                            >

                              {item.status
                                ?.toLowerCase() ===
                              "completed" ? (
                                <FaCheckCircle />
                              ) : (
                                <FaClock />
                              )}

                              {item.status ||
                                "Pending"}

                            </span>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="
                          px-6
                          py-16
                          text-center
                        "
                      >

                        <div
                          className="
                            flex
                            flex-col
                            items-center
                          "
                        >

                          <div
                            className="
                              w-16
                              h-16
                              rounded-2xl
                              bg-green-100
                              text-green-500
                              flex
                              items-center
                              justify-center
                              mb-4
                            "
                          >

                            <FaCheckCircle
                              className="text-2xl"
                            />

                          </div>

                          <h3
                            className="
                              font-bold
                              text-slate-700
                            "
                          >
                            No Assigned Vehicles
                          </h3>

                          <p
                            className="
                              text-sm
                              text-slate-400
                              mt-1
                            "
                          >
                            No vehicles have been
                            assigned yet.
                          </p>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* FOOTER */}

            <div
              className="
                px-6
                py-4
                bg-slate-50
                border-t
                border-slate-100
              "
            >

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >

                Showing{" "}

                <span
                  className="
                    font-bold
                    text-slate-700
                  "
                >
                  {filteredAssignments.length}
                </span>

                {" "}of{" "}

                <span
                  className="
                    font-bold
                    text-slate-700
                  "
                >
                  {assignments.length}
                </span>

                {" "}assigned vehicles

              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AssignSurveyor;