import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import axios from "axios";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

let errors = 0;
let success = 0;
let responseTime = [];

if (isMainThread) {
  const threadCount = +process.argv[2] || 2;
  const threads = new Set();
  console.log(`Running with ${threadCount} threads...`);

  for (let i = 0; i < threadCount; i++) {
    threads.add(new Worker(__filename));
  }

  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });

    worker.on("exit", () => {
      threads.delete(worker);
      // console.log(`Thread exiting, ${threads.size} running...`);
      if (threads.size === 0) {
        console.log(`Success: ${success}`);
        console.log(`Errors: ${errors}`);
        console.log(
          `Average response time: ${
            responseTime.reduce((a, b) => a + b, 0) / responseTime.length
          }ms`
        );
      }
    });

    worker.on("message", (msg) => {
      if (msg.success) {
        success++;
        responseTime.push(msg.responseTime);
      } else {
        errors++;
      }
    });
  }
} else {
  const host = "fibonacci-behavior.default.local.knative";

  const http = axios.create({
    baseURL: `http://${process.env["MINIKUBE_IP"]}:${process.env["KOURIER_PORT"]}`,
    timeout: 10_000,
    headers: {
      Host: host,
    },
  });

  const time = Date.now();
  const res = await http.get("/").catch((e) => ({ error: e }));
  if (res.error) {
    console.log(`[${Date.now() - time}ms] ${res.error.message}`);
    parentPort.postMessage({ success: false });
  } else {
    console.log(`[${Date.now() - time}ms] ${JSON.stringify(res.data)}`);
    parentPort.postMessage({ success: true, responseTime: Date.now() - time });
  }
}
