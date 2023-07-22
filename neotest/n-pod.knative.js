import { $, fs } from "zx";

const target = $.env["TARGET"];
if (!target) throw new Error("TARGET env var is required");

const svc = `fibonacci-n-pod-${target}`;
const host = `${svc}.grogu.hosts.pve`;
const baseURL = "http://10.0.0.10";

const run = (count) => $`hey -n ${count} -c ${count} -host ${host} ${baseURL}`;

const counts = [800, 1000, 1200, 1400, 1600];

const { stdout: scriptname } = await $`basename "${process.argv[1]}" | awk -F '.js' '{print $1}'`;
const { stdout: datetime } = await $`TZ='Asia/Jakarta' date +%Y-%m-%d_%H-%M-%S`;

const filename = `results/${scriptname}-${counts[0]}-${
  counts[counts.length - 1]
}-${datetime}`;

for (let count of counts) {
  const out = await run(count);

  fs.appendFileSync(filename, out.stdout);
  fs.appendFileSync(filename, "\n\n---\n\n");
}
