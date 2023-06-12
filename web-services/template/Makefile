DOCKER_USERNAME ?= dev.local
APPLICATION_NAME ?= $(shell basename ${PWD})
DOCKER_TAG ?= ${DOCKER_USERNAME}/${APPLICATION_NAME}:1.0.0

build-load:
	make build
	make load

build-run:
	make build
	make run

build-run-detached:
	make build
	make run-detached
 
build:
	docker build --tag ${DOCKER_TAG} .

load:
	minikube image load --overwrite ${DOCKER_TAG}

run:
	docker run -p 3000:3000 --rm -it ${DOCKER_TAG}

run-detached:
	docker run -p 3000:3000 --rm -d ${DOCKER_TAG}

run-standalone-master:
	docker compose -f docker-compose-master.yaml up --detach

run-standalone-slave:
	docker compose -f docker-compose-slave.yaml up --detach

stop-standalone-master:
	docker compose -f docker-compose-master.yaml down

stop-standalone-slave:
	docker compose -f docker-compose-slave.yaml down
