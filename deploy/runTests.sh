#!/bin/bash

sudo docker build -t cameo-test . 
containerId=$(sudo docker run -d -p 9000:9000 cameo-test)
echo ContainerId: ${containerId}

while [ $( sudo docker logs ${containerId} | tail -n1 || grep Listening) ]; do
	echo waiting for container to start
done
