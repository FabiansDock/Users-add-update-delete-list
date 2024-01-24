import userServices, { User } from "./services/user-services";
import useUsers from "./hooks/useUsers";

const FetchUsers = () => {
  const { users, errorLoading, spinnerLoading, setUsers, setErrorLoading } =
    useUsers();

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Fabian" };
    setUsers([...users, newUser]);

    const { request } = userServices.add<User>(newUser);
    request
      .then(({ data: savedData }) => setUsers([savedData, ...users]))
      .catch((err) => {
        setErrorLoading(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    const { request } = userServices.update<User>(user, updatedUser);
    request.catch((err) => {
      setErrorLoading(err.message);
      setUsers(originalUsers);
    });
  };

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    const { request } = userServices.delete<User>(user);
    request.catch((err) => {
      setErrorLoading(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {spinnerLoading && <div className="spinner-border"></div>}
      {errorLoading && <p className="text-danger">{errorLoading}</p>}
      {!spinnerLoading && (
        <button className="btn btn-primary" onClick={addUser}>
          Add
        </button>
      )}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className={"list-group-item d-flex justify-content-between"}
          >
            {user.name}
            <div>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FetchUsers;
