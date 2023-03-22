## Clone Cloud Init

**Creating Template that Has Cloud Init**

```shell
$ qm create 9000 --memory 1024 --net0 virtio,bridge=vmbr2 --scsihw virtio-scsi-pci

$ qm set 9000 --scsi0 local-lvm:0,import-from=/root/jammy-server-cloudimg-amd64.img

$ qm set 9000 --ide2 local-lvm:cloudinit

$ qm set 9000 --boot order=scsi0

$ qm set 9000 --serial0 socket --vga serial0

$ qm set 9000 --ciuser=ubuntu --cipassword=ubuntu

$ qm template 9000
```

**Create new VM based on the template**

```shell
$ qm clone 9000 600 --name ubuntu-600

$ qm set 600 --ipconfig0 ip=10.0.0.2/22,gw=10.0.0.1
```

**Customizing cloudimg**

```shell
qemu-img resize <img> +8G
virt-customize -a docker-jammy-server-cloudimg-amd64.img --run-command "curl -fsSL https://get.docker.com | sh"
```

