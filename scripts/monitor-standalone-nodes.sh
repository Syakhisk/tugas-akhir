#!/bin/env bash

tmux split-window 'echo 10.0.0.30 && ssh ubuntu@10.0.0.30 htop; bash'
tmux split-window 'echo 10.0.0.31 && ssh ubuntu@10.0.0.31 htop; bash'
tmux split-window 'echo 10.0.0.32 && ssh ubuntu@10.0.0.32 htop; bash'
tmux split-window 'echo 10.0.0.33 && ssh ubuntu@10.0.0.33 htop; bash'
tmux split-window 'echo 10.0.0.34 && ssh ubuntu@10.0.0.34 htop; bash'
tmux select-layout tiled
