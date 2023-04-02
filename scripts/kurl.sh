#!/bin/env bash

# SCRIPT_DIR="$(dirname $(realpath $0))"
# SERVICES_DIR="$SCRIPT_DIR/../web-services"

SERVICE_NAME="$1"

if [ -z "$SERVICE_NAME" ]; then
    echo "Usage: $0 <service-name>"
    exit 1
fi

SERVICE_ENTRY="$(kubectl get ksvc | tail +2 | grep "^$SERVICE_NAME")"
if [ -z "$SERVICE_ENTRY" ]; then
    echo "Service $SERVICE_NAME not found"
    exit 1
fi

SERVICE_URL="$(echo "$SERVICE_ENTRY" | awk '{print $2}')"

REQUEST_PARAM="$2"

if [ -n "$REQUEST_PARAM" ]; then
    SERVICE_URL="$SERVICE_URL/$SERVICE_NAME/$REQUEST_PARAM"
fi

echo "--Service URL: $SERVICE_URL"
echo "--Response:"
curl "$SERVICE_URL"
echo

