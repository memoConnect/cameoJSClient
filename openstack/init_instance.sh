#!/bin/bash

# add hostname to /etc/hosts
echo -e "127.0.0.1 $(hostname) \n$(cat /etc/hosts)" > /etc/hosts

# add public keys to authorized_keys
cat ./public_keys >> /home/ubuntu/.ssh/authorized_keys
