// Load env vars
require('dotenv').config()

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER_ADDRESS,
  MONGO_DB_NAME,
} = process.env
console.log(
  `mongodb+srv://${MONGO_USERNAME}:MONGO_PASSWORD@${MONGO_CLUSTER_ADDRESS}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
)

// Database connection
const mongoose = require('mongoose')
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_ADDRESS}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// Schema stuff
const personSchema = new mongoose.Schema({
  // Names are strings
  name: String,
  // Phone numbers can have weird formatting stuff, just store as a string
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Rudimentary CLI app
let args = process.argv
// Remove interpreter and filename
args.splice(0, 2)
// Match based on amount of args left
if (args.length === 0) {
  // No parameters, list
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (args.length === 2) {
  // Create new phonebook entry
  const person = new Person({
    name: args[0],
    number: args[1],
  })
  person.save().then((result) => {
    console.log(`Person added: ${result.name}, ${result.number}`)
    mongoose.connection.close()
  })
} else {
  console.log('Did not understand CLI arguments.')
}
