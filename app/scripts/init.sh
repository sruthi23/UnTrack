#!/usr/bin/env bash

source $(dirname $0)/functions.sh

backup

offUntrack

clearDNSCache

echo 'success'
