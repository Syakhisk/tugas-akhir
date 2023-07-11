import axios from "axios";

const host = "fibonacci-behavior.default.local.knative";

const http = axios.create({
  baseURL: `http://${process.env["MINIKUBE_IP"]}:${process.env["KOURIER_PORT"]}`,
  timeout: 10_000,
  headers: {
    Host: host,
  },
});

let errors = 0;
let success = 0;
let responseTime = []

const run = async () => {
  const time = Date.now();
  const res = await http.get("/").catch((e) => ({ error: e }));
  if (res.error) {
    errors++;
    console.log(`[${Date.now() - time}ms] ${res.error.message}`);
  } else {
    success++;
    console.log(`[${Date.now() - time}ms] ${JSON.stringify(res.data)}`);
    responseTime.push(Date.now() - time)
  }
  return res;
};

await Promise.all(Array(200).fill(0).map(run));

console.log(`Success: ${success}`);
console.log(`Errors: ${errors}`);
console.log(`Average response time: ${responseTime.reduce((a, b) => a + b, 0) / responseTime.length}ms`);
