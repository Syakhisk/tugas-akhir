# go to minikube docker-env so we don't need to deal with pulling local images
# eval $(minikube docker-env)

# get url of service
# kubectl get ksvc helloworld-nodejs  --output=custom-columns=NAME:.metadata.name,URL:.status.url

# run tunnel in background, so we can use the same terminal to curl
# minikube tunnel &

# curl the service
# curl http://helloworld-nodejs.default.10.99.102.158.sslip.io
