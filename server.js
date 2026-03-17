const http = require('http')
const fastJson = require('fast-json-stringify')

const PORT = 4000

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

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`)

  if (pathname === '/json-stringify') {
    const body = JSON.stringify(user)
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    })
    res.end(body)

  } else if (pathname === '/fast-json-stringify') {
    const body = stringifyFast(user)
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    })
    res.end(body)

  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
      <h2>Stringify Benchmark Server</h2>
      <p><a href="/json-stringify">/json-stringify</a> — native JSON.stringify</p>
      <p><a href="/fast-json-stringify">/fast-json-stringify</a> — fast-json-stringify</p>
      <hr>
      <p>Run <code>node bench.js</code> to stress test both with autocannon.</p>
    `)
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`\nEndpoints:`)
  console.log(`  /json-stringify       — native JSON.stringify`)
  console.log(`  /fast-json-stringify   — fast-json-stringify`)
  console.log(`\nRun:  node bench.js`)
})
