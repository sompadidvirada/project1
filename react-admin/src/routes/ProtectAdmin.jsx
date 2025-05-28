import { useState, useEffect } from "react";
import useBakeryStore from "../zustand/storage";
import { currentAdmin } from "../api/authen";
import { useNavigate } from "react-router-dom";

const ProtectAdmin = ({ element }) => {
  const [ok, setOk] = useState(null); // null = loading, true = allowed, false = denied
  const user = useBakeryStore((state) => state.user);
  const token = useBakeryStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then(() => setOk(true))
        .catch(() => setOk(false));
    } else {
      setOk(false);
    }
  }, [user, token]);

  // Redirect if not allowed
  useEffect(() => {
    if (ok === false) {
      navigate("/login");
    }
  }, [ok, navigate]);

  if (ok === null) return null; // or show a loading spinner

  return element;
};

export default ProtectAdmin;
