import { $, fs } from "zx";

const svc = "fibonacci-autoscaling-cpu";
const host = `${svc}.grogu.hosts.pve`

const target = $.env["TARGET"];
const baseURL = `http://10.0.0.10`;

const run = (count) => $`hey -n ${count} -c ${count < 2000 ? count : 2000} -host ${host} ${baseURL}`;

const counts = [
  1, 200, 400, 600, 800, 1000, 2000, 4000, 8000, 10000
];

const { stdout: scriptname } = await $`basename "${process.argv[1]}" | awk -F '.js' '{print $1}'`;
const { stdout: datetime } = await $`TZ='Asia/Jakarta' date +%Y-%m-%d_%H-%M-%S`;

let filename = `results/${scriptname}-${target}-${counts[0]}-${
  counts[counts.length - 1]
}-${datetime}`;

filename = filename.replace(/\n/g, "");

for (let count of counts) {
  const out = await run(count);

  fs.appendFileSync(filename, `## ${count} Req\n`);
  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, "\n\n---\n\n");
}

console.log("Results written to:");
console.log(filename);
console.log(`export name="${filename}"`)
