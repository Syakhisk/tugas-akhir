# echo 'alias kubectl="minikube kubectl --"' >> ~/.bashrc
mkdir -p ~/.local/bin
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
echo '[[ ! -f $HOME/.local/bin/kubectl ]] && ln -s $(which minikube) ~/.local/bin/kubectl' >> ~/.bashrc
echo 'source <(minikube completion bash)' >> ~/.bashrc
echo 'source <(kubectl completion bash)' >> ~/.bashrc
echo 'alias k="kubectl"' >> ~/.bashrc
echo 'complete -o default -F __start_kubectl k' >> ~/.bashrc
