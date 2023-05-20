#!/bin/env bash
docker run -it \
  --name web \
  -p 80:80 \
  -p 443:443 \
  --link vpn:vpn \
  -d dperson/nginx \
  -w "http://vpn:9091/transmission;/"
