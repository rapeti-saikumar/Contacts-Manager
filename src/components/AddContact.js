import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddContact = (props) => {
  const navigate = useNavigate();
  const { AddContactHandler } = props;
  const [Data, setData] = useState({
    name: "",
    email: "",
  });

  const setName = (e) => {
    setData({
      ...Data,
      name: e.target.value,
    });
  };

  const setEmail = (e) => {
    setData({
      ...Data,
      email: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (Data.name === "" || Data.email === "") {
      alert("All fileds are mandaory!");
      return;
    }
    AddContactHandler(Data);
    setData({
      name: "",
      email: "",
    });
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <div className="AddContact">
          <h3>Add Contact</h3>
          <form>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={Data.name}
                onChange={setName}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="XYZ@email.com"
                value={Data.email}
                onChange={setEmail}
              />
            </div>
            <div>
              <button className="button" onClick={handleAdd}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
