#!/bin/env bash

qm config $1 | grep ipconfig0 | cut -d'=' -f2 | cut -d'/' -f1
