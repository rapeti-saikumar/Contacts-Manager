import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaUserCircle, FaEdit, FaSearch } from "react-icons/fa";

const ContactList = (props) => {
  const inputEmt = useRef("");
  const { Contacts, removeContactHandler, Search, searcHandler } = props;
  const [Id, setId] = useState("");
  const removeHandler = (id) => {
    const DeleteContact = document.getElementById("DeleteContact");
    DeleteContact.style.display = "unset";
    setId(id);
  };

  const yesHandler = () => {
    removeContactHandler(Id);
    const DeleteContact = document.getElementById("DeleteContact");
    DeleteContact.style.display = "none";
  };
  const noHandler = () => {
    const DeleteContact = document.getElementById("DeleteContact");
    DeleteContact.style.display = "none";
  };
  const getSearchTerm = () => {
    searcHandler(inputEmt.current.value);
  };
  return (
    <>
      <div className="AddContactList container">
        <div className="headerSection">
          <div>
            <h2>Contact List</h2>
          </div>

          <div>
            <Link to={"/add"}>
              <button className="button">Add Contact</button>
            </Link>
          </div>
        </div>

        <input
          ref={inputEmt}
          type="text"
          placeholder="Search Contacts"
          value={Search}
          onChange={getSearchTerm}
        />

        <div className="items">
          {/* delete contact section start */}
          <div id="DeleteContact" className="DeleteContactContainer">
            <div className="DeleteContactCenter">
              <h3 style={{ color: "orangered" }}>
                Do you want to delete permanently!
              </h3>
              <div className="alert">
                <div>
                  <button className="button" onClick={noHandler}>
                    No
                  </button>
                </div>
                <div>
                  <button className="button" onClick={yesHandler}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* delete contact section end */}
          {Contacts.length < 1
            ? "No Contacts Found!"
            : Contacts.map((eachObj) => {
                const { name, email, id } = eachObj;
                return (
                  <div key={id} className="item">
                    <div className="userIcon">
                      <FaUserCircle />
                    </div>
                    <div className="ContentLink">
                      <Link
                        to={`/ContactDetails/${id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="headerName">{name}</div>
                        <div className="ContactListEmail"> {email}</div>
                      </Link>
                    </div>
                    <div className="editContauner">
                      <Link to={`/EditContact/${id}`}>
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="trashContainer">
                      <div
                        className="trashIcon"
                        onClick={() => removeHandler(id)}
                      >
                        <FaTrashAlt />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};
export default ContactList;
