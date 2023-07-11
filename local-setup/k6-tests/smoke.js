import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 3,
  duration: "10s",
};

export default () => {
  const host = "fibonacci-behavior.default.local.knative";
  const url = `http://${__ENV["MINIKUBE_IP"]}:${__ENV["KOURIER_PORT"]}`;
  const params = {
    headers: {
      Host: host,
    },
  };

  const urlRes = http.get(url, params);
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
