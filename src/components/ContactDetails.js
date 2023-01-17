import React from "react";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
const ContactDetails = (props) => {
  const { id } = useParams();
  const { Contacts } = props;
  const response = Contacts.find((obj) => {
    return obj.id == id;
  });
  return (
    <>
      <div className=" ContactDetails container ">
        <div className="ContactDetailCenter">
          <div className="imgContainer">
            <FaUserCircle />
          </div>
          <div className="ContactDetail">
            <h3>Name: {response.name}</h3>
            <br />
            <h4>Email: {response.email}</h4>
            <br />
            <h5>ID: {response.id}</h5>
            <br />
          </div>
          <Link to={"/"}>
            <button className="button">ok</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ContactDetails;
