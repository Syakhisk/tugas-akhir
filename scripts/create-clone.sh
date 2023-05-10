#!/bin/env bash

while read -r id name ip service; do
	{
		echo "start $id"
		echo "skip cloning"
		# qm clone 9003 "$id" --name "$name" --full --description "$service"
		qm set $id --ipconfig0 ip="$ip/22",gw="10.0.0.1"
		echo "done $id"
	} &
done < create-clone-list.txt

