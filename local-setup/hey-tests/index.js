import { $, fs } from "zx";

const host = "fibonacci-behavior.default.local.knative";
const baseURL = `http://${process.env["MINIKUBE_IP"]}:${process.env["KOURIER_PORT"]}`;

const run = (count) => $`hey -n ${count} -c ${count} -host ${host} ${baseURL}`;

const datetime = new Date()
  .toLocaleString("id", { timeStyle: "medium", dateStyle: "short" })
  .replace(/\/|\./g, "-")
  .replace(/ /g, "_");

let start = 100;
let increment = 100;
let iteration = 10;

for (let i = 0; i < iteration; i++) {
  const out = await run(start);
  const pods = await $`kubectl get pods --sort-by=.metadata.creationTimestamp`;

  // await $`echo "${out}" > results/raw-${datetime}`;
  // await $`echo "${out}" >> results/summary-${datetime}`;

  fs.appendFileSync(`results/raw-${datetime}`, out.stdout);
  fs.appendFileSync(`results/raw-${datetime}`, '\n\n---\n\n')
  fs.appendFileSync(`results/raw-${datetime}`, pods.stdout);
  fs.appendFileSync(`results/raw-${datetime}`, '\n\n---\n\n')
  start += increment;
}
