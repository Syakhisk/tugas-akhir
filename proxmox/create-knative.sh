#!/bin/env bash

VM_ID="600"
IMAGE="/root/images/resized-jammy-server-cloudimg-amd64.img"
IP="10.0.0.10/22"
GW="10.0.0.1"

qm create "$VM_ID"\
	--name "knative" \
	--memory 4096 \
	--cores 4 \
	--net0 virtio,bridge=vmbr2 \
	--scsihw virtio-scsi-pci \
	--scsi0 local-lvm:0,import-from="$IMAGE" \
	--ide2 local-lvm:cloudinit \
	--boot order=scsi0 \
	--serial0 socket --vga serial0 \
	--ciuser ubuntu --cipassword ubuntu

# --ipconfig0 ip="$IP",gw="$GW" \
# qm template 9000
# qm set 600 --sshkey ~/.ssh/id_rsa.pub
