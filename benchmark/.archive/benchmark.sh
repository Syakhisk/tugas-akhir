#!/bin/env bash
# Set the duration, rate, and target files for each benchmark
IP="${1:-10.0.0.20}"
DURATION="10s"
RATE="10000"
TARGET_DIR="$IP"
BIN_FILE="$TARGET_DIR/result-$IP.bin"
PLOT_FILE="$TARGET_DIR/plot-$IP.html"
METRICS_FILE="$TARGET_DIR/metrics-$IP.json"
VEGETA="vegeta"

mkdir -p "$TARGET_DIR"

# Run the non-serverless benchmark
echo "GET http://$IP:3000" |
$VEGETA attack \
-duration=$DURATION \
-rate=$RATE | tee $BIN_FILE | $VEGETA report

$VEGETA report -type=json $BIN_FILE > $METRICS_FILE
cat $BIN_FILE | $VEGETA plot > $PLOT_FILE
cat $BIN_FILE | $VEGETA report -type="hist[0,100ms,200ms,300ms]"
