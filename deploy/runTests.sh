#!/bin/bash
imageName="cameo-test"

sudo docker build --no-cache -t ${imageName} --rm . 
sudo docker run -p 9000:9000 -d ${imageName}

containerId=$(sudo docker ps | grep ${imageName} | cut -f1 -d' ')

echo ContainerId: ${containerId}

while [ -z "${log}" ]; do
	echo waiting for container to start
	log=$(sudo docker logs ${containerId} | grep Listening)
	echo $(sudo docker logs ${containerId} | tail -n1)
	sleep 2
done

sudo docker stop ${containerId}
