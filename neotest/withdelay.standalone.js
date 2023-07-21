import { $, fs } from "zx";

if (!$.env["TARGET"]) {
  console.error("TARGET env is required");
  process.exit(1);
}

const target = $.env["TARGET"];
const host = `${target}.standalone-lb.hosts.pve`;
const baseURL = "http://10.0.0.35";
const delay = 60_000;

const run = (count) =>
  $`hey -n ${count} -c 1000 -host ${host} ${baseURL}`;

const counts = [1000, 2000, 3000, 4000, 5000];

const {stdout: scriptname} = await $`basename "${process.argv[1]}" | awk -F '.js' '{print $1}'`;
const {stdout: datetime} = await $`TZ='Asia/Jakarta' date +%Y-%m-%d_%H-%M-%S`;

const filename = `results/${scriptname}-${target}-${counts[0]}-${
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
  await new Promise((resolve) => setTimeout(resolve, delay));
  clearInterval(interval);

  console.log("");
}
