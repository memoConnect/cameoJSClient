#!/bin/bash

if [ -z $1 ]; then
	echo image name required
fi

# copy to subfolder to decrease context
rm -rf docker
mkdir docker
cp -r target Dockerfile docker/

cd docker
sudo docker build -t ${1} --rm .