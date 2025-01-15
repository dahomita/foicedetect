import { useState, useEffect } from "react";
import api from "../../api"; // Your Axios instance
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constant";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get("/api/user/profile/");
        setUser(res.data);
      } catch (error) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-4xl font-bold text-yellow-800">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    // setIsAuthorized(false);
    window.location.href = "/"; // Simple redirect
  };

  return (
    <div className="bg-yellow-50 h-auto px-24 py-8">
      <div className="rounded-xl bg-white shadow-md px-10 py-8 space-y-4">
        <h1 className="text-3xl font-bold text-yellow-800">User Profile</h1>
        <div className="space-y-2 text-lg">
          <p className="text-gray-800">
            <span className="font-semibold text-yellow-700">User ID:</span>{" "}
            {user?.id}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold text-yellow-700">Username:</span>{" "}
            {user?.username}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold text-yellow-700">Email:</span>{" "}
            {user?.email}
          </p>
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
