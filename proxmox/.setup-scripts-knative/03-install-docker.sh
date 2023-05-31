# curl -fsSL https://get.docker.com | sudo sh
# sudo usermod -aG docker $USER
# sudo systemctl enable docker.service
# sudo systemctl enable containerd.service
# sg docker -c "bash"

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
