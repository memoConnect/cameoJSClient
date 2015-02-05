#!/bin/bash

#handle arguments
for i in "$@" ; do
	case ${i} in
	    --target=*)
		    target="${i#*=}"
		    targetArg=--target="${target}"
	    ;;
	    --wwwUrl=*)
            wwwUrl="${i#*=}"
            wwwUrlArg=--wwwUrl=${wwwUrl}
		;;
	    --apiUrl=*)
            apiUrl="${i#*=}"
            apiUrlArg=--apiUrl=${apiUrl}
	    ;;
	    --specs=*)
	        specs="${i#*=}"
	    ;;
	    --testScreenshotPath=*)
            testScreenshotPath="${i#*=}"
            testScreenshotPathArg=--testScreenshotPath=${testScreenshotPath}
	    ;;
	esac
done

./setup.sh

if [ ! -z "$specs" ]; then
    echo -e "\e[33m[ CameoClientTest running e2e specs: $4 ]\033[0m"
    ./node_modules/grunt-cli/bin/grunt tests-e2e:all  ${targetArg} ${wwwUrlArg} ${apiUrlArg} ${testScreenshotPathArg} --specs=${specs} --disableUglify=true
else
    echo -e "\e[33m[ CameoClientTest - running all unit and e2e tests ]\033[0m"
    ./node_modules/grunt-cli/bin/grunt tests-unit ${targetArg} ${wwwUrlArg} ${apiUrlArg}
    [ $? -eq 0 ] || exit $?; # exit for none-zero return code
    ./node_modules/grunt-cli/bin/grunt tests-e2e  ${targetArg} ${wwwUrlArg} ${apiUrlArg} ${testScreenshotPathArg}
fi