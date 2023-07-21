import { $, fs } from "zx";

const host = `fibonacci-behavior.default.local.knative`;
const baseURL = `http://${process.env["MINIKUBE_IP"]}:${process.env["KOURIER_PORT"]}`;

const run = (count) => $`hey -n ${count} -c ${count < 1000 ? count : 1000} -host ${host} ${baseURL}`;

const datetime = new Date()
  .toLocaleString("id", { timeStyle: "medium", dateStyle: "short" })
  .replace(/\/|\./g, "-")
  .replace(/ /g, "_");

const counts = [
  100,
  200,
  400,
  800,
  1000,
  2000,
  4000,
  8000,
  16000,
  32000,
]

const filename = `results/remote-raw-${counts[0]}-${counts[counts.length - 1]}-${datetime}`;

for (let count of counts) {
  const out = await run(count);

  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, '\n\n---\n\n')
}
