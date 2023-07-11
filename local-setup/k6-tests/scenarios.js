import http from "k6/http";

export const options = {
  scenarios: {
    // example: {
    //   // executor: "shared-iterations",
    //   // iterations: 400,
    //   // executor: "per-vu-iterations",
    //   // vus: 300,
    //   // iterations: 1,

    //   executor: "constant-arrival-rate",
    //   rate: 200,
    //   timeUnit: "1s",
    //   duration: "1s",
    //   preAllocatedVUs: 200,
    // },

    stage_100: {
      executor: 'shared-iterations',
      vus: 100,
      iterations: 100,
      startTime: 
    }
  },
};

export default function () {
  const host = "fibonacci-behavior.default.local.knative";
  const url = `http://${__ENV["MINIKUBE_IP"]}:${__ENV["KOURIER_PORT"]}`;
  const params = {
    headers: {
      Host: host,
    },
  };

  const urlRes = http.get(url, params);
}
