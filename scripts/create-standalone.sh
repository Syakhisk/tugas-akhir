#!/bin/env bash

# Script to create TEMPLATE VM
# To create clone use pve ui

VM_ID="9003"
IMAGE="/root/images/resized-jammy-server.img"
IP="10.0.0.20/22"
GW="10.0.0.1"

qm create "$VM_ID"\
	--name "standalone" \
	--memory 512 \
	--cores 1 \
	--net0 virtio,bridge=vmbr2 \
	--scsihw virtio-scsi-pci \
	--scsi0 local-lvm:0,import-from="$IMAGE" \
	--ide2 local-lvm:cloudinit \
	--boot order=scsi0 \
	--serial0 socket --vga serial0 \
	--ipconfig0 ip="$IP",gw="$GW" \
	--ciuser ubuntu --cipassword="$(openssl passwd -6 ubuntu)"
