import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditContact = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateContactHandler, Contacts } = props;
  const editItem = Contacts.find((eachObj) => {
    return eachObj.id == id;
  });
  const [Data, setData] = useState({
    id,
    name: editItem.name,
    email: editItem.email,
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

  const handleUpdate = (e) => {
    e.preventDefault();
    updateContactHandler(Data);
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
          <h3>Update Contact</h3>
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
              <button className="button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditContact;
