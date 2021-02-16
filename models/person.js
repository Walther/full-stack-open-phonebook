const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER_ADDRESS,
  MONGO_DB_NAME,
} = process.env;
console.log(
  `mongodb+srv://${MONGO_USERNAME}:MONGO_PASSWORD@${MONGO_CLUSTER_ADDRESS}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
);

// Database connection
const mongoose = require("mongoose");
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_ADDRESS}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Schema stuff
const personSchema = new mongoose.Schema({
  // Names are strings
  name: String,
  // Phone numbers can have weird formatting stuff, just store as a string
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
