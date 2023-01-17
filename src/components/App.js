import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import uuid from "react-uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import api from "../api/contacts";
import EditContact from "./EditContact";
import contacts from "../api/contacts";
const App = () => {
  const Key = "Contacts";
  const [Contacts, setContacts] = useState([]);
  const [Search, setSearch] = useState("");
  const [SearchResult, setSearchResult] = useState([]);
  // adding data to array
  const AddContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...Contacts, response.data]);
  };

  //deleting an item from ana array
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = Contacts.filter((eachObj) => {
      return eachObj.id !== id;
    });
    setContacts(newContacts);
  };

  //update
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      Contacts.map((eachObj) => {
        return eachObj.id == id ? { ...response.data } : eachObj;
      })
    );
  };

  //retrive data
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  //searching
  const searcHandler = (SearchTerm) => {
    setSearch(SearchTerm);
    if (Search !== "") {
      const newContactList = Contacts.filter((eachContact) => {
        return Object.values(eachContact)
          .join(" ")
          .toLowerCase()
          .includes(SearchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(Contacts);
    }
  };
  //storing and retiving from local storage start

  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(Key));
  //   console.log(retriveContacts);
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(Key, JSON.stringify(Contacts));
  // }, [Contacts]);

  //storing and retiving from local storage end

  return (
    <div className="App">
      {/* exculding header we want this evry time */}
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <ContactList
              Contacts={Search.length < 1 ? Contacts : SearchResult}
              removeContactHandler={removeContactHandler}
              Search={Search}
              searcHandler={searcHandler}
            />
          }
        />
        <Route
          path="/add"
          element={<AddContact AddContactHandler={AddContactHandler} />}
        />
        <Route
          path="/ContactDetails/:id"
          element={<ContactDetails Contacts={Contacts} />}
        />
        <Route
          path="/EditContact/:id"
          element={
            <EditContact
              updateContactHandler={updateContactHandler}
              Contacts={Contacts}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
