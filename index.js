const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static("./frontend/build"));

const cors = require("cors");
app.use(cors());

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

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

// NOTE: I would much, much prefer using UUIDv4 or similar here
// but i will do as the exercise instructions say.
const generateId = () => {
  const newId = Math.floor(Math.random() * 1e9);
  if (persons.find((person) => person.id === newId)) {
    return generateId();
  }
  return newId;
};

app.get("/info", (req, res) => {
  const now = new Date();
  const message = `Phonebook has info for ${persons.length} people. <br><br> ${now}`;
  res.send(message);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
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

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});