#!/bin/env bash

KNATIVE_VERSION="v1.10.1"
KNATIVE_RELEASE="https://github.com/knative/serving/releases/download/knative-${KNATIVE_VERSION}"

KOURIER_VERSION="v1.10.0"
KOURIER_RELEASE="https://github.com/knative/net-kourier/releases/download/knative-${KOURIER_VERSION}"

if [[ "$1" == "dry" ]]; then
	echo "To create:"
	echo "kubectl apply -f ${KNATIVE_RELEASE}/serving-crds.yaml"
	echo "kubectl apply -f ${KNATIVE_RELEASE}/serving-core.yaml"
	echo "kubectl apply -f ${KOURIER_RELEASE}/kourier.yaml"
	echo "kubectl patch configmap/config-network --namespace knative-serving --type merge --patch '{\"data\":{\"ingress-class\":\"kourier.ingress.networking.knative.dev\"}}'"

	echo "To delete:"
	echo "kubectl delete -f ${KOURIER_RELEASE}/kourier.yaml"
	echo "kubectl delete -f ${KNATIVE_RELEASE}/serving-core.yaml"
	echo "kubectl delete -f ${KNATIVE_RELEASE}/serving-crds.yaml"

	exit 0
elif [[ "$1" = "delete" ]]; then
	echo "Are you sure you want to delete Knative Serving and Kourier?"
	read -p "Press enter to continue"
	kubectl delete -f ${KOURIER_RELEASE}/kourier.yaml
	read -p "Press enter to continue"
	kubectl delete -f ${KNATIVE_RELEASE}/serving-core.yaml
	read -p "Press enter to continue"
	kubectl delete -f ${KNATIVE_RELEASE}/serving-crds.yaml
	exit 0
fi

echo "Installing Knative Serving ${KNATIVE_VERSION} and Kourier ${KOURIER_VERSION}"
kubectl apply -f ${KNATIVE_RELEASE}/serving-crds.yaml
read -p "Press enter to continue"
kubectl apply -f ${KNATIVE_RELEASE}/serving-core.yaml
read -p "Press enter to continue"
kubectl apply -f ${KOURIER_RELEASE}/kourier.yaml
read -p "Press enter to continue"

echo "Use Kourier as the default ingress class"
kubectl patch configmap/config-network \
	--namespace knative-serving \
	--type merge \
	--patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'
