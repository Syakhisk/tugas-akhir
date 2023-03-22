#!/bin/env bash

mole start remote \
	--verbose \
	--key keyfile \
	--source :22 \
	--destination :22 \
	--source :8006 \
	--destination :8006 \
	--server root@gcp.al-az.me:2222 \
	
