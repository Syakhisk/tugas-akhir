DOCKER_USERNAME ?= dev.local
APPLICATION_NAME ?= $(shell basename ${PWD})
DOCKER_TAG ?= ${DOCKER_USERNAME}/${APPLICATION_NAME}:1.0.0

build-load bl:
	make build
	make load

build-run br:
	make build
	make run

build-run-detached brd:
	make build
	make run-detached
 
build b:
	docker build --tag ${DOCKER_TAG} .

load l:
	minikube image load --overwrite ${DOCKER_TAG}

run r:
	docker run -p 3000:3000 --rm -it ${DOCKER_TAG}

run-detached rd:
	docker run -p 3000:3000 --rm -d ${DOCKER_TAG}
