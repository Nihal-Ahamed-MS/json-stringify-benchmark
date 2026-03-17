const fastJson = require('fast-json-stringify')

// Schema for fast-json-stringify
const schema = {
  title: 'User',
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number' },
    active: { type: 'boolean' }
  }
}

const stringifyFast = fastJson(schema)

// Sample object
const user = {
  id: 1,
  name: "Nihal",
  email: "nihal@example.com",
  age: 25,
  active: true
}

const ITERATIONS = 50_000_000

console.log("Running benchmark...\n")

// JSON.stringify benchmark
console.time("JSON.stringify")

for (let i = 0; i < ITERATIONS; i++) {
  JSON.stringify(user)
}

console.timeEnd("JSON.stringify")

// fast-json-stringify benchmark
console.time("fast-json-stringify")

for (let i = 0; i < ITERATIONS; i++) {
  stringifyFast(user)
}

console.timeEnd("fast-json-stringify")