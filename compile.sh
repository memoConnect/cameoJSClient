#!/bin/bash

buildMode=test
buildPhonegap=false
command=deploy

#handle arguments
for i in "$@" ; do
	case $i in
	    -m=*|--mode=*)
		    buildMode="${i#*=}"
	    ;;
	    -a=*|--apiUrl*)
		    apiUrl="${i#*=}"
		    echo -e "\e[33m[ CameoClient - setting API Url to ${apiUrl} ]\033[0m"
		    apiUrlArg=--apiUrl=${apiUrl}
		;;
		--phonegap)
			command=phonegap-bs
		;;
	    *)
	      echo Unkown option: ${i}
	      exit 1
	    ;;
	esac
done

./setup.sh

echo -e "\e[33m[ CameoClient - starting deploy, target: ${target} ]\033[0m"

grunt ${command} --target=${buildMode} ${apiUrlArg}