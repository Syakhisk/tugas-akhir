DOCKER_USERNAME ?= dev.local
APPLICATION_NAME ?= $(shell basename ${PWD})
 
build:
	docker build --tag ${DOCKER_USERNAME}/${APPLICATION_NAME}:1.0.0 .
