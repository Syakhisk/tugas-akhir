#!/bin/env bash

docker run \
  -it \
  --name vpn \
  --cap-add=NET_ADMIN \
  --device /dev/net/tun \
  -e VPN_FILES="its-onefile-2.ovpn" \
  -v "${PWD}/vpn-config/MYITS-OPENVPN/":/vpn \
  --rm dperson/openvpn-client
