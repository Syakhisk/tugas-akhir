## Start knative docker

Start/Restart docker container, k8s

```
minikube start -p knative
```

## Start tunnel

```
minikube tunnel --profile knative
```

## Services

```

kn service create hello \
--image gcr.io/knative-samples/helloworld-go \
--port 8080 \
--env TARGET=World

kn service list

echo "Accessing URL $(kn service describe hello -o url)"
curl "$(kn service describe hello -o url)"

# Observe pods (autoscaling)
kubectl get pod -l serving.knative.dev/service=hello -w

# Update Service
kn service update hello \
--env TARGET=Knative

# List revisions
kn revisions list

# Split traffic between revisions
kn service update hello \
--traffic hello-00001=50 \
--traffic @latest=50

# Load test with apache-ab
ab -n 100 -c 10 "$(kn service describe hello -o url)/"
```

## Custom Service

```
kn service create vite-knative-svc \
--image syakhisk/vite-knative \
--port 5173 \
--force
```

## Use local images for services
```
# Get ip of minikube
minikube -p knative ip
docker build -t helloworld-go .
minikube image load helloworld-go -p knative
kubectl apply -f service.yaml --force
kn service list

# directly build in minikube
minikube image build -t <IMAGE_NAME> .

# Delete service and img
minikube -p knative image rm helloworld-go
kn service delete helloworld-go

# get revision log
kubectl describe revision helloworld-go

# get configmap to skip tag resolution
kubectl get configmap -n knative-serving config-deployment -oyaml
kubectl edit configmap -n knative-serving config-deployment 

# uncomment this:
# registries-skipping-tag-resolving: "kind.local,ko.local,dev.local"
# name your docker image: dev.local/imagename:tag

# get docker env for minikube
minikube -p knative docker-env

# run before building
eval $(minikube -p knative docker-env)
```
