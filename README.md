# json-stringify-benchmark
To analyse the performance optimisation in JSON.stringify()

## Usage

### 1. Synchronous Benchmark
Run the simple loop benchmark to see raw execution speed differences:
```bash
node index.js
```

### 2. HTTP Server Benchmark
This test is closer to a real-world scenario. First, start the HTTP server on port 4000:
```bash
node server.js
```

Then, in a separate terminal window, open the same directory and run the autocannon benchmark script. This script automatically pings both endpoints and prints a summarized tabular text output of the results:
```bash
node bench.js
```


