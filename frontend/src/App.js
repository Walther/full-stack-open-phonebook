import React, { useState, useEffect } from "react";
import { PersonForm, PersonFilterForm, PersonList } from "./Person";
import personService from "./services/persons";
import { Notification } from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });

  // fetch data from the server
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // If person exists, offer to update it
    const existing = persons.find((person) => person.name === newName);
    if (existing) {
      updateHandler({ id: existing.id, name: newName, number: newNumber });
      return;
    }

    // Create the object
    const person = {
      name: newName,
      number: newNumber,
    };

    // Persist to database
    personService
      .create(person)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        showNotification("success", `${newName} added successfully`);
      })
      .catch((error) => {
        console.error(error);
        showNotification("error", `Error adding person: ${error}`);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          // Delete from local view too
          setPersons(persons.filter((person) => person.id !== id));
          showNotification("success", `${name} deleted successfully`);
        })
        .catch((error) => {
          console.error(error);
          // Naive assumption: deleted already. We could do statuscode checking etc
          // but leaving that out of scope for now.
          showNotification(
            "error",
            `Information of ${name} already deleted from the server`
          );
        });
    }
  };

  const updateHandler = ({ id, name, number }) => {
    if (window.confirm(`Do you want to update ${name}?`)) {
      personService
        .update(id, { name, number })
        .then((response) => {
          console.log(response);
          // Update local view too
          setPersons(
            persons.map((person) => (person.id !== id ? person : response.data))
          );
          setNewName("");
          setNewNumber("");
          showNotification("success", `${name} updated successfully`);
        })
        .catch((error) => {
          console.error(error);
          showNotification("error", `Error updating person: ${error}`);
        });
    }
  };

  const showNotification = (status, message) => {
    setNotification({ status, message });
    setTimeout(() => {
      clearNotification();
    }, 3000);
  };
  const clearNotification = () => {
    setNotification({ status: "", message: "" });
  };

  return (
    <main role="main">
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <PersonFilterForm
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <PersonList
        persons={persons}
        filterName={filterName}
        deleteHandler={deleteHandler}
      />
    </main>
  );
};

export default App;
