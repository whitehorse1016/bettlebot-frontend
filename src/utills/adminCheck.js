// ProtectedRoute.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/user.service";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchAdminData = async () => {
    try {
      if (!token) {
        navigate("/"); // Redirects to home if not an admin
        return;
      }
      const userdata = await getUserInfo({ token });
      setIsAdmin(userdata.isAdmin);
      if (!userdata.isAdmin) {
        navigate("/"); // Redirects to home if not an admin
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Show a loading indicator or null while loading
  if (loading) return null;

  // Only render children if the user is an admin
  return isAdmin ? children : null;
};

export default ProtectedRoute;
