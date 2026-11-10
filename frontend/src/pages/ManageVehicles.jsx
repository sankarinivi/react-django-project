import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaCar,
  FaUser,
  FaShieldAlt,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSyncAlt,
} from "react-icons/fa";

function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customer: "",
    vehicle_number: "",
    Vehicle_model: "",
    insurance_company: "icici",
    policy_number: "",
  });

  useEffect(() => {
    fetchVehicles();
    fetchCustomers();
  }, []);

  // =========================
  // GET VEHICLES
  // =========================
  const fetchVehicles = async () => {
    try {
      const response = await api.get("vehicles/");
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // GET CUSTOMERS
  // =========================
  const fetchCustomers = async () => {
    try {
      const response = await api.get("customers/");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD / UPDATE VEHICLE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`vehicles/${editingId}/`, formData);
        alert("Vehicle Updated Successfully");
      } else {
        await api.post("vehicles/", formData);
        alert("Vehicle Added Successfully");
      }

      resetForm();
      fetchVehicles();
    } catch (error) {
      console.log(error.response?.data);
      alert("Operation Failed");
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      customer: "",
      vehicle_number: "",
      Vehicle_model: "",
      insurance_company: "icici",
      policy_number: "",
    });

    setEditingId(null);
  };

  // =========================
  // EDIT VEHICLE
  // =========================
  const editVehicle = (vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      customer: vehicle.customer,
      vehicle_number: vehicle.vehicle_number,
      Vehicle_model: vehicle.Vehicle_model,
      insurance_company: vehicle.insurance_company,
      policy_number: vehicle.policy_number,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE VEHICLE
  // =========================
  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await api.delete(`vehicles/${id}/`);

      alert("Vehicle Deleted Successfully");

      fetchVehicles();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-[#002b5c] via-[#004b87] to-[#0072bc] text-white shadow-xl">

        <div className="max-w-7xl mx-auto px-6 py-7">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">
                <FaCar className="text-2xl" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-wide">
                  Manage Vehicles
                </h1>

                <p className="text-blue-100 mt-1">
                  Add, update and manage registered vehicles
                </p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">

              <p className="text-xs text-blue-100">
                Total Vehicles
              </p>

              <p className="text-2xl font-bold">
                {vehicles.length}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">


        {/* ================= FORM CARD ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">

          {/* FORM HEADER */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-7 py-5 border-b border-gray-200">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                {editingId ? (
                  <FaEdit />
                ) : (
                  <FaPlus />
                )}
              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-800">

                  {editingId
                    ? "Update Vehicle"
                    : "Add New Vehicle"}

                </h2>

                <p className="text-sm text-gray-500">
                  {editingId
                    ? "Update the selected vehicle information"
                    : "Enter vehicle and insurance details"}
                </p>

              </div>

            </div>

          </div>


          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-7"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


              {/* CUSTOMER */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaUser className="text-blue-600" />
                  Customer
                </label>

                <select
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >

                  <option value="">
                    Select Customer
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.username}
                    </option>
                  ))}

                </select>

              </div>


              {/* VEHICLE NUMBER */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCar className="text-blue-600" />
                  Vehicle Number
                </label>

                <input
                  type="text"
                  name="vehicle_number"
                  placeholder="TN 01 AB 1234"
                  value={formData.vehicle_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>


              {/* MODEL */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCar className="text-blue-600" />
                  Vehicle Model
                </label>

                <input
                  type="text"
                  name="Vehicle_model"
                  placeholder="Example: Thar"
                  value={formData.Vehicle_model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>


              {/* INSURANCE */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaShieldAlt className="text-blue-600" />
                  Insurance Company
                </label>

                <select
                  name="insurance_company"
                  value={formData.insurance_company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >

                  <option value="icici">
                    ICICI
                  </option>

                  <option value="acko">
                    ACKO
                  </option>

                  <option value="tata">
                    TATA
                  </option>

                </select>

              </div>


              {/* POLICY NUMBER */}
              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaFileAlt className="text-blue-600" />
                  Policy Number
                </label>

                <input
                  type="text"
                  name="policy_number"
                  placeholder="Enter policy number"
                  value={formData.policy_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>


            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 mt-7 pt-6 border-t border-gray-100">

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
              >

                {editingId ? (
                  <>
                    <FaEdit />
                    Update Vehicle
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add Vehicle
                  </>
                )}

              </button>


              {editingId && (

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  <FaSyncAlt />
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>


        {/* ================= VEHICLE TABLE ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-7 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                Registered Vehicles
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and manage all customer vehicles
              </p>

            </div>

            <span className="inline-flex w-fit items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
              {vehicles.length} Vehicles
            </span>

          </div>


          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead>

                <tr className="bg-gradient-to-r from-[#003366] to-[#00509e] text-white">

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    ID
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Vehicle Number
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Model
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Insurance
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Policy Number
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {vehicles.length > 0 ? (

                  vehicles.map((vehicle, index) => (

                    <tr
                      key={vehicle.id}
                      className="border-b border-gray-100 hover:bg-blue-50/70 transition duration-200"
                    >

                      {/* ID */}
                      <td className="px-5 py-4">

                        <span className="w-8 h-8 rounded-lg bg-gray-100 inline-flex items-center justify-center text-sm font-bold text-gray-600">
                          {index + 1}
                        </span>

                      </td>


                      {/* CUSTOMER */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FaUser />
                          </div>

                          <span className="font-semibold text-gray-700">
                            {vehicle.customer_name ||
                              vehicle.customer ||
                              "N/A"}
                          </span>

                        </div>

                      </td>


                      {/* VEHICLE NUMBER */}
                      <td className="px-5 py-4">

                        <span className="font-bold text-gray-800">
                          {vehicle.vehicle_number}
                        </span>

                      </td>


                      {/* MODEL */}
                      <td className="px-5 py-4 text-gray-600">
                        {vehicle.Vehicle_model}
                      </td>


                      {/* INSURANCE */}
                      <td className="px-5 py-4">

                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase">
                          {vehicle.insurance_company}
                        </span>

                      </td>


                      {/* POLICY */}
                      <td className="px-5 py-4">

                        <span className="font-mono text-sm text-gray-600">
                          {vehicle.policy_number}
                        </span>

                      </td>


                      {/* ACTION */}
                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              editVehicle(vehicle)
                            }
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm hover:bg-blue-600 hover:text-white transition"
                          >
                            <FaEdit />
                            Edit
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              deleteVehicle(vehicle.id)
                            }
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold text-sm hover:bg-red-600 hover:text-white transition"
                          >
                            <FaTrash />
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <FaCar className="text-2xl text-gray-400" />
                        </div>

                        <p className="text-gray-500 font-semibold">
                          No Vehicles Found
                        </p>

                        <p className="text-gray-400 text-sm mt-1">
                          Add a vehicle to see it here.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ManageVehicles;