import { $, fs } from "zx";

const baseURL = `https://container.standalone.hosts.pve`;
const run = (count) => $`hey -n ${count} -c ${count} ${baseURL}`;

const datetime = new Date()
  .toLocaleString("id", { timeStyle: "medium", dateStyle: "short" })
  .replace(/\/|\./g, "-")
  .replace(/ /g, "_");

const counts = [800, 1000, 1200, 1300, 1400, 1500, 1600];

const filename = `results/single-unit-standalone-raw-${counts[0]}-${
  counts[counts.length - 1]
}-${datetime}`;

for (let count of counts) {
  const out = await run(count);
  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, "\n\n---\n\n");

  let seconds = 0;
  const interval = setInterval(() => {
    process.stdout.write(`${++seconds} seconds elapsed \r`);
  }, 1000);
  await new Promise((resolve) => setTimeout(resolve, 30_000));
  clearInterval(interval);

  console.log("")
}
