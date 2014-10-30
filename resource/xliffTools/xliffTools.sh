#!/bin/bash

# get location of script
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

java -jar ${dir}/cameoXliffTools.jar "$@"