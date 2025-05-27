import { useState, useEffect } from "react";
import useBakeryStore from "../zustand/storage";
import { currentAdmin } from "../api/authen";
import { useNavigate } from "react-router-dom";

const ProtectAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useBakeryStore((state) => state.user);
  const token = useBakeryStore((state) => state.token);
  const navigator = useNavigate();

  useEffect(() => {
    if (user && token) {
      // send to back
      currentAdmin(token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }
  }, []);

  return ok ? element : navigator("/login");
};
export default ProtectAdmin;
