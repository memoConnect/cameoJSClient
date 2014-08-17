#!/bin/bash
cd test/e2e/keys

rm -f *.key

for i in {1..10};
do
    ssh-keygen -N "" -f ${i}.key
done

rm *.key.pub