#!/bin/env bash

VM_ID="701"
IMAGE="/root/images/resized-jammy-server-cloudimg-amd64.img"
IP="10.0.0.20/22"
GW="10.0.0.1"

qm create "$VM_ID"\
	--name "standalone-$VM_ID" \
	--memory 4096 \
	--cores 4 \
	--net0 virtio,bridge=vmbr2 \
	--scsihw virtio-scsi-pci \
	--scsi0 local-lvm:0,import-from="$IMAGE" \
	--ide2 local-lvm:cloudinit \
	--boot order=scsi0 \
	--serial0 socket --vga serial0 \
	--ciuser ubuntu --cipassword ubuntu
