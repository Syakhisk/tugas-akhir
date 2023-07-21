import { $, fs } from "zx";

const svc = "fibonacci-behavior";
const host = `${svc}.grogu.hosts.pve`;

const target = $.env["TARGET"];
const baseURL = "http://10.0.0.10";
const delay = 60_000;

const run = (count) => $`hey -n ${count} -c 1000 -host ${host} ${baseURL}`;

const counts = [1000, 2000, 3000, 4000, 5000];

const { stdout: scriptname } = await $`basename "${process.argv[1]}" | awk -F '.js' '{print $1}'`;
const { stdout: datetime } = await $`TZ='Asia/Jakarta' date +%Y-%m-%d_%H-%M-%S`;

const filename = `results/${scriptname}-${target}-${counts[0]}-${
  counts[counts.length - 1]
}-${datetime}`;

for (let count of counts) {
  const out = await run(count);

  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, "\n\n---\n\n");
}
