import React, { useState } from "react";
import axios from "axios";

function RaiseNewClaim() {
  const [claim, setClaim] = useState({
    vehicleNumber: "",
    accidentDate: "",
    accidentLocation: "",
    description: "",
  });

  const handleChange = (e) => {
    setClaim({
      ...claim,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Find vehicle
      const vehicleResponse = await axios.get(
        `http://127.0.0.1:8000/api/vehicles/?vehicle_number=${claim.vehicleNumber}`
      );

      console.log("Vehicle Response:", vehicleResponse.data);

      if (vehicleResponse.data.length === 0) {
        alert("Vehicle not found.");
        return;
      }

      const vehicle = vehicleResponse.data[0];

      const payload = {
        vehicle: vehicle.id,
        claim_number: "CLM" + Date.now(),
        accident_date: claim.accidentDate,
        place: claim.accidentLocation,
        loss_details: claim.description,
        status: "Pending",
      };

      console.log("Sending Claim:", payload);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/claims/",
        payload
      );

      console.log("Claim Created:", response.data);

      alert("Claim Submitted Successfully");

      setClaim({
        vehicleNumber: "",
        accidentDate: "",
        accidentLocation: "",
        description: "",
      });
    } catch (error) {
      console.log("POST ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);

      alert("Unable to submit claim.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#1565c0] px-8 py-6 text-white">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Raise New Claim
              </h2>

              <p className="text-blue-100 text-sm mt-1">
                Submit your vehicle insurance claim
              </p>
            </div>

          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          {/* Vehicle Number */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vehicle Number
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🚗
              </span>

              <input
                type="text"
                name="vehicleNumber"
                value={claim.vehicleNumber}
                onChange={handleChange}
                placeholder="Enter Vehicle Number"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                bg-gray-50 text-gray-800
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />

            </div>

          </div>

          {/* Accident Date */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Accident Date
            </label>

            <input
              type="date"
              name="accidentDate"
              value={claim.accidentDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
              bg-gray-50 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 transition"
            />

          </div>

          {/* Accident Location */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Accident Location
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                📍
              </span>

              <input
                type="text"
                name="accidentLocation"
                value={claim.accidentLocation}
                onChange={handleChange}
                placeholder="Enter Accident Location"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                bg-gray-50 text-gray-800
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />

            </div>

          </div>

          {/* Loss Details */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loss Details
            </label>

            <textarea
              name="description"
              rows="5"
              value={claim.description}
              onChange={handleChange}
              placeholder="Describe the accident and vehicle damage"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
              bg-gray-50 text-gray-800 resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 transition"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5
            bg-gradient-to-r from-[#1565c0] to-[#003366]
            text-white rounded-xl
            font-bold text-lg
            shadow-lg
            hover:from-[#0d47a1] hover:to-[#00264d]
            hover:shadow-xl
            active:scale-[0.98]
            transition duration-200"
          >
            Submit Claim
          </button>

          {/* Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

            <div className="flex gap-3">

              <span className="text-xl">
                ℹ️
              </span>

              <p className="text-sm text-blue-700">
                Please enter the correct vehicle number and accident details
                before submitting your insurance claim.
              </p>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default RaiseNewClaim;