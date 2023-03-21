#!/bin/env bash

SERVICE_NAME="helloworld-nodejs"
SERVICE_URL="$(kubectl get ksvc "$SERVICE_NAME" -o 'jsonpath={.status.url}' | sed s/"http:\/\/"//)"

MINIKUBE_IP="$(minikube ip)"
KOURIER_PORT="$(kubectl --namespace kourier-system get service kourier -o 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')"

echo "Run this command to make api call to: $SERVICE_NAME"
echo "curl -H 'Host: $SERVICE_URL' http://$MINIKUBE_IP:$KOURIER_PORT"
