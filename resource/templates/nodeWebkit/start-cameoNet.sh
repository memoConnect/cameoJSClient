#!/bin/bash
WRAPPER="`readlink -f "$0"`"
HERE="`dirname "$WRAPPER"`"

# node-webkit is build against libudev0, newer systems have libudev1
# check if we have libudev1 and patch the binary accordingly
# this is very hacky, but we dont have much choice untill there is an installer

paths=(
  "/lib/x86_64-linux-gnu/libudev.so.1" # Ubuntu, Xubuntu, Mint
  "/usr/lib64/libudev.so.1" # SUSE, Fedora
  "/usr/lib/libudev.so.1" # Arch, Fedora 32bit
  "/lib/i386-linux-gnu/libudev.so.1" # Ubuntu 32bit
)

if [ ! -f "$HERE/bin/patched" ]
then
  for path in "${paths[@]}"
  do
    if [ -f $path ]
    then
      echo "Found libudev1 on this system, adjusting binary"    
      sed -i 's/udev\.so\.0/udev.so.1/g' "$HERE/bin/cameoNet"
      touch "$HERE/bin/patched"
      break
    fi
  done
fi

# Run cameoNet
exec "$HERE/bin/cameoNet" "$@"
