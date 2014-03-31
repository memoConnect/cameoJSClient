#!/bin/bash
imageName="cameo-test"
imagePort=9000

if [ ! -z "$1" ]; then
	imagePort=$1
fi	

echo -e "\e[33m[ CameoTest - Running on port: ${imagePort} ]\033[0m"


./createDockerImage.sh ${imageName}
sudo docker run -p ${imagePort}:9000 -d ${imageName}


containerId=$(sudo docker ps | grep ${imageName} | cut -f1 -d' ')

echo ContainerId: ${containerId}

timeout=50
while [ -z "${log}" ] && [ "$timeout" -gt 0 ]; do
	echo waiting for container to start. Patience left: ${timeout}
	log=$(sudo docker logs ${containerId} | grep Listening)
	sleep 2	
	timeout=`expr $timeout - 1` 
done

cd cameoJSClient
./test.sh test http://localhost:${imagePort}/app/

#sudo docker stop ${containerId}
