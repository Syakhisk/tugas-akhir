DOCKER_USERNAME ?= dev.local
APPLICATION_NAME ?= $(shell basename ${PWD})
DOCKER_TAG ?= ${DOCKER_USERNAME}/${APPLICATION_NAME}:1.0.0
 
build:
	docker build --tag ${DOCKER_TAG} .

load:
	minikube image load ${DOCKER_TAG}
