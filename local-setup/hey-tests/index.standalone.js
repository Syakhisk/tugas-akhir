import { $, fs } from "zx";

const subdomain = "five" 
const baseURL = `https://${subdomain}.standalone-lb.hosts.pve`;
const run = (count) => $`hey -n ${count} -c ${count < 1000 ? count : 1000} ${baseURL}`;

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

// const filename = `results/remote-raw-${counts[0]}-${counts[counts.length - 1]}-${datetime}`;
const filename = `results/remote-${subdomain}-raw-${counts[0]}-${counts[counts.length - 1]}-${datetime}`;

for (let count of counts) {
  const out = await run(count);

  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, '\n\n---\n\n')
}
