#!/bin/env bash

k -n kubernetes-dashboard patch svc kubernetes-dashboard --patch-file dashboard-patch.yaml
