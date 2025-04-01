import { useState, useEffect } from "react";
import useBakeryStore from "../zustand/storage";
import { currentUser } from "../api/authen";
import LoadingText from "../scenes/loading/Loading";

const ProtectUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useBakeryStore((state) => state.user);
  const token = useBakeryStore((state) => state.token);
  useEffect(() => {
    if (user && token) {
      // send to back
      currentUser(token)
        .then((res) => setOk(true))
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }
  }, []);

  return ok ? element : <LoadingText />;
};
export default ProtectUser;
