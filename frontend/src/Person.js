import React from "react";

export const PersonFilterForm = ({ filterName, handleFilterNameChange }) => {
  return (
    <form>
      <h2>Filter results</h2>
      <label htmlFor="filterName">Name contains: </label>
      <input
        id="filterName"
        value={filterName}
        onChange={(event) => handleFilterNameChange(event)}
      />
    </form>
  );
};

export const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form>
      <h2>Add a new person</h2>
      <div>
        <label htmlFor="newName">Name: </label>
        <input
          id="newName"
          value={newName}
          onChange={(event) => handleNameChange(event)}
        />
      </div>
      <div>
        <label htmlFor="newNumber">Number: </label>
        <input
          id="newNumber"
          value={newNumber}
          onChange={(event) => handleNumberChange(event)}
        />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export const PersonList = ({ persons, filterName, deleteHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filterName.toLowerCase())
          )
          .map((person) => (
            <Person
              name={person.name}
              number={person.number}
              key={person.id}
              id={person.id}
              deleteHandler={deleteHandler}
            />
          ))}
      </ul>{" "}
    </>
  );
};

export const Person = ({ name, number, id, deleteHandler }) => (
  <li>
    {name} {number}{" "}
    <button onClick={() => deleteHandler(id, name)}>delete</button>
  </li>
);
