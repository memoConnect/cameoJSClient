#!/bin/bash
cd test/e2e/keys

rm -f *.key

for ((i=1; i<10; i++));
do
    ssh-keygen -N "" -f ${i}.key
done

rm *.key.pub