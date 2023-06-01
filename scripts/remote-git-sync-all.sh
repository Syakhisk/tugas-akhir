#!/bin/env bash

# This script is used to execute a command on a remote host.

l_hostname="starlink"
git_dir="~/tugas-akhir"

r_pve_ip="10.15.40.20"
r_grogu_ip="10.0.0.10"
r_anakin_ip="10.0.0.20"
r_padme_ip="10.0.0.21"
r_luke_ip="10.0.0.22"
r_leia_ip="10.0.0.23"

targets=(
	$r_grogu_ip
	$r_anakin_ip
	$r_padme_ip
	$r_luke_ip
	$r_leia_ip
)

if [[ ! "$(hostname)" = "$l_hostname" ]]; then
	echo "This script must be run on $l_hostname"
	exit 1
fi

# run git pull on all remote hosts
echo -e "\n\n--Running git pull on $r_pve_ip--"
ssh root@$r_pve_ip "git -C $git_dir pull"

for target in "${targets[@]}"; do
  echo -e "\n\n--Running git pull on $target--"
	ssh root@$r_pve_ip "ssh -o StrictHostKeychecking=no ubuntu@$target 'git -C $git_dir pull'"
done
