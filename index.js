// Load env vars
require("dotenv").config();

// Load models
const Person = require("./models/person");

// Server settings
const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static("./frontend/build"));

const cors = require("cors");
app.use(cors());

// Logging middleware
const morgan = require("morgan");
morgan.token("body", function (req, res) {
  // Optionally, this could also have a check on method being POST,
  // but I think it's more elegant to always have the object on the log lines.
  // This way any possible log parsing would be simpler - less special casing.
  if ((req.body !== undefined) & (req.body !== "")) {
    return JSON.stringify(req.body);
  }
  return "{}";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Routes

app.get("/info", (req, res) => {
  const now = new Date();
  const message = `Phonebook has info for ${persons.length} people. <br><br> ${now}`;
  res.send(message);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      // Naive assumption, not found. Could be another error too...
      response.status(404).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((addedPerson) => {
    response.json(addedPerson);
  });
});

// Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
