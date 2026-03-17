const autocannon = require('autocannon')

const DURATION = 10
const CONNECTIONS = 100
const PIPELINING = 10
const BASE_URL = 'http://localhost:3000'

function runTest(title, urlPath) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`  ${title}`)
    console.log('='.repeat(60))

    autocannon({
      url: `${BASE_URL}${urlPath}`,
      duration: DURATION,
      connections: CONNECTIONS,
      pipelining: PIPELINING,
    }, (err, result) => {
      if (err) return reject(err)
      resolve({
        title,
        url: urlPath,
        latencyAvg: result.latency.average,
        latencyP99: result.latency.p99,
        requestsAvg: result.requests.average,
        requestsTotal: result.requests.total,
        throughputAvg: result.throughput.average,
      })
    })
  })
}

function printSummary(jsonResult, fastResult) {
  console.log(`\n${'='.repeat(60)}`)
  console.log('  SUMMARY')
  console.log('='.repeat(60))
  console.log('')

  const fmt = (n) => Math.round(n * 100) / 100

  const header = 'Metric'.padEnd(25) + 'JSON.stringify'.padEnd(20) + 'fast-json-stringify'.padEnd(20)
  console.log(header)
  console.log('-'.repeat(65))

  const rows = [
    ['Req/sec (avg)', jsonResult.requestsAvg, fastResult.requestsAvg],
    ['Latency avg (ms)', jsonResult.latencyAvg, fastResult.latencyAvg],
    ['Latency p99 (ms)', jsonResult.latencyP99, fastResult.latencyP99],
    ['Total requests', jsonResult.requestsTotal, fastResult.requestsTotal],
    ['Throughput (MB/s)', fmt(jsonResult.throughputAvg / 1e6), fmt(fastResult.throughputAvg / 1e6)],
  ]

  for (const [metric, json, fast] of rows) {
    console.log(metric.padEnd(25) + String(json).padEnd(20) + String(fast).padEnd(20))
  }

  const speedup = fastResult.requestsAvg / jsonResult.requestsAvg
  console.log('')
  console.log(`Winner: ${speedup > 1 ? 'fast-json-stringify' : 'JSON.stringify'}`)
  console.log(`Speedup: ${fmt(speedup)}x`)
  console.log('')
}

async function main() {
  console.log(`\nAutocannon Benchmark`)
  console.log(`Duration: ${DURATION}s | Connections: ${CONNECTIONS} | Pipelining: ${PIPELINING}`)

  const jsonResult = await runTest('JSON.stringify', '/json-stringify')
  const fastResult = await runTest('fast-json-stringify', '/fast-json-stringify')

  printSummary(jsonResult, fastResult)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
