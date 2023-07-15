import { $, fs } from "zx";

// const host = "fibonacci-behavior.default.local.knative";
const host = "fibonacci-behavior-smallest.default.local.knative";
const baseURL = `http://${process.env["MINIKUBE_IP"]}:${process.env["KOURIER_PORT"]}`;

const run = (count) => $`hey -n ${count} -c ${count} -host ${host} ${baseURL}`;

const datetime = new Date()
  .toLocaleString("id", { timeStyle: "medium", dateStyle: "short" })
  .replace(/\/|\./g, "-")
  .replace(/ /g, "_");

// let start = 100;
// let increment = 100;
// let iteration = 12 * 2;

let start = 200;
let increment = 400;
let iteration = 10;


const filename = `results/raw-${start + increment * (iteration - 1)}-${datetime}`;

for (let i = 0; i < iteration; i++) {
  const out = await run(start);
  const pods = await $`kubectl get pods --sort-by=.metadata.creationTimestamp`;

  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, '\n\n---\n\n')
  fs.appendFileSync(filename, pods.stdout);
  fs.appendFileSync(filename, '\n\n---\n\n')

  start += increment;
}
