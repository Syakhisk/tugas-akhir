#!/bin/env bash

LOCAL_PORT="${1:-8007}"
DEST_HOST="${2:-10.0.0.4}"
DEST_PORT="${3:-3000}"

echo -e "PORT: ${LOCAL_PORT}\nDEST: ${DEST_HOST}:${DEST_PORT}\n"

iptables \
	-t nat \
	-A PREROUTING \
	-p tcp \
	--dport "$LOCAL_PORT" \
	-j DNAT \
	--to-destination "$DEST_HOST":"$DEST_PORT"
