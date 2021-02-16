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
  Person.find({}).then((persons) => {
    const message = `Phonebook has info for ${persons.length} people. <br><br> ${now}`;
    res.send(message);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  person
    .save()
    .then((addedPerson) => {
      response.json(addedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
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

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Error handlers
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
