#!/bin/bash

if [ -z $1 ]; then
	echo image name required
fi

sudo docker build -t $1 .