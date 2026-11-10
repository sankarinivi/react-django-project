import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaIdCard,
  FaUsers,
  FaSpinner,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

function CustomerProfile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/userprofiles/`);

      console.log("Profiles:", res.data);

      // Show only customer profiles
      const customerProfiles = res.data.filter(
        (profile) => profile.role === "Customer"
      );

      setProfiles(customerProfiles);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-indigo-100
      p-5
      md:p-8
    ">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="
          bg-gradient-to-r
          from-[#001f3f]
          via-[#003b73]
          to-[#00509e]
          rounded-2xl
          shadow-xl
          p-6
          md:p-8
          text-white
          mb-8
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          ">

            <div className="
              flex
              items-center
              gap-4
            ">

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

                <FaUserCircle className="
                  text-3xl
                  text-blue-200
                " />

              </div>

              <div>

                <h1 className="
                  text-2xl
                  md:text-3xl
                  font-bold
                ">
                  My Profile
                </h1>

                <p className="
                  text-sm
                  text-blue-200
                  mt-1
                ">
                  View your customer account information
                </p>

              </div>

            </div>


            {/* Profile Count */}

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

              <FaUsers />

              <div>

                <p className="
                  text-xs
                  text-blue-200
                ">
                  Customer Profiles
                </p>

                <p className="
                  text-lg
                  font-bold
                ">
                  {profiles.length}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= CONTENT ================= */}

        {loading ? (

          <div className="
            bg-white
            rounded-2xl
            shadow-lg
            p-12
            text-center
          ">

            <FaSpinner className="
              animate-spin
              text-3xl
              text-blue-600
              mx-auto
              mb-4
            " />

            <h2 className="
              text-lg
              font-bold
              text-slate-700
            ">
              Loading Profile...
            </h2>

            <p className="
              text-sm
              text-slate-500
              mt-1
            ">
              Please wait while we load your information.
            </p>

          </div>

        ) : profiles.length > 0 ? (

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">

            {profiles.map((profile) => (

              <div
                key={profile.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  border
                  border-slate-100
                  overflow-hidden
                  hover:-translate-y-1
                  hover:shadow-xl
                  transition
                  duration-300
                "
              >

                {/* Profile Header */}

                <div className="
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  p-6
                  text-white
                ">

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <div className="
                      w-16
                      h-16
                      rounded-full
                      bg-white/20
                      border
                      border-white/30
                      flex
                      items-center
                      justify-center
                    ">

                      <FaUserCircle className="
                        text-4xl
                      " />

                    </div>

                    <div>

                      <h2 className="
                        text-xl
                        font-bold
                      ">
                        {profile.username}
                      </h2>

                      <p className="
                        text-sm
                        text-blue-100
                      ">
                        Customer Account
                      </p>

                    </div>

                  </div>

                </div>


                {/* Profile Details */}

                <div className="p-6 space-y-5">

                  {/* Username */}

                  <div className="
                    flex
                    items-center
                    gap-4
                    p-4
                    bg-slate-50
                    rounded-xl
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-lg
                      bg-blue-100
                      text-blue-600
                      flex
                      items-center
                      justify-center
                    ">

                      <FaIdCard />

                    </div>

                    <div>

                      <p className="
                        text-xs
                        text-slate-500
                        font-medium
                      ">
                        Username
                      </p>

                      <p className="
                        text-sm
                        font-bold
                        text-slate-800
                        mt-1
                      ">
                        {profile.username}
                      </p>

                    </div>

                  </div>


                  {/* Email */}

                  <div className="
                    flex
                    items-center
                    gap-4
                    p-4
                    bg-slate-50
                    rounded-xl
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-lg
                      bg-indigo-100
                      text-indigo-600
                      flex
                      items-center
                      justify-center
                    ">

                      <FaEnvelope />

                    </div>

                    <div className="min-w-0">

                      <p className="
                        text-xs
                        text-slate-500
                        font-medium
                      ">
                        Email Address
                      </p>

                      <p className="
                        text-sm
                        font-bold
                        text-slate-800
                        mt-1
                        break-all
                      ">
                        {profile.email}
                      </p>

                    </div>

                  </div>


                  {/* Role */}

                  <div className="
                    flex
                    items-center
                    gap-4
                    p-4
                    bg-slate-50
                    rounded-xl
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-lg
                      bg-green-100
                      text-green-600
                      flex
                      items-center
                      justify-center
                    ">

                      <FaUserTag />

                    </div>

                    <div>

                      <p className="
                        text-xs
                        text-slate-500
                        font-medium
                      ">
                        Account Role
                      </p>

                      <span className="
                        inline-flex
                        items-center
                        gap-2
                        mt-1
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        border
                        border-green-200
                        text-xs
                        font-bold
                      ">

                        {profile.role}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= NO PROFILE ================= */

          <div className="
            bg-white
            rounded-2xl
            shadow-lg
            p-12
            text-center
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
              mx-auto
              mb-4
            ">

              <FaUserCircle className="text-3xl" />

            </div>

            <h2 className="
              text-xl
              font-bold
              text-slate-700
            ">
              No Customer Profile Found
            </h2>

            <p className="
              text-sm
              text-slate-500
              mt-2
            ">
              Your customer profile information is not available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default CustomerProfile;