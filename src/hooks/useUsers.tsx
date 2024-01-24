import { useEffect, useState } from "react";
import userServices, { User } from "../services/user-services";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorLoading, setErrorLoading] = useState("");
  const [spinnerLoading, setSpinnerLoading] = useState(true);

  useEffect(() => {
    const { request, cancel } = userServices.getAll<User>();

    request
      .then((res) => {
        setUsers(res.data);
        setSpinnerLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorLoading(err.message);
        setSpinnerLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, errorLoading, spinnerLoading, setUsers, setErrorLoading };
};

export default useUsers;
