import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/api";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import UserEditForm from "./UserEditForm";
import UserDeleteConfirmation from "./UserDeleteConfirmation";
import UserCreationForm from "./UserCreationForm";
import useWindowSize from "./useWindowSize";
import Select from "react-select";

function Users() {
  const [users, setUsers] = useState([]);
  const usersURL = "http://localhost:3000/users";
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);
  const [beingCreated, setBeingCreated] = useState(false);

  let windowSize = useWindowSize();

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getAllUsers(usersURL);
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  let usersJSX = users.map((user) => {
    return (
      <option value={user._id} key={user._id}>
        {user.email}
      </option>
    );
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #008CFF",
      borderRadius: "10px",
      boxShadow: "none",
      backgroundColor: "#0E0E30",
      "&:hover": {
        borderColor: "#008CFF",
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: "2px solid #008CFF",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#008CFF" : "white",
      color: state.isFocused ? "white" : "#0E0E30",
      "&:hover": {
        backgroundColor: "#008CFF",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#008CFF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#008CFF",
    }),
  };

  const options = users.map((user) => ({
    value: user._id,
    label: user.email,
  }));

  function handleSelect(option) {
    const userId = option.value;
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setIsBeingDeleted(false);
    setIsEditing(false);
    setBeingCreated(false);
  }

  return (
    <>
      {windowSize < 768 && beingCreated ? (
        <UserCreationForm setBeingCreated={setBeingCreated} />
      ) : (
        <div className="admin-panel">
          {!isEditing && !isBeingDeleted && (
            <div className="d-flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setBeingCreated(true);
                  setIsBeingDeleted(false);
                  setIsEditing(false);
                }}
                className="gradient-class"
                style={{ width: "100%" }}
              >
                Create a user
              </button>
            </div>
          )}
          <div className="select-container">
            <Select
              onChange={(e) => handleSelect(e)}
              options={options}
              placeholder="Select a user"
              styles={customStyles}
              value={
                selectedUser
                  ? { value: selectedUser._id, label: selectedUser.email }
                  : null
              }
            />
          </div>
          <div className="admin-buttons">
            <RiEdit2Line
              size={50}
              className="buttonIcons"
              style={{ margin: 0 }}
              onClick={() => {
                setIsEditing(true);
                setIsBeingDeleted(false);
                setBeingCreated(false);
              }}
            />
            <RiDeleteBinLine
              size={50}
              className="buttonIcons"
              style={{ margin: 0 }}
              onClick={() => {
                setIsBeingDeleted(true);
                setIsEditing(false);
                setBeingCreated(false);
              }}
            />
          </div>
          <div>
            {isEditing && (
              <UserEditForm
                setIsEditing={setIsEditing}
                selectedUser={selectedUser}
              />
            )}
            {isBeingDeleted && (
              <UserDeleteConfirmation
                setIsBeingDeleted={setIsBeingDeleted}
                selectedUser={selectedUser}
              />
            )}
            {beingCreated && (
              <UserCreationForm setBeingCreated={setBeingCreated} setUsers={setUsers}/>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
