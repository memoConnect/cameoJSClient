#!/bin/bash
set -e

# default buildmode ist test
buildMode=test

#handle arguments
for i in "$@" ; do
	case $i in
	    -m=*|--mode=*)			
		    buildMode="${i#*=}"
	    ;;
	    -latestServer*)
	    	latestServer=true
	    ;;
	    -latestClient*)
	    	latestClient=true
	    ;;
	    -p=*|--port*)
		    apiPort="${i#*=}"
			;;
	    *)
	      echo Unkown option: ${i}
	      exit 1
	    ;;
	esac
done

echo -e "\e[33m[ CameoBuild - Build mode: ${buildMode} ]\033[0m"

# define repositories
serverGit=https://github.com/memoConnect/cameoServer.git
clientGit=https://github.com/memoConnect/cameoJSClient.git

# get location of script
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${dir}

serverDir=${dir}/$(echo ${serverGit} | rev | cut -d"/" -f1 | rev | cut -d"." -f1)
clientDir=${dir}/$(echo ${clientGit} | rev | cut -d"/" -f1 | rev | cut -d"." -f1) 
secretDir=${dir}/cameoSecrets

echo -e "\e[33m[ CameoBuild - Updating repositories ]\033[0m"

# clone repos if dirs dont exist already
export GIT_SSL_NO_VERIFY=true
if [ ! -d "${serverDir}" ]; then
	git clone ${serverGit}
fi

if [ ! -d "${clientDir}" ]; then
	git clone ${clientGit}
fi

if [ ! -d "${secretDir}" ]; then
	echo No cameoSecrets found in dir: ${secretDir}
	exit 1
fi

quickCompile=false

case "${buildMode}" in 
	"test"|"dev")

		quickCompile=true
		
		if [ "${buildMode}" == "dev" ];then
			secretFile="secret_dev.conf"
		else
			if [ ! -z apiPort ]; then
				apiUrl="http://localhost:{apiPort}/api/v1"
			fi
			
			secretFile="secret_local.conf"
		fi		
		
		cd ${serverDir}
		if [ "${latestServer}" = true ]; then
			git checkout dev
			git pull
			serverVersion="latest"
		else
			# find latest successfull build tag	
			git fetch
			tag=$(git describe --tag --match 'build*' --abbrev=0)
			git checkout tags/${tag}
			serverVersion=$(echo ${tag} | cut -d'_' -f2)
		fi

		cd ${clientDir}
		if [ "${latestClient}" = true ]; then
			git checkout dev
			git pull
		else
			# find latest successfull build tag	
			git fetch
			tag=$(git describe --tag --match 'build*' --abbrev=0)
			git checkout tags/${tag}
		fi	
		;;

	"stage")
		secretFile="secret_stage.conf"
		serverVersion="stage"
		# checkout stage tag for both
		cd ${serverDir}
		git fetch
		git checkout tags/stage
		cd ${clientDir}
		git fetch
		git checkout tags/stage
		;;

	"prod")
		secretFile="secret_prod.conf"
		serverVersion="prod"
		;;

	*)
		echo Invalid mode: ${buildMode}
		exit 1
		;;
esac

# build client
echo -e "\e[33m[ CameoBuild - Building client, mode: ${buildMode} ]\033[0m"
cd ${clientDir}
./compile.sh ${buildMode} ${apiUrl}
# remove old client stuff
rm -rf ${serverDir}/public
# copy to public dir of server
mkdir -p ${serverDir}/public
cp -r ${clientDir}/dist/* ${serverDir}/public/

# build server
echo -e "\e[33m[ CameoBuild - Building server, quickCompile: ${quickCompile}]\033[0m"
cd ${serverDir}
if [ "${quickCompile}" == true ]; then
	./compile.sh ${serverVersion} quick
else
	./compile.sh ${serverVersion}
fi	 

# remove old target
echo -e "\e[33m[ CameoBuild - Create target ]\033[0m"
rm -fr ${dir}/target

# copy new target
cp -r ${serverDir}/target/universal/stage ${dir}/target

# copy fixtures
if [ "${buildMode}" == "test" ]; then
	cp -r ${serverDir}/fixtures ${dir}/target
fi	

# copy secret
cp ${secretDir}/${secretFile} ${dir}/target/conf/secret.conf
