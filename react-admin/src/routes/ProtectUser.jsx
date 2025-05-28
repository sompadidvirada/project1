import { useState, useEffect } from "react";
import useBakeryStore from "../zustand/storage";
import { currentUser } from "../api/authen";
import { useNavigate } from "react-router-dom";

const ProtectUser = ({ element }) => {
  const [ok, setOk] = useState(null);
  const user = useBakeryStore((state) => state.user);
  const token = useBakeryStore((state) => state.token);
  const navigator = useNavigate()
  useEffect(() => {
    if (user && token) {
      // send to back
      currentUser(token)
        .then((res) => setOk(true))
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }else {
      setOk(false);
    }
  }, [user, token]);

   // Redirect if not allowed
  useEffect(() => {
    if (ok === false) {
      navigator("/login");
    }
  }, [ok, navigator]);

  if (ok === null) return null;

  return element;
};

export default ProtectUser;
