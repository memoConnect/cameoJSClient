#!/bin/bash
imageName="cameo-test"

sudo docker build -t ${imageName} --rm . 
sudo docker run -p 9000 -d ${imageName}

containerId=$(sudo docker ps | grep ${imageName} | cut -f1 -d' ')

echo ContainerId: ${containerId}

timeout=50
while [ -z "${log}" ] && [ "$timeout" -gt 0 ]; do
	echo waiting for container to start. Patience left: ${timeout}
	log=$(sudo docker logs ${containerId} | grep Listening)
#	echo $(sudo docker logs ${containerId} | tail -n1)
	sleep 2	
	timeout=`expr $timeout - 1` 
done

sudo docker ps | grep ${imageName}

