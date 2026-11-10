import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import NewUser from "./pages/NewUser";

import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import SurveyorDashboard from "./pages/SurveyorDashboard";

import CustomerProfile from "./pages/CustomerProfile";
import MyVehicles from "./pages/MyVehicles";
import RaiseNewClaim from "./pages/RaiseNewClaim";
import ClaimStatus from "./pages/ClaimStatus";
import SurveyStatus from "./pages/SurveyStatus";

import ManageUsers from "./pages/ManageUsers";
import ManageClaims from "./pages/ManageClaims";
import ManageVehicles from "./pages/ManageVehicles";
import AssignSurveyor from "./pages/AssignSurveyor";  
import LiabilityLetter from "./pages/LiabilityLetter";
import ViewSurveyReport from "./pages/ViewSurveyReport";
import ClaimSettlement from "./pages/ClaimSettlement";
 

import AssignedClaims from "./pages/AssignedClaims";
import VehicleInspection from "./pages/VehicleInspection";
import UploadSurveyReport from "./pages/UploadSurveyReport";
import CompletedSurvey from "./pages/CompletedSurvey";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/new-user" element={<NewUser />} />

      {/* Admin */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-vehicles" element={<ManageVehicles />} />
      <Route path="/manage-claims" element={<ManageClaims />} />
      <Route path="/assign-surveyor" element={<AssignSurveyor />} />
      <Route path="/liability-letter" element={<LiabilityLetter />} />
      <Route path="/view-survey-report" element={<ViewSurveyReport />} />
      <Route path="/claim-settlement"  element={<ClaimSettlement />}/>

      {/* Customer */}
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />
      <Route path="/my-vehicles" element={<MyVehicles />} />
      <Route path="/raise-new-claim" element={<RaiseNewClaim />} />
      <Route path="/claim-status" element={<ClaimStatus />} />
      <Route path="/survey-status" element={<SurveyStatus />} />

      {/* Surveyor */}
      <Route path="/surveyor-dashboard" element={<SurveyorDashboard />} />
      <Route path="/assigned-claims" element={<AssignedClaims />} />
      <Route path="/vehicle-inspection" element={<VehicleInspection />} />
      <Route path="/upload-survey-report" element={<UploadSurveyReport />} />
      <Route path="/completed-surveys" element={<CompletedSurvey />} />

    </Routes>
  );
}

export default App;