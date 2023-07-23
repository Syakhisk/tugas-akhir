import { $ } from "zx";

$.verbose = false;
let lines = await $`cat $name`;
lines = lines.stdout.split("---");
lines.pop();

for (let line of lines) {
  let slowest = line.match(/Slowest:\s+(.*) secs/);
  slowest = slowest ? slowest[1] : 0;

  let fastest = line.match(/Fastest:\s+(.*) secs/);
  fastest = fastest ? fastest[1] : 0;

  let average = line.match(/Average:\s+(.*) secs/);
  average = average ? average[1] : 0;

  let ok = line.match(/\[\d+\]\s+(.*)\sresponses/);
  ok = ok ? ok[1] : 0;

  let req = line.match(/##\s+(\d+)\sReq/);
  req = req ? req[1] : 0;

  console.log(`${req}\t${ok}\t${fastest}\t${average}\t${slowest}`);
}
